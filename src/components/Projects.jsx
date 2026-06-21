import React, { useState } from "react";
import { Box, Card, CardActionArea, Stack } from "@mui/material";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard.jsx";
import data from "../data.json";
import ProjectWindow from "./ProjectWindow.jsx";

export default function Projects() {
  const { projects } = data;
  const [drawerProject, setDrawerProject] = useState(null);
  const [pendingProject, setPendingProject] = useState(null);
  const [drawerState, setDrawerState] = useState("closed");
  const [motionMode, setMotionMode] = useState("peek");

  const withIndex = (project, index) => ({ ...project, index });
  const isSameProject = (a, b) => a?.title === b?.title;

  const handleOpen = (project, index) => {
    setPendingProject(null);
    setMotionMode("poster");
    setDrawerProject(withIndex(project, index));
    setDrawerState("open");
  };

  const handleHoverStart = (project, index) => {
    if (drawerState === "open") return;

    const nextProject = withIndex(project, index);

    if (!drawerProject) {
      setMotionMode("peek");
      setDrawerProject(nextProject);
      setDrawerState("peek");
      return;
    }

    if (isSameProject(drawerProject, nextProject)) {
      setPendingProject(null);
      if (drawerState === "closed") {
        setMotionMode("peek");
        setDrawerState("peek");
      }
      return;
    }

    setMotionMode("peek");
    setPendingProject(nextProject);
    setDrawerState("closed");
  };

  const handleHoverEnd = () => {
    if (drawerState === "peek") {
      setMotionMode("peek");
      setDrawerState("closed");
      return;
    }

    if (drawerState === "closed") {
      setPendingProject(null);
    }
  };

  const handleClose = () => {
    setMotionMode("poster");
    setPendingProject(null);
    setDrawerState("closed");
  };

  const handleExited = () => {
    if (pendingProject) {
      setMotionMode("peek");
      setDrawerProject(pendingProject);
      setPendingProject(null);
      window.requestAnimationFrame(() => setDrawerState("peek"));
      return;
    }

    setDrawerProject(null);
  };

  return (
    <Box component="section" id="projects" aria-labelledby="projects-heading">
      <SectionTitle id="projects-heading" number="04">
        Projects
      </SectionTitle>
      <Stack spacing={0}>
        {projects.map((project, index) => (
          <Card
            key={project.title}
            elevation={0}
            square
            onMouseEnter={() => handleHoverStart(project, index)}
            onMouseLeave={handleHoverEnd}
            sx={{
              backgroundColor: "transparent",
              borderBottom: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
              overflow: "visible",
            }}
          >
            <CardActionArea
              onClick={() => handleOpen(project, index)}
              aria-label={`Open details for ${project.title}`}
              sx={{
                alignItems: "stretch",
                textAlign: "left",
                px: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  "& .project-title": {
                    color: "secondary.main",
                  },
                },
                "&:focus-visible": {
                  outline: "3px solid rgba(200, 32, 22, 0.28)",
                  outlineOffset: 4,
                },
              }}
            >
              <ProjectCard project={project} index={index} />
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      <ProjectWindow
        drawerState={drawerState}
        motionMode={motionMode}
        handleClose={handleClose}
        handleExited={handleExited}
        selectedProject={drawerProject}
      />
    </Box>
  );
}
