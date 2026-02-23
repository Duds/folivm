import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export function AlertDialog(
  props: React.ComponentProps<typeof AlertDialogPrimitive.Root>
) {
  return (
    <AlertDialogPrimitive.Root
      data-slot="alert-dialog"
      {...props}
    />
  );
}

export function AlertDialogTrigger(
  props: AlertDialogPrimitive.AlertDialogTriggerProps
) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export function AlertDialogPortal(
  props: AlertDialogPrimitive.AlertDialogPortalProps
) {
  return <AlertDialogPrimitive.Portal {...props} />;
}

export function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn("radix-dialog-overlay", className)}
      {...props}
    />
  );
}

export function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogPrimitive.AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn("radix-dialog-content radix-alert-dialog-content", className)}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("radix-dialog-header", className)} {...props} />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("radix-dialog-footer", className)} {...props} />
  );
}

export function AlertDialogTitle(
  props: AlertDialogPrimitive.AlertDialogTitleProps
) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className="radix-dialog-title"
      {...props}
    />
  );
}

export function AlertDialogDescription(
  props: AlertDialogPrimitive.AlertDialogDescriptionProps
) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className="radix-dialog-description"
      {...props}
    />
  );
}

export function AlertDialogCancel({
  className,
  ...props
}: AlertDialogPrimitive.AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn("btn btn-ghost radix-alert-dialog-cancel", className)}
      {...props}
    />
  );
}

export function AlertDialogAction({
  className,
  destructive,
  ...props
}: AlertDialogPrimitive.AlertDialogActionProps & {
  destructive?: boolean;
}) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(
        "btn radix-alert-dialog-action",
        destructive && "radix-alert-dialog-action-destructive",
        className
      )}
      {...props}
    />
  );
}
