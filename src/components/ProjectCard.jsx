import React from "react";
import { Box, Typography } from "@mui/material";
import Language from "./Language";
import { useLanguage } from "../locales/LanguageProvider";
import { radii } from "../styles/shape";
import { accentColors } from "../styles/colors";
import ProjectAsciiArt from "./ProjectAsciiArt";

const ProjectVisual = ({ project, index }) => {
  const { ui } = useLanguage();
  const number = String(index + 1).padStart(2, "0");

  return (
    <Box
      aria-hidden="true"
      sx={{
        minHeight: { xs: 220, md: 280 },
        backgroundColor: index % 2 === 0 ? accentColors.main : accentColors.pale,
        color: index % 2 === 0 ? accentColors.onDark : accentColors.main,
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        borderRadius: radii.preview,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2.5,
        overflow: "hidden",
      }}
    >
      <ProjectAsciiArt project={project} />
      <Typography sx={{ position: "relative", fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", opacity: 0.75 }}>
        {ui.projectPreview} / {number}
      </Typography>
      <Typography sx={{ position: "relative", fontSize: "2rem", lineHeight: 1.02, fontWeight: 500, overflowWrap: "anywhere" }}>
        {project.title}
      </Typography>
    </Box>
  );
};

const ProjectCard = ({ project, index }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(240px, 0.78fr) 1fr" },
        gap: { xs: 2, md: 3 },
        py: { xs: 2.75, sm: 3.25 },
      }}
    >
      <ProjectVisual project={project} index={index} />
      <Box sx={{ minWidth: 0, alignSelf: "center" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "48px 1fr",
            gap: 2,
            alignItems: "baseline",
            mb: 1.2,
          }}
        >
          <Typography variant="body1" sx={{ color: "secondary.main", fontFamily: "monospace" }}>
            {number}
          </Typography>
          <Box>
            <Typography
              variant="h3"
              component="h3"
              className="project-title"
              sx={{ fontSize: { xs: "1.35rem", sm: "1.6rem" }, mb: 0.75 }}
            >
              {project.title}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
              {project.date}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ lineHeight: 1.7, fontWeight: 400, color: "text.secondary", maxWidth: 720, mb: 2 }}>
          {project.summary}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.85 }}>
          {project.stack.map((language, stackIndex) => (
            <React.Fragment key={language}>
              <Language label={language} />
              {stackIndex < project.stack.length - 1 ? (
                <Typography component="span" sx={{ color: "text.secondary", fontWeight: 800 }}>
                  /
                </Typography>
              ) : null}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;
