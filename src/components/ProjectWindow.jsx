import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import React from "react";

const ProjectWindow = ({ openWindow, handleClose, selectedProject }) => {
  if (!selectedProject) return null;
  return (
    <Dialog
      open={openWindow}
      onClose={handleClose}
      scroll="body"
      maxWidth={false}
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
