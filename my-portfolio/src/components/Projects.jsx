import {Card, CardContent, Stack, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx"
import React from "react";
import data from "../data.json"


export default function Projects() {
    const { projects } = data; 
    return (

        <div id="projects">
            <Typography variant="h2" sx={{paddingBottom: "20px",}}>
            Projects
            </Typography>
            <Stack spacing={3}>
                {projects.map(((project, index) => (
                    <Card key={index}
                    sx={{borderRadius: "10", }}
                    >
                        <CardContent>
                            <ProjectCard 
                            title={project.title}
                            description={project.description}
                            date={project.date}
                            language={project.language}
                            imagePath={project.image}
                            />
                        </CardContent>
                    </Card>
                )))}
            </Stack>

        </div>


    );
}