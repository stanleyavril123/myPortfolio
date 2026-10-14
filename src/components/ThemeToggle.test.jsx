import { vi } from "vitest";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useTheme } from "@mui/material";
import ColorModeProvider from "../styles/ColorModeProvider";
import ThemeToggle from "./ThemeToggle";

function ThemeProbe() {
  const theme = useTheme();
  return <output data-testid="palette">{theme.palette.mode}:{theme.palette.background.default}</output>;
}

function Preview() {
  return <ColorModeProvider><ThemeToggle /><ThemeProbe /></ColorModeProvider>;
}

afterEach(() => localStorage.clear());

test("switches the palette and restores the saved preference on remount", async () => {
  localStorage.setItem("portfolio-color-mode", "light");
  const { unmount } = render(<Preview />);
  expect(screen.getByTestId("palette").textContent).toBe("light:#f0f0e8");
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
  expect(screen.getByTestId("palette").textContent).toBe("dark:#18221c");
  expect(screen.getByRole("button", { name: "Switch to light mode" }).getAttribute("aria-pressed")).toBe("true");
  await waitFor(() => expect(localStorage.getItem("portfolio-color-mode")).toBe("dark"));
  unmount();
  render(<Preview />);
  expect(screen.getByTestId("palette").textContent).toBe("dark:#18221c");
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(screen.getByTestId("palette").textContent).toBe("light:#f0f0e8");
});

test("uses the system theme when no preference has been saved", () => {
  const original = window.matchMedia;
  window.matchMedia = vi.fn(() => ({ matches: true }));
  try {
    render(<Preview />);
    expect(screen.getByTestId("palette").textContent).toBe("dark:#18221c");
  } finally {
    window.matchMedia = original;
  }
});
