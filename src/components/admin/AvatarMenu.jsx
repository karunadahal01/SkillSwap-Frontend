// // src/components/admin/AvatarMenu.jsx
// import { useState } from 'react';
// import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
// import { useAuth } from '@context/AuthContext';

// export default function AvatarMenu() {
//   const { user, logout } = useAuth(); // get current user and logout function
//   const [anchorEl, setAnchorEl] = useState(null); // menu anchor state
//   const open = Boolean(anchorEl); // is menu open?

//   const handleOpen = (e) => setAnchorEl(e.currentTarget); // open menu
//   const handleClose = () => setAnchorEl(null); // close menu

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleOpen}> {/* avatar button */}
//         <Avatar   
//           sx={{
//             bgcolor: '#1976d2', // avatar bg color
//             color: '#fff',       // avatar text color
//           }}
//         >
//           {user?.username?.[0]?.toUpperCase() || 'U'}</Avatar> {/* first letter of username */}
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl} // anchor element
//         open={open}         // menu open state
//         onClose={handleClose} // close on outside click
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // menu position origin
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }} // menu animation origin
//       >
//         {/* User info */}
//         <Box sx={{ px: 2, py: 1 }}> {/* padding */}
//           <Typography variant="subtitle1">{user?.username || 'User'}</Typography> {/* username */}
//           <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography> {/* email */}
//         </Box>

//         {/* Divider */}
//         <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} /> {/* horizontal line */}

//         {/* Logout */}
//         <MenuItem
//           onClick={() => {
//             logout(); // call logout
//             handleClose(); // close menu
//           }}
//         >
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }





// // src/components/admin/AvatarMenu.jsx
// import { useState } from 'react';
// import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
// import { useAuth } from '@context/AuthContext';

// export default function AvatarMenu() {
//   const { user, logout } = useAuth(); // user always has latest avatar
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Open/close menu
//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   return (
//     <>
//       {/* Avatar Button */}
//       <IconButton color="inherit" onClick={handleOpen}>
//         <Avatar
//           src={user?.avatarUrl || undefined} // use avatar from context
//           sx={{
//             bgcolor: user?.avatarUrl ? 'transparent' : '#1976d2', // fallback color
//             color: '#fff',
//           }}
//         >
//           {/* fallback to first letter if no avatar */}
//           {!user?.avatarUrl && (user?.username?.[0]?.toUpperCase() || 'U')}
//         </Avatar>
//       </IconButton>

//       {/* Dropdown Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         {/* User Info */}
//         <Box sx={{ px: 2, py: 1 }}>
//           <Typography variant="subtitle1">{user?.username || 'User'}</Typography>
//           <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography>
//         </Box>

//         {/* Divider */}
//         <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} />

//         {/* Logout */}
//         <MenuItem
//           onClick={() => {
//             logout();
//             handleClose();
//           }}
//         >
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }



// // src/components/admin/AvatarMenu.jsx
// import { useState, useEffect } from 'react';
// import { Avatar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
// import { useAuth } from '@context/AuthContext';
// import * as profileService from '@services/profileService';

// export default function AvatarMenu({ onLogout }) {
//   const { user, logout, setUser } = useAuth(); // setUser allows updating context
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || null);
//   const open = Boolean(anchorEl);

//   // Open/close menu handlers
//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   // Fetch latest avatar on mount (in case user updated it)
//   useEffect(() => {
//     const fetchAvatar = async () => {
//       try {
//         const res = await profileService.getProfile();
//         const data = res.data.data;
//         setAvatarUrl(data.avatarUrl || null);

//         // Update AuthContext so other components get latest avatar
//         if (setUser) {
//           setUser({ ...user, avatarUrl: data.avatarUrl || null });
//         }
//       } catch (err) {
//         console.error('Failed to fetch user avatar:', err);
//       }
//     };

//     fetchAvatar();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       {/* Avatar Button */}
//       <IconButton color="inherit" onClick={handleOpen}>
//         <Avatar
//           src={avatarUrl || undefined} // show avatar if exists
//           sx={{
//             bgcolor: avatarUrl ? 'transparent' : '#1976d2',
//             color: '#fff',
//           }}
//         >
//           {!avatarUrl && (user?.username?.[0]?.toUpperCase() || 'U')}
//         </Avatar>
//       </IconButton>

//       {/* Dropdown Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         {/* User Info */}
//         <Box sx={{ px: 2, py: 1 }}>
//           <Typography variant="subtitle1">{user?.username || 'User'}</Typography>
//           <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography>
//         </Box>

//         {/* Divider */}
//         <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} />

//         {/* Logout */}
//         <MenuItem
//           onClick={() => {
//             if (onLogout) onLogout();
//             else logout();
//             handleClose();
//           }}
//         >
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }




// src/components/admin/AvatarMenu.jsx
import { useState, useEffect } from 'react';
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
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{username || 'User'}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.email || 'No Email'}</Typography>
        </Box>

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
