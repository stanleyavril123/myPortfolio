import React from "react";
import { Box, Card, CardActionArea, Divider, Stack, useMediaQuery } from "@mui/material";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard.jsx";
import { useLanguage } from "../locales/LanguageProvider";
import ProjectWindow from "./ProjectWindow.jsx";
import useProjectDrawer from "./useProjectDrawer";
import { radii, focusRing } from "../styles/shape";
import { openHiddenMode } from "./VimMode";

export default function Projects() {
  const { data: { projects }, ui } = useLanguage();
  const { drawer, dispatch } = useProjectDrawer();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const withIndex = (project, index) => ({ ...project, index });

  const handleOpen = (project, index) => {
    dispatch({ type: "open", project: withIndex(project, index) });
  };

  const handleHoverStart = (project, index) => {
    if (canHover) dispatch({ type: "hover", project: withIndex(project, index) });
  };

  const handleHoverEnd = () => {
    dispatch({ type: "leave" });
  };

  const handleClose = () => {
    dispatch({ type: "close" });
  };

  return (
    <Box component="section" id="projects" aria-labelledby="projects-heading">
      <SectionTitle id="projects-heading" number="04">
        {ui.projects}
      </SectionTitle>
      <Stack spacing={2} divider={<Divider />}>
        {projects.map((project, index) => (
          <Card
            key={project.sourceTitle || project.title}
            elevation={0}
            onMouseEnter={() => handleHoverStart(project, index)}
            onMouseLeave={handleHoverEnd}
            sx={{
              backgroundColor: "transparent",
              borderRadius: radii.panel,
              boxShadow: "none",
              overflow: "visible",
            }}
          >
            <CardActionArea
              onClick={() => handleOpen(project, index)}
              aria-label={`${ui.openProject} ${project.title}`}
              sx={{
                textAlign: "left",
                px: 1,
                borderRadius: radii.panel,
                "&:hover": { backgroundColor: "action.hover", "& .project-title": { color: "secondary.main" } },
                "&:focus-visible": focusRing,
                "& .MuiCardActionArea-focusHighlight": { borderRadius: "inherit" },
              }}
            >
              <ProjectCard project={project} index={index} />
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      <Box
        component="button"
        type="button"
        onClick={openHiddenMode}
        aria-label={`${ui.hiddenProject}: dotfiles`}
        sx={{
          width: "100%", mt: 3, px: 1, py: 2,
          display: "grid", gridTemplateColumns: "48px minmax(0, 1fr) auto", gap: 2,
          alignItems: "center", textAlign: "left", background: "transparent",
          border: 0, borderTop: "1px dashed", borderColor: "divider",
          borderRadius: radii.control, color: "text.primary", opacity: 0.7,
          fontFamily: "monospace", fontSize: "0.8rem",
          "&:hover, &:focus-visible": { opacity: 1, color: "secondary.main", "& .secret-command": { opacity: 1 } },
          "&:focus-visible": focusRing,
        }}
      >
        <Box component="span" aria-hidden="true" sx={{ opacity: 0.6 }}>{String(projects.length + 1).padStart(2, "0")}</Box>
        <Box component="span">.hidden/<Box component="span" className="secret-command" sx={{ opacity: 0 }}>dotfiles</Box></Box>
        <Box component="kbd" className="secret-command" sx={{ fontFamily: "inherit", opacity: 0 }}>:w</Box>
      </Box>
      <ProjectWindow
        drawerState={drawer.state}
        motionMode={drawer.mode}
        handleClose={handleClose}
        selectedProject={drawer.project}
      />
    </Box>
  );
}
