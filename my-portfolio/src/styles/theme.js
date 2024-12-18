import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ebe8e2',
    },
    secondary: {
      main: '#800020'
    },
    background: {
      default: "#faf6f3",
    },

  },
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '4rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.3rem',
      fontWeight: 700
    },
    body1: {
      fontSize: '0.7rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    body3: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          height: '100%',
        },
        body: {
          margin: 0,
          minHeight: '100%',
        },
        '#root': {
          height: '100%',
        },
        '.circle': {
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#005b49',
          display: 'inline-block'
        }
      },
    },
  },
});

export default theme;
