import React from "react";
import {Box} from '@mui/material';
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
    return(
        <Box
        sx={{
            display: "flex", 
            justifyContent: "center",
            paddingTop: "70px",
        }}
        >
            <Box
            sx={{
                paddingRight: "10%",
                position: "fixed",
                top: "100px",
                left: "10%",
            }}
            >
                <Header />
                <Socials />
                <NavButton />

            </Box>

            <Box
            sx={{width: "50%", paddingLeft: "40%"}}
            >
                <Projects />
            </Box>

        
        </Box>


    );
}

export default App;
