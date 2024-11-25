import React from "react";
import { Box, Typography } from "@mui/material";
import Language from "./Language";
// import githubImage from '../assets/github.png'; 

const ProjectCard = ({ title, description, date, languages, imagePath }) => (

    <Box
        sx={{
            display: "flex",
            flexDirection: "row"
        }}
    >
        <img
            style={{
                maxWidth: "100%",
                maxHeight: "80px",
                objectFit: "contain",
                marginRight: "24px",
                borderRadius: "5px",
            }}
            src={imagePath}
            alt=""
        />
        <Box>
            <Typography variant="h3">{title}</Typography>
            <Typography sx={{ marginBottom: "10px" }}>{description}</Typography>
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
