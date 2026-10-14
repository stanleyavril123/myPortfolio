import React from "react";
import { Box, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../locales/LanguageProvider";


export default function About() {
  const { data: { about }, ui } = useLanguage();
  return (
    <Box component="section" id="about" aria-labelledby="about-heading">
      <SectionTitle id="about-heading" number="01">
        {ui.about}
      </SectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 4,
        }}
      >
        <Typography
          variant="h3"
          component="p"
          sx={{
            color: "text.primary",
            fontSize: { xs: "1.85rem", sm: "2.75rem" },
            lineHeight: 1.12,
            maxWidth: 650,
          }}
        >
          {ui.intro}
        </Typography>
        <Box sx={{ display: "grid", gap: 2, maxWidth: 600 }}>
          {about.about_me.map((text) => (
            <Typography key={text} variant="body2" sx={{ lineHeight: 1.7, fontWeight: 400, color: "text.secondary" }}>
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
