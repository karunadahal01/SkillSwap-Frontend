// src/components/admin/AvatarMenu.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { useAuth } from '@context/AuthContext';
import * as profileService from '@services/profileService';

export default function AvatarMenu({ onLogout }) {
  const { user, logout, setUser } = useAuth(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || null);
  const [username, setUsername] = useState(user?.username || '');
  const open = Boolean(anchorEl);

  // Open/close menu
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        const profile = res.data?.data;

        if (profile) {
          setAvatarUrl(profile.avatarUrl || null);
          setUsername(profile.username || '');

          // Update AuthContext so other components have updated username & avatar
          if (setUser) {
            setUser({ ...user, username: profile.username, avatarUrl: profile.avatarUrl });
          }
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Avatar Button */}
      <IconButton color="inherit" onClick={handleOpen}>
        <Avatar
          src={avatarUrl || undefined} 
          sx={{
            bgcolor: avatarUrl ? 'transparent' : '#1976d2',
            color: '#fff',
          }}
        >
          {!avatarUrl && (username?.[0]?.toUpperCase() || 'U')}
        </Avatar>
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* <Box sx={{ px: 2, py: 1 }} onClick={() => navigate('/user/profile')}>
          <Typography variant="subtitle1">{username || 'User'} </Typography>
          <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography>
        </Box> */}
        <MenuItem sx={{ px: 2, py: 1 }} onClick={() => { navigate('/user/profile'); handleClose(); }}>
          View Profile
        </MenuItem>

        <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} />

        <MenuItem
          onClick={() => {
            if (onLogout) onLogout();
            else logout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
