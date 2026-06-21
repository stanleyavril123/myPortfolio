import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitLink from "./GitLink.jsx";

const DetailBlock = ({ number, children }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "42px 1fr", sm: "64px 1fr" },
      gap: 2,
      py: { xs: 2.25, sm: 3 },
      borderTop: "1px solid",
      borderColor: "divider",
    }}
  >
    <Typography sx={{ color: "secondary.main", fontWeight: 900, lineHeight: 1, fontSize: "1.4rem" }}>
      {number}
    </Typography>
    <Typography variant="body2" sx={{ lineHeight: 1.52, fontWeight: 720, fontSize: { sm: "1.05rem" } }}>
      {children}
    </Typography>
  </Box>
);

const PosterSection = ({ label, children, accent = false }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "150px 1fr" },
      gap: { xs: 1.5, sm: 3 },
      px: { xs: 2.5, sm: 4 },
      py: { xs: 3, sm: 4.5 },
      borderTop: "1px solid",
      borderColor: accent ? "text.primary" : "divider",
      backgroundColor: accent ? "rgba(200, 32, 22, 0.055)" : "transparent",
    }}
  >
    <Typography variant="h3" component="p" sx={{ color: "secondary.main" }}>
      {label}
    </Typography>
    <Box>{children}</Box>
  </Box>
);

const stateStyles = {
  closed: {
    transform: "translate(-50%, calc(100% + 48px)) rotate(-1deg)",
    opacity: 1,
    width: "min(760px, calc(100vw - 56px))",
    maxHeight: 220,
    pointerEvents: "none",
  },
  peek: {
    transform: "translate(calc(-50% + 38px), calc(100% - 58px)) rotate(-2deg)",
    opacity: 1,
    width: "min(760px, calc(100vw - 56px))",
    maxHeight: 220,
    pointerEvents: "none",
  },
  open: {
    transform: "translate(-50%, 0) rotate(0deg)",
    opacity: 1,
    width: "min(780px, calc(100vw - 48px))",
    maxHeight: "calc(100vh - 48px)",
    pointerEvents: "auto",
  },
};

const ProjectWindow = ({ drawerState, motionMode, handleClose, handleExited, selectedProject }) => {
  const posterRef = useRef(null);
  const dragRef = useRef({ dragging: false, startY: 0, startOffset: 0 });
  const [posterOffset, setPosterOffset] = useState(0);
  const [isDraggingPoster, setIsDraggingPoster] = useState(false);

  useEffect(() => {
    if (drawerState !== "open") setPosterOffset(0);
  }, [drawerState, selectedProject?.title]);

  useEffect(() => {
    if (drawerState !== "open") return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [drawerState]);

  if (!selectedProject) return null;

  const link = selectedProject.link || [];
  const details = selectedProject.details || [];
  const projectNumber = String((selectedProject.index || 0) + 1).padStart(2, "0");
  const isOpen = drawerState === "open";
  const isPeek = drawerState === "peek";
  const transitionTiming =
    motionMode === "poster"
      ? "transform 1050ms cubic-bezier(0.16, 1, 0.3, 1), width 900ms cubic-bezier(0.16, 1, 0.3, 1), max-height 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms ease, box-shadow 720ms ease"
      : "transform 210ms cubic-bezier(0.2, 0.8, 0.2, 1), width 210ms cubic-bezier(0.2, 0.8, 0.2, 1), max-height 210ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 120ms ease, box-shadow 180ms ease";

  const getMaxPosterOffset = () => {
    if (typeof window === "undefined" || !posterRef.current) return 0;

    const visibleHeight = window.innerHeight - 48;
    return Math.max(0, posterRef.current.scrollHeight - visibleHeight);
  };

  const clampPosterOffset = (offset) => {
    const maxOffset = getMaxPosterOffset();
    return Math.min(Math.max(offset, 0), maxOffset);
  };

  const handlePosterWheel = (event) => {
    if (!isOpen) return;

    const maxOffset = getMaxPosterOffset();
    if (maxOffset === 0) return;

    event.preventDefault();
    setPosterOffset((currentOffset) => clampPosterOffset(currentOffset + event.deltaY));
  };

  const handlePosterPointerDown = (event) => {
    if (!isOpen || event.button !== 0) return;
    if (event.target.closest('button, a, [role="button"]')) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      dragging: true,
      startY: event.clientY,
      startOffset: posterOffset,
    };
    setIsDraggingPoster(true);
  };

  const handlePosterPointerMove = (event) => {
    if (!dragRef.current.dragging) return;

    event.preventDefault();
    const deltaY = event.clientY - dragRef.current.startY;
    setPosterOffset(clampPosterOffset(dragRef.current.startOffset - deltaY));
  };

  const stopPosterDrag = (event) => {
    if (!dragRef.current.dragging) return;

    dragRef.current.dragging = false;
    setIsDraggingPoster(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleTransitionEnd = (event) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === "transform" &&
      drawerState === "closed"
    ) {
      handleExited();
    }
  };

  return (
    <>
      <Box
        aria-hidden={!isOpen}
        onClick={isOpen ? handleClose : undefined}
        onWheel={(event) => { if (isOpen) event.preventDefault(); }}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1290,
          backgroundColor: "rgba(21, 21, 21, 0.58)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 760ms ease",
        }}
      />

      <Box
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby={isOpen ? "project-dialog-title" : undefined}
        aria-hidden={!isOpen && !isPeek}
        ref={posterRef}
        onWheel={handlePosterWheel}
        onPointerDown={handlePosterPointerDown}
        onPointerMove={handlePosterPointerMove}
        onPointerUp={stopPosterDrag}
        onPointerCancel={stopPosterDrag}
        onTransitionEnd={handleTransitionEnd}
        sx={{
          position: "fixed",
          left: "50%",
          bottom: 0,
          zIndex: 1300,
          border: "1px solid",
          borderColor: "text.primary",
          backgroundColor: "background.paper",
          backgroundImage: "linear-gradient(0deg, #fbf7ef, #fbf7ef)",
          boxShadow: isOpen
            ? "0 24px 80px rgba(21, 21, 21, 0.22)"
            : "0 -18px 70px rgba(21, 21, 21, 0.18)",
          overflow: "visible",
          cursor: isOpen ? (isDraggingPoster ? "grabbing" : "grab") : undefined,
          userSelect: isDraggingPoster ? "none" : undefined,
          touchAction: isOpen ? "none" : undefined,
          transition: transitionTiming,
          ...stateStyles[drawerState],
          transform: isOpen
            ? `translate(-50%, -${posterOffset}px) rotate(0deg)`
            : stateStyles[drawerState].transform,
          display: { xs: drawerState === "peek" ? "none" : "block", lg: "block" },
          "@media (hover: none), (pointer: coarse)": {
            display: drawerState === "peek" ? "none" : "block",
          },
        }}
      >
        <Box sx={{ minHeight: isOpen ? "150vh" : 620, backgroundColor: "background.paper" }}>
          <Box
            sx={{
              minHeight: { xs: 520, sm: 660 },
              backgroundColor: "text.primary",
              color: "background.paper",
              p: { xs: 2.5, sm: 4 },
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              gap: 4,
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: 2,
                pb: 2,
                borderBottom: "1px solid rgba(251, 247, 239, 0.35)",
              }}
            >
              <Typography sx={{ color: "secondary.main", fontSize: "2.65rem", lineHeight: 0.85, fontWeight: 900 }}>
                {projectNumber}
              </Typography>
              <Typography sx={{ fontWeight: 900, textTransform: "uppercase", lineHeight: 1.15 }}>
                {selectedProject.label || "Selected project"}
              </Typography>
            </Box>

            <Box sx={{ alignSelf: "center" }}>
              <Typography
                id="project-dialog-title"
                component="h2"
                sx={{
                  fontSize: { xs: "3.75rem", sm: "6.2rem" },
                  lineHeight: 0.76,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  color: "background.paper",
                  wordBreak: "break-word",
                  maxWidth: 620,
                }}
              >
                {selectedProject.title}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "secondary.main", fontWeight: 900, textTransform: "uppercase", mb: 1 }}>
                {selectedProject.date}
              </Typography>
              <Typography sx={{ lineHeight: 1.42, fontWeight: 760, maxWidth: 620 }}>
                {selectedProject.summary}
              </Typography>
            </Box>

            {isOpen ? (
              <IconButton
                aria-label="Close project details"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 14,
                  top: 14,
                  borderRadius: 0,
                  color: "background.paper",
                  border: "1px solid rgba(251, 247, 239, 0.45)",
                  "&:hover": {
                    color: "secondary.main",
                    borderColor: "secondary.main",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </Box>

          <PosterSection label="Overview">
            <Typography variant="body2" sx={{ lineHeight: 1.68, fontWeight: 700, fontSize: { sm: "1.08rem" } }}>
              {selectedProject.description}
            </Typography>
          </PosterSection>

          <PosterSection label="Build" accent>
            {details.map((detail, index) => (
              <DetailBlock key={detail} number={String(index + 1).padStart(2, "0")}>
                {detail}
              </DetailBlock>
            ))}
          </PosterSection>

          <PosterSection label="Stack">
            <Typography variant="body2" sx={{ lineHeight: 1.7, fontWeight: 900, textTransform: "uppercase" }}>
              {selectedProject.stack.join(" / ")}
            </Typography>
            {isOpen ? <GitLink repoLink={link[0]} text={link[1]} /> : null}
          </PosterSection>

          <Box
            sx={{
              px: { xs: 2.5, sm: 4 },
              py: { xs: 5, sm: 7 },
              borderTop: "1px solid",
              borderColor: "divider",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 2,
              alignItems: "end",
            }}
          >
            <Typography
              sx={{
                color: "secondary.main",
                fontSize: { xs: "3rem", sm: "5rem" },
                lineHeight: 0.78,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Case<br />Study
            </Typography>
            <Typography sx={{ color: "text.secondary", fontWeight: 900, textAlign: "right" }}>
              {projectNumber}<br />Stanley Avril
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProjectWindow;
