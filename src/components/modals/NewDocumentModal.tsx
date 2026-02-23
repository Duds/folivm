import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

interface NewDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newDocName: string;
  onNewDocNameChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function NewDocumentModal({
  open,
  onOpenChange,
  newDocName,
  onNewDocNameChange,
  onConfirm,
  onCancel,
}: NewDocumentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="modal">
        <DialogHeader>
          <DialogTitle>New document</DialogTitle>
          <DialogDescription>Enter a name (e.g. draft.md):</DialogDescription>
        </DialogHeader>
        <input
          type="text"
          value={newDocName}
          onChange={(e) => onNewDocNameChange(e.target.value)}
          placeholder="draft.md"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") onConfirm();
            if (e.key === "Escape") onCancel();
          }}
        />
        <DialogFooter className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn"
            onClick={onConfirm}
            disabled={!newDocName.trim()}
          >
            Create
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
