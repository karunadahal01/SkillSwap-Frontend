import { useState } from 'react';
import {
  Menu,
  MenuItem,
  Badge,
  IconButton,
  Typography,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // 🧠 Notifications (mix of swaps + admin system events)
  const notifications = [
    // 🔁 Swap-related notifications
    {
      id: 1,
      type: 'swap',
      users: 'Alice ↔ Bob',
      swap: 'Guitar for Painting',
      date: 'Oct 10, 2025',
      icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />,
    },
    {
      id: 2,
      type: 'swap',
      users: 'John ↔ Sara',
      swap: 'Cooking for Yoga',
      date: 'Oct 9, 2025',
      icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />,
    },
    {
      id: 3,
      type: 'swap',
      users: 'Liam ↔ Emma',
      swap: 'Photography for Coding',
      date: 'Oct 7, 2025',
      icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />,
    },

    // 🧍 Admin or user-management notifications
    {
      id: 4,
      type: 'user',
      message: 'New user registered: Olivia',
      date: 'Oct 8, 2025',
      icon: <PersonAddIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />,
    },
    {
      id: 5,
      type: 'verification',
      message: 'User "Mark" verified successfully',
      date: 'Oct 8, 2025',
      icon: <VerifiedUserIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />,
    },

    // ⚠️ System alerts
    {
      id: 6,
      type: 'alert',
      message: '3 swap requests pending review',
      date: 'Oct 6, 2025',
      icon: <ReportProblemIcon fontSize="small" sx={{ color: 'orange', mr: 1 }} />,
    },
  ];

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 340,
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ px: 2, py: 1, fontWeight: 'bold', color: '#1976d2' }}
        >
          Notifications
        </Typography>
        <Divider sx={{ mb: 1 }} />

        {notifications.map((note) => (
          <MenuItem
            key={note.id}
            onClick={handleClose}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              py: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {note.icon}
              <Typography variant="body1" sx={{ fontWeight: 500, flexGrow: 1 }}>
                {note.type === 'swap' ? note.users : note.message}
              </Typography>
              <Chip
                size="small"
                label={
                  note.type === 'swap'
                    ? 'Swap'
                    : note.type === 'user'
                    ? 'User'
                    : note.type === 'verification'
                    ? 'Verified'
                    : 'Alert'
                }
                color={
                  note.type === 'swap'
                    ? 'primary'
                    : note.type === 'user'
                    ? 'success'
                    : note.type === 'verification'
                    ? 'info'
                    : 'warning'
                }
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
            </Box>

            {note.swap && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.3 }}>
                {note.swap}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: 'gray', mt: 0.3 }}>
              {note.date}
            </Typography>
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} />
        <MenuItem
          onClick={handleClose}
          sx={{ justifyContent: 'center', fontWeight: 500, color: '#1976d2' }}
        >
          View all notifications
        </MenuItem>
      </Menu>
    </>
  );
}


