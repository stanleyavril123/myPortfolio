import React from "react";
import { Container, Grid2, Box} from '@mui/material';
import Header from "./Header";


function App() {

    return (
        <Container maxWidth="lg" 
            sx={{
                backgroundColor: 'primary.main'// Set background color directly
            }}>
            <Grid2 container spacing={2}>

            {/* header */}

            <Grid2 item xs={12}>
                <Box 
                    sx={{
                        width: '400px',
                        padding: 2,
                        wordWrap: 'break-word',       // Enable word breaking for long text
                        overflowWrap: 'break-word',   // Alternative to ensure long words break
                     }}
                >
                    <Header />
                </Box>
            </Grid2>


            </Grid2>
        </Container>

    );
}

export default App;
