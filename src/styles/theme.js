import { createTheme } from "@mui/material/styles";

const filmGrainTexture = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4efe7",
    },
    secondary: {
      main: "#c82016",
    },
    background: {
      default: "#f4efe7",
      paper: "#fbf7ef",
    },
    text: {
      primary: "#151515",
      secondary: "#5f5a51",
    },
    divider: "rgba(21, 21, 21, 0.2)",
  },
  typography: {
    fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "4.8rem",
      lineHeight: 0.9,
      fontWeight: 900,
      color: "#151515",
      letterSpacing: 0,
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "3.2rem",
      },
    },
    h2: {
      fontSize: "2.65rem",
      lineHeight: 0.95,
      fontWeight: 900,
      color: "#151515",
      letterSpacing: 0,
      textTransform: "uppercase",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "1.18rem",
      lineHeight: 1.15,
      fontWeight: 900,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    h4: {
      fontSize: "0.92rem",
      lineHeight: 1.25,
      fontWeight: 900,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 900,
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
      fontWeight: 900,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          minHeight: "100%",
        },
        body: {
          margin: 0,
          minHeight: "100%",
          backgroundColor: "#f4efe7",
          cursor: "default",
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.08,
            mixBlendMode: "multiply",
            backgroundImage: `url("${filmGrainTexture}")`,
            backgroundSize: "180px 180px",
            backgroundRepeat: "repeat",
          },
        },
        "#root": {
          minHeight: "100%",
        },
        "@media (hover: hover) and (pointer: fine)": {
          "*, *::before, *::after": {
            cursor: "none !important",
          },
        },
        "a, button, [role=\"button\"]": {
          cursor: "pointer",
        },
        "::selection": {
          backgroundColor: "#c82016",
          color: "#fbf7ef",
        },
      },
    },
  },
});

export default theme;
