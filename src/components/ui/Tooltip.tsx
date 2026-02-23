import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export function TooltipProvider({
  delayDuration = 300,
  ...props
}: TooltipPrimitive.TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

export function Tooltip(props: TooltipPrimitive.TooltipProps) {
  return (
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  );
}

export function TooltipTrigger(
  props: TooltipPrimitive.TooltipTriggerProps
) {
  return (
    <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
  );
}

export function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn("radix-tooltip-content", className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
