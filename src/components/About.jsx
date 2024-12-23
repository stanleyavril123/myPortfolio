import React from "react";
import data from "../data.json";
import { Typography } from "@mui/material";

const boldKeywords = [
  "software engineering student",
  "full-stack development",
  "cybersecurity",
  "machine learning",
  "task manager app",
  "pentesting tool",
  "challenging GitHub repositories",
  "cybersecurity-focused startup",
  "problem-solving",
  "teamwork",
];

function highlightText(text, keywords) {
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  return text.split(regex).map((part, index) =>
    keywords.includes(part.toLowerCase()) ? (
      <strong key={index} style={{ color: "#f0201c" }}>
        {part}
      </strong>
    ) : (
      part
    )
  );
}

const { about } = data;

export default function About() {
  return (
    <div id="about">
      <Typography variant="h2" sx={{ paddingBottom: "20px" }}>
        About
      </Typography>

      {about.about_me.map((text, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ paddingLeft: "20px", paddingBottom: "10px" }}
        >
          {highlightText(text, boldKeywords)}
        </Typography>
      ))}
    </div>
  );
}
