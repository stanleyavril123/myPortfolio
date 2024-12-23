import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "motion/react";
import { FaReact, FaPython, FaJs, FaJava } from "react-icons/fa";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Python", icon: <FaPython /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Java", icon: <FaJava /> },
];

export default function Skills() {
  return (
    <div id="skills" style={{ marginTop: "40px" }}>
      <Typography variant="h2" sx={{ paddingBottom: "20px", color: "#f0201c" }}>
        Skills
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
      >
        {skills.map((skill, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              position: "relative",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: "40px",
                color: "#f0201c",
                marginBottom: "10px",
              }}
            >
              {skill.icon}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "60px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(240, 32, 28, 0.8)",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
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
