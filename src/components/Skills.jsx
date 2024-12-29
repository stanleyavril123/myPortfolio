import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaJs, FaJava, FaGitAlt, FaRedhat, FaLinux} from "react-icons/fa";
import CppIcon from "./svgIcon/CppIcon";
import TsIcon from "./svgIcon/TsIcon";

const skills = [
  { name: "Python", icon: <FaPython /> },
  { name: "C++", icon: <CppIcon /> },
  { name: "Java", icon: <FaJava /> },
  { name: "React", icon: <FaReact /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "TypeScript", icon: <TsIcon /> },
  { name: "GitHub", icon: <FaGitAlt /> },
  { name: "Pentesting", icon: <FaRedhat /> },
  { name: "Linux", icon: <FaLinux /> },
];

export default function Skills() {
  const [iconHovered, setIconHovered] = useState(null);

  return (
    <div id="skills" style={{ marginTop: "40px" }}>
      <Typography variant="h2" sx={{ paddingBottom: "20px", color: "#f0201c" }}>
        Skills
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {skills.map((skill, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              position: "relative",
            }}
          >
            <motion.div
              onHoverStart={() => setIconHovered(index)}
              onHoverEnd={() => setIconHovered(null)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: "40px",
                color: iconHovered === index ? "#f0201c" : "black",
                fill: iconHovered === index ? "#f0201c" : "black",
                marginBottom: "10px",
              }}
            >
              {skill.icon}
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                top: "60px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "black",
                fontSize: "0.9rem",
                opacity: iconHovered === index ? 1 : 0,
              }}
            >
              {skill.name}
            </motion.div>
          </Box>
        ))}
      </Box>
    </div>
  );
}
