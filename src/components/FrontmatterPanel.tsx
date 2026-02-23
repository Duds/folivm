import type { EditableFrontmatter } from "@/frontmatter";

interface FrontmatterPanelProps {
  frontmatter: EditableFrontmatter;
  onChange: (frontmatter: EditableFrontmatter) => void;
}

export function FrontmatterPanel({ frontmatter, onChange }: FrontmatterPanelProps) {
  const update = (key: keyof EditableFrontmatter, value: string) => {
    onChange({ ...frontmatter, [key]: value });
  };

  return (
    <div className="frontmatter-panel">
      <div className="frontmatter-fields">
        <div className="form-group">
          <label htmlFor="fm-title">Title</label>
          <input
            id="fm-title"
            type="text"
            value={frontmatter.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Document title"
          />
        </div>
        <div className="frontmatter-row">
          <div className="form-group">
            <label htmlFor="fm-created">Created</label>
            <input
              id="fm-created"
              type="date"
              value={frontmatter.created}
              onChange={(e) => update("created", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fm-updated">Updated</label>
            <input
              id="fm-updated"
              type="date"
              value={frontmatter.updated}
              onChange={(e) => update("updated", e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fm-author">Author</label>
          <input
            id="fm-author"
            type="text"
            value={frontmatter.author}
            onChange={(e) => update("author", e.target.value)}
            placeholder="Author name"
          />
        </div>
      </div>
    </div>
  );
}
