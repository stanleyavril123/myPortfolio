import React from "react";
import { Box, Typography } from "@mui/material";
import Language from "./Language";

const ProjectCard = ({ title, description, date, languages, imagePath }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "row" },
        alignItems: "flex-start",
        gap: "20px",
        cursor: "pointer",
        marginBottom: "30px",
      }}
    >
      <img
        style={{
          width: "125px",
          height: "auto",
          borderRadius: "5px",
          border: "1px solid red",
          display: "block",
        }}
        src={imagePath}
        alt="Project"
      />

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "16px", sm: "20px" },
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              marginLeft: "10px",
            }}
          >
            {date}
          </Typography>
        </Box>
        <hr />
        <Typography
          variant="body2"
          sx={{
            marginBottom: "20px",
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {languages.map((language, index) => (
            <Language Language={language} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;
