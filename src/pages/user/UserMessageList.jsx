// // src/pages/user/UserMessageList.jsx
// import React, { useEffect, useState } from "react";
// import { Box, CircularProgress, Typography } from "@mui/material";
// import UserList from "@components/user/UserList";
// import { useNavigate } from "react-router-dom";
// import { getChatUsers } from "@services/user/chatService";

// export default function UserMessageList() {
//   const navigate = useNavigate();
//   const [chatUsers, setChatUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const handleSelectUser = (id) => {
//     navigate(`/user/messages/${id}`);
//   };

//   useEffect(() => {
//     const fetchChatUsers = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const users = await getChatUsers(); // <-- use chatService
//         setChatUsers(users);
//       } catch (err) {
//         console.error(err);
//         setError("Something went wrong while fetching chat users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatUsers();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography sx={{ p: 2, color: "red", textAlign: "center" }}>
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <UserList
//       users={chatUsers}
//       activeUserId={null}
//       onSelectUser={handleSelectUser}
//       getStatusIcon={() => null} // message status icons if you want
//       getStatusColor={() => "gray"}
//     />
//   );
// }



// // src/pages/user/UserMessageList.jsx
// import React, { useEffect, useState } from "react";
// import UserList from "@components/user/UserList";
// import { getChatUsers } from "@services/user/chatService";
// import { useNavigate, useParams } from "react-router-dom";

// export default function UserMessageList() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const data = await getChatUsers();
//       // Map backend response to frontend structure
//       const mapped = data.map((u) => ({
//         userId: u.userId,
//         username: u.username,
//         avatarUrl: u.avatarUrl,
//         isOnline: true, // You can enhance later with real online status
//         lastMessage: {
//           content: u.lastMessage,
//           time: u.lastMessageTime,
//           unread: true, // Mark unread messages if needed
//         },
//       }));
//       setUsers(mapped);
//     };

//     fetchUsers();
//   }, []);

//   const handleSelectUser = (id) => {
//     navigate(`/user/messages/${id}`);
//   };

//   return (
//     <UserList
//       users={users}
//       activeUserId={Number(userId)}
//       onSelectUser={handleSelectUser}
//     />
//   );
// }




// // src/pages/user/UserMessageList.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
//   Badge,
//   CircularProgress,
//   useTheme,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useChat } from '@/context/ChatContext';

// export default function UserMessageList() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { chatUsers, fetchChatUsers, loading } = useChat();

//   useEffect(() => {
//     fetchChatUsers();
//   }, [fetchChatUsers]);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diff = now - date;
    
//     // Less than 1 minute
//     if (diff < 60000) return 'Just now';
    
//     // Less than 1 hour
//     if (diff < 3600000) {
//       const minutes = Math.floor(diff / 60000);
//       return `${minutes}m ago`;
//     }
    
//     // Less than 24 hours
//     if (diff < 86400000) {
//       const hours = Math.floor(diff / 3600000);
//       return `${hours}h ago`;
//     }
    
//     // Less than 7 days
//     if (diff < 604800000) {
//       const days = Math.floor(diff / 86400000);
//       return `${days}d ago`;
//     }
    
//     // Format as date
//     return date.toLocaleDateString();
//   };

//   const getInitials = (name) => {
//     if (!name) return '?';
//     const parts = name.trim().split(' ');
//     if (parts.length >= 2) {
//       return (parts[0][0] + parts[1][0]).toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };

//   if (loading && chatUsers.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
//         pt: 8,
//         pb: 8,
//       }}
//     >
//       <Typography variant="h5" sx={{ px: 2, py: 2, fontWeight: 600 }}>
//         Messages
//       </Typography>

//       {chatUsers.length === 0 ? (
//         <Box sx={{ textAlign: 'center', py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             No conversations yet
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             Start chatting with other users to see them here
//           </Typography>
//         </Box>
//       ) : (
//         <List sx={{ px: 1 }}>
//           {chatUsers.map((chatUser) => (
//             <ListItem key={chatUser.userId} disablePadding>
//               <ListItemButton
//                 onClick={() => navigate(`/user/messages/${chatUser.userId}`)}
//                 sx={{
//                   borderRadius: 2,
//                   mb: 0.5,
//                   '&:hover': {
//                     bgcolor: theme.palette.action.hover,
//                   },
//                 }}
//               >
//                 <ListItemAvatar>
//                   <Badge
//                     color={chatUser.isOnline ? 'success' : 'default'}
//                     variant="dot"
//                     overlap="circular"
//                     anchorOrigin={{
//                       vertical: 'bottom',
//                       horizontal: 'right',
//                     }}
//                   >
//                     <Avatar
//                       src={chatUser.profilePictureUrl}
//                       alt={chatUser.userName}
//                       sx={{ width: 48, height: 48 }}
//                     >
//                       {getInitials(chatUser.userName)}
//                     </Avatar>
//                   </Badge>
//                 </ListItemAvatar>

//                 <ListItemText
//                   primary={
//                     <Typography variant="subtitle1" fontWeight={chatUser.unreadCount > 0 ? 600 : 400}>
//                       {chatUser.userName}
//                     </Typography>
//                   }
//                   secondary={
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         fontWeight: chatUser.unreadCount > 0 ? 500 : 400,
//                       }}
//                     >
//                       {chatUser.lastMessage || 'No messages yet'}
//                     </Typography>
//                   }
//                 />

//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
//                   <Typography variant="caption" color="text.secondary">
//                     {formatTime(chatUser.lastMessageTime)}
//                   </Typography>

//                   {chatUser.unreadCount > 0 && (
//                     <Badge
//                       badgeContent={chatUser.unreadCount}
//                       color="primary"
//                       sx={{
//                         '& .MuiBadge-badge': {
//                           fontSize: '0.7rem',
//                           height: 18,
//                           minWidth: 18,
//                         },
//                       }}
//                     />
//                   )}
//                 </Box>
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// }



// // src/pages/user/UserMessageList.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
//   Badge,
//   CircularProgress,
//   useTheme,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useChat } from '@/context/ChatContext';
// import { getProfileByUserId } from '@/services/profileService';

// export default function UserMessageList() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { chatUsers, fetchChatUsers, loading } = useChat();
//   const [userProfiles, setUserProfiles] = useState({});
//   const [loadingProfiles, setLoadingProfiles] = useState(false);

//   useEffect(() => {
//     fetchChatUsers();
//   }, [fetchChatUsers]);

//   // ✅ Fetch profile data for each chat user
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       if (!chatUsers.length) return;

//       setLoadingProfiles(true);
//       const profiles = {};

//       try {
//         await Promise.all(
//           chatUsers.map(async (chatUser) => {
//             try {
//               const profile = await getProfileByUserId(chatUser.userId);
//               profiles[chatUser.userId] = profile;
//             } catch (error) {
//               console.error(`Error fetching profile for user ${chatUser.userId}:`, error);
//             }
//           })
//         );

//         setUserProfiles(profiles);
//       } catch (error) {
//         console.error('Error fetching profiles:', error);
//       } finally {
//         setLoadingProfiles(false);
//       }
//     };

//     fetchProfiles();
//   }, [chatUsers]);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diff = now - date;
    
//     // Less than 1 minute
//     if (diff < 60000) return 'Just now';
    
//     // Less than 1 hour
//     if (diff < 3600000) {
//       const minutes = Math.floor(diff / 60000);
//       return `${minutes}m ago`;
//     }
    
//     // Less than 24 hours
//     if (diff < 86400000) {
//       const hours = Math.floor(diff / 3600000);
//       return `${hours}h ago`;
//     }
    
//     // Less than 7 days
//     if (diff < 604800000) {
//       const days = Math.floor(diff / 86400000);
//       return `${days}d ago`;
//     }
    
//     // Format as date
//     return date.toLocaleDateString();
//   };

//   const getInitials = (name) => {
//     if (!name) return '?';
//     const parts = name.trim().split(' ');
//     if (parts.length >= 2) {
//       return (parts[0][0] + parts[1][0]).toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };

//   if (loading && chatUsers.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
//         pt: 8,
//         pb: 8,
//       }}
//     >
//       <Typography variant="h5" sx={{ px: 2, py: 2, fontWeight: 600 }}>
//         Messages
//       </Typography>

//       {chatUsers.length === 0 ? (
//         <Box sx={{ textAlign: 'center', py: 8 }}>
//           <Typography variant="body1" color="text.secondary">
//             No conversations yet
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             Start chatting with other users to see them here
//           </Typography>
//         </Box>
//       ) : (
//         <List sx={{ px: 1 }}>
//           {chatUsers.map((chatUser) => {
//             const profile = userProfiles[chatUser.userId];
//             const displayName = profile?.fullName || chatUser.userName || 'User';
//             const avatarUrl = profile?.profilePictureUrl || chatUser.profilePictureUrl;

//             return (
//               <ListItem key={chatUser.userId} disablePadding>
//                 <ListItemButton
//                   onClick={() => navigate(`/user/messages/${chatUser.userId}`)}
//                   sx={{
//                     borderRadius: 2,
//                     mb: 0.5,
//                     '&:hover': {
//                       bgcolor: theme.palette.action.hover,
//                     },
//                   }}
//                 >
//                   <ListItemAvatar>
//                     <Badge
//                       color={chatUser.isOnline ? 'success' : 'default'}
//                       variant="dot"
//                       overlap="circular"
//                       anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'right',
//                       }}
//                     >
//                       <Avatar
//                         src={avatarUrl}
//                         alt={displayName}
//                         sx={{ width: 48, height: 48 }}
//                       >
//                         {getInitials(displayName)}
//                       </Avatar>
//                     </Badge>
//                   </ListItemAvatar>

//                   <ListItemText
//                     primary={
//                       <Typography variant="subtitle1" fontWeight={chatUser.unreadCount > 0 ? 600 : 400}>
//                         {displayName}
//                       </Typography>
//                     }
//                     secondary={
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           whiteSpace: 'nowrap',
//                           fontWeight: chatUser.unreadCount > 0 ? 500 : 400,
//                         }}
//                       >
//                         {chatUser.lastMessage || 'No messages yet'}
//                       </Typography>
//                     }
//                   />

//                   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
//                     <Typography variant="caption" color="text.secondary">
//                       {formatTime(chatUser.lastMessageTime)}
//                     </Typography>

//                     {chatUser.unreadCount > 0 && (
//                       <Badge
//                         badgeContent={chatUser.unreadCount}
//                         color="primary"
//                         sx={{
//                           '& .MuiBadge-badge': {
//                             fontSize: '0.7rem',
//                             height: 18,
//                             minWidth: 18,
//                           },
//                         }}
//                       />
//                     )}
//                   </Box>
//                 </ListItemButton>
//               </ListItem>
//             );
//           })}
//         </List>
//       )}
//     </Box>
//   );
// }





// src/pages/user/UserMessageList.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Badge,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/context/ChatContext';
import { getProfileByUserId } from '@/services/profileService';

export default function UserMessageList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { chatUsers, fetchChatUsers, loading } = useChat();
  const [userProfiles, setUserProfiles] = useState({});
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  useEffect(() => {
    fetchChatUsers();
  }, [fetchChatUsers]);

  // ✅ Fetch profile data for each chat user
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!chatUsers.length) return;

      setLoadingProfiles(true);
      const profiles = {};

      try {
        await Promise.all(
          chatUsers.map(async (chatUser) => {
            try {
              const profile = await getProfileByUserId(chatUser.userId);
              profiles[chatUser.userId] = profile;
            } catch (error) {
              console.error(`Error fetching profile for user ${chatUser.userId}:`, error);
            }
          })
        );

        setUserProfiles(profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoadingProfiles(false);
      }
    };

    fetchProfiles();
  }, [chatUsers]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 minute
    if (diff < 60000) return 'Just now';
    
    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m ago`;
    }
    
    // Less than 24 hours
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days}d ago`;
    }
    
    // Format as date
    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading && chatUsers.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
        pt: 8,
        pb: 8,
      }}
    >
      <Typography variant="h5" sx={{ px: 2, py: 2, fontWeight: 600 }}>
        Messages
      </Typography>

      {chatUsers.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            No conversations yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Start chatting with other users to see them here
          </Typography>
        </Box>
      ) : (
        <List sx={{ px: 1 }}>
          {chatUsers.map((chatUser) => {
            const profile = userProfiles[chatUser.userId];
            
            // ✅ Use fullName from profile, fallback to userName from chatUser
            const displayName = profile?.fullName || chatUser.userName || 'User';
            
            // ✅ FIXED: Use avatarUrl (not profilePictureUrl)
            const avatarUrl = profile?.avatarUrl || null;

            console.log(`User ${chatUser.userId}:`, { profile, displayName, avatarUrl }); // Debug

            return (
              <ListItem key={chatUser.userId} disablePadding>
                <ListItemButton
                  onClick={() => navigate(`/user/messages/${chatUser.userId}`)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      color={chatUser.isOnline ? 'success' : 'default'}
                      variant="dot"
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <Avatar
                        src={avatarUrl || undefined}
                        alt={displayName}
                        sx={{ width: 48, height: 48 }}
                      >
                        {getInitials(displayName)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={chatUser.unreadCount > 0 ? 600 : 400}>
                        {displayName}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontWeight: chatUser.unreadCount > 0 ? 500 : 400,
                        }}
                      >
                        {chatUser.lastMessage || 'No messages yet'}
                      </Typography>
                    }
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(chatUser.lastMessageTime)}
                    </Typography>

                    {chatUser.unreadCount > 0 && (
                      <Badge
                        badgeContent={chatUser.unreadCount}
                        color="primary"
                        sx={{
                          '& .MuiBadge-badge': {
                            fontSize: '0.7rem',
                            height: 18,
                            minWidth: 18,
                          },
                        }}
                      />
                    )}
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}