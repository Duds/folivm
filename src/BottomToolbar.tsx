import * as Select from "@radix-ui/react-select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

export type ViewMode = "document" | "preview" | "outline";

const ZOOM_OPTIONS = [
  { value: "50", label: "50%" },
  { value: "75", label: "75%" },
  { value: "100", label: "100%" },
  { value: "125", label: "125%" },
  { value: "150", label: "150%" },
  { value: "200", label: "200%" },
];

interface BottomToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  zoomLevel: number;
  onZoomChange: (level: number) => void;
  wordCount: number;
  charCount: number;
  pageCount: number;
  saveStatus: string;
  exportStatus: string | null;
  llmStatus: string | null;
  onPrintPreview: () => void;
  onExportPdf: () => void;
  hasProject: boolean;
  hasDocument: boolean;
}

export function BottomToolbar({
  viewMode,
  onViewModeChange,
  zoomLevel,
  onZoomChange,
  wordCount,
  charCount,
  pageCount,
  saveStatus,
  exportStatus,
  llmStatus,
  onPrintPreview,
  onExportPdf,
  hasProject,
  hasDocument,
}: BottomToolbarProps) {
  if (!hasProject) return null;

  const zoomValue = zoomLevel.toString();
  const showZoom = viewMode === "preview";

  return (
    <footer className="bottom-toolbar" role="toolbar" aria-label="Document toolbar">
      {/* Left — View mode toggle */}
      <div className="toolbar-section toolbar-left">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(v: string) => v && onViewModeChange(v as ViewMode)}
          aria-label="View mode"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="document" aria-label="Document view">
                Document
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Document view</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem value="preview" aria-label="Print preview">
                Print Preview
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Print preview</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="outline"
                disabled
                aria-label="Outline view (Phase 1)"
              >
                Outline
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Outline view (Phase 1)</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>

      {/* Centre-left — Zoom controls */}
      {showZoom && (
        <div className="toolbar-section toolbar-centre-left">
          <Select.Root
            value={zoomValue}
            onValueChange={(v) => onZoomChange(parseInt(v, 10) || 100)}
          >
            <Select.Trigger className="toolbar-zoom-trigger">
              <Select.Value />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="radix-select-content toolbar-zoom-content">
                <Select.Viewport>
                  {ZOOM_OPTIONS.map((opt) => (
                    <Select.Item
                      key={opt.value}
                      value={opt.value}
                      className="radix-select-item"
                    >
                      <Select.ItemText>{opt.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="toolbar-zoom-btn"
                onClick={() => onZoomChange(Math.max(50, zoomLevel - 25))}
                aria-label="Zoom out"
              >
                −
              </button>
            </TooltipTrigger>
            <TooltipContent>Zoom out</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="toolbar-zoom-btn"
                onClick={() => onZoomChange(Math.min(200, zoomLevel + 25))}
                aria-label="Zoom in"
              >
                +
              </button>
            </TooltipTrigger>
            <TooltipContent>Zoom in</TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Centre — Document statistics */}
      <div className="toolbar-section toolbar-centre">
        <div className="doc-stats">
          {hasDocument ? (
            <>
              <span>{wordCount} words</span>
              <span>{charCount.toLocaleString()} chars</span>
              <span>~{pageCount} pages</span>
            </>
          ) : (
            <span>—</span>
          )}
        </div>
      </div>

      {/* Centre-right — Status indicators */}
      <div className="toolbar-section toolbar-centre-right">
        {exportStatus && (
          <span className="status-indicator active">{exportStatus}</span>
        )}
        {llmStatus && (
          <span className="status-indicator active">{llmStatus}</span>
        )}
        {!exportStatus && !llmStatus && (
          <span
            className={`status-indicator ${saveStatus ? "active" : ""}`}
            title={saveStatus || "Status"}
          >
            {saveStatus || (hasDocument ? "—" : "")}
          </span>
        )}
      </div>

      {/* Right — Quick actions */}
      <div className="toolbar-section toolbar-right">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="quick-action-btn"
              onClick={onPrintPreview}
              disabled={!hasDocument}
              aria-label="Print preview"
            >
              Preview
            </button>
          </TooltipTrigger>
          <TooltipContent>Print preview</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="quick-action-btn"
              onClick={onExportPdf}
              disabled={!hasDocument}
              aria-label="Export PDF"
            >
              Export PDF
            </button>
          </TooltipTrigger>
          <TooltipContent>Export PDF</TooltipContent>
        </Tooltip>
      </div>
    </footer>
  );
}
