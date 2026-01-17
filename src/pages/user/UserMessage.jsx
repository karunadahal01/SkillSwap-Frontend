// // src/pages/user/UserMessage.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme, CircularProgress } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Capacitor } from '@capacitor/core';
// import { Keyboard } from '@capacitor/keyboard';

// import { useChat } from '@/context/ChatContext';
// import { useAuth } from '@/context/AuthContext';
// import { getProfileByUserId } from '@/services/profileService';
// import ChatView from '@components/user/ChatView';

// export default function UserMessages() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isNative = Capacitor.isNativePlatform();

//   const { user } = useAuth();
//   const {
//     conversations,
//     chatUsers,
//     fetchConversation,
//     sendMessage,
//     markAsRead,
//     loading,
//     wsConnected,
//   } = useChat();

//   const [messageInput, setMessageInput] = useState('');
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const inputRef = useRef(null);
//   const userId = Number(id);
  
//   // Get active user from chat users list
//   const activeUser = chatUsers.find((u) => u.userId === userId);
//   const messages = conversations[userId] || [];

//   // ✅ Fetch user profile for avatar/username
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!userId) return;

//       setLoadingProfile(true);
//       try {
//         const profile = await getProfileByUserId(userId);
//         console.log('Fetched profile:', profile); // Debug
//         setUserProfile(profile);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     fetchProfile();
//   }, [userId]);

//   // Fetch conversation on mount
//   useEffect(() => {
//     if (userId) {
//       fetchConversation(userId);
//     }
//   }, [userId, fetchConversation]);

//   // Mark messages as read when viewing conversation
//   useEffect(() => {
//     if (!messages.length || !wsConnected) return;

//     const unreadMessages = messages.filter(
//       (msg) => !msg.isRead && msg.sender === 'them'
//     );

//     unreadMessages.forEach((msg) => {
//       markAsRead(msg.messageId);
//     });
//   }, [messages, markAsRead, wsConnected]);

//   // Setup Capacitor keyboard listeners
//   useEffect(() => {
//     if (!isNative) return;

//     const showListener = Keyboard.addListener('keyboardWillShow', (info) => {
//       setKeyboardHeight(info.keyboardHeight);
//     });

//     const hideListener = Keyboard.addListener('keyboardWillHide', () => {
//       setKeyboardHeight(0);
//     });

//     const configureKeyboard = async () => {
//       try {
//         await Keyboard.setAccessoryBarVisible({ isVisible: true });
//         await Keyboard.setResizeMode({ mode: 'none' });
//       } catch (error) {
//         console.error('Keyboard config error:', error);
//       }
//     };

//     configureKeyboard();

//     return () => {
//       showListener.remove();
//       hideListener.remove();
//     };
//   }, [isNative]);

//   const handleSend = async () => {
//     if (!messageInput.trim() && attachedFiles.length === 0) return;
//     if (!wsConnected) {
//       console.error('WebSocket not connected');
//       return;
//     }

//     try {
//       // For now, only text messages (file support can be added later)
//       if (messageInput.trim()) {
//         await sendMessage(userId, messageInput.trim());
//       }

//       // Clear input
//       setMessageInput('');
//       setAttachedFiles([]);

//       // Revoke URLs
//       attachedFiles.forEach((f) => {
//         try {
//           URL.revokeObjectURL(f.objectURL);
//         } catch {}
//       });
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return '?';
//     const parts = name.trim().split(' ');
//     if (parts.length >= 2) {
//       return (parts[0][0] + parts[1][0]).toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };

//   if (loading && messages.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // ✅ FIXED: Use avatarUrl (not profilePictureUrl)
//   const displayName = userProfile?.fullName || activeUser?.userName || 'User';
//   const avatarUrl = userProfile?.avatarUrl || null;
//   const isOnline = activeUser?.isOnline || false;

//   console.log('Chat header:', { userProfile, displayName, avatarUrl, isOnline }); // Debug

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
//       {/* FIXED HEADER */}
//       <Box
//         sx={{
//           height: '70px',
//           p: 2,
//           display: 'flex',
//           alignItems: 'center',
//           gap: 2,
//           borderBottom: '1px solid',
//           borderColor: theme.palette.divider,
//           bgcolor: theme.palette.background.paper,
//           position: 'fixed',
//           left: 0,
//           right: 0,
//           marginTop: 2.8,
//           zIndex: 1300,
//         }}
//       >
//         <ArrowBackIcon
//           onClick={() => {
//             navigate('/user/messages');
//             if (isNative) Keyboard.hide().catch(() => {});
//           }}
//           sx={{ cursor: 'pointer' }}
//         />

//         {loadingProfile ? (
//           <CircularProgress size={32} />
//         ) : (
//           <>
//             <Avatar
//               src={avatarUrl || undefined}
//               sx={{ width: 32, height: 32, cursor: 'pointer' }}
//               onClick={() => navigate(`/user/profile/${userId}`)}
//             >
//               {getInitials(displayName)}
//             </Avatar>

//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" fontWeight={600}>
//                 {displayName}
//               </Typography>
//               {isOnline && (
//                 <Typography variant="caption" color="success.main">
//                   Online
//                 </Typography>
//               )}
//             </Box>
//           </>
//         )}

//         {!wsConnected && (
//           <Typography variant="caption" color="warning.main" sx={{ mr: 1 }}>
//             Connecting...
//           </Typography>
//         )}

//         <Box sx={{ marginLeft: 'auto' }}>
//           <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//             <MoreVertIcon />
//           </IconButton>

//           <Menu
//             anchorEl={menuAnchor}
//             open={Boolean(menuAnchor)}
//             onClose={() => setMenuAnchor(null)}
//           >
//             <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
//             <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
//           </Menu>
//         </Box>
//       </Box>

//       {/* CHAT VIEW - positioned below fixed header */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '126px',
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: 'hidden',
//         }}
//       >
//         <ChatView
//           activeUser={{ ...activeUser, userName: displayName, avatarUrl: avatarUrl }}
//           messages={messages}
//           currentUserId={user.id}
//           messageInput={messageInput}
//           setMessageInput={setMessageInput}
//           attachedFiles={attachedFiles}
//           setAttachedFiles={setAttachedFiles}
//           handleSend={handleSend}
//           isMobile={true}
//           inputRef={inputRef}
//           keyboardHeight={keyboardHeight}
//           sidebarWidth={0}
//         />
//       </Box>
//     </Box>
//   );
// }



// src/pages/user/UserMessage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { getProfileByUserId } from '@/services/profileService';
import ChatView from '@components/user/ChatView';

export default function UserMessages() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const isNative = Capacitor.isNativePlatform();

  const { user } = useAuth();
  const {
    conversations,
    chatUsers,
    fetchConversation,
    sendMessage,
    markAsRead,
    loading,
    wsConnected,
  } = useChat();

  const [messageInput, setMessageInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const inputRef = useRef(null);
  const userId = Number(id);
  
  // Get active user from chat users list
  const activeUser = chatUsers.find((u) => u.userId === userId);
  const messages = conversations[userId] || [];

  // ✅ Fetch user profile for avatar/username
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      setLoadingProfile(true);
      try {
        const profile = await getProfileByUserId(userId);
        console.log('Fetched profile:', profile);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Fetch conversation on mount
  useEffect(() => {
    if (userId) {
      fetchConversation(userId);
    }
  }, [userId, fetchConversation]);

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (!messages.length || !wsConnected) return;

    const unreadMessages = messages.filter(
      (msg) => !msg.isRead && msg.sender === 'them' && !msg._pending
    );

    unreadMessages.forEach((msg) => {
      if (msg.messageId && !msg.messageId.toString().startsWith('temp-')) {
        markAsRead(msg.messageId);
      }
    });
  }, [messages, markAsRead, wsConnected]);

  // Setup Capacitor keyboard listeners
  useEffect(() => {
    if (!isNative) return;

    const showListener = Keyboard.addListener('keyboardWillShow', (info) => {
      setKeyboardHeight(info.keyboardHeight);
    });

    const hideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    const configureKeyboard = async () => {
      try {
        await Keyboard.setAccessoryBarVisible({ isVisible: true });
        await Keyboard.setResizeMode({ mode: 'none' });
      } catch (error) {
        console.error('Keyboard config error:', error);
      }
    };

    configureKeyboard();

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [isNative]);

  const handleSend = async () => {
    if (!messageInput.trim() && attachedFiles.length === 0) return;
    if (!wsConnected) {
      console.error('WebSocket not connected');
      return;
    }

    try {
      // Send message with files
      await sendMessage(userId, messageInput.trim(), attachedFiles);

      // Clear input
      setMessageInput('');
      setAttachedFiles([]);

      // Revoke URLs
      attachedFiles.forEach((f) => {
        try {
          URL.revokeObjectURL(f.objectURL);
        } catch {}
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading && messages.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const displayName = userProfile?.fullName || activeUser?.userName || 'User';
  const avatarUrl = userProfile?.avatarUrl || null;
  const isOnline = activeUser?.isOnline || false;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* FIXED HEADER */}
      <Box
        sx={{
          height: '100px',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          bgcolor: theme.palette.background.paper,
          position: 'fixed',
          left: 0,
          right: 0,
          marginTop: -1,
          zIndex: 1,
          paddingTop: 7,
        }}
      >
        <ArrowBackIcon
          onClick={() => {
            navigate('/user/messages');
            if (isNative) Keyboard.hide().catch(() => {});
          }}
          sx={{ cursor: 'pointer' }}
        />

        {loadingProfile ? (
          <CircularProgress size={32} />
        ) : (
          <>
            <Avatar
              src={avatarUrl || undefined}
              sx={{ width: 32, height: 32, cursor: 'pointer' }}
              // onClick={() => navigate(`/user/profile`)}
              onClick={() => navigate(`/user/other-profile/${userId}`)}
            >
              {getInitials(displayName)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography fontSize={18} fontWeight={600}>
                {displayName}
              </Typography>
              {isOnline && (
                <Typography variant="caption" color="success.main">
                  Online
                </Typography>
              )}
            </Box>
          </>
        )}

        {!wsConnected && (
          <Typography variant="caption" color="warning.main" sx={{ mr: 1 }}>
            Connecting...
          </Typography>
        )}

        <Box sx={{ marginLeft: 'auto' }}>
          <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
            <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* CHAT VIEW - positioned below fixed header */}
      <Box
        sx={{
          position: 'absolute',
          top: '126px',
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <ChatView
          activeUser={{ ...activeUser, userName: displayName, avatarUrl: avatarUrl }}
          messages={messages}
          currentUserId={user.id}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
          handleSend={handleSend}
          isMobile={true}
          inputRef={inputRef}
          keyboardHeight={keyboardHeight}
          sidebarWidth={0}
        />
      </Box>
    </Box>
  );
}