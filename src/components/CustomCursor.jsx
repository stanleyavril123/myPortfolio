import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const handlePointerMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsInteractive(Boolean(event.target.closest("a, button, [role='button']")));
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: isInteractive ? 32 : 24,
        height: isInteractive ? 32 : 24,
        border: "2px solid #151515",
        borderRadius: "50%",
        backgroundColor: "rgba(251, 247, 239, 0.72)",
        boxShadow: "0 0 0 1px rgba(251, 247, 239, 0.9), 0 0 18px rgba(21, 21, 21, 0.18)",
        pointerEvents: "none",
        zIndex: 10000,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.86 : 1})`,
        transition:
          "width 140ms ease, height 140ms ease, transform 110ms ease, background-color 140ms ease",
      }}
    />
  );
}
