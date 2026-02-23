import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  FilePlus,
  FileText,
  Folder,
  FolderOpen,
  FolderPlus,
  History,
  Puzzle,
  RotateCw,
  Search,
} from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { SearchPanel } from "./SearchPanel";
import type { SearchMatch } from "@/types";

interface LeftSidebarProps {
  projectPath: string;
  groupedDocs: Map<string, string[]> | null;
  currentDoc: string | null;
  onLoadDocument: (path: string) => void;
  onCreateDocument: () => void;
  onRefreshExplorer: () => void;
  onMoveDocument: (fromRelativePath: string, toFolder: string) => void;
  expandedFolders: Set<string>;
  onExpandedFoldersChange: (folders: Set<string>) => void;
  collapsed: boolean;
  wordCount: number;
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
  onReplaceOne: () => void;
  onReplaceAll: () => void;
  projectSearchResults: SearchMatch[];
  projectSearchLoading: boolean;
  onRunProjectSearch: () => void;
  onOpenProjectResult: (path: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function LeftSidebar({
  projectPath,
  groupedDocs,
  currentDoc,
  onLoadDocument,
  onCreateDocument,
  onRefreshExplorer,
  onMoveDocument,
  expandedFolders,
  onExpandedFoldersChange,
  collapsed,
  wordCount,
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
  onReplaceOne,
  onReplaceAll,
  projectSearchResults,
  projectSearchLoading,
  onRunProjectSearch,
  onOpenProjectResult,
  searchInputRef,
}: LeftSidebarProps) {
  const projectName = projectPath.split("/").filter(Boolean).pop() || projectPath;
  const allExpanded = expandedFolders.size >= 4;
  const handleCollapseAll = () => onExpandedFoldersChange(new Set());
  const handleExpandAll = () =>
    onExpandedFoldersChange(
      new Set(["inputs", "working", "context", "deliverables"])
    );

  return (
    <aside
      className={cn("sidebar sidebar-left", collapsed && "collapsed")}
    >
      <div className="sidebar-panel">
        <div className="sidebar-content">
          <div className="sidebar-icon-bar">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "btn btn-ghost btn-icon sidebar-icon-btn",
                    leftSidebarView === "project" && "active"
                  )}
                  aria-label="Project"
                  title="Project"
                  onClick={() => onLeftSidebarViewChange("project")}
                >
                  <FolderOpen size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Project</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "btn btn-ghost btn-icon sidebar-icon-btn",
                    leftSidebarView === "search" && "active"
                  )}
                  aria-label="Search"
                  title="Search (⌘⇧F)"
                  onClick={() => onLeftSidebarViewChange("search")}
                >
                  <Search size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Search (⌘⇧F)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="btn btn-ghost btn-icon sidebar-icon-btn"
                  aria-label="Versions"
                  title="Versions"
                  disabled
                >
                  <History size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Compare versions — Coming soon</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="btn btn-ghost btn-icon sidebar-icon-btn"
                  aria-label="Extensions"
                  title="Extensions"
                  disabled
                >
                  <Puzzle size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Extensions — Coming soon</TooltipContent>
            </Tooltip>
          </div>
          {leftSidebarView === "search" ? (
            <SearchPanel
              searchQuery={searchQuery}
              onSearchQueryChange={onSearchQueryChange}
              replaceQuery={replaceQuery}
              onReplaceQueryChange={onReplaceQueryChange}
              scope={searchScope}
              onScopeChange={onSearchScopeChange}
              caseSensitive={searchCaseSensitive}
              onCaseSensitiveChange={onSearchCaseSensitiveChange}
              documentMatches={documentMatches}
              currentDocumentMatchIndex={currentDocumentMatchIndex}
              onCurrentDocumentMatchIndexChange={onCurrentDocumentMatchIndexChange}
              onReplaceOne={onReplaceOne}
              onReplaceAll={onReplaceAll}
              projectResults={projectSearchResults}
              projectSearchLoading={projectSearchLoading}
              onRunProjectSearch={onRunProjectSearch}
              onOpenProjectResult={onOpenProjectResult}
              hasProject={!!projectPath}
              hasDocument={!!currentDoc}
              searchInputRef={searchInputRef}
            />
          ) : (
            <>
          <div className="explorer-root">
            <div className="explorer-root-header">
              <div className="explorer-root-title">
                <FolderOpen size={16} className="explorer-root-icon" />
                <span>{projectName}</span>
              </div>
              <div className="explorer-root-actions">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="explorer-action-btn"
                      aria-label="New folder"
                      disabled
                    >
                      <FolderPlus size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>New folder — Coming soon</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="explorer-action-btn"
                      aria-label="New document"
                      onClick={onCreateDocument}
                    >
                      <FilePlus size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>New document</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="explorer-action-btn"
                      aria-label="Refresh explorer"
                      onClick={onRefreshExplorer}
                    >
                      <RotateCw size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="explorer-action-btn"
                      aria-label={allExpanded ? "Collapse all" : "Expand all"}
                      onClick={allExpanded ? handleCollapseAll : handleExpandAll}
                    >
                      <ChevronsUpDown size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {allExpanded ? "Collapse all" : "Expand all"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <ScrollArea.Root className="folder-list">
            <ScrollArea.Viewport>
              <div className="folder-list-inner">
                {groupedDocs &&
                  Array.from(groupedDocs.entries())
                    .filter(([folder]) => folder !== "other")
                    .map(([folder, docs]) => {
                      const isOpen = expandedFolders.has(folder);
                      return (
                        <Collapsible.Root
                          key={folder}
                          className="folder-section"
                          open={isOpen}
                          onOpenChange={(open) => {
                            const next = new Set(expandedFolders);
                            if (open) next.add(folder);
                            else next.delete(folder);
                            onExpandedFoldersChange(next);
                          }}
                        >
                          <div
                          className="folder-header-drop-zone"
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.dataTransfer.dropEffect = "move";
                            e.currentTarget.classList.add(
                              "folder-header--drop-target"
                            );
                          }}
                              onDragLeave={(e) => {
                                if (
                                  e.relatedTarget &&
                                  e.currentTarget.contains(
                                    e.relatedTarget as Node
                                  )
                                )
                                  return;
                                e.currentTarget.classList.remove(
                                  "folder-header--drop-target"
                                );
                              }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.currentTarget.classList.remove(
                              "folder-header--drop-target"
                            );
                            const docPath = e.dataTransfer.getData(
                              "text/plain"
                            );
                            if (!docPath) return;
                            const currentFolder = docPath.split("/")[0];
                            if (currentFolder === folder) return;
                            onMoveDocument(docPath, folder);
                          }}
                        >
                          <Collapsible.Trigger className="folder-header" asChild>
                            <button type="button">
                              <span className="folder-chevron">
                                {isOpen ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </span>
                              <span className="folder-icon">
                                {isOpen ? (
                                  <FolderOpen size={16} />
                                ) : (
                                  <Folder size={16} />
                                )}
                              </span>
                              <span>{folder}</span>
                            </button>
                          </Collapsible.Trigger>
                        </div>
                          <Collapsible.Content>
                            <ul className="document-list">
                              {docs.length === 0 ? (
                                <li className="empty">—</li>
                              ) : (
                                docs.map((doc) => (
                                  <li
                                    key={doc}
                                    className={cn(
                                      "sidebar-item document-item",
                                      currentDoc === doc && "active"
                                    )}
                                    draggable
                                    onDragStart={(e) => {
                                      e.stopPropagation();
                                      e.dataTransfer.effectAllowed = "move";
                                      e.dataTransfer.setData("text/plain", doc);
                                      e.dataTransfer.setData(
                                        "application/x-folivm-document",
                                        doc
                                      );
                                    }}
                                    onClick={() => onLoadDocument(doc)}
                                  >
                                    <span className="document-icon">
                                      <FileText size={16} />
                                    </span>
                                    {doc.replace(`${folder}/`, "")}
                                  </li>
                                ))
                              )}
                            </ul>
                          </Collapsible.Content>
                        </Collapsible.Root>
                      );
                    })}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical" className="radix-scrollbar">
              <ScrollArea.Thumb className="radix-scrollbar-thumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
            </>
          )}
          <div className="sidebar-footer">
            <span className="word-count">
              {currentDoc ? `${wordCount} words` : "—"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
