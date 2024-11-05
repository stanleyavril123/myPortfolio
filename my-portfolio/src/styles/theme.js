import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ebe8e2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
  },
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
        fontSize: '6rem', // Customize h1 font size
        fontWeight: 1000, // Optional: set font weight
      },
      h2: {
        fontSize: '2rem', // Customize h2 font size
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem', // Customize body1 font size
      },
      body2: {
        fontSize: '0.875rem', // Customize body2 font size
      },
  }
});

export default theme;