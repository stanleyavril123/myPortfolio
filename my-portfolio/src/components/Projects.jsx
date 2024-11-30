import { Card, CardContent, Stack, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx";
import React, { useState } from "react";
import data from "../data.json";

export default function Projects() {
    const { projects } = data;
    const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);

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
                            backgroundColor: '#faf6f3',
                            border: "2px solid transparent",
                            boxShadow: "none",
                            transition: "border-color 0.3s, opacity 0.3s, filter 0.3s",

                            opacity:
                                hoveredProjectIndex === null || hoveredProjectIndex === index
                                    ? 1
                                    : 0.5,
                        }}
                        onMouseEnter={() => setHoveredProjectIndex(index)}
                        onMouseLeave={() => setHoveredProjectIndex(null)}
                    >
                        <CardContent>
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                date={project.date}
                                languages={project.languages}
                                imagePath={project.image}
                            />
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </div>
    );
}
