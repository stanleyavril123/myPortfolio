import React from "react";
import { useLanguage } from "../locales/LanguageProvider";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const GitLink = ({ repoLink, text }) => {
  const { ui } = useLanguage();
  if (!repoLink) return null;

  return (
    <Button
      href={repoLink}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<OpenInNewIcon />}
      sx={{
        mt: 2,
        border: "1px solid",
        borderColor: "secondary.main",
        color: "secondary.main",
        fontFamily: "monospace",
        backgroundColor: "transparent",
        textTransform: "uppercase",
        px: 1.5,
        "&:hover": {
          borderColor: "secondary.main",
          backgroundColor: "secondary.main",
          color: "background.paper",
        },
      }}
    >
      {text || ui.openLink}
    </Button>
  );
};

export default GitLink;
