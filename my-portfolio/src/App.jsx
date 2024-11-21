import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";
import Socials from "./components/Socials";
import Projects from "./components/Projects";
import NavButton from "./components/NavButton";
import About from "./components/About";

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
  const gapBetweenSections = 40;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Left */}
      <Box
        sx={{
          position: 'fixed',
          top: '70px',
          left: `calc(50% - ${halfContainerWidth}px - ${gapBetweenSections}px)`,
          display: 'flex',
          flexDirection: 'column',
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
          paddingTop: '70px',
          paddingBottom: '100px',
          width: `${halfContainerWidth - gapBetweenSections}px`,
        }}
      >
        <Stack spacing={15}>
          <About />
          <Projects />
        </Stack>
      </Box>
    </Box>
  );
}

export default App;





