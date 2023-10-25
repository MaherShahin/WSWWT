import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E50914',  // Netflix Red
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B20710',  // Darkened Red for Hover effects or secondary emphasis
      contrastText: '#f5f5f5',
    },
    background: {
      default: '#000000',  // Deep black for background
      paper: '#222222',  // Slightly lighter black for card backgrounds or modals
    },
    text: {
      primary: '#f5f5f5',  // Soft white
      secondary: '#b3b3b3',  // Gray for secondary text or muted details
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',  // Netflix uses Helvetica Neue predominantly
    h2: {
      fontWeight: 'bold',
      fontSize: '2.5em',
    },
    h6: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      fontSize: '1.2em',
      lineHeight: '1.4',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,  // Slightly rounded edges, not too much
          textTransform: 'none',  // Netflix buttons usually avoid capitalized texts
        },
      },
    },
  },
});

export default theme;
