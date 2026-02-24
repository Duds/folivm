import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./tokens.css";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "./components/ui/Tooltip";
import { setupNativeMenu } from "./setupNativeMenu";

setupNativeMenu().catch((err) => console.error("Failed to setup native menu:", err));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theme
      accentColor="blue"
      radius="medium"
      scaling="100%"
      appearance="light"
      hasBackground={false}
    >
      <ThemeProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ThemeProvider>
    </Theme>
  </React.StrictMode>,
);
