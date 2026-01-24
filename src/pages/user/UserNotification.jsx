// // src/pages/user/UserNotification.jsx
// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Chip,
//   Paper,
//   Divider,
//   Button,
//   CircularProgress,
//   Container,
// } from '@mui/material';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import MessageIcon from '@mui/icons-material/Message';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import {
//   getAllNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from '@services/notificationService';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export default function UserNotification() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch notifications on component mount
//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllNotifications();
//       setNotifications(data);
//     } catch (error) {
//       toast.error('Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark single notification as read
//   const handleMarkAsRead = async (id) => {
//     try {
//       await markNotificationAsRead(id);
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
//       );
//       toast.success('Marked as read');
//     } catch (error) {
//       toast.error('Failed to mark as read');
//     }
//   };

//   // Mark all as read
//   const handleMarkAllAsRead = async () => {
//     try {
//       await markAllNotificationsAsRead();
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//       toast.success('All notifications marked as read');
//     } catch (error) {
//       toast.error('Failed to mark all as read');
//     }
//   };

//   // Navigate to swap details
//   const handleNotificationClick = (notification) => {
//     // Mark as read if not already
//     if (!notification.isRead) {
//       handleMarkAsRead(notification.id);
//     }

//     // Navigate based on type
//     if (
//       notification.type.startsWith('SWAP_') &&
//       notification.relatedEntityId
//     ) {
//       navigate('/swaps'); // Navigate to swaps page
//     } else if (notification.type === 'NEW_MESSAGE') {
//       navigate('/messages'); // Navigate to messages page
//     }
//   };

//   // Get icon based on notification type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'SWAP_REQUEST':
//         return <SwapHorizIcon sx={{ color: '#1976d2' }} />;
//       case 'SWAP_ACCEPTED':
//         return <CheckCircleIcon sx={{ color: 'green' }} />;
//       case 'SWAP_DECLINED':
//         return <ThumbDownIcon sx={{ color: 'red' }} />;
//       case 'SWAP_CANCELLED':
//         return <CancelIcon sx={{ color: 'orange' }} />;
//       case 'SWAP_COMPLETION_REQUESTED':
//         return <SwapHorizIcon sx={{ color: '#ff9800' }} />;
//       case 'SWAP_COMPLETED':
//         return <CheckCircleIcon sx={{ color: 'green' }} />;
//       case 'NEW_MESSAGE':
//         return <MessageIcon sx={{ color: '#00897b' }} />;
//       case 'USER_REGISTERED':
//         return <PersonAddIcon sx={{ color: 'green' }} />;
//       case 'USER_VERIFIED':
//         return <VerifiedUserIcon sx={{ color: '#1976d2' }} />;
//       default:
//         return <NotificationsIcon sx={{ color: 'gray' }} />;
//     }
//   };

//   // Get color based on type
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
//         return 'default';
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);

//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
//     if (diffInHours < 48) return 'Yesterday';
//     return date.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="md">
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4" fontWeight="bold">
//           Notifications
//         </Typography>
//         {notifications.some((n) => !n.isRead) && (
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={handleMarkAllAsRead}
//             startIcon={<CheckCircleIcon />}
//           >
//             Mark all as read
//           </Button>
//         )}
//       </Box>

//       {/* Notifications List */}
//       {notifications.length === 0 ? (
//         <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
//           <NotificationsIcon sx={{ fontSize: 80, color: 'gray', mb: 2 }} />
//           <Typography variant="h6" color="textSecondary" gutterBottom>
//             No notifications yet
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             When you receive notifications, they'll appear here
//           </Typography>
//         </Paper>
//       ) : (
//         <Paper elevation={2} sx={{ borderRadius: 2 }}>
//           <List disablePadding>
//             {notifications.map((notification, index) => (
//               <Box key={notification.id}>
//                 <ListItem
//                   sx={{
//                     backgroundColor: notification.isRead ? 'transparent' : '#f0f7ff',
//                     '&:hover': { backgroundColor: '#f5f5f5' },
//                     cursor: 'pointer',
//                     py: 2,
//                     px: 3,
//                   }}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <ListItemIcon sx={{ minWidth: 48 }}>
//                     {getIcon(notification.type)}
//                   </ListItemIcon>

//                   <ListItemText
//                     primary={
//                       <Box display="flex" alignItems="center" gap={1} mb={0.5}>
//                         <Typography 
//                           variant="body1" 
//                           fontWeight={notification.isRead ? 400 : 600}
//                           sx={{ flexGrow: 1 }}
//                         >
//                           {notification.message}
//                         </Typography>
//                         {!notification.isRead && (
//                           <Chip 
//                             label="New" 
//                             color="error" 
//                             size="small" 
//                             sx={{ height: 22, fontSize: '0.75rem' }} 
//                           />
//                         )}
//                       </Box>
//                     }
//                     secondary={
//                       <Box display="flex" alignItems="center" gap={1} mt={0.5}>
//                         <Chip
//                           label={notification.type.replace(/_/g, ' ')}
//                           color={getChipColor(notification.type)}
//                           size="small"
//                           sx={{ fontSize: '0.7rem', height: 20 }}
//                         />
//                         <Typography variant="caption" color="textSecondary">
//                           {formatDate(notification.createdAt)}
//                         </Typography>
//                       </Box>
//                     }
//                   />

//                   {!notification.isRead && (
//                     <IconButton
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleMarkAsRead(notification.id);
//                       }}
//                       sx={{ ml: 1 }}
//                     >
//                       <CheckCircleIcon fontSize="small" color="primary" />
//                     </IconButton>
//                   )}
//                 </ListItem>

//                 {index < notifications.length - 1 && <Divider />}
//               </Box>
//             ))}
//           </List>
//         </Paper>
//       )}
//     </Container>
//   );
// }




// // src/pages/user/UserNotification.jsx
// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   Chip,
//   Paper,
//   Divider,
//   Button,
//   CircularProgress,
//   Container,
// } from '@mui/material';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import MessageIcon from '@mui/icons-material/Message';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import {
//   getAllNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from '@services/notificationService';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export default function UserNotification() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch notifications on component mount
//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllNotifications();
//       setNotifications(data);
//     } catch (error) {
//       toast.error('Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark single notification as read
//   const handleMarkAsRead = async (id) => {
//     try {
//       await markNotificationAsRead(id);
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
//       );
//       toast.success('Marked as read');
//     } catch (error) {
//       toast.error('Failed to mark as read');
//     }
//   };

//   // Mark all as read
//   const handleMarkAllAsRead = async () => {
//     try {
//       await markAllNotificationsAsRead();
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//       toast.success('All notifications marked as read');
//     } catch (error) {
//       toast.error('Failed to mark all as read');
//     }
//   };

//   // ✅ UPDATED: Navigate to related page
//   const handleNotificationClick = (notification) => {
//     // Mark as read if not already
//     if (!notification.isRead) {
//       handleMarkAsRead(notification.id);
//     }

//     // Navigate based on type
//     if (
//       notification.type.startsWith('SWAP_') &&
//       notification.relatedEntityId
//     ) {
//       navigate('/user/swaps'); // ✅ FIXED: Added /user prefix
//     } else if (notification.type === 'NEW_MESSAGE') {
//       navigate('/user/messages'); // ✅ FIXED: Added /user prefix
//     }
//   };

//   // Get icon based on notification type
//   const getIcon = (type) => {
//     switch (type) {
//       case 'SWAP_REQUEST':
//         return <SwapHorizIcon sx={{ color: '#1976d2' }} />;
//       case 'SWAP_ACCEPTED':
//         return <CheckCircleIcon sx={{ color: 'green' }} />;
//       case 'SWAP_DECLINED':
//         return <ThumbDownIcon sx={{ color: 'red' }} />;
//       case 'SWAP_CANCELLED':
//         return <CancelIcon sx={{ color: 'orange' }} />;
//       case 'SWAP_COMPLETION_REQUESTED':
//         return <SwapHorizIcon sx={{ color: '#ff9800' }} />;
//       case 'SWAP_COMPLETED':
//         return <CheckCircleIcon sx={{ color: 'green' }} />;
//       case 'NEW_MESSAGE':
//         return <MessageIcon sx={{ color: '#00897b' }} />;
//       case 'USER_REGISTERED':
//         return <PersonAddIcon sx={{ color: 'green' }} />;
//       case 'USER_VERIFIED':
//         return <VerifiedUserIcon sx={{ color: '#1976d2' }} />;
//       default:
//         return <NotificationsIcon sx={{ color: 'gray' }} />;
//     }
//   };

//   // Get color based on type
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
//         return 'default';
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);

//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
//     if (diffInHours < 48) return 'Yesterday';
//     return date.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="md">
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4" fontWeight="bold">
//           Notifications
//         </Typography>
//         {notifications.some((n) => !n.isRead) && (
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={handleMarkAllAsRead}
//             startIcon={<CheckCircleIcon />}
//           >
//             Mark all as read
//           </Button>
//         )}
//       </Box>

//       {/* Notifications List */}
//       {notifications.length === 0 ? (
//         <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
//           <NotificationsIcon sx={{ fontSize: 80, color: 'gray', mb: 2 }} />
//           <Typography variant="h6" color="textSecondary" gutterBottom>
//             No notifications yet
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             When you receive notifications, they'll appear here
//           </Typography>
//         </Paper>
//       ) : (
//         <Paper elevation={2} sx={{ borderRadius: 2 }}>
//           <List disablePadding>
//             {notifications.map((notification, index) => (
//               <Box key={notification.id}>
//                 <ListItem
//                   sx={{
//                     backgroundColor: notification.isRead ? 'transparent' : '#f0f7ff',
//                     '&:hover': { backgroundColor: '#f5f5f5' },
//                     cursor: 'pointer',
//                     py: 2,
//                     px: 3,
//                   }}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <ListItemIcon sx={{ minWidth: 48 }}>
//                     {getIcon(notification.type)}
//                   </ListItemIcon>

//                   <ListItemText
//                     primary={
//                       <Box display="flex" alignItems="center" gap={1} mb={0.5}>
//                         <Typography 
//                           variant="body1" 
//                           fontWeight={notification.isRead ? 400 : 600}
//                           sx={{ flexGrow: 1 }}
//                         >
//                           {notification.message}
//                         </Typography>
//                         {!notification.isRead && (
//                           <Chip 
//                             label="New" 
//                             color="error" 
//                             size="small" 
//                             sx={{ height: 22, fontSize: '0.75rem' }} 
//                           />
//                         )}
//                       </Box>
//                     }
//                     secondary={
//                       <Box display="flex" alignItems="center" gap={1} mt={0.5}>
//                         <Chip
//                           label={notification.type.replace(/_/g, ' ')}
//                           color={getChipColor(notification.type)}
//                           size="small"
//                           sx={{ fontSize: '0.7rem', height: 20 }}
//                         />
//                         <Typography variant="caption" color="textSecondary">
//                           {formatDate(notification.createdAt)}
//                         </Typography>
//                       </Box>
//                     }
//                   />

//                   {!notification.isRead && (
//                     <IconButton
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleMarkAsRead(notification.id);
//                       }}
//                       sx={{ ml: 1 }}
//                     >
//                       <CheckCircleIcon fontSize="small" color="primary" />
//                     </IconButton>
//                   )}
//                 </ListItem>

//                 {index < notifications.length - 1 && <Divider />}
//               </Box>
//             ))}
//           </List>
//         </Paper>
//       )}
//     </Container>
//   );
// }




// src/pages/user/UserNotification.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Paper,
  Button,
  CircularProgress,
  Container,
  Stack,
  IconButton,
  useTheme,
  Alert,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import {
  getAllNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '@services/notificationService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserNotification() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getAllNotifications();
      setNotifications(data);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  // Mark single notification as read
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  // Navigate to related page
  const handleNotificationClick = (notification) => {
    // Mark as read if not already
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }

    // Navigate based on type
    if (
      notification.type.startsWith('SWAP_') &&
      notification.relatedEntityId
    ) {
      navigate('/user/swaps');
    } else if (notification.type === 'NEW_MESSAGE') {
      navigate('/user/messages');
    }
  };

  // Get icon with gradient background
  const getIconWithBackground = (type) => {
    const iconMap = {
      SWAP_REQUEST: { icon: <SwapHorizIcon />, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      SWAP_ACCEPTED: { icon: <CheckCircleIcon />, gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
      SWAP_DECLINED: { icon: <ThumbDownIcon />, gradient: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)' },
      SWAP_CANCELLED: { icon: <CancelIcon />, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      SWAP_COMPLETION_REQUESTED: { icon: <SwapHorizIcon />, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
      SWAP_COMPLETED: { icon: <CheckCircleIcon />, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
      NEW_MESSAGE: { icon: <MessageIcon />, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
      USER_REGISTERED: { icon: <PersonAddIcon />, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      USER_VERIFIED: { icon: <VerifiedUserIcon />, gradient: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)' },
    };

    const config = iconMap[type] || { 
      icon: <NotificationsIcon />, 
      gradient: 'linear-gradient(135deg, #868f96 0%, #596164 100%)' 
    };

    return (
      <Box
        sx={{
          width: { xs: 44, sm: 50 },
          height: { xs: 44, sm: 50 },
          borderRadius: 2,
          background: config.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box sx={{ color: 'white', fontSize: { xs: 24, sm: 28 } }}>
          {config.icon}
        </Box>
      </Box>
    );
  };

  // Get color based on type
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
        return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        py: 6,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark
              ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: { xs: 1, sm: 2 } }}>
                <NotificationsActiveIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
                  Notifications
                </Typography>
                {unreadCount > 0 && (
                  <Chip
                    label={unreadCount}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  />
                )}
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                Stay updated with your skill swap activities
              </Typography>
            </Box>

            {unreadCount > 0 && (
              <Button
                variant="contained"
                size="small"
                onClick={handleMarkAllAsRead}
                startIcon={<MarkEmailReadIcon />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                  px: { xs: 2, sm: 2.5 },
                  py: { xs: 0.75, sm: 1 },
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                Mark all as read
              </Button>
            )}
          </Stack>
        </Paper>

        {/* Stats Alert */}
        {unreadCount > 0 && (
          <Alert
            severity="info"
            icon={<NotificationsIcon />}
            sx={{
              mb: { xs: 2, sm: 3 },
              borderRadius: 2,
              background: isDark
                ? 'rgba(102, 126, 234, 0.1)'
                : 'rgba(102, 126, 234, 0.08)',
              border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
              '& .MuiAlert-icon': {
                fontSize: { xs: 24, sm: 28 },
              },
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              You have <strong>{unreadCount}</strong> unread notification{unreadCount !== 1 ? 's' : ''}
            </Typography>
          </Alert>
        )}

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 5, md: 6 },
              textAlign: 'center',
              borderRadius: { xs: 2, md: 3 },
              background: isDark ? '#1e1e2e' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <Box
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: { xs: 2, sm: 3 },
              }}
            >
              <NotificationsIcon sx={{ fontSize: { xs: 40, sm: 50 }, color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              No notifications yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              When you receive notifications, they'll appear here
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={{ xs: 1.5, sm: 2 }}>
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                elevation={0}
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  background: notification.isRead
                    ? (isDark ? '#1e1e2e' : '#ffffff')
                    : (isDark ? 'rgba(102, 126, 234, 0.08)' : 'rgba(102, 126, 234, 0.05)'),
                  border: notification.isRead
                    ? `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
                    : `1px solid ${isDark ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDark
                      ? '0 8px 16px rgba(0,0,0,0.3)'
                      : '0 8px 16px rgba(0,0,0,0.1)',
                  },
                }}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="flex-start">
                    {/* Icon */}
                    {getIconWithBackground(notification.type)}

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1} mb={0.5}>
                        <Typography
                          variant="body1"
                          fontWeight={notification.isRead ? 500 : 700}
                          sx={{
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            flex: 1,
                            wordBreak: 'break-word',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        {!notification.isRead && (
                          <Chip
                            label="New"
                            size="small"
                            color="error"
                            sx={{
                              height: 22,
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        flexWrap="wrap"
                        gap={1}
                        mt={1}
                      >
                        <Chip
                          label={notification.type.replace(/_/g, ' ')}
                          size="small"
                          color={getChipColor(notification.type)}
                          sx={{
                            fontSize: { xs: "0.65rem", sm: "0.7rem" },
                            height: 22,
                            fontWeight: 600,
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                        >
                          {formatDate(notification.createdAt)}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Mark as Read Button */}
                    {!notification.isRead && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        sx={{
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'rgba(102, 126, 234, 0.2)',
                          },
                        }}
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}