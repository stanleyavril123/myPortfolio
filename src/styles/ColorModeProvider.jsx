import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createPortfolioTheme } from "./theme";

export const ColorModeContext = createContext({ mode: "light", toggleMode: () => {} });
const storageKey = "portfolio-color-mode";

function initialMode() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(initialMode);
  const toggleMode = useCallback(() => setMode(current => current === "light" ? "dark" : "light"), []);
  const theme = useMemo(() => createPortfolioTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.palette.background.default);
    try { localStorage.setItem(storageKey, mode); } catch {}
  }, [mode, theme.palette.background.default]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
