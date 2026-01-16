// src/utils/themes/theme.js
import { createTheme } from '@mui/material/styles';

export default function getDesignTokens(mode = 'light') {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: { main: isLight ? '#092f64ff' : '#7986cb' }, // calm blue-purple
      secondary: { main: isLight ? '#26a69a' : '#4db6ac' }, // friendly teal

      background: {
        default: isLight ? '#f4f6f8' : '#191818ff',
        paper: isLight ? '#ffffff' : '#1e1e1e',
        auth: isLight ? '#ffffff' : '#000000',
      },
      text: {
        primary: isLight ? '#000000ff' : '#eaeaea',
        secondary: isLight ? '#555555' : '#bdbdbd',
      },
    },
    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      button: { textTransform: 'none' },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: isLight ? undefined : '0 2px 6px rgba(0,0,0,0.6)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
    },
  });
}
