import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useLanguage } from "../locales/LanguageProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage, ui } = useLanguage();
  return (
    <Tooltip title={ui.switchLanguage}>
      <Button onClick={toggleLanguage} aria-label={ui.switchLanguage} lang={language === "en" ? "fr" : "en"}
        sx={{ minWidth: 40, width: 40, height: 40, p: 0, flexShrink: 0, border: "1px solid", borderColor: "divider", color: "text.primary", fontFamily: "monospace", fontSize: "0.75rem", "&:hover": { borderColor: "primary.main", backgroundColor: "action.hover" } }}>
        {language === "en" ? "FR" : "EN"}
      </Button>
    </Tooltip>
  );
}
