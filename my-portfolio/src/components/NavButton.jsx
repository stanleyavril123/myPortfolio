import { Stack, Typography } from "@mui/material";
import React from "react";
import { motion } from "motion/react"
import { useState } from "react";

const navButton = ["ABOUT", "PROJECTS", "SKILLS"]
const sectionIds = ["about", "projects", "skills"];


export default function NavButton() {
    const [hoveredIndex, setHoverIndex] = useState(null)
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
                            position: 'relative'
                        }}
                        onMouseEnter={() => {
                            setHoverIndex(index);
                            console.log(`hovering =  ${index}`)
                        }
                        }
                        onMouseLeave={() => {
                            setHoverIndex(null);
                            console.log(`nolonger hovering =  ${index}`)
                        }
                        }
                    >
                        <motion.div className="circle" animate={hoveredIndex === index ? {
                            width: '50px',
                            borderRadius: '15px'
                        } : {}}
                        />
                        <Typography variant="body2" display="inline" > {lable} </Typography>
                    </a>
                ))}
            </Stack>
        </nav>
    )

}