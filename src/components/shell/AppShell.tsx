import { LeftSidebar } from "./LeftSidebar";
import { EditorCanvas } from "./EditorCanvas";
import { RightPanel } from "./RightPanel";
import { BottomToolbar } from "@/BottomToolbar";
import type { ProjectInfo, SearchMatch } from "@/types";

interface AppShellProps {
  project: ProjectInfo;
  currentDoc: string | null;
  docContent: string;
  onDocContentChange: (content: string) => void;
  groupedDocs: Map<string, string[]> | null;
  leftSidebarCollapsed: boolean;
  leftSidebarWidth: number;
  onLeftSidebarWidthChange: (width: number) => void;
  rightSidebarCollapsed: boolean;
  onRightSidebarCollapsedChange: (v: boolean) => void;
  rightSidebarWidth: number;
  onRightSidebarWidthChange: (width: number) => void;
  expandedFolders: Set<string>;
  onExpandedFoldersChange: (folders: Set<string>) => void;
  viewMode: "document" | "preview" | "outline";
  zoomLevel: number;
  showNonPrintingChars: boolean;
  rulerUnits: "mm" | "cm" | "inch";
  status: string;
  exportStatus: string | null;
  error: string;
  onLoadDocument: (path: string) => void;
  onCreateDocument: () => void;
  onRefreshExplorer: () => void;
  onMoveDocument: (fromRelativePath: string, toFolder: string) => void;
  leftSidebarView: "project" | "search";
  onLeftSidebarViewChange: (view: "project" | "search") => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  replaceQuery: string;
  onReplaceQueryChange: (value: string) => void;
  searchScope: "document" | "project";
  onSearchScopeChange: (scope: "document" | "project") => void;
  searchCaseSensitive: boolean;
  onSearchCaseSensitiveChange: (value: boolean) => void;
  documentMatches: { start: number; end: number }[];
  currentDocumentMatchIndex: number;
  onCurrentDocumentMatchIndexChange: (index: number) => void;
  replaceInDocument: (replaceAll: boolean) => void;
  projectSearchResults: SearchMatch[];
  projectSearchLoading: boolean;
  onRunProjectSearch: () => void;
  onOpenProjectResult: (path: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onSaveDocument: (content: string) => void;
  onExportPdf: () => void;
  onViewModeChange: (mode: "document" | "preview" | "outline") => void;
  onZoomChange: (zoom: number) => void;
  wordCount: (text: string) => number;
  openTabs?: { id: string; path: string; unsaved: boolean }[];
  activeTabId?: string | null;
  onSwitchTab?: (id: string) => void;
  onCloseTab?: (id: string, e: React.MouseEvent) => void;
  selectedStructureNode?: string | null;
  onSelectStructureNode?: (nodeId: string | null) => void;
  onSelectionChange?: (nodeId: string | null, hasCharacterRange: boolean) => void;
  selectionHasCharacterRange?: boolean;
  editorCommandsRef?: React.RefObject<{
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
  } | null>;
}

export function AppShell(props: AppShellProps) {
  const {
    project,
    currentDoc,
    docContent,
    onDocContentChange,
    groupedDocs,
    leftSidebarCollapsed,
    leftSidebarWidth,
    onLeftSidebarWidthChange,
    rightSidebarCollapsed,
    rightSidebarWidth,
    onRightSidebarWidthChange,
    expandedFolders,
    onExpandedFoldersChange,
    viewMode,
    zoomLevel,
    showNonPrintingChars,
    rulerUnits,
    status,
    exportStatus,
    error,
    onLoadDocument,
    onCreateDocument,
    onRefreshExplorer,
    onMoveDocument,
    leftSidebarView,
    onLeftSidebarViewChange,
    searchQuery,
    onSearchQueryChange,
    replaceQuery,
    onReplaceQueryChange,
    searchScope,
    onSearchScopeChange,
    searchCaseSensitive,
    onSearchCaseSensitiveChange,
    documentMatches,
    currentDocumentMatchIndex,
    onCurrentDocumentMatchIndexChange,
    replaceInDocument,
    projectSearchResults,
    projectSearchLoading,
    onRunProjectSearch,
    onOpenProjectResult,
    searchInputRef,
    onSaveDocument,
    onExportPdf,
    onViewModeChange,
    onZoomChange,
    wordCount,
    openTabs = [],
    activeTabId = null,
    onSwitchTab,
    onCloseTab,
    selectedStructureNode = "document",
    onSelectStructureNode = () => {},
    onSelectionChange,
    selectionHasCharacterRange = false,
    editorCommandsRef,
  } = props;

  const handleSave = () => onSaveDocument(docContent);

  return (
    <main
      className="app app-with-project"
      style={
        {
          "--left-sidebar-width": `${leftSidebarWidth}px`,
          "--right-sidebar-width": `${rightSidebarWidth}px`,
        } as React.CSSProperties
      }
    >
      <LeftSidebar
        projectPath={project.path}
        groupedDocs={groupedDocs}
        currentDoc={currentDoc}
        onLoadDocument={onLoadDocument}
        onCreateDocument={onCreateDocument}
        onRefreshExplorer={onRefreshExplorer}
        onMoveDocument={onMoveDocument}
        expandedFolders={expandedFolders}
        onExpandedFoldersChange={onExpandedFoldersChange}
        collapsed={leftSidebarCollapsed}
        leftSidebarView={leftSidebarView}
        onLeftSidebarViewChange={onLeftSidebarViewChange}
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        replaceQuery={replaceQuery}
        onReplaceQueryChange={onReplaceQueryChange}
        searchScope={searchScope}
        onSearchScopeChange={onSearchScopeChange}
        searchCaseSensitive={searchCaseSensitive}
        onSearchCaseSensitiveChange={onSearchCaseSensitiveChange}
        documentMatches={documentMatches}
        currentDocumentMatchIndex={currentDocumentMatchIndex}
        onCurrentDocumentMatchIndexChange={onCurrentDocumentMatchIndexChange}
        onReplaceOne={() => replaceInDocument(false)}
        onReplaceAll={() => replaceInDocument(true)}
        projectSearchResults={projectSearchResults}
        projectSearchLoading={projectSearchLoading}
        onRunProjectSearch={onRunProjectSearch}
        onOpenProjectResult={onOpenProjectResult}
        searchInputRef={searchInputRef}
      />
      {!leftSidebarCollapsed && (
      <div
        className="resize-handle resize-handle-left"
        aria-hidden
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startW = leftSidebarWidth;
          const minW = 160;
          const maxW = 480;

          const onMove = (move: MouseEvent) => {
            const dx = move.clientX - startX;
            const next = Math.max(minW, Math.min(maxW, startW + dx));
            onLeftSidebarWidthChange(next);
          };
          const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
          };

          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
          document.body.style.cursor = "col-resize";
          document.body.style.userSelect = "none";
        }}
      />
      )}
      <EditorCanvas
        currentDoc={currentDoc}
        docContent={docContent}
        onDocContentChange={onDocContentChange}
        onSave={handleSave}
        tabs={openTabs}
        activeTabId={activeTabId}
        onSwitchTab={onSwitchTab}
        onCloseTab={onCloseTab}
        viewMode={viewMode}
        zoomLevel={zoomLevel}
        showNonPrintingChars={showNonPrintingChars}
        rulerUnits={rulerUnits}
        onSelectionChange={onSelectionChange}
        editorCommandsRef={editorCommandsRef}
      />
      {!rightSidebarCollapsed && (
      <div
        className="resize-handle resize-handle-right"
        aria-hidden
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startW = rightSidebarWidth;
          const minW = 200;
          const maxW = 560;

          const onMove = (move: MouseEvent) => {
            const dx = startX - move.clientX; /* Right panel: drag right = increase width */
            const next = Math.max(minW, Math.min(maxW, startW + dx));
            onRightSidebarWidthChange(next);
          };
          const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
          };

          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
          document.body.style.cursor = "col-resize";
          document.body.style.userSelect = "none";
        }}
      />
      )}
      <RightPanel
        collapsed={rightSidebarCollapsed}
        currentDoc={currentDoc}
        docContent={docContent}
        onDocContentChange={onDocContentChange}
        selectedStructureNode={selectedStructureNode}
        onSelectNode={onSelectStructureNode}
        selectionHasCharacterRange={selectionHasCharacterRange}
        editorCommandsRef={editorCommandsRef}
      />
      <BottomToolbar
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        zoomLevel={zoomLevel}
        onZoomChange={onZoomChange}
        wordCount={wordCount(docContent)}
        charCount={docContent.length}
        pageCount={Math.ceil(wordCount(docContent) / 250) || 0}
        saveStatus={status}
        exportStatus={exportStatus}
        llmStatus={null}
        onPrintPreview={() => onViewModeChange("preview")}
        onExportPdf={onExportPdf}
        hasProject={!!project}
        hasDocument={!!currentDoc}
      />
      {(error || status) && (
        <footer className="footer">
          {error && <span className="error">{error}</span>}
          {status && <span className="status">{status}</span>}
        </footer>
      )}
    </main>
  );
}
