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
  expandedFolders: Set<string>;
  onExpandedFoldersChange: (folders: Set<string>) => void;
  contextFiles: string[];
  selectedContextPaths: Set<string>;
  onToggleContextFile: (path: string) => void;
  showLlmConfig: boolean;
  llmConfigForm: {
    provider: string;
    api_key: string;
    model: string;
  };
  onLlmConfigFormChange: (
    updater: (prev: AppShellProps["llmConfigForm"]) => AppShellProps["llmConfigForm"]
  ) => void;
  llmSuggestion: string | null;
  llmPrompt: string;
  onLlmPromptChange: (value: string) => void;
  llmLoading: boolean;
  viewMode: "document" | "preview" | "outline";
  zoomLevel: number;
  status: string;
  exportStatus: string | null;
  error: string;
  assistantPromptRef: React.RefObject<HTMLTextAreaElement | null>;
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
  onRequestLlm: () => void;
  onAcceptLlmSuggestion: () => void;
  onUpdateLlmSuggestion: (text: string) => void;
  onRejectLlmSuggestion: () => void;
  onOpenLlmConfig: () => void;
  onSaveLlmConfig: () => void;
  onCloseLlmConfig: () => void;
  onViewModeChange: (mode: "document" | "preview" | "outline") => void;
  onZoomChange: (zoom: number) => void;
  wordCount: (text: string) => number;
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
    onRightSidebarCollapsedChange,
    expandedFolders,
    onExpandedFoldersChange,
    contextFiles,
    selectedContextPaths,
    onToggleContextFile,
    showLlmConfig,
    llmConfigForm,
    onLlmConfigFormChange,
    llmSuggestion,
    llmPrompt,
    onLlmPromptChange,
    llmLoading,
    viewMode,
    zoomLevel,
    status,
    exportStatus,
    error,
    assistantPromptRef,
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
    onRequestLlm,
    onAcceptLlmSuggestion,
    onUpdateLlmSuggestion,
    onRejectLlmSuggestion,
    onOpenLlmConfig,
    onSaveLlmConfig,
    onCloseLlmConfig,
    onViewModeChange,
    onZoomChange,
    wordCount,
  } = props;

  const contextChip = currentDoc
    ? `context/brief.md · ${currentDoc}`
    : "context/brief.md · this document";

  const handleSave = () => onSaveDocument(docContent);

  return (
    <main
      className="app app-with-project"
      style={
        {
          "--left-sidebar-width": `${leftSidebarWidth}px`,
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
        wordCount={wordCount(docContent)}
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
      />
      <RightPanel
        collapsed={rightSidebarCollapsed}
        onToggleCollapse={() => onRightSidebarCollapsedChange(!rightSidebarCollapsed)}
        contextChip={contextChip}
        contextFiles={contextFiles}
        selectedContextPaths={selectedContextPaths}
        onToggleContextFile={onToggleContextFile}
        showLlmConfig={showLlmConfig}
        llmConfigForm={llmConfigForm}
        onLlmConfigFormChange={onLlmConfigFormChange}
        onSaveLlmConfig={onSaveLlmConfig}
        onCloseLlmConfig={onCloseLlmConfig}
        llmSuggestion={llmSuggestion}
        onUpdateLlmSuggestion={onUpdateLlmSuggestion}
        onAcceptLlmSuggestion={onAcceptLlmSuggestion}
        onRejectLlmSuggestion={onRejectLlmSuggestion}
        llmPrompt={llmPrompt}
        onLlmPromptChange={onLlmPromptChange}
        llmLoading={llmLoading}
        onRequestLlm={onRequestLlm}
        onOpenLlmConfig={onOpenLlmConfig}
        currentDoc={currentDoc}
        assistantPromptRef={assistantPromptRef}
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
        llmStatus={llmLoading ? "AI thinking…" : null}
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
