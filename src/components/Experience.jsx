import React from "react";
import { Box, Link, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../locales/LanguageProvider";


export default function Experience() {
  const { data: { experience }, ui } = useLanguage();
  return (
    <Box component="section" id="experience" aria-labelledby="experience-heading">
      <SectionTitle id="experience-heading" number="02">
        {ui.experience}
      </SectionTitle>
      <Box sx={{ display: "grid", gap: 0 }}>
        {experience.map((item, index) => (
          <Box
            component="article"
            key={`${item.company}-${item.date}`}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "150px 1fr" },
              gap: { xs: 1.5, md: 3 },
              py: { xs: 2.5, sm: 3 },
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "secondary.main",
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                  lineHeight: 0.9,
                  fontWeight: 400,
                }}
              >
                0{index + 1}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "monospace", textTransform: "uppercase" }}>
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
                      fontWeight: 400,
                      fontFamily: "monospace",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {ui.site}
                    <OpenInNewIcon sx={{ fontSize: 15 }} />
                  </Link>
                ) : null}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.75 }}>
                {item.role}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "monospace", mb: 2 }}>
                {item.location}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.2 }}>
                {item.highlights.map((highlight) => (
                  <Typography
                    key={highlight}
                    component="li"
                    variant="body2"
                    sx={{ mb: 1.25, lineHeight: 1.7, fontWeight: 400, color: "text.secondary" }}
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
