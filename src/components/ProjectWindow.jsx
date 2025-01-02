import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
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
      maxWidth={false}
      TransitionComponent={SlideTransition}
      TransitionProps={{
        onExited: handleExited,
        timeout: { enter: 500, exit: 500 },
      }}
      keepMounted
      sx={{
        "& .MuiDialog-paper": {
          maxHeight: "none",
          background: "#eaeaea",
          height: "2700px",
          overflow: "visible",
          width: "1200px",
          borderRadius: "12px",
          top: "300px",
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "transparent" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <DialogTitle
          variant="h5"
          sx={{
            maxWidth: "550px",
            wordWrap: "break-word",
            whiteSpace: "normal",
            overflow: "hidden",
            margin: 0,
          }}
        >
          {selectedProject.title}
        </DialogTitle>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 10,
            paddingTop: "70px",
          }}
        >
          <Typography variant="body2">{selectedProject.description}</Typography>
          <GitLink
            repoLink={selectedProject.link[0]}
            text={selectedProject.link[1]}
          />
        </Box>
      </Box>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
          }}
        >
          {selectedProject.images.map((image, index) => (
            <img
              alt=""
              key={index}
              src={image}
              style={{ height: "auto", width: "1100px", borderRadius: "10px" }}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectWindow;
