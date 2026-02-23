import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { SearchMatch } from "@/types";

interface SearchPanelProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  replaceQuery: string;
  onReplaceQueryChange: (value: string) => void;
  scope: "document" | "project";
  onScopeChange: (scope: "document" | "project") => void;
  caseSensitive: boolean;
  onCaseSensitiveChange: (value: boolean) => void;
  documentMatches: { start: number; end: number }[];
  currentDocumentMatchIndex: number;
  onCurrentDocumentMatchIndexChange: (index: number) => void;
  onReplaceOne: () => void;
  onReplaceAll: () => void;
  projectResults: SearchMatch[];
  projectSearchLoading: boolean;
  onRunProjectSearch: () => void;
  onOpenProjectResult: (path: string) => void;
  hasProject: boolean;
  hasDocument: boolean;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchPanel({
  searchQuery,
  onSearchQueryChange,
  replaceQuery,
  onReplaceQueryChange,
  scope,
  onScopeChange,
  caseSensitive,
  onCaseSensitiveChange,
  documentMatches,
  currentDocumentMatchIndex,
  onCurrentDocumentMatchIndexChange,
  onReplaceOne,
  onReplaceAll,
  projectResults,
  projectSearchLoading,
  onRunProjectSearch,
  onOpenProjectResult,
  hasProject,
  hasDocument,
  searchInputRef,
}: SearchPanelProps) {
  const [replaceExpanded, setReplaceExpanded] = useState(false);

  const matchCount = documentMatches.length;
  const canReplace = hasDocument && matchCount > 0 && replaceQuery !== undefined;

  return (
    <div className="search-panel">
      <div className="search-panel-section">
        <div className="form-group search-form-row">
          <Label htmlFor="search-query" className="sr-only">
            Find
          </Label>
          <input
            ref={searchInputRef}
            id="search-query"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Find"
            className="search-input"
            aria-label="Find"
          />
        </div>
        <div className="search-panel-options">
          <label className="search-option-checkbox">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => onCaseSensitiveChange(e.target.checked)}
            />
            <span>Match case</span>
          </label>
          <div className="search-scope-toggle" role="group" aria-label="Search scope">
            <button
              type="button"
              className={cn("scope-btn", scope === "document" && "active")}
              onClick={() => onScopeChange("document")}
              disabled={!hasDocument}
              title="Search in current document"
            >
              Document
            </button>
            <button
              type="button"
              className={cn("scope-btn", scope === "project" && "active")}
              onClick={() => onScopeChange("project")}
              disabled={!hasProject}
              title="Search in project"
            >
              Project
            </button>
          </div>
        </div>
      </div>

      <div className="search-panel-section search-replace-section">
        <button
          type="button"
          className="search-expand-btn"
          onClick={() => setReplaceExpanded((e) => !e)}
          aria-expanded={replaceExpanded}
        >
          {replaceExpanded ? (
            <ChevronUp size={14} aria-hidden />
          ) : (
            <ChevronDown size={14} aria-hidden />
          )}
          <span>Replace</span>
        </button>
        {replaceExpanded && (
          <div className="form-group search-form-row replace-row">
            <Label htmlFor="search-replace" className="sr-only">
              Replace with
            </Label>
            <input
              id="search-replace"
              type="text"
              value={replaceQuery}
              onChange={(e) => onReplaceQueryChange(e.target.value)}
              placeholder="Replace with"
              className="search-input"
              aria-label="Replace with"
            />
          </div>
        )}
      </div>

      {scope === "document" && (
        <div className="search-panel-section search-actions">
          <span className="search-match-count">
            {searchQuery.trim()
              ? matchCount === 0
                ? "No matches"
                : `${currentDocumentMatchIndex + 1} of ${matchCount}`
              : "—"}
          </span>
          <div className="search-action-buttons">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={matchCount === 0 || currentDocumentMatchIndex <= 0}
              onClick={() =>
                onCurrentDocumentMatchIndexChange(
                  Math.max(0, currentDocumentMatchIndex - 1)
                )
              }
            >
              Prev
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={
                matchCount === 0 ||
                currentDocumentMatchIndex >= matchCount - 1
              }
              onClick={() =>
                onCurrentDocumentMatchIndexChange(
                  Math.min(matchCount - 1, currentDocumentMatchIndex + 1)
                )
              }
            >
              Next
            </button>
            {replaceExpanded && (
              <>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={!canReplace}
                  onClick={onReplaceOne}
                >
                  Replace
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={!canReplace}
                  onClick={() => onReplaceAll()}
                >
                  Replace all
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {scope === "project" && (
        <div className="search-panel-section search-actions">
          <button
            type="button"
            className="btn btn-sm"
            disabled={!hasProject || !searchQuery.trim()}
            onClick={onRunProjectSearch}
          >
            {projectSearchLoading ? "Searching…" : "Search in project"}
          </button>
        </div>
      )}

      {scope === "project" && projectResults.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            {projectResults.length} result{projectResults.length !== 1 ? "s" : ""}
          </div>
          <ul className="search-results-list">
            {projectResults.map((m, i) => (
              <li key={`${m.path}-${m.line}-${i}`}>
                <button
                  type="button"
                  className="search-result-item"
                  onClick={() => onOpenProjectResult(m.path)}
                >
                  <span className="search-result-path">{m.path}</span>
                  <span className="search-result-line">L{m.line}</span>
                  <span className="search-result-snippet" title={m.snippet}>
                    {m.snippet}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
