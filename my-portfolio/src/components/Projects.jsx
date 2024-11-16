import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const card = (
    <>
        <CardContent>
            <Typography>hello</Typography>
        </CardContent>
    </>
)

export default function Projects() {

    return (
        <Box
        sx={{
            paddingTop: "20px",
        }}
        >
            <Typography variant="h6" color="textSecondary"
                sx={{paddingBottom: "20px",}}>
                My Projects: 
            </Typography>
            <Stack>
                <Card>{card}</Card>
            </Stack>

        </Box>

    );
}