import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";
import Socials from "./components/Socials";
import Projects from "./components/Projects";
import NavButton from "./components/NavButton";
import About from "./components/About";
import Skills from "./components/Skills";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        "@media (min-width:1181px)": {
          flexDirection: "row",
          justifyContent: "center",
          padding: 0,
        },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          position: "static",
          width: "100%",
          "@media (min-width:1181px)": {
            position: "fixed",
            top: "90px",
            left: "calc(50% - 612.5px)",
            width: "300px",
            spacing: "67px",
          },
        }}
      >
        <Header />
        <Socials />
        <NavButton />
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          marginLeft: 0,
          width: "100%",
          paddingTop: "20px",
          paddingBottom: "20px",
          "@media (min-width:1181px)": {
            marginLeft: "625px",
            width: "600px",
            paddingTop: "100px",
            paddingBottom: "100px",
          },
        }}
      >
        <Stack spacing={5}>
          <About />
          <Skills />
          <Projects />
        </Stack>
      </Box>
    </Box>
  );
}

export default App;
