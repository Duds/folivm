import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

export function ToggleGroup(
  props: React.ComponentProps<typeof ToggleGroupPrimitive.Root>
) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("radix-toggle-group", props.className)}
      {...props}
    />
  );
}

export function ToggleGroupItem({
  className,
  ...props
}: ToggleGroupPrimitive.ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn("radix-toggle-item", className)}
      {...props}
    />
  );
}
