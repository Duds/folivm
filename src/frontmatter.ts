import YAML from "yaml";

export interface FrontmatterValidation {
  valid: boolean;
  error?: string;
}

/** Editable frontmatter fields supported by the frontmatter panel. */
export interface EditableFrontmatter {
  title: string;
  created: string;
  updated: string;
  author: string;
}

const DEFAULT_FRONTMATTER: EditableFrontmatter = {
  title: "",
  created: "",
  updated: "",
  author: "",
};

/** Parses document content into frontmatter and body. */
export function parseDocument(content: string): {
  frontmatter: EditableFrontmatter;
  body: string;
} {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: { ...DEFAULT_FRONTMATTER }, body: content };
  }

  const [, yamlStr, body] = match;
  let frontmatter: EditableFrontmatter = { ...DEFAULT_FRONTMATTER };

  try {
    const parsed = YAML.parse(yamlStr) as Record<string, unknown> | null;
    if (parsed && typeof parsed === "object") {
      frontmatter = {
        title: typeof parsed.title === "string" ? parsed.title : "",
        created: typeof parsed.created === "string" ? parsed.created : "",
        updated: typeof parsed.updated === "string" ? parsed.updated : "",
        author: typeof parsed.author === "string" ? parsed.author : "",
      };
    }
  } catch {
    // Invalid YAML — return raw body; validation will catch on save
  }

  return { frontmatter, body: body ?? "" };
}

/** Serialises frontmatter and body into document content. */
export function serializeDocument(
  frontmatter: EditableFrontmatter,
  body: string
): string {
  const fields: Record<string, string> = {};
  if (frontmatter.title) fields.title = frontmatter.title;
  if (frontmatter.created) fields.created = frontmatter.created;
  if (frontmatter.updated) fields.updated = frontmatter.updated;
  if (frontmatter.author) fields.author = frontmatter.author;

  if (Object.keys(fields).length === 0) {
    return body;
  }

  const yaml = YAML.stringify(fields, { lineWidth: 0 }).trim();
  const trimmedBody = body.replace(/^\n+/, "");
  return `---\n${yaml}\n---\n\n${trimmedBody}`;
}

/**
 * Validates YAML frontmatter in document content.
 * Returns validation result; does not throw.
 */
export function validateFrontmatter(content: string): FrontmatterValidation {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return { valid: true };

  try {
    YAML.parse(match[1]);
    return { valid: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { valid: false, error: `Invalid YAML frontmatter: ${message}` };
  }
}
