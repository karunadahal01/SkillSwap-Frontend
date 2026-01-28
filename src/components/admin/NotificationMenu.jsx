// // src\components\admin\NotificationMenu.jsx
// import { useState } from 'react';
// import {
//   Menu,
//   MenuItem,
//   Badge,
//   IconButton,
//   Typography,
//   Divider,
//   Box,
//   Chip,
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// export default function NotificationMenu() {
//   const [anchorEl, setAnchorEl] = useState(null); // menu anchor state
//   const open = Boolean(anchorEl); // is menu open?

//   const handleOpen = (e) => setAnchorEl(e.currentTarget); // open menu
//   const handleClose = () => setAnchorEl(null); // close menu

//   // 🧠 Notifications data
//   const notifications = [
//     // 🔁 Swap notifications
//     {
//       id: 1,
//       type: 'swap',
//       users: 'Alice ↔ Bob',
//       swap: 'Guitar for Painting',
//       date: 'Oct 10, 2025',
//       icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // swap icon
//     },
//     {
//       id: 2,
//       type: 'swap',
//       users: 'John ↔ Sara',
//       swap: 'Cooking for Yoga',
//       date: 'Oct 9, 2025',
//       icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // swap icon
//     },
//     {
//       id: 3,
//       type: 'swap',
//       users: 'Liam ↔ Emma',
//       swap: 'Photography for Coding',
//       date: 'Oct 7, 2025',
//       icon: <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // swap icon
//     },

//     // 🧍 User/admin notifications
//     {
//       id: 4,
//       type: 'user',
//       message: 'New user registered: Olivia',
//       date: 'Oct 8, 2025',
//       icon: <PersonAddIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />, // new user icon
//     },
//     {
//       id: 5,
//       type: 'verification',
//       message: 'User "Mark" verified successfully',
//       date: 'Oct 8, 2025',
//       icon: <VerifiedUserIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />, // verified icon
//     },

//     // ⚠️ System alerts
//     {
//       id: 6,
//       type: 'alert',
//       message: '3 swap requests pending review',
//       date: 'Oct 6, 2025',
//       icon: <ReportProblemIcon fontSize="small" sx={{ color: 'orange', mr: 1 }} />, // alert icon
//     },
//   ];

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleOpen}> {/* notification button */}
//         <Badge badgeContent={notifications.length} color="error"> {/* badge count */}
//           <NotificationsIcon /> {/* bell icon */}
//         </Badge>
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl} // anchor element
//         open={open}         // menu open state
//         onClose={handleClose} // close menu
//         PaperProps={{
//           sx: {
//             width: 340, // menu width
//             borderRadius: 2, // rounded corners
//             p: 1, // padding
//           },
//         }}
//       >
//         <Typography
//           variant="subtitle1"
//           sx={{ px: 2, py: 1, fontWeight: 'bold', color: '#1976d2' }}
//         >
//           Notifications {/* menu title */}
//         </Typography>
//         <Divider sx={{ mb: 1 }} /> {/* divider line */}

//         {notifications.map((note) => (
//           <MenuItem
//             key={note.id}
//             onClick={handleClose} // close menu on click
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'flex-start',
//               py: 1,
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//               {note.icon} {/* notification icon */}
//               <Typography variant="body1" sx={{ fontWeight: 500, flexGrow: 1 }}>
//                 {note.type === 'swap' ? note.users : note.message} {/* text */}
//               </Typography>
//               <Chip
//                 size="small"
//                 label={ /* type label */
//                   note.type === 'swap'
//                     ? 'Swap'
//                     : note.type === 'user'
//                     ? 'User'
//                     : note.type === 'verification'
//                     ? 'Verified'
//                     : 'Alert'
//                 }
//                 color={ /* chip color */
//                   note.type === 'swap'
//                     ? 'primary'
//                     : note.type === 'user'
//                     ? 'success'
//                     : note.type === 'verification'
//                     ? 'info'
//                     : 'warning'
//                 }
//                 sx={{ fontSize: '0.7rem', height: 20 }} // chip size
//               />
//             </Box>

//             {note.swap && (
//               <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.3 }}>
//                 {note.swap} {/* swap details */}
//               </Typography>
//             )}
//             <Typography variant="caption" sx={{ color: 'gray', mt: 0.3 }}>
//               {note.date} {/* date */}
//             </Typography>
//           </MenuItem>
//         ))}

//         <Divider sx={{ my: 1 }} /> {/* bottom divider */}
//         <MenuItem
//           onClick={handleClose} // close menu
//           sx={{ justifyContent: 'center', fontWeight: 500, color: '#1976d2' }}
//         >
//           View all notifications {/* view all button */}
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }





// // src/components/admin/NotificationMenu.jsx
// import { useState, useEffect } from 'react';
// import {
//   Menu,
//   MenuItem,
//   Badge,
//   IconButton,
//   Typography,
//   Divider,
//   Box,
//   Chip,
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import MessageIcon from '@mui/icons-material/Message';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import CancelIcon from '@mui/icons-material/Cancel';
// import {
//   getUnreadNotifications,
//   getUnreadCount,
//   markNotificationAsRead,
// } from '@services/notificationService';
// import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS

// export default function NotificationMenu() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const open = Boolean(anchorEl);
//   const navigate = useNavigate(); // ✅ ADD THIS

//   // Fetch notifications when menu opens
//   useEffect(() => {
//     if (open) {
//       fetchNotifications();
//     }
//   }, [open]);

//   // Fetch unread count on mount and periodically
//   useEffect(() => {
//     fetchUnreadCount();
//     const interval = setInterval(fetchUnreadCount, 30000); // every 30 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const data = await getUnreadNotifications();
//       setNotifications(data.slice(0, 5)); // Show only 5 recent
//     } catch (error) {
//       console.error('Failed to fetch notifications');
//     }
//   };

//   const fetchUnreadCount = async () => {
//     try {
//       const count = await getUnreadCount();
//       setUnreadCount(count);
//     } catch (error) {
//       console.error('Failed to fetch unread count');
//     }
//   };

//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleNotificationClick = async (id) => {
//     try {
//       await markNotificationAsRead(id);
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//       setUnreadCount((prev) => Math.max(0, prev - 1));
//     } catch (error) {
//       console.error('Failed to mark as read');
//     }
//   };

//   // ✅ ADD THIS FUNCTION
//   const handleViewAll = () => {
//     handleClose();
//     navigate('/user/notifications'); // Navigate to notifications page
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'SWAP_REQUEST':
//         return <SwapHorizIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />;
//       case 'SWAP_ACCEPTED':
//         return <CheckCircleIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />;
//       case 'SWAP_DECLINED':
//         return <ThumbDownIcon fontSize="small" sx={{ color: 'red', mr: 1 }} />;
//       case 'SWAP_CANCELLED':
//         return <CancelIcon fontSize="small" sx={{ color: 'orange', mr: 1 }} />;
//       case 'SWAP_COMPLETION_REQUESTED':
//         return <SwapHorizIcon fontSize="small" sx={{ color: '#ff9800', mr: 1 }} />;
//       case 'SWAP_COMPLETED':
//         return <CheckCircleIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />;
//       case 'NEW_MESSAGE':
//         return <MessageIcon fontSize="small" sx={{ color: '#00897b', mr: 1 }} />;
//       case 'USER_REGISTERED':
//         return <PersonAddIcon fontSize="small" sx={{ color: 'green', mr: 1 }} />;
//       case 'USER_VERIFIED':
//         return <VerifiedUserIcon fontSize="small" sx={{ color: '#1976d2', mr: 1 }} />;
//       default:
//         return <NotificationsIcon fontSize="small" sx={{ color: 'gray', mr: 1 }} />;
//     }
//   };

//   const getChipColor = (type) => {
//     switch (type) {
//       case 'SWAP_REQUEST':
//       case 'SWAP_COMPLETION_REQUESTED':
//         return 'primary';
//       case 'SWAP_ACCEPTED':
//       case 'SWAP_COMPLETED':
//         return 'success';
//       case 'SWAP_DECLINED':
//       case 'SWAP_CANCELLED':
//         return 'error';
//       case 'NEW_MESSAGE':
//         return 'success';
//       case 'USER_VERIFIED':
//         return 'info';
//       default:
//         return 'warning';
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);

//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
//     return date.toLocaleDateString();
//   };

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleOpen}>
//         <Badge badgeContent={unreadCount} color="error">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             width: 360, // ✅ INCREASED WIDTH
//             maxWidth: '90vw', // ✅ RESPONSIVE
//             borderRadius: 2,
//             p: 1,
//           },
//         }}
//       >
//         <Typography
//           variant="subtitle1"
//           sx={{ px: 2, py: 1, fontWeight: 'bold', color: '#1976d2' }}
//         >
//           Notifications
//         </Typography>
//         <Divider sx={{ mb: 1 }} />

//         {notifications.length === 0 ? (
//           <MenuItem disabled>
//             <Typography variant="body2" color="textSecondary">
//               No new notifications
//             </Typography>
//           </MenuItem>
//         ) : (
//           notifications.map((note) => (
//             <MenuItem
//               key={note.id}
//               onClick={() => handleNotificationClick(note.id)}
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 py: 1.5,
//                 px: 2,
//                 whiteSpace: 'normal', // ✅ ALLOW TEXT WRAP
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', gap: 1 }}>
//                 {getIcon(note.type)}
                
//                 {/* ✅ FIXED TEXT CONTAINER */}
//                 <Box sx={{ flexGrow: 1, minWidth: 0 }}> {/* minWidth: 0 allows text to shrink */}
//                   <Typography 
//                     variant="body2" 
//                     sx={{ 
//                       fontWeight: 500,
//                       wordWrap: 'break-word', // ✅ BREAK LONG WORDS
//                       overflowWrap: 'break-word', // ✅ BREAK LONG WORDS
//                       hyphens: 'auto', // ✅ ADD HYPHENS
//                     }}
//                   >
//                     {note.message}
//                   </Typography>
//                 </Box>

//                 <Chip
//                   size="small"
//                   label={note.type.replace(/_/g, ' ').substring(0, 10)} // ✅ TRUNCATE LABEL
//                   color={getChipColor(note.type)}
//                   sx={{ 
//                     fontSize: '0.65rem', 
//                     height: 20,
//                     flexShrink: 0, // ✅ DON'T SHRINK CHIP
//                   }}
//                 />
//               </Box>

//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: 'gray', 
//                   mt: 0.5,
//                   ml: 4, // Align with text (icon width + gap)
//                 }}
//               >
//                 {formatDate(note.createdAt)}
//               </Typography>
//             </MenuItem>
//           ))
//         )}

//         <Divider sx={{ my: 1 }} />
        
//         {/* ✅ UPDATED "VIEW ALL" BUTTON */}
//         <MenuItem
//           onClick={handleViewAll}
//           sx={{ justifyContent: 'center', fontWeight: 500, color: '#1976d2' }}
//         >
//           View all notifications
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }



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
  Paper,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  getUnreadNotifications,
  getUnreadCount,
  markNotificationAsRead,
} from '@services/notificationService';
import { useNavigate } from 'react-router-dom';

export default function NotificationMenu() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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

  const handleViewAll = () => {
    handleClose();
    navigate('/user/notifications');
  };

  const getIcon = (type) => {
    const iconProps = {
      fontSize: 'medium',
      sx: { mr: 1.5 },
    };

    switch (type) {
      case 'SWAP_REQUEST':
        return <SwapHorizIcon {...iconProps} sx={{ color: '#667eea', mr: 1.5 }} />;
      case 'SWAP_ACCEPTED':
        return <CheckCircleIcon {...iconProps} sx={{ color: '#4caf50', mr: 1.5 }} />;
      case 'SWAP_DECLINED':
        return <ThumbDownIcon {...iconProps} sx={{ color: '#f44336', mr: 1.5 }} />;
      case 'SWAP_CANCELLED':
        return <CancelIcon {...iconProps} sx={{ color: '#ff9800', mr: 1.5 }} />;
      case 'SWAP_COMPLETION_REQUESTED':
        return <SwapHorizIcon {...iconProps} sx={{ color: '#ff9800', mr: 1.5 }} />;
      case 'SWAP_COMPLETED':
        return <CheckCircleIcon {...iconProps} sx={{ color: '#4caf50', mr: 1.5 }} />;
      case 'NEW_MESSAGE':
        return <MessageIcon {...iconProps} sx={{ color: '#00897b', mr: 1.5 }} />;
      case 'USER_REGISTERED':
        return <PersonAddIcon {...iconProps} sx={{ color: '#4caf50', mr: 1.5 }} />;
      case 'USER_VERIFIED':
        return <VerifiedUserIcon {...iconProps} sx={{ color: '#667eea', mr: 1.5 }} />;
      default:
        return <NotificationsIcon {...iconProps} sx={{ color: 'gray', mr: 1.5 }} />;
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
      <IconButton
        color="inherit"
        onClick={handleOpen}
        sx={{
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.7rem',
              fontWeight: 700,
              minWidth: 18,
              height: 18,
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            width: 420,
            maxWidth: '95vw',
            borderRadius: 3,
            mt: 1.5,
            background: isDark
              ? 'linear-gradient(135deg, #1e1e2e 0%, #2d2d3d 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            mt: -1,
            p: 2.5,
            background: isDark
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <NotificationsIcon sx={{ fontSize: 24 }} />
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.125rem' }}>
                Notifications
              </Typography>
            </Box>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
            )}
          </Box>
        </Paper>

        {/* Notifications List */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <Box
              sx={{
                p: 5,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <NotificationsIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
                No new notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
                You're all caught up!
              </Typography>
            </Box>
          ) : (
            notifications.map((note, index) => (
              <Box key={note.id}>
                <MenuItem
                  onClick={() => handleNotificationClick(note.id)}
                  sx={{
                    py: 2,
                    px: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                    whiteSpace: 'normal',
                    transition: 'all 0.2s ease',
                    background: isDark
                      ? 'rgba(102, 126, 234, 0.05)'
                      : 'rgba(102, 126, 234, 0.03)',
                    '&:hover': {
                      background: isDark
                        ? 'rgba(102, 126, 234, 0.1)'
                        : 'rgba(102, 126, 234, 0.08)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {/* Icon + Message + Chip */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      width: '100%',
                      gap: 1,
                    }}
                  >
                    {getIcon(note.type)}

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          mb: 0.5,
                        }}
                      >
                        {note.message}
                      </Typography>

                      {/* Type Chip + Time */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={note.type.replace(/_/g, ' ')}
                          size="small"
                          color={getChipColor(note.type)}
                          sx={{
                            fontSize: '0.65rem',
                            height: 20,
                            fontWeight: 600,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.7rem',
                          }}
                        >
                          {formatDate(note.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </MenuItem>

                {index < notifications.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                    }}
                  />
                )}
              </Box>
            ))
          )}
        </Box>

        {/* View All Button */}
        <Divider
          sx={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          }}
        />
        <MenuItem
          onClick={handleViewAll}
          sx={{
            py: 2,
            mb: -1,
            justifyContent: 'center',
            background: isDark
              ? 'rgba(102, 126, 234, 0.05)'
              : 'rgba(102, 126, 234, 0.03)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: isDark
                ? 'rgba(102, 126, 234, 0.1)'
                : 'rgba(102, 126, 234, 0.08)',
            },
          }}
        >
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: '0.875rem',
            }}
          >
            View all notifications
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}