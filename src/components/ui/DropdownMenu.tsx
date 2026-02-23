import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

export function DropdownMenu(props: DropdownMenuPrimitive.DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
  );
}

export function DropdownMenuTrigger(
  props: DropdownMenuPrimitive.DropdownMenuTriggerProps
) {
  return <DropdownMenuPrimitive.Trigger {...props} />;
}

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuPrimitive.DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn("radix-dropdown-content", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuLabel(
  props: DropdownMenuPrimitive.DropdownMenuLabelProps
) {
  return (
    <DropdownMenuPrimitive.Label
      className="radix-dropdown-label"
      {...props}
    />
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn("radix-dropdown-item", className)}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn("radix-dropdown-item radix-dropdown-checkbox-item", className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator(
  props: DropdownMenuPrimitive.DropdownMenuSeparatorProps
) {
  return (
    <DropdownMenuPrimitive.Separator
      className="radix-dropdown-separator"
      {...props}
    />
  );
}
