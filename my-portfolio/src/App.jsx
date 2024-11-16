import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Socials from "./components/Socials";
import Projects from "./components/Projects";
import NavButton from "./components/NavButton";

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
          top: "70px",
          left: "20%",
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
          marginLeft: "40%",
          paddingBottom: "100px",
        }}
      >
        <Projects />
      </Box>
    </Box>
  );
}

export default App;
