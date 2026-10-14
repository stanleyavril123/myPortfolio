import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import VimMode from "./VimMode";
import LanguageProvider from "../locales/LanguageProvider";
import Projects from "./Projects";
import ColorModeProvider from "../styles/ColorModeProvider";
import ThemeToggle from "./ThemeToggle";

test.each([
  ["light", "#f0f0e8", "#202b23"],
  ["dark", "#18221c", "#f0f0e8"],
])("the command bar and Vim screen keep the %s site palette", async (mode, background, foreground) => {
  localStorage.setItem("portfolio-color-mode", mode);
  render(<ColorModeProvider><LanguageProvider><ThemeToggle /><VimMode /></LanguageProvider></ColorModeProvider>);
  fireEvent.keyDown(window, { key: ":" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveStyle({ backgroundColor: background, color: foreground });
  fireEvent.keyDown(window, { key: "w" });
  fireEvent.keyDown(window, { key: "Enter" });
  const dialog = await screen.findByRole("dialog");
  expect(dialog).toHaveStyle({ backgroundColor: background, color: foreground });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveStyle({ backgroundColor: background, color: foreground });
});

const command = (key, target = window) => {
  fireEvent.keyDown(target, { key: ":" });
  fireEvent.keyDown(target, { key });
  fireEvent.keyDown(target, { key: "Enter" });
};

afterEach(() => localStorage.clear());

test("h and l switch buffers without intercepting a command", async () => {
  render(<LanguageProvider><VimMode /></LanguageProvider>);
  command("w");
  await screen.findByRole("dialog");
  expect(screen.getByRole("button", { name: "dotfiles.md" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(window, { key: "l" });
  expect(screen.getByRole("button", { name: "portfolio.md" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("## Projects")).toBeInTheDocument();
  fireEvent.keyDown(window, { key: "h" });
  expect(screen.getByRole("button", { name: "dotfiles.md" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(window, { key: ":" });
  fireEvent.keyDown(window, { key: "l" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveTextContent(":l");
  expect(screen.getByRole("button", { name: "dotfiles.md" })).toHaveAttribute("aria-pressed", "true");
});

test("commands wait for Enter and can be edited after an invalid command", async () => {
  render(<LanguageProvider><VimMode /></LanguageProvider>);
  fireEvent.keyDown(window, { key: ":" });
  fireEvent.keyDown(window, { key: "w" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveTextContent(":w");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.keyDown(window, { key: "Enter" });
  await screen.findByRole("dialog");
  fireEvent.keyDown(window, { key: ":" });
  fireEvent.keyDown(window, { key: "x" });
  fireEvent.keyDown(window, { key: "Enter" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveTextContent("Unknown command");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.keyDown(window, { key: "Backspace" });
  fireEvent.keyDown(window, { key: "q" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveTextContent(":q");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.keyDown(window, { key: "Enter" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("typing colon reveals the command bar, Escape cancels it, and :w enters the mode", async () => {
  render(<LanguageProvider><VimMode /></LanguageProvider>);
  expect(screen.queryByRole("status", { name: "Vim command bar" })).not.toBeInTheDocument();
  fireEvent.keyDown(window, { key: ":" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveTextContent(":");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.queryByRole("status", { name: "Vim command bar" })).not.toBeInTheDocument();
  command("w");
  await screen.findByRole("dialog");
  fireEvent.keyDown(window, { key: ":" });
  expect(screen.getByRole("status", { name: "Vim command bar" })).toHaveTextContent("Esc: cancel");
  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  command("q");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(screen.queryByRole("status", { name: "Vim command bar" })).not.toBeInTheDocument();
});

test("the hidden project opens dotfiles and quitting restores focus to its trigger", async () => {
  render(<LanguageProvider><Projects /><VimMode /></LanguageProvider>);
  const trigger = screen.getByRole("button", { name: "Explore hidden project: dotfiles" });
  trigger.focus();
  fireEvent.click(trigger);
  expect(await screen.findByRole("dialog", { name: "~/.config/stanley" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "dotfiles.md" })).toHaveAttribute("aria-pressed", "true");
  command("q");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

test("enters with :w, links the dotfiles, and exits with :q", async () => {
  render(<LanguageProvider><VimMode /></LanguageProvider>);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  command("w");
  expect(await screen.findByRole("dialog", { name: "~/.config/stanley" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github.com\/stanleyavril123\/dotfiles/ })).toHaveAttribute("href", "https://github.com/stanleyavril123/dotfiles");
  command("q");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("Escape and backdrop clicks keep the mode open, and the status-bar :q exits", async () => {
  const { container } = render(<LanguageProvider><VimMode /></LanguageProvider>);
  command("w");
  const dialog = await screen.findByRole("dialog");
  fireEvent.keyDown(dialog, { key: "Escape", code: "Escape", keyCode: 27 });
  expect(dialog).toBeInTheDocument();
  const backdrop = container.ownerDocument.querySelector(".MuiBackdrop-root");
  fireEvent.mouseDown(backdrop);
  fireEvent.mouseUp(backdrop);
  fireEvent.click(backdrop);
  expect(dialog).toBeInTheDocument();
  command("w");
  expect(dialog).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Quit (:q)" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("does not intercept typing or open over another dialog", () => {
  const { rerender } = render(<><input aria-label="Editor" /><VimMode /></>);
  command("w", screen.getByRole("textbox"));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  rerender(<><div role="dialog" aria-label="Project details" /><VimMode /></>);
  command("w");
  expect(screen.queryByRole("dialog", { name: "~/.config/stanley" })).not.toBeInTheDocument();
});

test("shows translated portfolio content and provides an accessible exit", async () => {
  localStorage.setItem("portfolio-language", "fr");
  render(<LanguageProvider><VimMode /></LanguageProvider>);
  command("w");
  await screen.findByRole("dialog");
  expect(screen.getByText("Bienvenue dans mon coin du terminal.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "portfolio.md" }));
  expect(screen.getByText("## Compétences")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Quitter le mode caché" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});
