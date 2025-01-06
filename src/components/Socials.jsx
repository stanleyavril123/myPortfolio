import { Avatar, Box, Button } from "@mui/material";
import githubImage from "../assets/github.png";
import linkedinImage from "../assets/linkedin.png";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
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
    <Button
      color="primary"
      href="StanleyAvril_CV.pdf"
      download="StanleyAvril_CV.pdf"
      startIcon={<DownloadOutlinedIcon />}
      sx={{
        height: 24,
        backgroundColor: "black",
        color: "#faf6f3",
        border: "1px solid black",
        marginLeft: "8px",
      }}
    >
      CV
    </Button>
  </Box>
);

export default Socials;
