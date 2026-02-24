import { Switch as SwitchThemes } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchThemes>) {
  return (
    <SwitchThemes data-slot="switch" className={cn(className)} {...props} />
  );
}
