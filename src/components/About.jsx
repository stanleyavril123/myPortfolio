import React from "react";
import { Box, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import data from "../data.json";

const { about } = data;

export default function About() {
  return (
    <Box component="section" id="about" aria-labelledby="about-heading">
      <SectionTitle id="about-heading" number="01">
        About
      </SectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          gap: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h3"
          component="p"
          sx={{
            color: "secondary.main",
            fontSize: { xs: "1.55rem", sm: "2rem" },
            lineHeight: 1,
          }}
        >
          I build software that can handle networks, hardware, real users, and messy constraints.
        </Typography>
        <Box sx={{ display: "grid", gap: 1.35 }}>
          {about.about_me.map((text) => (
            <Typography key={text} variant="body2" sx={{ lineHeight: 1.55, fontWeight: 650 }}>
              {text}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
