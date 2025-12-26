// src/components/admin/AvatarMenu.jsx
import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { useAuth } from '@context/AuthContext';

export default function AvatarMenu() {
  const { user, logout } = useAuth(); // get user data & logout function
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Avatar   
          sx={{
            bgcolor: '#1976d2', // background color
            color: '#fff',       // text color
          }}
        >
          {user?.username?.[0]?.toUpperCase() || 'U'}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* User info */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{user?.username || 'User'}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography>
        </Box>

        {/* Divider */}
        <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} />

        {/* Logout */}
        <MenuItem
          onClick={() => {
            logout(); // clear user & redirect
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
