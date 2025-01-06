import React, { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Slide,
} from "@mui/material";
import GitLink from "./GitLink.jsx";

const SlideTransition = forwardRef(function SlideTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectWindow = ({ openWindow, handleClose, selectedProject }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleDialogClose = () => {
    setIsExiting(true);
  };

  const handleExited = () => {
    setIsExiting(false);
    handleClose();
  };

  if (!selectedProject) return null;

  return (
    <Dialog
      open={openWindow && !isExiting}
      onClose={handleDialogClose}
      scroll="body"
      TransitionComponent={SlideTransition}
      TransitionProps={{
        onExited: handleExited,
        timeout: { enter: 500, exit: 500 },
      }}
      keepMounted
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "none",
          background: "#eaeaea",
          width: {
            xs: "95vw",
            sm: "90vw",
            md: "80vw",
            lg: "1200px",
          },
          borderRadius: "12px",
          top: { xs: "20px", sm: "50px", lg: "100px" },
          padding: { xs: "16px", sm: "24px" },
          overflowY: "auto",
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "transparent" },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-start",
          gap: { xs: 2, sm: 5 },
        }}
      >
        <DialogTitle
          variant="h5"
          sx={{
            wordWrap: "break-word",
            whiteSpace: "normal",
            overflow: "hidden",
            margin: 0,
            flex: 1,
          }}
        >
          {selectedProject.title}
        </DialogTitle>

        <Box
          sx={{
            marginTop: { xs: 2, sm: 0 },
            flex: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
            }}
          >
            {selectedProject.description}
          </Typography>
          <GitLink
            repoLink={selectedProject.link[0]}
            text={selectedProject.link[1]}
            sx={{ marginTop: 2 }}
          />
        </Box>
      </Box>

      {/* Content */}
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {selectedProject.images.map((image, index) => (
            <img
              key={index}
              alt={`Project ${index}`}
              src={image}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectWindow;
