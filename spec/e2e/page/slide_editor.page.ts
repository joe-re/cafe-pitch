import spectron from 'spectron';

export default class SlideEditorPage {
  constructor(private client: spectron.Client<void>) {}

  inputText(text: string): Promise<void> {
    return this.client.waitForExist('#editor').then(() => {
      this.client.setValue('#editor textarea', text);
    });
  }

  getSlideHtml(): Promise<string> {
    return this.client.waitForExist('.slide-content')
      .then(() => this.client.getHTML('.slide-content'));
  }

  findEmoji(emojiName: string): Promise<boolean> {
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
