import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export function Popover(
  props: React.ComponentProps<typeof PopoverPrimitive.Root>
) {
  return (
    <PopoverPrimitive.Root data-slot="popover" {...props} />
  );
}

export function PopoverTrigger(
  props: PopoverPrimitive.PopoverTriggerProps
) {
  return (
    <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
  );
}

export function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn("radix-popover-content", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export function PopoverClose(
  props: PopoverPrimitive.PopoverCloseProps
) {
  return (
    <PopoverPrimitive.Close data-slot="popover-close" {...props} />
  );
}
