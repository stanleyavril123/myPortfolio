import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

const CVMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="primary"
        startIcon={<DownloadOutlinedIcon />}
        onClick={handleClick}
        sx={{
          height: 24,
          backgroundColor: "black",
          color: "#faf6f3",
          border: "1px solid black",
          marginLeft: "8px",
        }}
      >
        CV
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#333",
            color: "#faf6f3",
            borderRadius: "8px",
          },
        }}
      >
        <a
          href="StanleyAvril_CV_EN.pdf"
          download="StanleyAvril_CV_EN.pdf"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: "#555",
              },
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            CV EN
          </MenuItem>
        </a>
        <a
          href="StanleyAvril_CV_FR.pdf"
          download="StanleyAvril_CV_FR.pdf"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: "#555",
              },
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            CV FR
          </MenuItem>
        </a>
      </Menu>
    </div>
  );
};

export default CVMenu;

