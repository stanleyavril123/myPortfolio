import React from "react";
import {Box} from '@mui/material';
import Header from "./components/Header";
import Socials from "./components/Socials";


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
                width: "45%",
                height: "100%",
            }}
            >
                <Header />
                <Socials/>
            </Box>
        </Box>


    );
}

export default App;
