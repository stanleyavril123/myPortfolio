import React from "react";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const GitLink = ({ repoLink, text }) => {
  if (!repoLink) return null;

  return (
    <Button
      href={repoLink}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<OpenInNewIcon />}
      sx={{
        mt: 2,
        borderRadius: 0,
        border: "2px solid",
        borderColor: "text.primary",
        color: "text.primary",
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
      {text || "Open link"}
    </Button>
  );
};

export default GitLink;
