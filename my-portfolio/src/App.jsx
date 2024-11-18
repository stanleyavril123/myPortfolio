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
  return (
    <Box
      sx={{
        scrollBehavior: "smooth",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        paddingTop: "70px", 
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "100px",
          left: "17%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Header />
        <Socials />
        <NavButton />
      </Box>

      <Box
        sx={{
          width: "50%",
          marginLeft: "55%",
          paddingBottom: "100px",
        }}
      >
        <Stack spacing={15} sx={{width: "60%"}}>
          <About />
          <Projects />
        </Stack>

      </Box>
    </Box>
  );
}

export default App;
