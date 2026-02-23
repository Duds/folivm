/// <reference types="vite/client" />

declare module "turndown" {
  interface TurndownRule {
    filter: string | string[] | ((node: Node, options: unknown) => boolean);
    replacement: (content: string, node?: Node, options?: unknown) => string;
  }

  interface TurndownServiceOptions {
    headingStyle?: "setext" | "atx";
    codeBlockStyle?: "indented" | "fenced";
  }

  class TurndownService {
    constructor(options?: TurndownServiceOptions);
    addRule(name: string, rule: TurndownRule): this;
    turndown(html: string | HTMLElement): string;
  }

  export default TurndownService;
}
