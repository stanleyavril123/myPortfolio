import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";
import Socials from "./components/Socials";
import Projects from "./components/Projects";
import NavButton from "./components/NavButton";
import About from "./components/About";
import Skills from "./components/Skills";

// Hero Section
//  ↓
// Projects
//  ↓
// Skills
//  ↓
// About Me
//  ↓
// Contact

function App() {
  const containerMaxWidth = 1200;
  const halfContainerWidth = containerMaxWidth / 2;
  const gapBetweenSections = 150;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Left */}
      <Box
        sx={{
          position: "fixed",
          top: "90px",
          left: `calc(50% - ${halfContainerWidth}px - ${gapBetweenSections}px + 100px)`,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: `${halfContainerWidth - gapBetweenSections}px`,
        }}
      >
        <Header />
        <Socials />
        <NavButton />
      </Box>

      {/* Right */}
      <Box
        sx={{
          marginLeft: `${halfContainerWidth + gapBetweenSections}px`,
          paddingTop: "100px",
          paddingBottom: "100px",
          width: "600px",
        }}
      >
        <Stack spacing={15}>
          <About />
          <Skills />
          <Projects />
        </Stack>
      </Box>
    </Box>
  );
}

export default App;
