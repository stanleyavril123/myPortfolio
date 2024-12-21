import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ebe8e2",
    },
    secondary: {
      main: "#800020",
    },
    background: {
      default: "#faf6f3",
    },
  },
  typography: {
    fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "5.7rem",
      fontWeight: 750,
      color: "#f0201c",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 500,
      color: "#f0201c",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "7rem",
      fontWeight: 600,
      color: "#f0201c",
    },
    body1: {
      fontSize: "0.7rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    body3: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          height: "100%",
        },
        body: {
          margin: 0,
          minHeight: "100%",
        },
        "#root": {
          height: "100%",
        },
        ".square": {
          width: "8px",
          height: "8px",
          background: "#f0201c",
          display: "inline-block",
        },
        "::selection": {
          backgroundColor: "#800020",
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
