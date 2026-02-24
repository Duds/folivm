import * as DropdownMenuThemes from "@radix-ui/themes";
import { cn } from "@/lib/utils";

export function DropdownMenu(props: DropdownMenuThemes.DropdownMenu.RootProps) {
  return (
    <DropdownMenuThemes.DropdownMenu.Root data-slot="dropdown-menu" {...props} />
  );
}

export function DropdownMenuTrigger(
  props: DropdownMenuThemes.DropdownMenu.TriggerProps
) {
  return <DropdownMenuThemes.DropdownMenu.Trigger {...props} />;
}

export function DropdownMenuContent({
  className,
  ...props
}: DropdownMenuThemes.DropdownMenu.ContentProps) {
  return (
    <DropdownMenuThemes.DropdownMenu.Content
      data-slot="dropdown-menu-content"
      className={cn(className)}
      {...props}
    />
  );
}

export function DropdownMenuLabel(
  props: DropdownMenuThemes.DropdownMenu.LabelProps
) {
  return <DropdownMenuThemes.DropdownMenu.Label {...props} />;
}

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuThemes.DropdownMenu.ItemProps) {
  return (
    <DropdownMenuThemes.DropdownMenu.Item
      className={cn(className)}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({
  className,
  ...props
}: DropdownMenuThemes.DropdownMenu.CheckboxItemProps) {
  return (
    <DropdownMenuThemes.DropdownMenu.CheckboxItem
      className={cn(className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator(
  props: DropdownMenuThemes.DropdownMenu.SeparatorProps
) {
  return <DropdownMenuThemes.DropdownMenu.Separator {...props} />;
}

export function DropdownMenuRadioGroup(
  props: DropdownMenuThemes.DropdownMenu.RadioGroupProps
) {
  return (
    <DropdownMenuThemes.DropdownMenu.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

export function DropdownMenuRadioItem({
  className,
  ...props
}: DropdownMenuThemes.DropdownMenu.RadioItemProps) {
  return (
    <DropdownMenuThemes.DropdownMenu.RadioItem
      className={cn(className)}
      {...props}
    />
  );
}
