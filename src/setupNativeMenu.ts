/**
 * Setup native application menu: Folivm, File, Edit, View, Window, Help.
 * Menu item actions emit events; App listens and calls the appropriate handlers.
 *
 * - macOS: App-wide menu (setAsAppMenu)
 * - Windows/Linux: Per-window menu (setAsWindowMenu)
 */
import { Menu, PredefinedMenuItem, Submenu } from "@tauri-apps/api/menu";
import { emit } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { platform } from "@tauri-apps/plugin-os";

const MENU_EVENT = "menu:action" as const;

let windowCounter = 0;

function createNewWindow() {
  windowCounter += 1;
  const label = `folivm-${windowCounter}`;
  const baseUrl = import.meta.env.DEV
    ? "http://localhost:1420/"
    : window.location.origin + "/";

  const webview = new WebviewWindow(label, {
    url: baseUrl,
    title: "Folivm",
    width: 800,
    height: 600,
    decorations: false,
  });

  webview.once("tauri://error", (e) => {
    console.error("Failed to create new window:", e);
  });
}

function menuAction(action: string) {
  emit(MENU_EVENT, { action });
}

export const MENU_ACTION_EVENT = MENU_EVENT;

export async function setupNativeMenu(): Promise<void> {
  const sep = () => PredefinedMenuItem.new({ item: "Separator" });

  // File
  const fileSubmenu = await Submenu.new({
    id: "file",
    text: "File",
    items: [
      { id: "new-project", text: "New Project", accelerator: "CmdOrCtrl+Shift+P", action: () => menuAction("new-project") },
      { id: "open-project", text: "Open Project...", accelerator: "CmdOrCtrl+O", action: () => menuAction("open-project") },
      await sep(),
      { id: "new-document", text: "New Document", accelerator: "CmdOrCtrl+N", action: () => menuAction("new-document") },
      { id: "open-document", text: "Open Document...", accelerator: "CmdOrCtrl+Shift+O", action: () => menuAction("open-document") },
      { id: "new-window", text: "New Window", accelerator: "CmdOrCtrl+Shift+N", action: () => createNewWindow() },
      await sep(),
      { id: "save", text: "Save", accelerator: "CmdOrCtrl+S", action: () => menuAction("save") },
      { id: "close-tab", text: "Close Tab", accelerator: "CmdOrCtrl+W", action: () => menuAction("close-tab") },
      await sep(),
      { id: "export-pdf", text: "Export PDF...", action: () => menuAction("export-pdf") },
      { id: "export-docx", text: "Export DOCX...", action: () => menuAction("export-docx") },
      await sep(),
      await PredefinedMenuItem.new({ item: "Quit" }),
    ],
  });

  // Edit
  const editCopy = await PredefinedMenuItem.new({ item: "Copy" });
  const editCut = await PredefinedMenuItem.new({ item: "Cut" });
  const editPaste = await PredefinedMenuItem.new({ item: "Paste" });
  const editSelectAll = await PredefinedMenuItem.new({ item: "SelectAll" });
  const editSubmenu = await Submenu.new({
    id: "edit",
    text: "Edit",
    items: [
      await PredefinedMenuItem.new({ item: "Undo" }),
      await PredefinedMenuItem.new({ item: "Redo" }),
      await sep(),
      editCut,
      editCopy,
      editPaste,
      await sep(),
      editSelectAll,
      await sep(),
      { id: "find", text: "Find...", accelerator: "CmdOrCtrl+Shift+F", action: () => menuAction("find") },
    ],
  });

  // View
  const viewSubmenu = await Submenu.new({
    id: "view",
    text: "View",
    items: [
      { id: "toggle-left", text: "Toggle Left Sidebar", action: () => menuAction("toggle-left-sidebar") },
      { id: "toggle-right", text: "Toggle Right Sidebar", action: () => menuAction("toggle-right-sidebar") },
      await sep(),
      { id: "toggle-non-printing-chars", text: "Show non-printing characters", accelerator: "CmdOrCtrl+Shift+8", action: () => menuAction("toggle-non-printing-chars") },
      await sep(),
      { id: "view-document", text: "Document", action: () => menuAction("view-document") },
      { id: "view-preview", text: "Preview", action: () => menuAction("view-preview") },
      { id: "view-outline", text: "Outline", action: () => menuAction("view-outline") },
      await sep(),
      { id: "zoom-in", text: "Zoom In", accelerator: "CmdOrCtrl+=", action: () => menuAction("zoom-in") },
      { id: "zoom-out", text: "Zoom Out", accelerator: "CmdOrCtrl+-", action: () => menuAction("zoom-out") },
      { id: "zoom-reset", text: "Reset Zoom", action: () => menuAction("zoom-reset") },
    ],
  });

  // Window (macOS uses this for window management)
  const windowMinimize = await PredefinedMenuItem.new({ item: "Minimize" });
  const windowClose = await PredefinedMenuItem.new({ item: "CloseWindow" });
  const windowSubmenu = await Submenu.new({
    id: "window",
    text: "Window",
    items: [windowMinimize, windowClose],
  });

  // Help
  const helpSubmenu = await Submenu.new({
    id: "help",
    text: "Help",
    items: [
      { id: "shortcuts", text: "Keyboard Shortcuts", action: () => menuAction("keyboard-shortcuts") },
      await sep(),
      { id: "documentation", text: "Documentation", action: () => menuAction("documentation") },
      { id: "support", text: "Support", action: () => menuAction("support") },
    ],
  });

  // App menu (macOS first submenu goes under app name)
  const aboutQuit = await PredefinedMenuItem.new({ item: "Quit" });
  const aboutSubmenu = await Submenu.new({
    id: "about",
    text: "Folivm",
    items: [aboutQuit],
  });

  const menu = await Menu.new({
    items: [aboutSubmenu, fileSubmenu, editSubmenu, viewSubmenu, windowSubmenu, helpSubmenu],
  });

  const isMacOS = platform() === "macos";
  if (isMacOS) {
    await menu.setAsAppMenu();
  } else {
    await menu.setAsWindowMenu();
  }
}
