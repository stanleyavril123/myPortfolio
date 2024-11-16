import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import data from "../projectData.json"


export default function Projects() {

    return (

        <>
            {data.map(((data, index) => (
                <Card key={index} style={{}}>
                    <CardContent>
                        <Typography>{data.title}</Typography>
                        <Typography>{data.description}</Typography>
                        <Typography>{data.da}</Typography>
                    </CardContent>
                </Card>
            )))}
        </>


    );
}