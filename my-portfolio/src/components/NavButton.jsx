import { Button, Stack, Typography } from "@mui/material";
import React from "react";


const navButton = ["ABOUT", "PROJECTS", "SKILLS", "CONTACT ME"]

export default function NavButton() {
    return (
        <div>
            <Stack direction="column" spacing={2}>
            {navButton.map((lable, index) => (
                <a key={index}>
                    <Typography>{lable}</Typography>
                </a>
            ))} 
            </Stack>
        </div>
    )



}