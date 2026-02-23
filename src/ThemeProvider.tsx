import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Mode = "default" | "focus";
export type Brand = "default" | "client-a";

interface ThemeState {
  mode: Mode;
  brand: Brand;
  setMode: (m: Mode) => void;
  setBrand: (b: Brand) => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<Mode>("default");
  const [brand, setBrandState] = useState<Brand>("default");

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
  }, []);

  const setBrand = useCallback((b: Brand) => {
    setBrandState(b);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    root.setAttribute("data-brand", brand);
  }, [mode, brand]);

  const value: ThemeState = {
    mode,
    brand,
    setMode,
    setBrand,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
