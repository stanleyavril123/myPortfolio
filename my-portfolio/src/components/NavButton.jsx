import { Stack, Typography } from "@mui/material";
import React from "react";


const navButton = ["ABOUT", "PROJECTS", "SKILLS"]
const sectionIds = ["about", "projects", "skills"];

export default function NavButton() {
    return (
        <nav>
            <Stack direction="column" spacing={2} >

                {navButton.map((lable, index) => (
                    <a
                        key={index}
                        href={`#${sectionIds[index]}`}
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >

                        <Typography variant="body2"> {lable}</Typography>
                    </a>
                ))}
            </Stack>
        </nav>
    )



}