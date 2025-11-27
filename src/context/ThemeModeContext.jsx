// src/context/ThemeModeContext.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from '@config/theme';

const ThemeModeContext = React.createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = React.useState(() => {
    try {
      const saved = localStorage.getItem('themeMode');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const toggleColorMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('themeMode', next); } catch {}
      return next;
    });
  }, []);

  // memoize theme object to avoid regenerating on every render
  const theme = React.useMemo(() => getDesignTokens(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

// custom hook for easy consumption
export function useThemeMode() {
  return React.useContext(ThemeModeContext);
}

export default ThemeModeContext;
