import { useMemo } from "react";
import { Editor } from "../../Editor";
import { FrontmatterPanel } from "@/components/FrontmatterPanel";
import { parseDocument, serializeDocument } from "@/frontmatter";
import { cn } from "@/lib/utils";

interface EditorCanvasProps {
  currentDoc: string | null;
  docContent: string;
  onDocContentChange: (content: string) => void;
  onSave: () => void;
}

export function EditorCanvas({
  currentDoc,
  docContent,
  onDocContentChange,
  onSave,
}: EditorCanvasProps) {
  const { frontmatter, body } = useMemo(
    () => parseDocument(docContent),
    [docContent]
  );

  return (
    <section className="canvas-area">
      <div className="canvas-scroll">
        <div
          className={cn("editor-area", currentDoc && "editor-wysiwyg")}
        >
          {currentDoc ? (
            <>
              <FrontmatterPanel
                frontmatter={frontmatter}
                onChange={(fm) =>
                  onDocContentChange(serializeDocument(fm, body))
                }
              />
              <Editor
                content={body}
                onChange={(newBody) =>
                  onDocContentChange(serializeDocument(frontmatter, newBody))
                }
                onSave={onSave}
              />
            </>
          ) : (
            <div className="empty-editor">
              <p>Select a document or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
