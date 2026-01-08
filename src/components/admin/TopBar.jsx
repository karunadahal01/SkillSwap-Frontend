// src/templates/TopBar.jsx
import { AppBar, Toolbar, Box, IconButton, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationMenu from '@components/admin/NotificationMenu';
import AvatarMenu from '@components/admin/AvatarMenu';
import ThemeToggle from '@components/admin/ThemeToggle';
import Logo from '@assets/skillswap-logo.png';
import { Navigate, useNavigate } from 'react-router-dom';

export default function TopBar({ onLogout, toggleDrawer }) {
  const theme = useTheme(); // to detect current mode (light/dark)
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : theme.palette.background.paper,
        color: "white",
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {/* Hamburger for mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { md: 'none' } }} // hide on desktop
        >
          <MenuIcon /> {/* hamburger icon */}
        </IconButton>

        {/* Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: 52, mr: 1.5 }} onClick={() => navigate("/admin")} />
        </Box>

        {/* Right-side actions */}
        <NotificationMenu />
        <AvatarMenu onLogout={onLogout} />
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
