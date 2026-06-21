import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import data from "../data.json";

const { resume } = data.contact;

const CVMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        id="resume-menu-button"
        aria-controls={open ? "resume-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        startIcon={<DownloadOutlinedIcon />}
        onClick={handleClick}
        sx={{
          height: 36,
          px: 1.25,
          borderRadius: 0,
          border: "1px solid",
          borderColor: "text.primary",
          backgroundColor: "text.primary",
          color: "background.paper",
          boxShadow: "none",
          textTransform: "uppercase",
          fontSize: "0.78rem",
          "&:hover": {
            backgroundColor: "secondary.main",
            borderColor: "secondary.main",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "3px solid rgba(200, 32, 22, 0.3)",
            outlineOffset: 3,
          },
        }}
      >
        Resume
      </Button>
      <Menu
        id="resume-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "resume-menu-button" }}
        PaperProps={{
          sx: {
            borderRadius: 0,
            mt: 1,
            border: "1px solid",
            borderColor: "text.primary",
            backgroundColor: "background.paper",
          },
        }}
      >
        <MenuItem component="a" href={resume.en} download onClick={handleClose}>
          English PDF
        </MenuItem>
        <MenuItem component="a" href={resume.fr} download onClick={handleClose}>
          French PDF
        </MenuItem>
      </Menu>
    </>
  );
};

export default CVMenu;
