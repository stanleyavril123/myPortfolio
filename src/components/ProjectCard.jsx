import React from "react";
import { Box, Typography } from "@mui/material";
import Language from "./Language";

const getDisplayWords = (title) => title.split(" ").filter(Boolean).slice(0, 3);

const ProjectVisual = ({ title, index }) => {
  const number = String(index + 1).padStart(2, "0");
  const words = getDisplayWords(title);

  return (
    <Box
      aria-hidden="true"
      sx={{
        minHeight: { xs: 220, md: 280 },
        backgroundColor: index % 2 === 0 ? "text.primary" : "secondary.main",
        color: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        overflow: "hidden",
      }}
    >
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 900, textTransform: "uppercase" }}>
        selected project / {number}
      </Typography>
      <Box>
        {words.map((word) => (
          <Typography
            key={word}
            sx={{
              display: "block",
              fontSize: { xs: "2.55rem", md: "3.35rem" },
              lineHeight: 0.8,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {word}
          </Typography>
        ))}
      </Box>
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
      <ProjectVisual title={project.title} index={index} />
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
          <Typography variant="body1" sx={{ color: "secondary.main", fontWeight: 900 }}>
            {number}
          </Typography>
          <Box>
            <Typography
              variant="h3"
              component="h3"
              className="project-title"
              sx={{ fontSize: { xs: "1.5rem", sm: "1.9rem" }, mb: 0.5 }}
            >
              {project.title}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 800 }}>
              {project.date}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ lineHeight: 1.58, fontWeight: 620, maxWidth: 720, mb: 1.4 }}>
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
