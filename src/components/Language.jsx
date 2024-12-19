import { Box } from "@mui/material";
import React from "react";

const Language = ({ Language }) => (

    <>
        <Box
            component={"div"}
            sx={{
                display: 'inline',
                border: '1px solid',
                padding: '5px',
                borderRadius: '15px',
                fontWeight: 600,
                marginRight: '5px',
            }}
        >
            {Language}


        </Box>
    </>
)
export default Language;