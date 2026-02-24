import { DocumentStructurePanel } from "@/components/panels/DocumentStructurePanel";
import { ScrollArea } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

interface EditorCommandsRef {
  focusAtHeading: (index: number) => void;
  toggleHeading: (level: 1 | 2 | 3 | 4) => void;
  setParagraph: () => void;
  toggleCallout: () => void;
  toggleExecutiveSummary: () => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleCode: () => void;
  toggleLink: (url?: string) => void;
  getActiveMarks: () => { bold: boolean; italic: boolean; code: boolean };
}

interface RightPanelProps {
  collapsed: boolean;
  currentDoc: string | null;
  docContent?: string;
  onDocContentChange?: (content: string) => void;
  selectedStructureNode?: string | null;
  onSelectNode?: (nodeId: string | null) => void;
  selectionHasCharacterRange?: boolean;
  editorCommandsRef?: React.RefObject<EditorCommandsRef | null>;
}

export function RightPanel({
  collapsed,
  currentDoc,
  docContent = "",
  onDocContentChange = () => {},
  selectedStructureNode = "document",
  onSelectNode = () => {},
  selectionHasCharacterRange = false,
  editorCommandsRef,
}: RightPanelProps) {
  return (
    <aside
      className={cn("sidebar sidebar-right", collapsed && "collapsed")}
    >
      <div className="sidebar-panel">
        <ScrollArea
          scrollbars="vertical"
          className="sidebar-content structure-panel-content"
        >
          <div className="structure-panel-inner">
            {currentDoc && docContent !== undefined ? (
              <DocumentStructurePanel
                docContent={docContent}
                onDocContentChange={onDocContentChange}
                selectedNodeId={selectedStructureNode}
                onSelectNode={onSelectNode}
                selectionHasCharacterRange={selectionHasCharacterRange}
                editorCommandsRef={editorCommandsRef}
              />
            ) : (
              <div className="structure-panel-empty">
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  Open a document to view structure and properties.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
