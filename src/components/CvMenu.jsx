import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useLanguage } from "../locales/LanguageProvider";
import { radii } from "../styles/shape";


const CVMenu = () => {
  const { data: { contact: { resume } }, ui } = useLanguage();
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
          height: 40,
          px: 1.25,
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: "primary.main",
          color: "background.paper",
          boxShadow: "none",
          textTransform: "uppercase",
          fontSize: "0.78rem",
          fontFamily: "monospace",
          "&:hover": {
            backgroundColor: "secondary.main",
            borderColor: "secondary.main",
            boxShadow: "none",
          },
        }}
      >
        {ui.resume}
      </Button>
      <Menu
        id="resume-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "resume-menu-button", sx: { p: 1 } }}
        PaperProps={{
          sx: {
            borderRadius: radii.menu,
            mt: 1,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            "& .MuiMenuItem-root": { borderRadius: radii.control },
          },
        }}
      >
        <MenuItem component="a" href={resume.en} download onClick={handleClose}>
          {ui.englishPdf}
        </MenuItem>
        <MenuItem component="a" href={resume.fr} download onClick={handleClose}>
          {ui.frenchPdf}
        </MenuItem>
      </Menu>
    </>
  );
};

export default CVMenu;
