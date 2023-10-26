// Updated theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C69749',  // Brighter gold
      contrastText: '#FFF',  // White text for better readability
    },
    secondary: {
      main: '#735F32',  // Darker gold
      contrastText: '#FFF',  // White text for better readability
    },
    background: {
      default: '#000000',  // Pure black background
      paper: '#1C1E28',  // Slightly lighter than before, but still dark
    },
    text: {
      primary: '#C69749',  // Brighter gold
      secondary: '#735F32',  // Darker gold
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h2: {
      fontWeight: 'bold',
      fontSize: '2.5em',
      textShadow: '1px 1px 2px #1C1E28',
    },
    h6: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '1.2em',
      lineHeight: '1.4',
    },
  },
});

export default theme;
