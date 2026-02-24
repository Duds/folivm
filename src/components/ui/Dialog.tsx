import * as DialogThemes from "@radix-ui/themes";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog(props: DialogThemes.Dialog.RootProps) {
  return <DialogThemes.Dialog.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger(props: DialogThemes.Dialog.TriggerProps) {
  return <DialogThemes.Dialog.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogClose(props: DialogThemes.Dialog.CloseProps) {
  return <DialogThemes.Dialog.Close {...props} />;
}

interface DialogContentProps extends DialogThemes.Dialog.ContentProps {
  showCloseButton?: boolean;
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogThemes.Dialog.Content
      data-slot="dialog-content"
      className={cn(className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogThemes.Dialog.Close
          aria-label="Close"
          style={{ position: "absolute", top: "var(--space-3)", right: "var(--space-3)" }}
        >
          <X size={16} />
        </DialogThemes.Dialog.Close>
      )}
    </DialogThemes.Dialog.Content>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DialogThemes.Flex
      direction="column"
      gap="2"
      className={cn(className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DialogThemes.Flex
      justify="end"
      gap="2"
      mt="4"
      className={cn(className)}
      {...props}
    />
  );
}

export function DialogTitle(props: DialogThemes.Dialog.TitleProps) {
  return (
    <DialogThemes.Dialog.Title data-slot="dialog-title" {...props} />
  );
}

export function DialogDescription(props: DialogThemes.Dialog.DescriptionProps) {
  return (
    <DialogThemes.Dialog.Description
      data-slot="dialog-description"
      {...props}
    />
  );
}
