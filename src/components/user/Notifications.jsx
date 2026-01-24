// src/components/admin/NotificationMenu.jsx
import { useState, useEffect } from 'react';
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
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  getUnreadNotifications,
  getUnreadCount,
  markNotificationAsRead,
} from '@services/notificationService';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS

export default function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // ✅ ADD THIS

  // Fetch notifications when menu opens
  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open]);

  // Fetch unread count on mount and periodically
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getUnreadNotifications();
      setNotifications(data.slice(0, 5)); // Show only 5 recent
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Failed to fetch unread count');
    }
  };

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNotificationClick = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read');
    }
  };

  // ✅ ADD THIS FUNCTION
  const handleViewAll = () => {
    handleClose();
    navigate('/user/notifications'); // Navigate to notifications page
  };

  const getIcon = (type) => {
    switch (type) {
      case 'SWAP_REQUEST':
        return <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />;
      case 'SWAP_ACCEPTED':
        return <CheckCircleIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />;
      case 'SWAP_DECLINED':
        return <ThumbDownIcon fontSize="small" sx={{ color: 'red', mr: 1 }} />;
      case 'SWAP_CANCELLED':
        return <CancelIcon fontSize="small" sx={{ color: 'orange', mr: 1 }} />;
      case 'SWAP_COMPLETION_REQUESTED':
        return <SwapHorizIcon fontSize="small" sx={{ color: '#ff9800', mr: 1 }} />;
      case 'SWAP_COMPLETED':
        return <CheckCircleIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />;
      case 'NEW_MESSAGE':
        return <MessageIcon fontSize="small" sx={{ color: '#00897b', mr: 1 }} />;
      case 'USER_REGISTERED':
        return <PersonAddIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />;
      case 'USER_VERIFIED':
        return <VerifiedUserIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />;
      default:
        return <NotificationsIcon fontSize="small" sx={{ color: 'gray', mr: 1 }} />;
    }
  };

  const getChipColor = (type) => {
    switch (type) {
      case 'SWAP_REQUEST':
      case 'SWAP_COMPLETION_REQUESTED':
        return 'primary';
      case 'SWAP_ACCEPTED':
      case 'SWAP_COMPLETED':
        return 'success';
      case 'SWAP_DECLINED':
      case 'SWAP_CANCELLED':
        return 'error';
      case 'NEW_MESSAGE':
        return 'success';
      case 'USER_VERIFIED':
        return 'info';
      default:
        return 'warning';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360, // ✅ INCREASED WIDTH
            maxWidth: '90vw', // ✅ RESPONSIVE
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

        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">
              No new notifications
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((note) => (
            <MenuItem
              key={note.id}
              onClick={() => handleNotificationClick(note.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1.5,
                px: 2,
                whiteSpace: 'normal', // ✅ ALLOW TEXT WRAP
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', gap: 1 }}>
                {getIcon(note.type)}
                
                {/* ✅ FIXED TEXT CONTAINER */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}> {/* minWidth: 0 allows text to shrink */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      wordWrap: 'break-word', // ✅ BREAK LONG WORDS
                      overflowWrap: 'break-word', // ✅ BREAK LONG WORDS
                      hyphens: 'auto', // ✅ ADD HYPHENS
                    }}
                  >
                    {note.message}
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label={note.type.replace(/_/g, ' ').substring(0, 10)} // ✅ TRUNCATE LABEL
                  color={getChipColor(note.type)}
                  sx={{ 
                    fontSize: '0.65rem', 
                    height: 20,
                    flexShrink: 0, // ✅ DON'T SHRINK CHIP
                  }}
                />
              </Box>

              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'gray', 
                  mt: 0.5,
                  ml: 4, // Align with text (icon width + gap)
                }}
              >
                {formatDate(note.createdAt)}
              </Typography>
            </MenuItem>
          ))
        )}

        <Divider sx={{ my: 1 }} />
        
        {/* ✅ UPDATED "VIEW ALL" BUTTON */}
        <MenuItem
          onClick={handleViewAll}
          sx={{ justifyContent: 'center', fontWeight: 500, color: '#1976d2' }}
        >
          View all notifications
        </MenuItem>
      </Menu>
    </>
  );
}