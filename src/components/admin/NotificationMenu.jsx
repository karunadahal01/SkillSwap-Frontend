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
  const [anchorEl, setAnchorEl] = useState(null); // menu anchor state
  const open = Boolean(anchorEl); // is menu open?

  const handleOpen = (e) => setAnchorEl(e.currentTarget); // open menu
  const handleClose = () => setAnchorEl(null); // close menu

  // 🧠 Notifications data
  const notifications = [
    // 🔁 Swap notifications
    {
      id: 1,
      type: 'swap',
      users: 'Alice ↔ Bob',
      swap: 'Guitar for Painting',
      date: 'Oct 10, 2025',
      icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // swap icon
    },
    {
      id: 2,
      type: 'swap',
      users: 'John ↔ Sara',
      swap: 'Cooking for Yoga',
      date: 'Oct 9, 2025',
      icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // swap icon
    },
    {
      id: 3,
      type: 'swap',
      users: 'Liam ↔ Emma',
      swap: 'Photography for Coding',
      date: 'Oct 7, 2025',
      icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // swap icon
    },

    // 🧍 User/admin notifications
    {
      id: 4,
      type: 'user',
      message: 'New user registered: Olivia',
      date: 'Oct 8, 2025',
      icon: <PersonAddIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />, // new user icon
    },
    {
      id: 5,
      type: 'verification',
      message: 'User "Mark" verified successfully',
      date: 'Oct 8, 2025',
      icon: <VerifiedUserIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // verified icon
    },

    // ⚠️ System alerts
    {
      id: 6,
      type: 'alert',
      message: '3 swap requests pending review',
      date: 'Oct 6, 2025',
      icon: <ReportProblemIcon fontSize="small" sx={{ color: 'orange', mr: 1 }} />, // alert icon
    },
  ];

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}> {/* notification button */}
        <Badge badgeContent={notifications.length} color="error"> {/* badge count */}
          <NotificationsIcon /> {/* bell icon */}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl} // anchor element
        open={open}         // menu open state
        onClose={handleClose} // close menu
        PaperProps={{
          sx: {
            width: 340, // menu width
            borderRadius: 2, // rounded corners
            p: 1, // padding
          },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ px: 2, py: 1, fontWeight: 'bold', color: '#1976d2' }}
        >
          Notifications {/* menu title */}
        </Typography>
        <Divider sx={{ mb: 1 }} /> {/* divider line */}

        {notifications.map((note) => (
          <MenuItem
            key={note.id}
            onClick={handleClose} // close menu on click
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              py: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {note.icon} {/* notification icon */}
              <Typography variant="body1" sx={{ fontWeight: 500, flexGrow: 1 }}>
                {note.type === 'swap' ? note.users : note.message} {/* text */}
              </Typography>
              <Chip
                size="small"
                label={ /* type label */
                  note.type === 'swap'
                    ? 'Swap'
                    : note.type === 'user'
                    ? 'User'
                    : note.type === 'verification'
                    ? 'Verified'
                    : 'Alert'
                }
                color={ /* chip color */
                  note.type === 'swap'
                    ? 'primary'
                    : note.type === 'user'
                    ? 'success'
                    : note.type === 'verification'
                    ? 'info'
                    : 'warning'
                }
                sx={{ fontSize: '0.7rem', height: 20 }} // chip size
              />
            </Box>

            {note.swap && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.3 }}>
                {note.swap} {/* swap details */}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: 'gray', mt: 0.3 }}>
              {note.date} {/* date */}
            </Typography>
          </MenuItem>
        ))}

        <Divider sx={{ my: 1 }} /> {/* bottom divider */}
        <MenuItem
          onClick={handleClose} // close menu
          sx={{ justifyContent: 'center', fontWeight: 500, color: '#1976d2' }}
        >
          View all notifications {/* view all button */}
        </MenuItem>
      </Menu>
    </>
  );
}
