import React, { useContext } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useLanguage } from "../locales/LanguageProvider";
import { ColorModeContext } from "../styles/ColorModeProvider";

export default function ThemeToggle() {
  const { mode, toggleMode } = useContext(ColorModeContext);
  const dark = mode === "dark";
  const { ui } = useLanguage();
  const label = dark ? ui.switchLight : ui.switchDark;
  const iconSx = {
    position: "absolute", inset: 0, width: 20, height: 20, display: "block", fontSize: 20,
    transformOrigin: "center",
    transition: "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease",
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  };

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggleMode}
        aria-label={label}
        aria-pressed={dark}
        sx={{
          width: 40, height: 40, p: 0, flexShrink: 0, border: "1px solid", borderColor: "divider",
          color: "text.primary", overflow: "hidden",
          "&:hover": { backgroundColor: "action.hover", borderColor: "primary.main" },
        }}
      >
        <Box sx={{ width: 20, height: 20, position: "relative", flexShrink: 0 }}>
          <LightModeOutlinedIcon sx={{ ...iconSx, opacity: dark ? 0 : 1, transform: dark ? "rotate(100deg) scale(0.3)" : "rotate(0) scale(1)" }} />
          <DarkModeOutlinedIcon sx={{ ...iconSx, opacity: dark ? 1 : 0, transform: dark ? "rotate(0) scale(1)" : "rotate(-100deg) scale(0.3)" }} />
        </Box>
      </IconButton>
    </Tooltip>
  );
}
