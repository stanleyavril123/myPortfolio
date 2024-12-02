import React from "react";
import { Box, Typography } from "@mui/material";
import Language from "./Language";
// import githubImage from '../assets/github.png'; 

const ProjectCard = ({ title, description, date, languages, imagePath }) => (

    <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"

        }}
    >
        <img
            style={{
                width: "125px",
                height: "auto",
                marginRight: "24px",
                marginBottom: "75px",
                marginTop: "7px",
                borderRadius: "5px",
                display: "block",
            }}
            src={imagePath}
            alt=""
        />
        <Box sx={{ flex: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Typography variant="h3" className="project-title">{title}</Typography>
                <Typography variant="subtitle1" >{date}</Typography>
            </Box>
            <hr />
            <Typography variant="body2" sx={{ marginBottom: "20px" }}>{description}</Typography>
            {languages.map((language, index) => (
                <Language Language={language} key={index}
                    sx={{
                        paddingRight: "600px"
                    }}
                />
            ))}
        </Box>
    </Box>


)

export default ProjectCard;
