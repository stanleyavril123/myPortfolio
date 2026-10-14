import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useLanguage } from "../locales/LanguageProvider";
import { radii, focusRing } from "../styles/shape";

const navItems = [
  { number: "01", label: "about", href: "#about" },
  { number: "02", label: "experience", href: "#experience" },
  { number: "03", label: "skills", href: "#skills" },
  { number: "04", label: "projects", href: "#projects" },
];

export default function NavButton() {
  const { ui } = useLanguage();
  return (
    <Box component="nav" aria-label={ui.navigation}>
      <Stack direction="column" spacing={0.8}>
        {navItems.map((item) => (
          <Box
            key={item.href}
            component="a"
            href={item.href}
            sx={{
              textDecoration: "none",
              color: "text.primary",
              display: "grid",
              gridTemplateColumns: "38px 1fr",
              gap: 1.5,
              py: 0.35,
              px: 1,
              ml: -1,
              borderRadius: radii.control,
              width: "fit-content",
              "&:hover": {
                color: "secondary.main",
                backgroundColor: "action.hover",
              },
              "&:focus-visible": focusRing,
            }}
          >
            <Typography variant="body1" sx={{ fontFamily: "monospace", color: "secondary.main" }}>
              {item.number}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400, fontFamily: "monospace", textTransform: "uppercase" }}>
              {ui[item.label]}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
