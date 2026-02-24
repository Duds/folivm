import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/Dialog";

export type CloseTabChoice = "save" | "dont-save" | "cancel";

interface CloseTabModalProps {
  open: boolean;
  fileName: string;
  onChoice: (choice: CloseTabChoice) => void;
}

export function CloseTabModal({
  open,
  fileName,
  onChoice,
}: CloseTabModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onChoice("cancel")}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Save changes to &quot;{fileName}&quot;?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Your changes will be lost if you don&apos;t save them.
        </p>
        <DialogFooter>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onChoice("cancel")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onChoice("dont-save")}
          >
            Don&apos;t save
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => onChoice("save")}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
