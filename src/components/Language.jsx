import React from "react";
import { Box } from "@mui/material";

const Language = ({ label }) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      color: "text.secondary",
      fontWeight: 800,
      fontSize: "0.76rem",
      lineHeight: 1.2,
      textTransform: "uppercase",
    }}
  >
    {label}
  </Box>
);

export default Language;
