import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C69749',  
      contrastText: '#FFF', 
    },
    secondary: {
      main: '#735F32',    
      contrastText: '#FFF', 
    },
    background: {
      default: '#000000',
      paper: '#1C1E28',  
    },
    text: {
      primary: '#C69749',  
      secondary: '#735F32',  
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
