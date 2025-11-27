// src/components/admin/ThemeToggle.jsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../context/ThemeModeContext';

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <IconButton
      color="inherit"
      onClick={toggleColorMode}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      sx={{ ml: 1 }}
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
