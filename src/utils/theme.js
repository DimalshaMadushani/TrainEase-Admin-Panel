// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CD3F3E',  // Dark Red
    },
    secondary: {
      main: '#FF9C91',  // Light Red
    },
    background: {
      default: '#F4F6F6',  // Light Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C2938',  // Dark Blue
      secondary: '#FF9C91',
    },
  },
});

export default theme;
