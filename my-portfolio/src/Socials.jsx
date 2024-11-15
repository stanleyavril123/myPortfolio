import { Avatar, Box } from "@mui/material";
import githubImage from './assets/github.png'; 
import linkedinImage from './assets/linkedin.png';
import React from "react";

const Socials = () => (

<Box
sx={{
    display: "flex",
    gap: "10px",
}}
>
    <a href="https://github.com/stanleyavril123" target="_blank" rel="noopener noreferrer">
        <Avatar
        src={githubImage} 
        alt="Github" 
        />
    </a>

    <a href="https://www.linkedin.com/in/stanley-avril/" target="_blank" rel="noopener noreferrer">
        <Avatar 
        src={linkedinImage} 
        alt="Linkedin" 
        sx={{ borderRadius: "8px", border: "none"}}
        />
    </a>
</Box>





);

export default Socials;