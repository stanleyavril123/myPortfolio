import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FocusTrap from "@mui/material/Unstable_TrapFocus";
import GitLink from "./GitLink.jsx";
import { DRAWER_TIMING } from "./useProjectDrawer";
import { useLanguage, localizeProject } from "../locales/LanguageProvider";
import { panelTopRadius } from "../styles/shape";
import ProjectMedia from "./ProjectMedia";
import { alpha } from "@mui/material/styles";
import { accentColors } from "../styles/colors";
import ProjectAsciiArt from "./ProjectAsciiArt";

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
    <Typography sx={{ color: "secondary.main", fontFamily: "monospace", lineHeight: 1, fontSize: "0.9rem" }}>
      {number}
    </Typography>
    <Typography variant="body2" sx={{ lineHeight: 1.7, fontWeight: 400, fontSize: { sm: "1.05rem" } }}>
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
      backgroundColor: theme => accent ? alpha(theme.palette.primary.main, 0.045) : "transparent",
    }}
  >
    <Typography variant="h3" component="p" sx={{ color: "secondary.main", fontFamily: "monospace", fontSize: "0.85rem", textTransform: "uppercase" }}>
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

const ProjectWindow = ({ drawerState, motionMode, handleClose, selectedProject: project }) => {
  const { language, ui } = useLanguage();
  const selectedProject = localizeProject(project, language);
  const posterRef = useRef(null);
  const dragRef = useRef({ dragging: false, startY: 0, startOffset: 0 });
  const [posterOffset, setPosterOffset] = useState(0);
  const [isDraggingPoster, setIsDraggingPoster] = useState(false);

  useEffect(() => {
    if (drawerState !== "open") {
      setPosterOffset(0);
      dragRef.current.dragging = false;
      setIsDraggingPoster(false);
    }
  }, [drawerState, selectedProject?.title]);

  useEffect(() => {
    if (drawerState !== "open") return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [drawerState]);

  useEffect(() => {
    if (drawerState !== "open") return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerState, handleClose]);

  useEffect(() => {
    const poster = posterRef.current;
    if (drawerState !== "open" || !poster) return undefined;

    // A native non-passive listener lets us consume wheel input reliably.
    const handleWheel = (event) => {
      event.preventDefault();
      const visibleHeight = window.innerHeight - 48;
      const maxOffset = Math.max(0, poster.scrollHeight - visibleHeight);
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? visibleHeight : 1);
      setPosterOffset((offset) => Math.min(Math.max(offset + delta, 0), maxOffset));
    };
    poster.addEventListener("wheel", handleWheel, { passive: false });
    return () => poster.removeEventListener("wheel", handleWheel);
  }, [drawerState]);

  if (!selectedProject) return null;

  const link = selectedProject.link || [];
  const details = selectedProject.details || [];
  const projectNumber = String((selectedProject.index || 0) + 1).padStart(2, "0");
  const isOpen = drawerState === "open";
  const transitionTiming =
    motionMode === "poster"
      ? `transform ${DRAWER_TIMING.poster}ms cubic-bezier(0.16, 1, 0.3, 1), width 900ms cubic-bezier(0.16, 1, 0.3, 1), max-height 900ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 720ms ease`
      : `transform ${DRAWER_TIMING.peek}ms cubic-bezier(0.2, 0.8, 0.2, 1), width 210ms cubic-bezier(0.2, 0.8, 0.2, 1), max-height 210ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 180ms ease`;

  const getMaxPosterOffset = () => {
    if (typeof window === "undefined" || !posterRef.current) return 0;

    const visibleHeight = window.innerHeight - 48;
    return Math.max(0, posterRef.current.scrollHeight - visibleHeight);
  };

  const clampPosterOffset = (offset) => {
    const maxOffset = getMaxPosterOffset();
    return Math.min(Math.max(offset, 0), maxOffset);
  };

  const handlePosterPointerDown = (event) => {
    if (!isOpen || event.button !== 0) return;
    if (event.target.closest('button, a, video, [role="button"]')) return;

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

  return (
    <>
      <Box
        aria-hidden="true"
        onClick={isOpen ? handleClose : undefined}
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

      <FocusTrap open={isOpen}>
      <Box
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby={isOpen ? "project-dialog-title" : undefined}
        aria-hidden={!isOpen}
        tabIndex={-1}
        ref={posterRef}
        onPointerDown={handlePosterPointerDown}
        onPointerMove={handlePosterPointerMove}
        onPointerUp={stopPosterDrag}
        onPointerCancel={stopPosterDrag}
        onLostPointerCapture={stopPosterDrag}
        sx={{
          position: "fixed",
          left: "50%",
          bottom: 0,
          zIndex: 1300,
          border: 0,
          outline: "none",
          backgroundColor: "background.paper",
          borderRadius: panelTopRadius,
          boxShadow: isOpen
            ? "0 24px 80px rgba(21, 21, 21, 0.22)"
            : "0 -18px 70px rgba(21, 21, 21, 0.18)",
          overflow: isOpen ? "visible" : "hidden",
          cursor: isOpen ? (isDraggingPoster ? "grabbing" : "grab") : undefined,
          userSelect: isDraggingPoster ? "none" : undefined,
          touchAction: isOpen ? "none" : undefined,
          transition: isDraggingPoster ? "none" : transitionTiming,
          ...stateStyles[drawerState],
          transform: isOpen
            ? `translate(-50%, -${posterOffset}px) rotate(0deg)`
            : stateStyles[drawerState].transform,
          "@media (hover: none), (pointer: coarse)": {
            display: drawerState === "peek" ? "none" : "block",
          },
        }}
      >
        <Box sx={{ minHeight: isOpen ? "150vh" : 620, backgroundColor: "background.paper", borderRadius: panelTopRadius }}>
          <Box
            sx={{
              minHeight: { xs: 520, sm: 660 },
              backgroundColor: accentColors.main,
              borderRadius: panelTopRadius,
              overflow: "hidden",
              "& > :not([aria-hidden])": { position: "relative", zIndex: 1 },
              color: accentColors.onDark,
              p: { xs: 2.5, sm: 4 },
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              gap: 4,
              position: "relative",
            }}
          >
            <ProjectAsciiArt project={selectedProject} large />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: 2,
                pb: 2,
                borderBottom: "1px solid rgba(207, 227, 213, 0.25)",
                pr: 5,
              }}
            >
              <Typography sx={{ color: accentColors.onDark, fontSize: "1rem", fontFamily: "monospace", lineHeight: 1 }}>
                {projectNumber}
              </Typography>
              <Typography sx={{ fontWeight: 400, fontFamily: "monospace", fontSize: "0.8rem", textTransform: "uppercase", lineHeight: 1.4 }}>
                {selectedProject.label || ui.selectedProject}
              </Typography>
            </Box>

            <Box sx={{ alignSelf: "center" }}>
              <Typography
                id="project-dialog-title"
                component="h2"
                sx={{
                  fontSize: { xs: "3rem", sm: "4.75rem" },
                  lineHeight: 0.98,
                  fontWeight: 500,
                  color: accentColors.onDark,
                  wordBreak: "break-word",
                  maxWidth: 620,
                }}
              >
                {selectedProject.title}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: accentColors.onDark, fontFamily: "monospace", fontSize: "0.85rem", textTransform: "uppercase", mb: 1.5 }}>
                {selectedProject.date}
              </Typography>
              <Typography sx={{ lineHeight: 1.65, fontWeight: 400, maxWidth: 620 }}>
                {selectedProject.summary}
              </Typography>
            </Box>

            {isOpen ? (
              <IconButton
                aria-label={ui.closeProject}
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 14,
                  top: 14,
                  width: 40,
                  height: 40,
                  color: accentColors.onDark,
                  border: "1px solid rgba(207, 227, 213, 0.45)",
                  "&:hover": {
                    color: accentColors.onDark,
                    borderColor: "secondary.main",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </Box>

          {isOpen && selectedProject.media ? <PosterSection label={ui.demo}><ProjectMedia key={selectedProject.media.src} project={selectedProject} /></PosterSection> : null}
          <PosterSection label={ui.overview}>
            <Typography variant="body2" sx={{ lineHeight: 1.7, fontWeight: 400, fontSize: { sm: "1.08rem" } }}>
              {selectedProject.description}
            </Typography>
          </PosterSection>

          <PosterSection label={ui.build} accent>
            {details.map((detail, index) => (
              <DetailBlock key={detail} number={String(index + 1).padStart(2, "0")}>
                {detail}
              </DetailBlock>
            ))}
          </PosterSection>

          <PosterSection label={ui.stack}>
            <Typography variant="body2" sx={{ lineHeight: 1.7, fontFamily: "monospace", textTransform: "uppercase" }}>
              {selectedProject.stack.join(" / ")}
            </Typography>
            {isOpen ? <GitLink repoLink={link[0]} text={link[1]} /> : null}
            {isOpen && selectedProject.demoUrl ? <GitLink repoLink={selectedProject.demoUrl} text={ui.liveDemo} /> : null}
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
                fontWeight: 500,
              }}
            >
              {ui.selected}<br />{ui.work}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.85rem", textAlign: "right" }}>
              {projectNumber}<br />Stanley Avril
            </Typography>
          </Box>
        </Box>
      </Box>
      </FocusTrap>
    </>
  );
};

export default ProjectWindow;
