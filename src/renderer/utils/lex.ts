import Settings from '../../types/settings';

const conds = {
  code: /^ {4}[^\n]+(?:\n|$)/,
  fences: /^ *(`{3,}|~{3,})[\s\S]*?\1(?:\n|$)/,
  heading: /^ *(#{1,6}) .+(?:\n|$)/,
  hr: /^ *[-*_]{3,} *(?:\n+|$)/,
  others: /^.+?(?:\n|$)/,
  newline: /^\n/
};

type code = { type: 'code', text: string };
type heading = { type: 'heading', text: string, depth: number, break: boolean };
type hr = { type: 'hr', text: string, break: boolean };
type others = { type: 'others', text: string };
type unknown = { type: 'unknown', text: string }; // shouldn't use it
export type Node = code | heading | hr | others | unknown;

export default function lex(src: string, settings?: Settings) {
  let cap;
  const lines: Node[] = [];
  while (src) {
    if (cap = conds.code.exec(src)) {
      lines.push({ type: 'code', text: cap[0] });
      src = src.substring(cap[0].length);
      continue;
    }

    if (cap = conds.fences.exec(src)) {
      src = src.substring(cap[0].length);
      cap[0].match(/(.+\n)+?/g).forEach(text => {
        lines.push({ type: 'code', text });
      });
      continue;
    }

    if (cap = conds.heading.exec(src)) {
      src = src.substring(cap[0].length);
      let isBreak = false;
      if (settings && lines.length > 0) {
        switch(cap[1].length) {
          case 1: isBreak = settings.separator.h1; break;
          case 2: isBreak = settings.separator.h2; break;
          case 3: isBreak = settings.separator.h3; break;
          case 4: isBreak = settings.separator.h4; break;
          case 5: isBreak = settings.separator.h5; break;
          case 6: isBreak = settings.separator.h6; break;
          default: break;
        }
      }
      lines.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[0],
        break: isBreak
      });
      continue;
    }

    if (cap = conds.hr.exec(src)) {
      src = src.substring(cap[0].length);
      lines.push({
        type: 'hr',
        text: cap[0].replace('---', ''),
        break: settings && lines.length > 0 && settings.separator.horizontalLine
      });
      continue;
    }

    if (cap = conds.others.exec(src)) {
      src = src.substring(cap[0].length);
      lines.push({ type: 'others', text: cap[0] });
      continue;
    }

    if (cap = conds.newline.exec(src)) {
      src = src.substring(cap[0].length);
      lines.push({ type: 'others', text: cap[0] });
      continue;
    }

    lines.push({ type: 'unknown', text: src });
    break;
  }
  return lines;
}
