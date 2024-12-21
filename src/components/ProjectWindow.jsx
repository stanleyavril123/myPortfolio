import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import RotateAndSlideTransition from "./RotateAndSlideTransition";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";

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
        timeout: { enter: 300, exit: 300 },
      }}
      keepMounted
      sx={{
        "& .MuiDialog-paper": {
          maxHeight: "none",
          height: "2000px",
          overflow: "visible",
          width: "1000px",
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
      <DialogTitle>{selectedProject.title}</DialogTitle>
      <DialogContent>
        <p>Hello, this is {selectedProject.title}</p>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectWindow;
