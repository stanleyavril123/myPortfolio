import React from "react";
import data from "../data.json"
import { Typography } from "@mui/material";

const { about } = data;

export default function About() {
    return (

        <div id="about">
            <Typography variant="h2" sx={{ paddingBottom: "20px", }}>
                About
            </Typography>
            <Typography variant="body3">{about.about_me}</Typography>

        </div>


    );
}

