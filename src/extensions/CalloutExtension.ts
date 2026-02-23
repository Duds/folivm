import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      setCallout: () => ReturnType;
      toggleCallout: () => ReturnType;
    };
    executiveSummary: {
      setExecutiveSummary: () => ReturnType;
      toggleExecutiveSummary: () => ReturnType;
    };
  }
}

export const CalloutExtension = Node.create({
  name: "callout",
  addOptions() {
    return { HTMLAttributes: { class: "callout" } };
  },
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[class*="callout"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setCallout: () => ({ commands }: { commands: { wrapIn: (name: string) => boolean } }) =>
        commands.wrapIn(this.name),
      toggleCallout: () => ({ commands }: { commands: { toggleWrap: (name: string) => boolean } }) =>
        commands.toggleWrap(this.name),
    };
  },
});

export const ExecutiveSummaryExtension = Node.create({
  name: "executiveSummary",
  addOptions() {
    return { HTMLAttributes: { class: "executive-summary" } };
  },
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[class*="executive-summary"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setExecutiveSummary: () => ({ commands }: { commands: { wrapIn: (name: string) => boolean } }) =>
        commands.wrapIn(this.name),
      toggleExecutiveSummary: () => ({ commands }: { commands: { toggleWrap: (name: string) => boolean } }) =>
        commands.toggleWrap(this.name),
    };
  },
});
