import React from "react";
import { Box, Typography } from "@mui/material";

export default function SectionTitle({ id, number, children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "44px 1fr", sm: "58px 1fr" },
        alignItems: "end",
        columnGap: 2,
        mb: { xs: 2.5, sm: 3.5 },
        pb: 1.25,
        borderBottom: "1px solid",
        borderColor: "text.primary",
      }}
    >
      <Typography
        aria-hidden="true"
        sx={{
          color: "secondary.main",
          fontSize: { xs: "1.15rem", sm: "1.35rem" },
          lineHeight: 1,
          fontWeight: 900,
        }}
      >
        {number}
      </Typography>
      <Typography id={id} variant="h2">
        {children}
      </Typography>
    </Box>
  );
}
