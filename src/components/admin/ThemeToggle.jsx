// src/components/admin/ThemeToggle.jsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../context/ThemeModeContext'; // theme context

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useThemeMode(); // current mode & toggle function

  return (
    <IconButton
      color="inherit"
      onClick={toggleColorMode} // toggle light/dark mode
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} // tooltip
      sx={{ ml: 1 }} // margin left
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {/* icon based on mode */}
    </IconButton>
  );
}
