import React from "react";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "../locales/LanguageProvider";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";


const Header = () => {
  const { data: { contact }, ui } = useLanguage();
  return (
  <Box component="header">
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 3 }}>
    <Typography variant="body1" sx={{ fontFamily: "monospace", textTransform: "uppercase", color: "text.secondary" }}>
      {ui.discipline}
    </Typography>
    <Box sx={{ display: "flex", gap: 0.75, flexShrink: 0 }}>
      <LanguageToggle />
      <ThemeToggle />
    </Box>
    </Box>
    <Typography variant="h1">
      Stanley<Box component="span" sx={{ display: "block" }}>Avril</Box>
    </Typography>

    <Box
      sx={{
        display: "grid",
        gap: 1.1,
        mt: 3,
        pt: 2,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h4" sx={{ textTransform: "none" }}>{contact.role}</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "monospace", textTransform: "uppercase" }}>
        {contact.location}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          maxWidth: 330,
          lineHeight: 1.45,
          fontWeight: 400,
          color: "text.secondary",
        }}
      >
        {contact.tagline}
      </Typography>
    </Box>
  </Box>
);
};

export default Header;
