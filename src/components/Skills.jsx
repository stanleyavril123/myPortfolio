import React from "react";
import { Box, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../locales/LanguageProvider";


export default function Skills() {
  const { data: { skills }, ui } = useLanguage();
  return (
    <Box component="section" id="skills" aria-labelledby="skills-heading">
      <SectionTitle id="skills-heading" number="03">
        {ui.skills}
      </SectionTitle>
      <Box sx={{ display: "grid", gap: 2.25 }}>
        {skills.map((group) => (
          <Box
            key={group.category}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "170px 1fr" },
              gap: { xs: 1, sm: 3 },
              pb: 2.25,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h3" component="h3" sx={{ color: "secondary.main", fontFamily: "monospace", fontSize: "0.85rem", textTransform: "uppercase" }}>
              {group.category}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7, fontWeight: 400 }}>
              {group.items.join(" / ")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
