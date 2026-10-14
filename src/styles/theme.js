import { createTheme } from "@mui/material/styles";
import { radii, focusRing } from "./shape";
import { accentColors, surfaceColors } from "./colors";

// Fine monochrome noise keeps the surface textured without colored speckles.
const filmGrainTexture = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><filter id="noise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="2" intercept="-0.5"/><feFuncG type="linear" slope="2" intercept="-0.5"/><feFuncB type="linear" slope="2" intercept="-0.5"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>`
)}`;

export const createPortfolioTheme = (mode = "light") => {
const dark = mode === "dark";
const foreground = dark ? surfaceColors.light : "#202b23";
const background = dark ? surfaceColors.dark : surfaceColors.light;
return createTheme({
  shape: { borderRadius: 8 },
  palette: {
    mode,
    primary: {
      main: dark ? accentColors.onDark : accentColors.main,
    },
    secondary: {
      main: dark ? accentColors.onDark : accentColors.main,
    },
    warning: { main: dark ? "#ff9566" : "#c84205" },
    background: {
      default: background,
      paper: dark ? surfaceColors.darkPaper : surfaceColors.lightPaper,
    },
    text: {
      primary: foreground,
      secondary: dark ? "#afbbb0" : "#59665a",
    },
    divider: dark ? "rgba(240, 240, 232, 0.22)" : "rgba(32, 43, 35, 0.19)",
  },
  typography: {
    fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "4.25rem",
      lineHeight: 0.96,
      fontWeight: 500,
      color: foreground,
      letterSpacing: 0,
      textTransform: "none",
      "@media (max-width:600px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontSize: "2.5rem",
      lineHeight: 1.1,
      fontWeight: 500,
      color: foreground,
      letterSpacing: 0,
      textTransform: "none",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "1.18rem",
      lineHeight: 1.15,
      fontWeight: 500,
      letterSpacing: 0,
      textTransform: "none",
    },
    h4: {
      fontSize: "0.92rem",
      lineHeight: 1.25,
      fontWeight: 500,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    body1: {
      fontSize: "0.8rem",
      letterSpacing: 0,
    },
    body2: {
      fontSize: "0.98rem",
      letterSpacing: 0,
    },
    button: {
      letterSpacing: 0,
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: radii.control, "&:focus-visible": focusRing },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: radii.control, "&:focus-visible": focusRing },
      },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { borderRadius: radii.control } },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          minHeight: "100%",
        },
        body: {
          margin: 0,
          minHeight: "100%",
          backgroundColor: background,
          cursor: "default",
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: dark ? 0.12 : 0.24,
            mixBlendMode: dark ? "screen" : "multiply",
            backgroundImage: `url("${filmGrainTexture}")`,
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
          },
        },
        "#root": {
          minHeight: "100%",
        },
        "body, :where(#root *), body::before, :where(.MuiPaper-root)": {
          transition: "background-color 500ms ease, color 500ms ease, border-color 500ms ease, opacity 500ms ease",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "html": { scrollBehavior: "auto" },
          "body, #root *, body::before, .MuiPaper-root": { transition: "none !important" },
        },
        "a, button, [role=\"button\"]": {
          cursor: "pointer",
        },
        "::selection": {
          backgroundColor: dark ? accentColors.onDark : accentColors.main,
          color: dark ? accentColors.main : "#ffffff",
        },
      },
    },
  },
});
};

export default createPortfolioTheme();
