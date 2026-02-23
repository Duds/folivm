import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

interface ReferenceDocxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referenceDocxPath: string | null;
  onChoose: () => void;
  onClear: () => void;
  onClose: () => void;
}

export function ReferenceDocxModal({
  open,
  onOpenChange,
  referenceDocxPath,
  onChoose,
  onClear,
  onClose,
}: ReferenceDocxModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="modal reference-docx-modal"
      >
        <DialogHeader>
          <DialogTitle>Reference DOCX template</DialogTitle>
          <DialogDescription>
            When set, DOCX export uses this template for styling. When not set,
            Pandoc defaults apply.
          </DialogDescription>
        </DialogHeader>
        <div className="reference-docx-current">
          <strong>Current template:</strong>{" "}
          {referenceDocxPath ? (
            <span className="path" title={referenceDocxPath}>
              {referenceDocxPath.split("/").pop() ?? referenceDocxPath}
            </span>
          ) : (
            <span className="none">None set</span>
          )}
        </div>
        <DialogFooter className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
          {referenceDocxPath && (
            <button className="btn btn-ghost" onClick={onClear}>
              Clear
            </button>
          )}
          <button className="btn" onClick={onChoose}>
            {referenceDocxPath ? "Change" : "Choose template"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
