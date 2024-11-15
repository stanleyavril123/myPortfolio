import React from "react";
import { Container, Grid2, Box} from '@mui/material';
import Header from "./Header";
import Socials from "./Socials";


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
