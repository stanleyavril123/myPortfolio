import { Card, CardContent, Stack, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx";
import React, { useState } from "react";
import data from "../data.json";
import ProjectWindow from "./ProjectWindow.jsx";

export default function Projects() {
  const { projects } = data;
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [openWindow, setOpenWindow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handelOpen = (project) => {
    setOpenWindow(true);
    setSelectedProject(project);
  };
  const handleClose = () => {
    setOpenWindow(false);
    setSelectedProject(null);
  };
  return (
    <div id="projects">
      <Typography variant="h2" sx={{ paddingBottom: "20px" }}>
        Projects
      </Typography>
      <Stack spacing={3}>
        {projects.map((project, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 0,
              backgroundColor: "#faf6f3",
              border: "2px solid transparent",
              boxShadow: "none",
              transition: "border-color 0.3s, opacity 0.3s, filter 0.3s",
              opacity:
                hoveredProjectIndex === null || hoveredProjectIndex === index
                  ? 1
                  : 0.5,
              "&:hover": {
                "& .project-title": {
                  color: "#f0201c",
                },
              },
            }}
            onMouseEnter={() => {
              setHoveredProjectIndex(index);
              // console.log(`hovering =  ${index}`)
            }}
            onMouseLeave={() => {
              setHoveredProjectIndex(null);
              // console.log(`nolonger hovering =  ${index}`)
            }}
            onClick={() => {
              console.log(`you clicked ${project.title}`);
              handelOpen(project);
            }}
          >
            <CardContent>
              <ProjectCard
                title={project.title}
                description={project.description}
                date={project.date}
                languages={project.languages}
                imagePath={project.images[0]}
              />
            </CardContent>
          </Card>
        ))}
        <ProjectWindow
          openWindow={openWindow}
          handleClose={handleClose}
          selectedProject={selectedProject}
        />
      </Stack>
    </div>
  );
}
