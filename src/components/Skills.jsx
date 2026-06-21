import React from "react";
import { Box, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import data from "../data.json";

const { skills } = data;

export default function Skills() {
  return (
    <Box component="section" id="skills" aria-labelledby="skills-heading">
      <SectionTitle id="skills-heading" number="03">
        Skills
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
            <Typography variant="h3" component="h3" sx={{ color: "secondary.main" }}>
              {group.category}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7, fontWeight: 650 }}>
              {group.items.join(" / ")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
