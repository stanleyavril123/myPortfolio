import {Avatar, Box} from "@mui/material";
import githubImage from "../assets/github.png";
import CVMenu from "./CvMenu.jsx";
import linkedinImage from "../assets/linkedin.png";
import React from "react";

const Socials = () => (
  <Box
    sx={{
      display: "flex",
      gap: "5px",
      marginBottom: "60px",
    }}
  >
    <a
      href="https://github.com/stanleyavril123"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Avatar src={githubImage} alt="Github" sx={{ width: 27, height: 27 }} />
    </a>

    <a
      href="https://www.linkedin.com/in/stanley-avril/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Avatar
        src={linkedinImage}
        alt="Linkedin"
        sx={{ width: 26, height: 26, borderRadius: "8px" }}
      />
    </a>
<CVMenu/>
 </Box>
);

export default Socials;
