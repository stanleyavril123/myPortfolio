import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Projects from "./Projects";
import ProjectMedia from "./ProjectMedia";
import ProjectWindow from "./ProjectWindow";
import LanguageProvider from "../locales/LanguageProvider";

const project = {
  title: "Example", date: "2026", summary: "Working example", stack: ["Rust"],
  media: { kind: "video", src: "/demos/example.mp4", poster: "/demos/example.png", sampleData: true },
  demoUrl: "https://example.com/demo",
};

afterEach(() => localStorage.clear());

test("clicking a list card opens its details and video without a separate details button", async () => {
  render(<Projects />);
  const card = screen.getByRole("button", { name: "Open details for SpaceMind" });
  expect(card.querySelectorAll('a, button')).toHaveLength(0);
  expect(screen.queryByText("Project details")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Video demonstration of SpaceMind")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("heading", { name: "SpaceMind" }));
  expect(await screen.findByRole("dialog", { name: "SpaceMind" })).toBeInTheDocument();
  expect(screen.getByLabelText("Video demonstration of SpaceMind")).toBeInTheDocument();
});

test("the video appears only inside open project details with native playback controls", () => {
  const { rerender } = render(<ProjectWindow selectedProject={project} drawerState="peek" motionMode="peek" handleClose={jest.fn()} />);
  expect(screen.queryByLabelText("Video demonstration of Example")).not.toBeInTheDocument();
  rerender(<ProjectWindow selectedProject={project} drawerState="open" motionMode="poster" handleClose={jest.fn()} />);
  const video = screen.getByLabelText("Video demonstration of Example");
  expect(video.closest('[role="dialog"]')).toBe(screen.getByRole("dialog"));
  expect(video).toHaveAttribute("controls");
  expect(video).toHaveAttribute("preload", "none");
  expect(video).not.toHaveAttribute("autoplay");
});

test("shows a translated fallback when video loading fails", () => {
  localStorage.setItem("portfolio-language", "fr");
  render(<LanguageProvider><ProjectMedia project={project} /></LanguageProvider>);
  expect(screen.getByText("Démo enregistrée · Fichiers de démonstration")).toBeInTheDocument();
  fireEvent.error(screen.getByLabelText("Démonstration vidéo de Example"));
  expect(screen.getByText("Impossible de charger l’aperçu.")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Voir en plein format" })).toBeInTheDocument();
});

test("uses a still poster for animated GIFs when reduced motion is requested", () => {
  const original = window.matchMedia;
  window.matchMedia = jest.fn(query => ({ matches: query.includes("prefers-reduced-motion"), addListener: jest.fn(), removeListener: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  try {
    render(<ProjectMedia project={{ ...project, media: { kind: "gif", src: "/demos/example.gif", poster: "/demos/still.png" } }} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/demos/still.png");
  } finally { window.matchMedia = original; }
});
