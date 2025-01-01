import React from "react";
import { Link } from "@mui/material";

const GitLink = ({ repoLink }) => {
    return (
    <Link
      href={repoLink}
      target="_blank"
      rel="noopener noreferrer"
      color="#f0201c"
      aria-label="Open GitHub repository in a new tab"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: "34px",
      }}
    >
      Github Repo
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: "24px",
          color: "#f0201c",
          marginLeft: "5px",
        }}
      >
        arrow_outward
      </span>
    </Link>
  );
};

export default GitLink;
