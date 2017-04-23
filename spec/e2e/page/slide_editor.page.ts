import { Client } from 'spectron';

export default class SlideEditorPage {
  constructor(private client: Client<void>) {}

  inputText(text: string): WebdriverIO.Client<void> {
    return this.client.waitForExist('#editor').then(() => {
      this.client.setValue('#editor textarea', text);
    });
  }

  getSlideHtml(): WebdriverIO.Client<string> {
    return this.client.waitForExist('.slide-content')
      .then(() => this.client.getHTML('.slide-content'))
      .then((html) => typeof html === 'string' ? html : html.join());
  }

  waitForExistEditorText(text: string): WebdriverIO.Client<boolean> {
    return this.client.waitForExist('#editor')
      .then(() => new Promise((resolve, _reject) => {
        const timer = setInterval(() => {
          this.client.getText("#editor .ace_text").then(contents => {
            const editorText = typeof contents === 'string' ? contents : contents.join('\n');
            if (editorText === text) {
              resolve(true);
              clearInterval(timer);
            }
          });
        }, 1000);
      }))
      .then(() => true);
  }

  findEmoji(emojiName: string): WebdriverIO.Client<boolean> {
    function loop(html: string | string[]): boolean {
      if (typeof html === 'string') {
        return html.indexOf(`${emojiName}.png`) >= 0;
      } else {
        return html.some((text) => loop(text));
      }
    }
    return this.client.waitForExist('.slide-inner img')
      .then(() => this.client.getHTML('.slide-inner img') )
      .then((html) => loop(html));
    }
}
