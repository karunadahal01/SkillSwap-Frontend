// src/components/admin/AvatarMenu.jsx
import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { useAuth } from '@context/AuthContext';

export default function AvatarMenu() {
  const { user, logout } = useAuth(); // get current user and logout function
  const [anchorEl, setAnchorEl] = useState(null); // menu anchor state
  const open = Boolean(anchorEl); // is menu open?

  const handleOpen = (e) => setAnchorEl(e.currentTarget); // open menu
  const handleClose = () => setAnchorEl(null); // close menu

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}> {/* avatar button */}
        <Avatar   
          sx={{
            bgcolor: '#1976d2', // avatar bg color
            color: '#fff',       // avatar text color
          }}
        >
          {user?.username?.[0]?.toUpperCase() || 'U'}</Avatar> {/* first letter of username */}
      </IconButton>

      <Menu
        anchorEl={anchorEl} // anchor element
        open={open}         // menu open state
        onClose={handleClose} // close on outside click
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // menu position origin
        transformOrigin={{ vertical: 'top', horizontal: 'right' }} // menu animation origin
      >
        {/* User info */}
        <Box sx={{ px: 2, py: 1 }}> {/* padding */}
          <Typography variant="subtitle1">{user?.username || 'User'}</Typography> {/* username */}
          <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography> {/* email */}
        </Box>

        {/* Divider */}
        <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} /> {/* horizontal line */}

        {/* Logout */}
        <MenuItem
          onClick={() => {
            logout(); // call logout
            handleClose(); // close menu
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
