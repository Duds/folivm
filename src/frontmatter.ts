import YAML from "yaml";

export interface FrontmatterValidation {
  valid: boolean;
  error?: string;
}

/** Editable frontmatter fields supported by the document structure panel. */
export interface EditableFrontmatter {
  title: string;
  created: string;
  updated: string;
  author: string;
  pageSize?: "A4" | "A3" | "Letter";
  orientation?: "portrait" | "landscape";
  headingNumbering?: "none" | "1.1.1" | "1.2.3";
  /** Per-heading font-size overrides keyed by heading index (e.g. { "0": "var(--text-doc-h3)" }) */
  headingOverrides?: Record<string, string>;
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
      const ps = parsed.pageSize;
      const or = parsed.orientation;
      const hn = parsed.headingNumbering;
      const ho = parsed.headingOverrides;
      const headingOverrides =
        ho && typeof ho === "object" && !Array.isArray(ho)
          ? Object.fromEntries(
              Object.entries(ho).filter(
                (kv): kv is [string, string] =>
                  typeof kv[0] === "string" && typeof kv[1] === "string"
              )
            )
          : undefined;
      frontmatter = {
        title: typeof parsed.title === "string" ? parsed.title : "",
        created: typeof parsed.created === "string" ? parsed.created : "",
        updated: typeof parsed.updated === "string" ? parsed.updated : "",
        author: typeof parsed.author === "string" ? parsed.author : "",
        pageSize:
          ps === "A4" || ps === "A3" || ps === "Letter" ? ps : undefined,
        orientation:
          or === "portrait" || or === "landscape" ? or : undefined,
        headingNumbering:
          hn === "none" || hn === "1.1.1" || hn === "1.2.3" ? hn : undefined,
        headingOverrides:
          headingOverrides && Object.keys(headingOverrides).length > 0
            ? headingOverrides
            : undefined,
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
  const fields: Record<string, string | Record<string, string>> = {};
  if (frontmatter.title) fields.title = frontmatter.title;
  if (frontmatter.created) fields.created = frontmatter.created;
  if (frontmatter.updated) fields.updated = frontmatter.updated;
  if (frontmatter.author) fields.author = frontmatter.author;
  if (frontmatter.pageSize) fields.pageSize = frontmatter.pageSize;
  if (frontmatter.orientation) fields.orientation = frontmatter.orientation;
  if (frontmatter.headingNumbering)
    fields.headingNumbering = frontmatter.headingNumbering;
  if (
    frontmatter.headingOverrides &&
    Object.keys(frontmatter.headingOverrides).length > 0
  ) {
    fields.headingOverrides = frontmatter.headingOverrides;
  }

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
