import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ebe8e2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 1000,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth', // Enables smooth scrolling globally
        },
        body: {
          margin: 0, // Removes default margin
          height: '100%', // Ensures full height for the body
          overflow: 'hidden', // Prevent scrolling on the body
        },
        '#root': {
          height: '100%', // Ensures the root div takes the full height
        },
      },
    },
  },
});

export default theme;
