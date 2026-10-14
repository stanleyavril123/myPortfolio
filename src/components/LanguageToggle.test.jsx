import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import LanguageProvider from "../locales/LanguageProvider";
import ColorModeProvider from "../styles/ColorModeProvider";
import { localizeProject } from "../locales/LanguageProvider";
import data from "../data.json";

const Preview = () => <ColorModeProvider><LanguageProvider><App /></LanguageProvider></ColorModeProvider>;

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = "en";
});

test("translates the portfolio, saves the language, and restores it on remount", async () => {
  const { unmount } = render(<Preview />);
  expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Passer en français" }));
  expect(screen.getByRole("heading", { name: "À propos" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Compétences" })).toBeInTheDocument();
  expect(screen.getByText("déc. 2025 - juin 2026")).toBeInTheDocument();
  expect(document.documentElement.lang).toBe("fr");
  expect(screen.getByRole("button", { name: "Activer le mode sombre" })).toBeInTheDocument();
  await waitFor(() => expect(localStorage.getItem("portfolio-language")).toBe("fr"));
  unmount();
  render(<Preview />);
  expect(screen.getByRole("heading", { name: "À propos" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));
  expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  expect(screen.getByText("Dec 2025 - Jun 2026")).toBeInTheDocument();
  expect(document.documentElement.lang).toBe("en");
});

test("opens the selected project's French details with translated controls", async () => {
  localStorage.setItem("portfolio-language", "fr");
  render(<Preview />);
  fireEvent.click(screen.getByRole("button", { name: "Voir les détails de Agent IA de réservation par SMS" }));
  expect(await screen.findByRole("dialog", { name: "Agent IA de réservation par SMS" })).toBeInTheDocument();
  expect(screen.getByText("Présentation")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Fermer les détails du projet" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Fermer les détails du projet" }));
});

test("every project's content is translated and can be restored without losing its index or link", () => {
  data.projects.forEach((project, index) => {
    const french = localizeProject({ ...project, index }, "fr");
    expect(french.summary).not.toBe(project.summary);
    expect(french.description).not.toBe(project.description);
    expect(french.details).toHaveLength(project.details.length);
    const english = localizeProject(french, "en");
    expect(english.title).toBe(project.title);
    expect(english.summary).toBe(project.summary);
    expect(english.index).toBe(index);
    if (project.link) expect(english.link).toEqual(project.link);
  });
});
