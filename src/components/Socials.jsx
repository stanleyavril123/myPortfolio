import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CVMenu from "./CvMenu.jsx";
import data from "../data.json";

const { contact } = data;

const buttonSx = {
  minWidth: 0,
  width: 36,
  height: 36,
  borderRadius: 0,
  border: "1px solid",
  borderColor: "divider",
  color: "text.primary",
  backgroundColor: "transparent",
  "&:hover": {
    borderColor: "secondary.main",
    color: "secondary.main",
    backgroundColor: "transparent",
  },
  "&:focus-visible": {
    outline: "3px solid rgba(200, 32, 22, 0.3)",
    outlineOffset: 3,
  },
};

const Socials = () => (
  <Box
    aria-label="Contact links"
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 0.8,
      my: { xs: 2.5, lg: 3.5 },
    }}
  >
    <Tooltip title="Email Stanley">
      <Button href={`mailto:${contact.email}`} aria-label="Email Stanley" sx={buttonSx}>
        <EmailOutlinedIcon fontSize="small" />
      </Button>
    </Tooltip>
    <Tooltip title="GitHub">
      <Button
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Stanley's GitHub profile"
        sx={buttonSx}
      >
        <GitHubIcon fontSize="small" />
      </Button>
    </Tooltip>
    <Tooltip title="LinkedIn">
      <Button
        href={contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Stanley's LinkedIn profile"
        sx={buttonSx}
      >
        <LinkedInIcon fontSize="small" />
      </Button>
    </Tooltip>
    <CVMenu />
  </Box>
);

export default Socials;
