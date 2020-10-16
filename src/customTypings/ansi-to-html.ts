declare module 'ansi-to-html' {
  export default class Convert {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(config?: Config) {}
    toHtml(ansiString: string): string;
  }

  interface Config {
    fg?: string;
    bg?: string;
    newline?: boolean;
    escapeXML?: boolean;
    stream?: boolean;
  }
}
