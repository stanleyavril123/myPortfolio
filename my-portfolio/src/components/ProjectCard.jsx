import React from "react";
import { Box } from "@mui/material";
// import githubImage from '../assets/github.png'; 

const ProjectCard = ({title, description, date, language, imagePath}) => (

    <Box
    sx={{display:"flex",
        flexDirection:"row"
    }}
    >
        <Box sx={{width:"200px"}}>
            <img 
            src={imagePath}
            width={"125px"}
            />
        </Box>
        <Box>
            {title}
        </Box>
    </Box>


)

export default ProjectCard;