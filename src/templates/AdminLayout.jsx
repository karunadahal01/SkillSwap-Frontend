// AdminLayout.jsx (fixed)
import React, { useState } from 'react';
import { Box, CssBaseline, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '@components/admin/TopBar';
import SideBarContent from '@components/admin/SideBarContent';

const drawerWidth = 240;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => alert('Logged out!');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <TopBar toggleDrawer={toggleDrawer} onLogout={handleLogout} />

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          display: { xs: 'none', md: 'block' }, // hidden on mobile
        }}
      >
        <SideBarContent onLogout={handleLogout} />
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' }, // only show on mobile
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <SideBarContent onLogout={handleLogout} />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Box sx={{ height: 64 }} /> {/* AppBar spacing */}
        <Outlet />
      </Box>
    </Box>
  );
}
