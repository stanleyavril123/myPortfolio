import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CVMenu from "./CvMenu.jsx";
import { useLanguage } from "../locales/LanguageProvider";


const buttonSx = {
  minWidth: 0,
  width: 40,
  height: 40,
  border: "1px solid",
  borderColor: "divider",
  color: "text.primary",
  backgroundColor: "transparent",
  "&:hover": {
    borderColor: "secondary.main",
    color: "secondary.main",
    backgroundColor: "transparent",
  },
};

const Socials = () => {
  const { data: { contact }, ui } = useLanguage();
  return (
  <Box
    aria-label={ui.contactLinks}
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 0.8,
      my: { xs: 2.5, lg: 3.5 },
    }}
  >
    <Tooltip title={ui.email}>
      <Button href={`mailto:${contact.email}`} aria-label={ui.email} sx={buttonSx}>
        <EmailOutlinedIcon fontSize="small" />
      </Button>
    </Tooltip>
    <Tooltip title="GitHub">
      <Button
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui.github}
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
        aria-label={ui.linkedin}
        sx={buttonSx}
      >
        <LinkedInIcon fontSize="small" />
      </Button>
    </Tooltip>
    <CVMenu />
  </Box>
);
};

export default Socials;
