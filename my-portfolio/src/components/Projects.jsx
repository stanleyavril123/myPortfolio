import {Card, CardContent, Stack, Typography } from "@mui/material";
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
                    sx={{borderRadius: "0", }}
                    >
                        <CardContent>
                            <Typography>{project.title}</Typography>
                            <Typography>{project.description}</Typography>
                            <Typography>{project.date}</Typography>
                            <Typography>{project.languages}</Typography>
                        </CardContent>
                    </Card>
                )))}
            </Stack>

        </div>


    );
}