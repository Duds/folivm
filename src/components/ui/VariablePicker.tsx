import * as Select from "@radix-ui/themes";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

export interface VariableOption {
  value: string;
  label: string;
  /** Optional CSS variable reference for preview */
  cssVar?: string;
}

interface VariablePickerProps {
  value: string;
  onChange: (value: string) => void;
  options: VariableOption[];
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
}

export function VariablePicker({
  value,
  onChange,
  options,
  placeholder = "Select…",
  id,
  label,
  className,
}: VariablePickerProps) {
  return (
    <div className={cn("form-group", className)}>
      {label && id && (
        <Label htmlFor={id}>{label}</Label>
      )}
      <Select.Select.Root value={value || ""} onValueChange={onChange}>
        <Select.Select.Trigger
          id={id}
          placeholder={placeholder}
          className="w-full"
        />
        <Select.Select.Content>
          {options.map((opt) => (
            <Select.Select.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Select.Item>
          ))}
        </Select.Select.Content>
      </Select.Select.Root>
    </div>
  );
}

/** Folivm document typography variables for headings */
export const FOLIVM_HEADING_VARS: VariableOption[] = [
  { value: "var(--text-doc-h1)", label: "H1", cssVar: "--text-doc-h1" },
  { value: "var(--text-doc-h2)", label: "H2", cssVar: "--text-doc-h2" },
  { value: "var(--text-doc-h3)", label: "H3", cssVar: "--text-doc-h3" },
  { value: "var(--text-doc-h4)", label: "H4", cssVar: "--text-doc-h4" },
  { value: "var(--text-doc-body)", label: "Body", cssVar: "--text-doc-body" },
];
