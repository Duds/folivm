import { AppShell } from "@/components/shell/AppShell";
import { WelcomeScreen } from "@/components/shell/WelcomeScreen";
import { WindowChrome } from "@/components/shell/WindowChrome";
import { NewDocumentModal } from "@/components/modals/NewDocumentModal";
import { ReferenceDocxModal } from "@/components/modals/ReferenceDocxModal";
import { KeyboardShortcutsModal } from "@/components/modals/KeyboardShortcutsModal";
import { CloseTabModal } from "@/components/modals/CloseTabModal";
import { useFolivmApp } from "./hooks/useFolivmApp";
import { useMenuActions } from "./hooks/useMenuActions";
import "./App.css";

function App() {
  const folivm = useFolivmApp();

  useMenuActions({
    createProject: folivm.createProject,
    openProject: folivm.openProject,
    createDocument: folivm.createDocument,
    openDocument: () => folivm.setLeftSidebarView("project"),
    closeTab: folivm.closeActiveTab,
    saveDocument: () => folivm.saveDocument(folivm.docContent),
    exportPdf: folivm.exportPdf,
    exportDocx: folivm.exportDocx,
    toggleLeftSidebar: () => folivm.setLeftSidebarCollapsed(!folivm.leftSidebarCollapsed),
    toggleRightSidebar: () => folivm.setRightSidebarCollapsed(!folivm.rightSidebarCollapsed),
    setViewMode: folivm.setViewMode,
    setZoomLevel: folivm.setZoomLevel,
    setLeftSidebarView: folivm.setLeftSidebarView,
    openKeyboardShortcuts: folivm.openKeyboardShortcutsModal,
    openDocumentation: folivm.openDocumentation,
    openSupport: folivm.openSupport,
    toggleNonPrintingChars: folivm.toggleShowNonPrintingChars,
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
        onOpenReferenceDocxModal={folivm.openReferenceDocxModal}
        rulerUnits={folivm.rulerUnits}
        onRulerUnitsChange={folivm.setRulerUnits}
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
        rightSidebarWidth={folivm.rightSidebarWidth}
        onRightSidebarWidthChange={folivm.setRightSidebarWidth}
        expandedFolders={folivm.expandedFolders}
        onExpandedFoldersChange={folivm.setExpandedFolders}
        viewMode={folivm.viewMode}
        zoomLevel={folivm.zoomLevel}
        showNonPrintingChars={folivm.showNonPrintingChars}
        rulerUnits={folivm.rulerUnits}
        status={folivm.status}
        exportStatus={folivm.exportStatus}
        error={folivm.error}
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
        onViewModeChange={folivm.setViewMode}
        onZoomChange={folivm.setZoomLevel}
        wordCount={folivm.wordCount}
        openTabs={folivm.openTabs}
        activeTabId={folivm.activeTabId}
        onSwitchTab={folivm.switchTab}
        onCloseTab={folivm.closeTab}
        selectedStructureNode={folivm.selectedStructureNode}
        onSelectStructureNode={(nodeId) =>
          folivm.handleSelectionChange(nodeId, false)
        }
        onSelectionChange={folivm.handleSelectionChange}
        selectionHasCharacterRange={folivm.selectionHasCharacterRange}
        editorCommandsRef={folivm.editorCommandsRef}
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

      <KeyboardShortcutsModal
        open={folivm.showKeyboardShortcutsModal}
        onOpenChange={folivm.setShowKeyboardShortcutsModal}
      />

      <CloseTabModal
        open={folivm.showCloseTabModal}
        fileName={folivm.pendingCloseTabFileName}
        onChoice={folivm.handleCloseTabChoice}
      />
    </div>
  );
}

export default App;
