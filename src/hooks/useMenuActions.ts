/**
 * Listens for native menu actions and dispatches to app handlers.
 */
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { MENU_ACTION_EVENT } from "@/setupNativeMenu";

export interface MenuActionHandlers {
  createProject: () => void;
  openProject: () => void;
  createDocument: () => void;
  saveDocument: () => void;
  exportPdf: () => void;
  exportDocx: () => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setViewMode: (mode: "document" | "preview" | "outline") => void;
  setZoomLevel: (level: number | ((prev: number) => number)) => void;
  setLeftSidebarView: (view: "project" | "search") => void;
}

interface MenuActionPayload {
  action: string;
}

export function useMenuActions(handlers: MenuActionHandlers): void {
  useEffect(() => {
    const unlisten = listen<MenuActionPayload>(MENU_ACTION_EVENT, (event) => {
      const { action } = event.payload ?? {};
      switch (action) {
        case "new-project":
          handlers.createProject();
          break;
        case "open-project":
          handlers.openProject();
          break;
        case "new-document":
          handlers.createDocument();
          break;
        case "save":
          handlers.saveDocument();
          break;
        case "export-pdf":
          handlers.exportPdf();
          break;
        case "export-docx":
          handlers.exportDocx();
          break;
        case "toggle-left-sidebar":
          handlers.toggleLeftSidebar();
          break;
        case "toggle-right-sidebar":
          handlers.toggleRightSidebar();
          break;
        case "view-document":
          handlers.setViewMode("document");
          break;
        case "view-preview":
          handlers.setViewMode("preview");
          break;
        case "view-outline":
          handlers.setViewMode("outline");
          break;
        case "zoom-in":
          handlers.setZoomLevel((prev) => Math.min(prev + 10, 200));
          break;
        case "zoom-out":
          handlers.setZoomLevel((prev) => Math.max(prev - 10, 50));
          break;
        case "zoom-reset":
          handlers.setZoomLevel(100);
          break;
        case "find":
          handlers.setLeftSidebarView("search");
          break;
        case "keyboard-shortcuts":
          alert(
            "Keyboard shortcuts:\n" +
              "⌘⇧N  New Window\n" +
              "⌘S   Save\n" +
              "⌘⇧F  Search"
          );
          break;
      }
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [handlers]);
}
