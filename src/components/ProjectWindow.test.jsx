import { vi } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectWindow from "./ProjectWindow";

const project = {
  title: "Test Project",
  summary: "A project summary.",
  description: "A project description.",
  date: "2026",
  stack: ["React"],
  details: ["Implemented project behavior."],
  index: 0,
};

function renderPoster(overrides = {}) {
  return render(
    <ProjectWindow
      drawerState="open"
      motionMode="poster"
      selectedProject={project}
      handleClose={vi.fn()}
      handleExited={vi.fn()}
      {...overrides}
    />
  );
}

test("locks background scrolling and restores it when unmounted", () => {
  const originalOverflow = document.body.style.overflow;
  const { unmount } = renderPoster();
  expect(document.body.style.overflow).toBe("hidden");
  unmount();
  expect(document.body.style.overflow).toBe(originalOverflow);
});

test("closes using Escape or the close button", () => {
  const handleClose = vi.fn();
  renderPoster({ handleClose });
  fireEvent.keyDown(window, { key: "Escape" });
  fireEvent.click(screen.getByRole("button", { name: "Close project details" }));
  expect(handleClose).toHaveBeenCalledTimes(2);
});

test("consumes wheel input and clamps poster movement at its bounds", () => {
  renderPoster();
  const poster = screen.getByRole("dialog");
  Object.defineProperty(poster, "scrollHeight", { value: window.innerHeight + 1000 });

  expect(fireEvent.wheel(poster, { deltaY: 100, cancelable: true })).toBe(false);
  expect(poster).toHaveStyle({ transform: "translate(-50%, -100px) rotate(0deg)" });

  fireEvent.wheel(poster, { deltaY: -1000 });
  expect(poster).toHaveStyle({ transform: "translate(-50%, -0px) rotate(0deg)" });
  fireEvent.wheel(poster, { deltaY: 10000 });
  expect(poster).toHaveStyle({ transform: "translate(-50%, -1048px) rotate(0deg)" });
});
