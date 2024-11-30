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
                width: "150px",
                height: "auto",
                marginRight: "24px",
                marginBottom: "75px",
                borderRadius: "5px",
                display: "block",
            }}
            src={imagePath}
            alt=""
        />
        <Box>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="body2" sx={{ marginBottom: "10px" }}>{description}</Typography>
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
