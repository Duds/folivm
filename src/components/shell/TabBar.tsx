import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabInfo {
  id: string;
  path: string;
  unsaved: boolean;
}

interface TabBarProps {
  tabs: TabInfo[];
  activeTabId: string | null;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onDuplicateTab?: (id: string) => void;
}

function getTabDisplayLabel(tab: TabInfo, tabs: TabInfo[]): string {
  const name = tab.path.split("/").pop() ?? tab.path;
  const samePathTabs = tabs.filter((t) => t.path === tab.path);
  if (samePathTabs.length <= 1) return name;
  const idx = samePathTabs.findIndex((t) => t.id === tab.id);
  return `${name} (${idx + 1})`;
}

export function TabBar({
  tabs,
  activeTabId,
  onSwitchTab,
  onCloseTab,
}: TabBarProps) {
  if (tabs.length === 0) return null;

  return (
    <div
      className="tab-bar"
      role="tablist"
      aria-label="Open documents"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const displayLabel = getTabDisplayLabel(tab, tabs);

        return (
          <div
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`${displayLabel}${tab.unsaved ? " (unsaved)" : ""}`}
            className={cn("tab-bar-item", isActive && "active")}
            data-unsaved={tab.unsaved || undefined}
          >
            <button
              type="button"
              className="tab-bar-item-label"
              onClick={() => onSwitchTab(tab.id)}
              title={tab.unsaved ? "Unsaved changes" : undefined}
            >
              <span className="tab-bar-item-text">{displayLabel}</span>
              {tab.unsaved && (
                <span
                  className="tab-bar-item-dot"
                  aria-hidden
                  title="Unsaved changes"
                />
              )}
            </button>
            <button
              type="button"
              className="tab-bar-item-close"
              onClick={(e) => onCloseTab(tab.id, e)}
              aria-label={`Close ${displayLabel}`}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
