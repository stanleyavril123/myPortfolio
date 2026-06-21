import React from "react";
import { Box, Link, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SectionTitle from "./SectionTitle";
import data from "../data.json";

const { experience } = data;

export default function Experience() {
  return (
    <Box component="section" id="experience" aria-labelledby="experience-heading">
      <SectionTitle id="experience-heading" number="02">
        Experience
      </SectionTitle>
      <Box sx={{ display: "grid", gap: 0, borderTop: "2px solid", borderColor: "text.primary" }}>
        {experience.map((item, index) => (
          <Box
            component="article"
            key={`${item.company}-${item.date}`}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "150px 1fr" },
              gap: { xs: 1.5, md: 3 },
              py: { xs: 2.5, sm: 3 },
              borderBottom: "2px solid",
              borderColor: "text.primary",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "secondary.main",
                  fontSize: "2.1rem",
                  lineHeight: 0.9,
                  fontWeight: 900,
                }}
              >
                0{index + 1}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 900, textTransform: "uppercase" }}>
                {item.date}
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 1,
                }}
              >
                <Typography variant="h3" component="h3">
                  {item.company}
                </Typography>
                {item.link ? (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "secondary.main",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontWeight: 900,
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    Site
                    <OpenInNewIcon sx={{ fontSize: 15 }} />
                  </Link>
                ) : null}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 900, mb: 0.5, textTransform: "uppercase" }}>
                {item.role}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 800, mb: 1.5 }}>
                {item.location}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.2 }}>
                {item.highlights.map((highlight) => (
                  <Typography
                    key={highlight}
                    component="li"
                    variant="body2"
                    sx={{ mb: 0.75, lineHeight: 1.48, fontWeight: 600 }}
                  >
                    {highlight}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
