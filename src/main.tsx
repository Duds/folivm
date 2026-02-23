import React from "react";
import ReactDOM from "react-dom/client";
import "./tokens.css";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "./components/ui/Tooltip";
import { setupNativeMenu } from "./setupNativeMenu";

setupNativeMenu().catch((err) => console.error("Failed to setup native menu:", err));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
