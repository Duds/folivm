import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

const SHORTCUTS: { keys: string; action: string }[] = [
  { keys: "⌘N", action: "New document" },
  { keys: "⌘⇧P", action: "New project" },
  { keys: "⌘O", action: "Open project" },
  { keys: "⌘⇧O", action: "Open document" },
  { keys: "⌘⇧N", action: "New Window" },
  { keys: "⌘S", action: "Save" },
  { keys: "⌘⇧F", action: "Find in project" },
  { keys: "⌘.", action: "Focus AI assistant" },
  { keys: "⌘=", action: "Zoom In" },
  { keys: "⌘-", action: "Zoom Out" },
  { keys: "⌘⇧8", action: "Show non-printing characters" },
];

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsModal({
  open,
  onOpenChange,
}: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="modal keyboard-shortcuts-modal"
      >
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            Shortcuts use ⌘ on macOS and Ctrl on Windows/Linux.
          </DialogDescription>
        </DialogHeader>
        <div className="keyboard-shortcuts-list">
          {SHORTCUTS.map(({ keys, action }) => (
            <div key={action} className="shortcut-row">
              <kbd className="shortcut-keys">{keys}</kbd>
              <span className="shortcut-action">{action}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
