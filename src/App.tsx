import { AppShell } from "@/components/shell/AppShell";
import { WelcomeScreen } from "@/components/shell/WelcomeScreen";
import { WindowChrome } from "@/components/shell/WindowChrome";
import { NewDocumentModal } from "@/components/modals/NewDocumentModal";
import { ReferenceDocxModal } from "@/components/modals/ReferenceDocxModal";
import { useTheme } from "./ThemeProvider";
import { useFolivmApp } from "./hooks/useFolivmApp";
import { useMenuActions } from "./hooks/useMenuActions";
import "./App.css";

function App() {
  const { mode, brand, setMode, setBrand } = useTheme();
  const folivm = useFolivmApp();

  useMenuActions({
    createProject: folivm.createProject,
    openProject: folivm.openProject,
    createDocument: folivm.createDocument,
    saveDocument: () => folivm.saveDocument(folivm.docContent),
    exportPdf: folivm.exportPdf,
    exportDocx: folivm.exportDocx,
    toggleLeftSidebar: () => folivm.setLeftSidebarCollapsed(!folivm.leftSidebarCollapsed),
    toggleRightSidebar: () => folivm.setRightSidebarCollapsed(!folivm.rightSidebarCollapsed),
    setViewMode: folivm.setViewMode,
    setZoomLevel: folivm.setZoomLevel,
    setLeftSidebarView: folivm.setLeftSidebarView,
  });

  return (
    <div className="app-root">
      <WindowChrome
        hasProject={!!folivm.project}
        leftDrawerOpen={!folivm.leftSidebarCollapsed}
        onLeftDrawerToggle={() =>
          folivm.setLeftSidebarCollapsed(!folivm.leftSidebarCollapsed)
        }
        rightDrawerOpen={!folivm.rightSidebarCollapsed}
        onRightDrawerToggle={() =>
          folivm.setRightSidebarCollapsed(!folivm.rightSidebarCollapsed)
        }
        autosaveEnabled={folivm.autosaveEnabled}
        onAutosaveChange={folivm.setAutosaveEnabled}
        mode={mode}
        brand={brand}
        onModeChange={setMode}
        onBrandChange={setBrand}
        onOpenReferenceDocxModal={folivm.openReferenceDocxModal}
      />
      {!folivm.project ? (
        <WelcomeScreen
        onCreateProject={folivm.createProject}
        onOpenProject={folivm.openProject}
        error={folivm.error}
          status={folivm.status}
        />
      ) : (
        <>
          <AppShell
        project={folivm.project}
        currentDoc={folivm.currentDoc}
        docContent={folivm.docContent}
        onDocContentChange={folivm.setDocContent}
        groupedDocs={folivm.groupedDocs!}
        leftSidebarCollapsed={folivm.leftSidebarCollapsed}
        leftSidebarWidth={folivm.leftSidebarWidth}
        onLeftSidebarWidthChange={folivm.setLeftSidebarWidth}
        rightSidebarCollapsed={folivm.rightSidebarCollapsed}
        onRightSidebarCollapsedChange={folivm.setRightSidebarCollapsed}
        expandedFolders={folivm.expandedFolders}
        onExpandedFoldersChange={folivm.setExpandedFolders}
        contextFiles={folivm.contextFiles}
        selectedContextPaths={folivm.selectedContextPaths}
        onToggleContextFile={folivm.toggleContextFile}
        showLlmConfig={folivm.showLlmConfig}
        llmConfigForm={folivm.llmConfigForm}
        onLlmConfigFormChange={folivm.setLlmConfigForm}
        llmSuggestion={folivm.llmSuggestion}
        llmPrompt={folivm.llmPrompt}
        onLlmPromptChange={folivm.setLlmPrompt}
        llmLoading={folivm.llmLoading}
        viewMode={folivm.viewMode}
        zoomLevel={folivm.zoomLevel}
        status={folivm.status}
        exportStatus={folivm.exportStatus}
        error={folivm.error}
        assistantPromptRef={folivm.assistantPromptRef}
        onLoadDocument={folivm.loadDocument}
        onCreateDocument={folivm.createDocument}
        onRefreshExplorer={folivm.refreshExplorer}
        onMoveDocument={folivm.moveDocument}
        leftSidebarView={folivm.leftSidebarView}
        onLeftSidebarViewChange={folivm.setLeftSidebarView}
        searchQuery={folivm.searchQuery}
        onSearchQueryChange={folivm.setSearchQuery}
        replaceQuery={folivm.replaceQuery}
        onReplaceQueryChange={folivm.setReplaceQuery}
        searchScope={folivm.searchScope}
        onSearchScopeChange={folivm.setSearchScope}
        searchCaseSensitive={folivm.searchCaseSensitive}
        onSearchCaseSensitiveChange={folivm.setSearchCaseSensitive}
        documentMatches={folivm.documentMatches}
        currentDocumentMatchIndex={folivm.currentDocumentMatchIndex}
        onCurrentDocumentMatchIndexChange={folivm.setCurrentDocumentMatchIndex}
        replaceInDocument={folivm.replaceInDocument}
        projectSearchResults={folivm.projectSearchResults}
        projectSearchLoading={folivm.projectSearchLoading}
        onRunProjectSearch={folivm.runProjectSearch}
        onOpenProjectResult={folivm.openSearchResult}
        searchInputRef={folivm.searchInputRef}
        onSaveDocument={folivm.saveDocument}
        onExportPdf={folivm.exportPdf}
        onRequestLlm={folivm.requestLlm}
        onAcceptLlmSuggestion={folivm.acceptLlmSuggestion}
        onUpdateLlmSuggestion={folivm.updateLlmSuggestion}
        onRejectLlmSuggestion={folivm.rejectLlmSuggestion}
        onOpenLlmConfig={folivm.openLlmConfig}
        onSaveLlmConfig={folivm.saveLlmConfig}
        onCloseLlmConfig={() => folivm.setShowLlmConfig(false)}
        onViewModeChange={folivm.setViewMode}
        onZoomChange={folivm.setZoomLevel}
        wordCount={folivm.wordCount}
      />

      <NewDocumentModal
        open={folivm.showNewDocModal}
        onOpenChange={(open) => !open && folivm.cancelCreateDocument()}
        newDocName={folivm.newDocName}
        onNewDocNameChange={folivm.setNewDocName}
        onConfirm={folivm.confirmCreateDocument}
        onCancel={folivm.cancelCreateDocument}
      />

      <ReferenceDocxModal
        open={folivm.showReferenceDocxModal}
        onOpenChange={(open) => !open && folivm.setShowReferenceDocxModal(false)}
        referenceDocxPath={folivm.referenceDocxPath}
        onChoose={folivm.chooseReferenceDocx}
        onClear={folivm.clearReferenceDocx}
        onClose={() => folivm.setShowReferenceDocxModal(false)}
      />
        </>
      )}
    </div>
  );
}

export default App;
