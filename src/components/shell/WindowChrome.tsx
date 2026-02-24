import { useEffect, useState } from "react";
import { platform } from "@tauri-apps/plugin-os";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  Settings,
  PanelLeftOpen,
  PanelLeftClose,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/DropdownMenu";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

const CHROME_HEIGHT = 32;
const APP_NAME = "Folivm";

interface WindowChromeProps {
  /** Whether a project is open (enables drawer toggles, autosave) */
  hasProject?: boolean;
  leftDrawerOpen?: boolean;
  onLeftDrawerToggle?: () => void;
  rightDrawerOpen?: boolean;
  onRightDrawerToggle?: () => void;
  autosaveEnabled?: boolean;
  onAutosaveChange?: (enabled: boolean) => void;
  onOpenReferenceDocxModal?: () => void;
  /** Ruler units (EP-114) */
  rulerUnits?: "mm" | "cm" | "inch";
  onRulerUnitsChange?: (units: "mm" | "cm" | "inch") => void;
}

/**
 * Custom window chrome with platform-aware layout.
 * - macOS: traffic lights on the left
 * - Windows/Linux: minimise, maximise, close on the right
 * - App name centred, autosave left, drawer toggles and settings right
 */
export function WindowChrome({
  hasProject = false,
  leftDrawerOpen = true,
  onLeftDrawerToggle,
  rightDrawerOpen = true,
  onRightDrawerToggle,
  autosaveEnabled = false,
  onAutosaveChange,
  onOpenReferenceDocxModal,
  rulerUnits = "mm",
  onRulerUnitsChange,
}: WindowChromeProps) {
  const [isTauri, setIsTauri] = useState(false);
  const [platformName, setPlatformName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Tauri injects __TAURI_INTERNALS__ (always) or __TAURI__ (if withGlobalTauri)
    const inTauri =
      "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
    if (!inTauri) return;
    try {
      setIsTauri(true);
      setPlatformName(platform());
    } catch {
      // OS plugin not ready; assume macOS for layout
      setIsTauri(true);
      setPlatformName("macos");
    }
  }, []);

  if (!isTauri || !platformName) {
    return null;
  }

  const isMac = platformName === "macos";

  const handleMinimize = () => {
    getCurrentWindow().minimize();
  };

  const handleMaximize = () => {
    getCurrentWindow().toggleMaximize();
  };

  const handleClose = () => {
    getCurrentWindow().close();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (e.button === 0 && e.detail === 2) {
      handleMaximize();
    }
  };

  const winControls = (
    <div
      className={`window-chrome-controls window-chrome-controls--${isMac ? "mac" : "win"}`}
      role="group"
      aria-label="Window controls"
    >
      {isMac ? (
        <>
          <button
            type="button"
            className="window-chrome-btn window-chrome-btn--close"
            onClick={handleClose}
            title="Close"
            aria-label="Close"
          />
          <button
            type="button"
            className="window-chrome-btn window-chrome-btn--minimise"
            onClick={handleMinimize}
            title="Minimise"
            aria-label="Minimise"
          />
          <button
            type="button"
            className="window-chrome-btn window-chrome-btn--maximise"
            onClick={handleMaximize}
            title="Maximise"
            aria-label="Maximise"
          />
        </>
      ) : (
        <>
          <button
            type="button"
            className="window-chrome-btn window-chrome-btn--icon"
            onClick={handleMinimize}
            title="Minimise"
            aria-label="Minimise"
          >
            <MinimiseIcon />
          </button>
          <button
            type="button"
            className="window-chrome-btn window-chrome-btn--icon"
            onClick={handleMaximize}
            title="Maximise"
            aria-label="Maximise"
          >
            <MaximiseIcon />
          </button>
          <button
            type="button"
            className="window-chrome-btn window-chrome-btn--icon window-chrome-btn--close-win"
            onClick={handleClose}
            title="Close"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div
      className="window-chrome"
      style={{ height: CHROME_HEIGHT, minHeight: CHROME_HEIGHT }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Left: traffic lights (Mac) */}
      {isMac ? winControls : null}

      {/* Left: autosave toggle */}
      {hasProject && onAutosaveChange && (
        <div className="window-chrome-left-actions">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="window-chrome-autosave">
                <Switch
                  id="chrome-autosave"
                  checked={autosaveEnabled}
                  onCheckedChange={onAutosaveChange}
                />
                <Label
                  htmlFor="chrome-autosave"
                  className="window-chrome-autosave-label"
                >
                  Auto save
                </Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>Autosave</TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Centre: app name — draggable */}
      <div className="window-chrome-centre" data-tauri-drag-region>
        <span className="window-chrome-app-name">{APP_NAME}</span>
      </div>

      {/* Right: drawer toggles, settings, win controls (Win/Linux) */}
      <div className="window-chrome-right-actions">
        {hasProject && onLeftDrawerToggle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="window-chrome-btn window-chrome-btn--app"
                onClick={onLeftDrawerToggle}
                aria-label={leftDrawerOpen ? "Close left panel" : "Open left panel"}
              >
                {leftDrawerOpen ? (
                  <PanelLeftClose size={14} strokeWidth={2} />
                ) : (
                  <PanelLeftOpen size={14} strokeWidth={2} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>Toggle left panel</TooltipContent>
          </Tooltip>
        )}
        {hasProject && onRightDrawerToggle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="window-chrome-btn window-chrome-btn--app"
                onClick={onRightDrawerToggle}
                aria-label={
                  rightDrawerOpen ? "Close right panel" : "Open right panel"
                }
              >
                {rightDrawerOpen ? (
                  <PanelRightClose size={14} strokeWidth={2} />
                ) : (
                  <PanelRightOpen size={14} strokeWidth={2} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>Toggle right panel</TooltipContent>
          </Tooltip>
        )}
        {(onRulerUnitsChange || onOpenReferenceDocxModal) && (
          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="window-chrome-btn window-chrome-btn--app"
                    aria-label="Settings"
                  >
                    <Settings size={14} strokeWidth={2} />
                  </button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <DropdownMenuContent align="end">
                {onRulerUnitsChange && (
                  <>
                    <DropdownMenuLabel>Ruler units</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={rulerUnits}
                      onValueChange={(v) =>
                        onRulerUnitsChange(v as "mm" | "cm" | "inch")
                      }
                    >
                      <DropdownMenuRadioItem value="mm">
                        Millimetres (mm)
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="cm">
                        Centimetres (cm)
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="inch">
                        Inches (in)
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                  </>
                )}
                {onOpenReferenceDocxModal && (
                  <DropdownMenuItem onClick={onOpenReferenceDocxModal}>
                    Reference DOCX
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Right: window controls (Windows/Linux) */}
      {!isMac ? winControls : null}
    </div>
  );
}

function MinimiseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function MaximiseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="16" rx="1" ry="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
