import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const navItems = [
  { number: "01", label: "ABOUT", href: "#about" },
  { number: "02", label: "EXPERIENCE", href: "#experience" },
  { number: "03", label: "SKILLS", href: "#skills" },
  { number: "04", label: "PROJECTS", href: "#projects" },
];

export default function NavButton() {
  return (
    <Box component="nav" aria-label="Page sections">
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
              width: "fit-content",
              "&:hover": {
                color: "secondary.main",
              },
              "&:focus-visible": {
                outline: "3px solid rgba(200, 32, 22, 0.3)",
                outlineOffset: 3,
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 900, color: "secondary.main" }}>
              {item.number}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 900, textTransform: "uppercase" }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
