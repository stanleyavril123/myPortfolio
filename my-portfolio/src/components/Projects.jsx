import {Card, CardContent, Typography } from "@mui/material";
import React from "react";
import data from "../projectData.json"


export default function Projects() {

    return (

        <>
            <Typography variant="h6" color="textSecondary" sx={{paddingBottom: "20px",}}>
                My Projects: 
            </Typography>
            {data.map(((data, index) => (
                <Card key={index} style={{}}>
                    <CardContent>
                        <Typography>{data.title}</Typography>
                        <Typography>{data.description}</Typography>
                        <Typography>{data.date}</Typography>
                        <Typography>{data.languages}</Typography>
                    </CardContent>
                </Card>
            )))}
        </>


    );
}