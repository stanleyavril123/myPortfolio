import React from "react";
import { Box, Typography } from "@mui/material";
// import githubImage from '../assets/github.png'; 

const ProjectCard = ({title, description, date, language, imagePath}) => (

    <Box
    sx={{display:"flex",
        flexDirection:"row"
    }}
    >
        <Box sx={{width:"750px", display: "flex", justifyContent: "center", marginRight:3 }}>
            <img 
            style={{maxWidth: "100%", maxHeight: "500px",  objectFit: "contain" }}
            src={imagePath}
            alt=""
            />
        </Box>
        <Box>
            <Typography variant="h3">{title}</Typography>
            <Typography>{description}</Typography>
        </Box>
    </Box>


)

export default ProjectCard;