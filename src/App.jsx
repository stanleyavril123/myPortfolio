import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";
import Socials from "./components/Socials";
import Projects from "./components/Projects";
import NavButton from "./components/NavButton";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <CustomCursor />
      <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2.25, sm: 4, lg: 5 },
        py: { xs: 3, sm: 5, lg: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1320,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "340px minmax(0, 1fr)" },
          gap: { xs: 5, lg: 7 },
          borderTop: "3px solid",
          borderColor: "text.primary",
        }}
      >
        <Box
          sx={{
            position: { xs: "static", lg: "sticky" },
            top: { lg: 32 },
            alignSelf: { lg: "start" },
            pt: { xs: 2, lg: 3 },
          }}
        >
          <Header />
          <Socials />
          <NavButton />
        </Box>

        <Box
          component="main"
          sx={{
            minWidth: 0,
            pt: { xs: 1, lg: 3 },
            pb: { xs: 4, lg: 8 },
            borderLeft: { xs: 0, lg: "1px solid" },
            borderColor: "divider",
            pl: { xs: 0, lg: 6 },
          }}
        >
          <Stack spacing={{ xs: 6, sm: 8 }}>
            <About />
            <Experience />
            <Skills />
            <Projects />
          </Stack>
        </Box>
      </Box>
      </Box>
    </>
  );
}

export default App;
