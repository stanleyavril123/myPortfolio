import React from "react";
import { Box, Typography } from "@mui/material";
import data from "../data.json";

const { contact } = data;

const Header = () => (
  <Box component="header">
    <Typography variant="h1">Stanley</Typography>
    <Typography variant="h1" sx={{ color: "secondary.main" }}>
      Avril
    </Typography>

    <Box
      sx={{
        display: "grid",
        gap: 1.1,
        mt: 3,
        pt: 2,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h4">{contact.role}</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 800, textTransform: "uppercase" }}>
        {contact.location}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          maxWidth: 330,
          lineHeight: 1.45,
          fontWeight: 650,
          color: "text.secondary",
        }}
      >
        {contact.tagline}
      </Typography>
    </Box>
  </Box>
);

export default Header;
