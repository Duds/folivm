import { type ReactNode } from "react";

/**
 * ThemeProvider — application theme state.
 * Radix Themes controls appearance via the root Theme component.
 * Retained for future appearance switching (light/dark) and accent overrides.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}
