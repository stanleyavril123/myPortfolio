import React from "react";
import { Box, Typography } from "@mui/material";
// import githubImage from '../assets/github.png'; 

const ProjectCard = ({title, description, date, language, imagePath}) => (

    <Box
    sx={{display:"flex",
        flexDirection:"row"
    }}
    >
            <img 
            style={{maxWidth: "100%", maxHeight: "80px",  objectFit: "contain", marginRight: "24px", borderRadius: "5px"}}
            src={imagePath}
            alt=""
            />
        <Box>
            <Typography variant="h3">{title}</Typography>
            <Typography>{description}</Typography>
        </Box>
    </Box>


)

export default ProjectCard;