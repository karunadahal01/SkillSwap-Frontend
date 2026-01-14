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
        console.log('Fetched profile:', profile); // Debug
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
      (msg) => !msg.isRead && msg.sender === 'them'
    );

    unreadMessages.forEach((msg) => {
      markAsRead(msg.messageId);
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
      // For now, only text messages (file support can be added later)
      if (messageInput.trim()) {
        await sendMessage(userId, messageInput.trim());
      }

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

  // ✅ FIXED: Use avatarUrl (not profilePictureUrl)
  const displayName = userProfile?.fullName || activeUser?.userName || 'User';
  const avatarUrl = userProfile?.avatarUrl || null;
  const isOnline = activeUser?.isOnline || false;

  console.log('Chat header:', { userProfile, displayName, avatarUrl, isOnline }); // Debug

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* FIXED HEADER */}
      <Box
        sx={{
          height: '70px',
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
          marginTop: 2.8,
          zIndex: 1300,
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
              onClick={() => navigate(`/user/profile/${userId}`)}
            >
              {getInitials(displayName)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
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

//   const inputRef = useRef(null);
//   const userId = Number(id);
  
//   // Get active user from chat users list
//   const activeUser = chatUsers.find((u) => u.userId === userId);
//   const messages = conversations[userId] || [];

//   // Fetch conversation on mount
//   useEffect(() => {
//     if (userId) {
//       fetchConversation(userId);
//     }
//   }, [userId, fetchConversation]);

//   // Mark messages as read when viewing conversation
//   useEffect(() => {
//     if (!messages.length) return;

//     const unreadMessages = messages.filter(
//       (msg) => !msg.isRead && msg.sender === 'them'
//     );

//     unreadMessages.forEach((msg) => {
//       markAsRead(msg.messageId);
//     });
//   }, [messages, markAsRead]);

//   // Setup Capacitor keyboard listeners
//   useEffect(() => {
//     if (!isNative || !activeUser) return;

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
//   }, [isNative, activeUser]);

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
//         {activeUser && (
//           <>
//             <ArrowBackIcon
//               onClick={() => {
//                 navigate('/user/messages');
//                 if (isNative) Keyboard.hide().catch(() => {});
//               }}
//               sx={{ cursor: 'pointer' }}
//             />

//             <Avatar
//               src={activeUser.profilePictureUrl}
//               sx={{ width: 32, height: 32, cursor: 'pointer' }}
//               onClick={() => navigate(`/user/profile/${activeUser.userId}`)}
//             >
//               {getInitials(activeUser.userName)}
//             </Avatar>

//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" fontWeight={600}>
//                 {activeUser.userName}
//               </Typography>
//               {activeUser.isOnline && (
//                 <Typography variant="caption" color="success.main">
//                   Online
//                 </Typography>
//               )}
//             </Box>

//             {!wsConnected && (
//               <Typography variant="caption" color="warning.main" sx={{ mr: 1 }}>
//                 Connecting...
//               </Typography>
//             )}

//             <Box sx={{ marginLeft: 'auto' }}>
//               <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//                 <MoreVertIcon />
//               </IconButton>

//               <Menu
//                 anchorEl={menuAnchor}
//                 open={Boolean(menuAnchor)}
//                 onClose={() => setMenuAnchor(null)}
//               >
//                 <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
//                 <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
//               </Menu>
//             </Box>
//           </>
//         )}

//         {!activeUser && (
//           <Typography variant="h6" fontWeight={600}>
//             Chat
//           </Typography>
//         )}
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
//         {activeUser && (
//           <ChatView
//             activeUser={activeUser}
//             messages={messages}
//             currentUserId={user.id}
//             messageInput={messageInput}
//             setMessageInput={setMessageInput}
//             attachedFiles={attachedFiles}
//             setAttachedFiles={setAttachedFiles}
//             handleSend={handleSend}
//             isMobile={true}
//             inputRef={inputRef}
//             keyboardHeight={keyboardHeight}
//             sidebarWidth={0}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// }





// // src/pages/user/UserMessage.jsx
// import React, { useState, useRef, useEffect, useContext } from "react";
// import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// import { getConversation } from "@services/user/chatService";
// import { getProfileByUserId } from "@services/profileService";
// import ChatView from "@components/user/ChatView";
// import AuthContext from "@context/AuthContext";

// export default function UserMessage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams(); // other user id
//   const { user } = useContext(AuthContext); // logged in user

//   const currentUserId = user.id;

//   const [messages, setMessages] = useState([]);
//   const [activeUser, setActiveUser] = useState(null);
//   const [menuAnchor, setMenuAnchor] = useState(null);

//   // Fetch user profile + conversation
//   useEffect(() => {
//     if (!id) return;

//     const loadData = async () => {
//       const [msgs, profile] = await Promise.all([
//         getConversation(id),
//         getProfileByUserId(id),
//       ]);

//       setMessages(msgs);
//       setActiveUser({
//         id: Number(id),
//         name: profile?.fullName,
//         avatar: profile?.avatarUrl,
//         isOnline: profile?.isOnline,
//         lastSeen: profile?.lastSeen,
//       });
//     };

//     loadData();
//   }, [id]);

//   if (!activeUser) return null;

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* Header */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: { xs: 56, sm: 64 }, // height of UserTopBar
//           left: 0,
//           right: 0,
//           height: 70,
//           px: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: theme.palette.background.paper,
//           zIndex: 1200,
//         }}
//       >
//         <ArrowBackIcon onClick={() => navigate("/user/messages")} sx={{ cursor: "pointer" }} />

//         <Avatar src={activeUser.avatar}>
//           {activeUser.name?.charAt(0)}
//         </Avatar>

//         <Box>
//           <Typography fontWeight={600}>{activeUser.name}</Typography>
//           <Typography variant="caption" color="text.secondary">
//             {activeUser.isOnline ? "Online" : "Offline"}
//           </Typography>
//         </Box>

//         <Box sx={{ ml: "auto" }}>
//           <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//             <MoreVertIcon />
//           </IconButton>
//           <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
//             <MenuItem>Report</MenuItem>
//           </Menu>
//         </Box>
//       </Box>

//       {/* Chat */}
//       <ChatView
//         messages={messages}
//         setMessages={setMessages}
//         activeUser={activeUser}
//         currentUserId={currentUserId}
//       />
//     </Box>
//   );
// }




// // src/pages/user/UserMessage.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Capacitor } from "@capacitor/core";
// import { Keyboard } from "@capacitor/keyboard";

// import { getConversation } from "@services/user/chatService";
// import ChatView from "@components/user/ChatView";

// export default function UserMessages() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isNative = Capacitor.isNativePlatform();

//   const [users, setUsers] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   const inputRef = useRef(null);

//   const activeUser = users.find((u) => u.id === Number(id)) || { messages: [] };

//   // Fetch conversation from backend
//   const fetchConversation = async () => {
//     if (!id) return;
//     try {
//       const messages = await getConversation(id);
//       setUsers((prev) => {
//         const existingUser = prev.find((u) => u.id === Number(id));
//         if (existingUser) {
//           return prev.map((u) =>
//             u.id === Number(id) ? { ...u, messages: messages || [] } : u
//           );
//         }
//         return [
//           ...prev,
//           { id: Number(id), name: `User ${id}`, avatar: null, messages: messages || [] },
//         ];
//       });
//     } catch (error) {
//       console.error("Error fetching conversation:", error);
//     }
//   };

//   useEffect(() => {
//     fetchConversation();
//   }, [id]);

//   // Capacitor keyboard handling
//   useEffect(() => {
//     if (!isNative) return;

//     const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
//       setKeyboardHeight(info.keyboardHeight);
//     });
//     const hideListener = Keyboard.addListener("keyboardWillHide", () => {
//       setKeyboardHeight(0);
//     });

//     const configureKeyboard = async () => {
//       try {
//         await Keyboard.setAccessoryBarVisible({ isVisible: true });
//         await Keyboard.setResizeMode({ mode: "none" });
//       } catch (error) {
//         console.error("Keyboard config error:", error);
//       }
//     };
//     configureKeyboard();

//     return () => {
//       showListener.remove();
//       hideListener.remove();
//     };
//   }, [isNative]);

//   const handleSend = () => {
//     if (!messageInput.trim() && attachedFiles.length === 0) return;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       status: "sent",
//       reaction: null,
//       type: attachedFiles.length ? "file" : "text",
//       content: messageInput.trim(),
//       files: attachedFiles.map((f) => ({
//         fileName: f.name,
//         fileURL: f.objectURL,
//         mimeType: f.type,
//       })),
//     };

//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === activeUser.id ? { ...u, messages: [...activeUser.messages, newMsg] } : u
//       )
//     );

//     setMessageInput("");
//     setAttachedFiles([]);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
//       {/* Header */}
//       <Box
//         sx={{
//           height: "70px",
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: theme.palette.background.paper,
//           position: "fixed",
//           left: 0,
//           right: 0,
//           marginTop: 2.8,
//           zIndex: 1300,
//         }}
//       >
//         <ArrowBackIcon
//           onClick={() => {
//             navigate("/user/messages");
//             if (isNative) Keyboard.hide().catch(() => {});
//           }}
//           sx={{ cursor: "pointer" }}
//         />

//         <Avatar
//           sx={{ width: 32, height: 32, cursor: "pointer" }}
//           onClick={() => navigate(`/user/profile/${activeUser.id}`)}
//         >
//           {activeUser.avatar || activeUser.name?.charAt(0)}
//         </Avatar>

//         <Typography variant="h6" fontWeight={600}>
//           {activeUser.name || "Chat"}
//         </Typography>

//         <Box sx={{ marginLeft: "auto" }}>
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

//       {/* Chat view */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "126px",
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: "hidden",
//         }}
//       >
//         <ChatView
//           activeUser={activeUser}
//           users={users}
//           setUsers={setUsers}
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





// // src/pages/user/UserMessage.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// import ChatView from "@components/user/ChatView";
// import * as chatService from "@services/user/chatService";

// export default function UserMessage() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams(); // selected user ID
//   const inputRef = useRef(null);

//   const [activeUser, setActiveUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);

//   // Fetch chat users and active conversation
//   useEffect(() => {
//     if (!id) return;

//     const fetchConversation = async () => {
//       try {
//         const chatUsers = await chatService.getChatUsers();
//         const user = chatUsers.find((u) => u.userId === Number(id));
//         setActiveUser(user);

//         const conversation = await chatService.getConversation(user.userId);
//         setMessages(conversation);
//       } catch (error) {
//         console.error("Error loading conversation:", error);
//       }
//     };

//     fetchConversation();
//   }, [id]);

//   // Send message to backend
//   const handleSend = async () => {
//     if (!messageInput.trim() && attachedFiles.length === 0) return;

//     let newMessage = {
//       type: attachedFiles.length > 0 ? "file" : "text",
//       content: messageInput.trim(),
//       files: attachedFiles.map((f) => ({
//         fileName: f.name,
//         fileURL: f.objectURL,
//         mimeType: f.type,
//       })),
//       sender: "me",
//       status: "sent",
//       createdAt: new Date().toISOString(),
//     };

//     // Optimistically add to messages
//     setMessages((prev) => [...prev, newMessage]);
//     setMessageInput("");
//     setAttachedFiles([]);

//     try {
//       const sent = await chatService.sendMessage(activeUser.userId, newMessage.content);
//       if (sent?.success) {
//         // Update message status if needed
//         setMessages((prev) =>
//           prev.map((m) =>
//             m === newMessage ? { ...m, status: "delivered" } : m
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
//       {/* FIXED HEADER */}
//       <Box
//         sx={{
//           height: "70px",
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: theme.palette.background.paper,
//           position: "fixed",
//           left: 0,
//           right: 0,
//           marginTop: 2.8,
//           zIndex: 1300,
//         }}
//       >
//         {activeUser ? (
//           <>
//             <ArrowBackIcon
//               onClick={() => navigate("/user/messages")}
//               sx={{ cursor: "pointer" }}
//             />
//             <Avatar
//               sx={{ width: 32, height: 32, cursor: "pointer" }}
//               src={activeUser.avatarUrl || ""}
//               onClick={() => navigate(`/user/profile/${activeUser.userId}`)}
//             />
//             <Typography variant="h6" fontWeight={600}>
//               {activeUser.username}
//             </Typography>
//             <Box sx={{ marginLeft: "auto" }}>
//               <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//                 <MoreVertIcon />
//               </IconButton>
//               <Menu
//                 anchorEl={menuAnchor}
//                 open={Boolean(menuAnchor)}
//                 onClose={() => setMenuAnchor(null)}
//               >
//                 <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
//                 <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
//               </Menu>
//             </Box>
//           </>
//         ) : (
//           <Typography variant="h6" fontWeight={600}>
//             Chat
//           </Typography>
//         )}
//       </Box>

//       {/* CHAT VIEW */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "126px",
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: "hidden",
//         }}
//       >
//         {activeUser && (
//           <ChatView
//             activeUser={activeUser}
//             messages={messages}
//             setMessages={setMessages}
//             messageInput={messageInput}
//             setMessageInput={setMessageInput}
//             attachedFiles={attachedFiles}
//             setAttachedFiles={setAttachedFiles}
//             handleSend={handleSend}
//             getStatusColor={getStatusColor}
//             inputRef={inputRef}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// }





// // src/pages/user/UserMessage.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Capacitor } from "@capacitor/core";
// import { Keyboard } from "@capacitor/keyboard";

// import { dummyUsers } from "@utils/dummyData";
// import ChatView from "@components/user/ChatView";

// export default function UserMessages() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isNative = Capacitor.isNativePlatform();

//   const [users, setUsers] = useState(dummyUsers);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   const inputRef = useRef(null);
//   const activeUser = users.find((u) => u.id === Number(id));

//   // Setup Capacitor keyboard listeners
//   useEffect(() => {
//     if (!isNative || !activeUser) return;

//     const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
//       setKeyboardHeight(info.keyboardHeight);
//     });
    
//     const hideListener = Keyboard.addListener("keyboardWillHide", () => {
//       setKeyboardHeight(0);
//     });

//     const configureKeyboard = async () => {
//       try {
//         await Keyboard.setAccessoryBarVisible({ isVisible: true });
//         await Keyboard.setResizeMode({ mode: "none" }); // Changed to 'none'
//       } catch (error) {
//         console.error("Keyboard config error:", error);
//       }
//     };
    
//     configureKeyboard();

//     return () => {
//       showListener.remove();
//       hideListener.remove();
//     };
//   }, [isNative, activeUser]);

//   const handleSend = () => {
//     if (!messageInput.trim() && attachedFiles.length === 0) return;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       status: "sent",
//       reaction: null,
//     };

//     // Handle files
//     if (attachedFiles.length > 0) {
//       newMsg.type = "file";
//       newMsg.content = messageInput.trim();
//       newMsg.files = attachedFiles.map((f) => ({
//         fileName: f.name,
//         fileURL: f.objectURL,
//         mimeType: f.type,
//       }));
//     } else {
//       newMsg.type = "text";
//       newMsg.content = messageInput.trim();
//     }

//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === activeUser.id ? { ...u, messages: [...u.messages, newMsg] } : u
//       )
//     );

//     setTimeout(() => updateMessageStatus(newMsg.id, "delivered"), 600);
//     setTimeout(() => updateMessageStatus(newMsg.id, "seen"), 1500);

//     // Revoke URLs after 5 minutes
//     setTimeout(() => {
//       attachedFiles.forEach((f) => {
//         try {
//           URL.revokeObjectURL(f.objectURL);
//         } catch {}
//       });
//     }, 300000);

//     setMessageInput("");
//     setAttachedFiles([]);
//   };

//   const updateMessageStatus = (msgId, newStatus) => {
//     setUsers((prev) =>
//       prev.map((u) => {
//         if (u.id !== activeUser.id) return u;
//         const messages = u.messages.map((m) =>
//           m.sender === "me" && m.id === msgId && m.status !== "seen"
//             ? { ...m, status: newStatus }
//             : m
//         );
//         return { ...u, messages };
//       })
//     );
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
//       {/* FIXED HEADER */}
//       <Box
//         sx={{
//           height: "70px",
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           borderBottom: "1px solid",
//           borderColor: theme.palette.divider,
//           bgcolor: theme.palette.background.paper,
//           position: "fixed",
//           left: 0,
//           right: 0,
//           marginTop: 2.8,
//           zIndex: 1300,
//         }}
//       >
//         {activeUser && (
//           <>
//             <ArrowBackIcon
//               onClick={() => {
//                 navigate("/user/messages");
//                 if (isNative) Keyboard.hide().catch(() => {});
//               }}
//               sx={{ cursor: "pointer" }}
//             />

//             <Avatar
//               sx={{ width: 32, height: 32, cursor: "pointer" }}
//               onClick={() => navigate(`/user/profile/${activeUser.id}`)}
//             >
//               {activeUser.avatar}
//             </Avatar>

//             <Typography variant="h6" fontWeight={600}>
//               {activeUser.name}
//             </Typography>

//             <Box sx={{ marginLeft: "auto" }}>
//               <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//                 <MoreVertIcon />
//               </IconButton>

//               <Menu
//                 anchorEl={menuAnchor}
//                 open={Boolean(menuAnchor)}
//                 onClose={() => setMenuAnchor(null)}
//               >
//                 <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
//                 <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
//               </Menu>
//             </Box>
//           </>
//         )}

//         {!activeUser && (
//           <Typography variant="h6" fontWeight={600}>
//             Chat
//           </Typography>
//         )}
//       </Box>

//       {/* CHAT VIEW - positioned below fixed header */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "126px", // 56px (top nav) + 70px (chat header)
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: "hidden",
//         }}
//       >
//         {activeUser && (
//           <ChatView
//             activeUser={activeUser}
//             users={users}
//             setUsers={setUsers}
//             messageInput={messageInput}
//             setMessageInput={setMessageInput}
//             attachedFiles={attachedFiles}
//             setAttachedFiles={setAttachedFiles}
//             handleSend={handleSend}
//             isMobile={true}
//             inputRef={inputRef}
//             keyboardHeight={keyboardHeight}
//             sidebarWidth={0}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
  // import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
  // import { useNavigate, useParams } from "react-router-dom";
  // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  // import MoreVertIcon from "@mui/icons-material/MoreVert";
  // import { Capacitor } from "@capacitor/core";
  // import { Keyboard } from "@capacitor/keyboard";

  // import { dummyUsers } from "@utils/dummyData";
  // import ChatView from "@components/user/ChatView";

  // export default function UserMessages() {
  //   const theme = useTheme();
  //   const navigate = useNavigate();
  //   const { id } = useParams(); // userId for chat view
  //   const isNative = Capacitor.isNativePlatform();

  //   const [users, setUsers] = useState(dummyUsers);
  //   const [messageInput, setMessageInput] = useState("");
  //   const [attachedFiles, setAttachedFiles] = useState([]);
  //   const [menuAnchor, setMenuAnchor] = useState(null);
  //   const [keyboardHeight, setKeyboardHeight] = useState(0);

  //   const inputRef = useRef(null);

  //   const activeUser = users.find((u) => u.id === Number(id));

  //   // Setup Capacitor keyboard listeners (mobile)
  //   useEffect(() => {
  //     if (!isNative || !activeUser) return;

  //     const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
  //       setKeyboardHeight(info.keyboardHeight);
  //     });
  //     const hideListener = Keyboard.addListener("keyboardWillHide", () => {
  //       setKeyboardHeight(0);
  //     });

  //     const configureKeyboard = async () => {
  //       try {
  //         await Keyboard.setAccessoryBarVisible({ isVisible: true });
  //         await Keyboard.setResizeMode({ mode: "native" });
  //       } catch (error) {
  //         console.error("Keyboard config error:", error);
  //       }
  //     };
  //     configureKeyboard();

  //     return () => {
  //       showListener.remove();
  //       hideListener.remove();
  //     };
  //   }, [isNative, activeUser]);

  //   const handleSend = () => {
  //     if (!messageInput && attachedFiles.length === 0) return;

  //     const filesPayload = attachedFiles.length
  //       ? attachedFiles.map((f) => ({
  //           fileName: f.name,
  //           fileURL: f.objectURL,
  //           mime: f.type,
  //         }))
  //       : null;

  //     const newMsg = {
  //       id: Date.now(),
  //       sender: "me",
  //       type: filesPayload ? "file" : "text",
  //       content: messageInput,
  //       fileName: attachedFiles.length === 1 ? attachedFiles[0].name : undefined,
  //       fileURL: attachedFiles.length === 1 ? attachedFiles[0].objectURL : undefined,
  //       files: filesPayload || undefined,
  //       status: "sent",
  //       reaction: null,
  //     };

  //     setUsers((prev) =>
  //       prev.map((u) =>
  //         u.id === activeUser.id ? { ...u, messages: [...u.messages, newMsg] } : u
  //       )
  //     );

  //     attachedFiles.forEach((f) => {
  //       try {
  //         URL.revokeObjectURL(f.objectURL);
  //       } catch {}
  //     });

  //     setMessageInput("");
  //     setAttachedFiles([]);
  //   };

  //   const getStatusColor = (status) => {
  //     if (status === "seen") return "#04ff00";
  //     if (status === "delivered") return theme.palette.text.secondary;
  //     return theme.palette.text.disabled;
  //   };

  //   const getStatusIcon = (status) => {
  //     if (!status) return "";
  //     if (status === "sent") return "✓";
  //     if (status === "delivered") return "✓✓";
  //     if (status === "seen") return "✓✓";
  //   };

  //   return (
  //     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
  //       {/* ===== FIXED HEADER ===== */}
  //       <Box
  //         sx={{
  //           marginTop: 10,
  //           p: 2,
  //           display: "flex",
  //           alignItems: "center",
  //           gap: 2,
  //           borderBottom: "1px solid",
  //           borderColor: theme.palette.divider,
  //           bgcolor: theme.palette.background.paper,
  //           position: "fixed",
  //           top: 0 ,
  //           zIndex: 10,
  //           width: "100%",
  //         }}
  //       >
  //         {activeUser && (
  //           <>
  //             <ArrowBackIcon
  //               onClick={() => navigate("/user/messages")}
  //               sx={{ cursor: "pointer" }}
  //             />

  //             <Avatar
  //               sx={{ width: 32, height: 32, cursor: "pointer" }}
  //               onClick={() => navigate(`/user/profile/${activeUser.id}`)}
  //             >
  //               {activeUser.avatar}
  //             </Avatar>

  //             <Typography variant="h6" fontWeight={600}>
  //               {activeUser.name}
  //             </Typography>

  //             <Box sx={{ marginLeft: "auto" }}>
  //               <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
  //                 <MoreVertIcon />
  //               </IconButton>

  //               <Menu
  //                 anchorEl={menuAnchor}
  //                 open={Boolean(menuAnchor)}
  //                 onClose={() => setMenuAnchor(null)}
  //               >
  //                 <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
  //                 <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
  //               </Menu>
  //             </Box>
  //           </>
  //         )}

  //         {!activeUser && (
  //           <Typography variant="h6" fontWeight={600}>
  //             Chat
  //           </Typography>
  //         )}
  //       </Box>

  //       {/* ===== CHAT VIEW ===== */}
  //       {activeUser && (
  //         <ChatView
  //           activeUser={activeUser}
  //           users={users}
  //           setUsers={setUsers}
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
  //       )}
  //     </Box>
  //   );
  // }





// // src/pages/user/UserMessage.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Box, Avatar, Typography, IconButton, Menu, MenuItem, useTheme, useMediaQuery } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Capacitor } from '@capacitor/core';
// import { Keyboard } from '@capacitor/keyboard';

// import { useThemeMode } from "@context/ThemeModeContext";
// import { dummyUsers } from "@utils/dummyData";
// import UserList from "@components/user/UserList";
// import ChatView from "@components/user/ChatView";
// import { renderMessageContent } from "@utils/chatUtils";

// export default function UserMessages() {
//   const theme = useTheme();
//   const { mode } = useThemeMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const isNative = Capacitor.isNativePlatform();
//   const sidebarWidth = 240;

//   const [users, setUsers] = useState(dummyUsers);
//   const [activeUserId, setActiveUserId] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [userListScroll, setUserListScroll] = useState(0);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   const userListRef = useRef(null);
//   const inputRef = useRef(null);
//   const activeUser = users.find((u) => u.id === activeUserId);

//   // Setup Capacitor Keyboard listeners
//   useEffect(() => {
//     if (!isNative || !activeUser) return;

//     const showListener = Keyboard.addListener('keyboardWillShow', (info) => {
//       setKeyboardHeight(info.keyboardHeight);
//     });

//     const hideListener = Keyboard.addListener('keyboardWillHide', () => {
//       setKeyboardHeight(0);
//     });

//     const configureKeyboard = async () => {
//       try {
//         await Keyboard.setAccessoryBarVisible({ isVisible: true });
//         await Keyboard.setResizeMode({ mode: 'native' });
//       } catch (error) {
//         console.error('Keyboard config error:', error);
//       }
//     };

//     configureKeyboard();

//     return () => {
//       showListener.remove();
//       hideListener.remove();
//     };
//   }, [isNative, activeUser]);

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   const getStatusIcon = (status) => {
//     if (!status) return "";
//     if (status === "sent") return "✓";
//     if (status === "delivered") return "✓✓";
//     if (status === "seen") return "✓✓";
//   };

//   const handleSelectUser = (userId) => {
//     setActiveUserId(userId);
//   };

//   useEffect(() => {
//     if (!activeUser && userListRef.current) {
//       userListRef.current.scrollTop = userListScroll;
//     }
//   }, [activeUser, userListScroll]);

//   const handleSend = () => {
//     if (!messageInput && attachedFiles.length === 0) return;

//     const filesPayload = attachedFiles.length
//       ? attachedFiles.map((f) => ({
//           fileName: f.name,
//           fileURL: f.objectURL,
//           mime: f.type,
//         }))
//       : null;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       type: filesPayload ? "file" : "text",
//       content: messageInput,
//       fileName: attachedFiles.length === 1 ? attachedFiles[0].name : undefined,
//       fileURL: attachedFiles.length === 1 ? attachedFiles[0].objectURL : undefined,
//       files: filesPayload || undefined,
//       status: "sent",
//       reaction: null,
//     };

//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
//       )
//     );

//     setTimeout(() => updateMessageStatus(newMsg.id, "delivered"), 600);
//     setTimeout(() => updateMessageStatus(newMsg.id, "seen"), 1500);

//     attachedFiles.forEach((f) =>
//       setTimeout(() => {
//         try { URL.revokeObjectURL(f.objectURL); } catch {}
//       }, 10000)
//     );

//     setMessageInput("");
//     setAttachedFiles([]);

//     // setTimeout(() => {
//     //   if (inputRef?.current) inputRef.current.focus();
//     // }, 0);

//     setTimeout(() => {
//   if (chatEndRef.current) {
//     chatEndRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   }
// }, 10);

//   };

//   const updateMessageStatus = (msgId, newStatus) => {
//     setUsers((prev) =>
//       prev.map((u) => {
//         if (u.id !== activeUserId) return u;
//         const messages = u.messages.map((m) =>
//           m.sender === "me" && m.id === msgId && m.status !== "seen"
//             ? { ...m, status: newStatus }
//             : m
//         );
//         return { ...u, messages };
//       })
//     );
//   };

//   const fixedStyles = isMobile
//     ? { left: 0, width: "100%" }
//     : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

//   // --- HEADER HEIGHT FOR BODY MARGIN ---
//   const headerHeight = 120; // Toolbar minHeight
//   const bodyMarginTop = `calc(${headerHeight}px + env(safe-area-inset-top))`;

//   return (
//     <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        
//         {/* FIXED HEADER */}
//         <Box
//           sx={{
//             marginTop: 10,
//             p: 2,
//             px: { xs: 1.2, sm: 2, md: 2.5 },
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: theme.palette.background.paper,
//             position: "fixed",
//             top: 0,
//             zIndex: 1100,
//             ...fixedStyles,
//           }}
//         >
//           {activeUser ? (
//             <>
//               <ArrowBackIcon
//                 onClick={() => {
//                   if (userListRef.current) setUserListScroll(userListRef.current.scrollTop);
//                   setActiveUserId(null);
//                   if (isNative) Keyboard.hide().catch(() => {});
//                 }}
//                 sx={{ cursor: "pointer" }}
//               />

//               <Avatar
//                 sx={{ width: 32, height: 32, cursor: "pointer" }}
//                 onClick={() => window.open(`/user-profile/${activeUser.id}`, "_blank")}
//               >
//                 {activeUser.avatar}
//               </Avatar>

//               <Typography variant="h6" fontWeight={600}>
//                 {activeUser.name}
//               </Typography>

//               <Box sx={{ marginLeft: "auto" }}>
//                 <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//                   <MoreVertIcon />
//                 </IconButton>

//                 <Menu
//                   anchorEl={menuAnchor}
//                   open={Boolean(menuAnchor)}
//                   onClose={() => setMenuAnchor(null)}
//                 >
//                   <MenuItem onClick={() => setMenuAnchor(null)}>Search</MenuItem>
//                   <MenuItem onClick={() => setMenuAnchor(null)}>Report</MenuItem>
//                 </Menu>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="h6" fontWeight={600} sx={{ ml: 4 }}>
//               Chat
//             </Typography>
//           )}
//         </Box>

//         {/* BODY */}
//         <Box 
//           sx={{ 
//             flexGrow: 1, 
//             mt: bodyMarginTop,  // <-- UPDATED HERE
//             overflow: "hidden",
//             display: "flex",
//             flexDirection: "column"
//           }}
//         >
//           {!activeUser && (
//             <UserList
//               users={users}
//               setActiveUserId={setActiveUserId}
//               userListRef={userListRef}
//               setUserListScroll={setUserListScroll}
//               getStatusColor={getStatusColor}
//               getStatusIcon={getStatusIcon}
//               onSelectUser={handleSelectUser}
//             />
//           )}

//           {activeUser && (
//             <ChatView
//               activeUser={activeUser}
//               users={users}
//               setUsers={setUsers}
//               messageInput={messageInput}
//               setMessageInput={setMessageInput}
//               attachedFiles={attachedFiles}
//               setAttachedFiles={setAttachedFiles}
//               handleSend={handleSend}
//               renderMessageContent={renderMessageContent}
//               isMobile={isMobile}
//               sidebarWidth={sidebarWidth}
//               inputRef={inputRef}
//               keyboardHeight={keyboardHeight}
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }




// import React, { useState, useRef, useEffect } from "react";
// import { Box, Avatar, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// import { useThemeMode } from "@context/ThemeModeContext";
// import { dummyUsers } from "@utils/dummyData";
// import UserList from "@components/user/UserList";
// import ChatView from "@components/user/ChatView";
// import { renderMessageContent } from "@utils/chatUtils";

// export default function UserMessages() {
//   const theme = useTheme();
//   const { mode } = useThemeMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const sidebarWidth = 240;

//   const [users, setUsers] = useState(dummyUsers);
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [activeUserId, setActiveUserId] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [userListScroll, setUserListScroll] = useState(0);

//   const userListRef = useRef(null);

//   const activeUser = users.find((u) => u.id === activeUserId);

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   const getStatusIcon = (status) => {
//     if (!status) return "";
//     if (status === "sent") return "✓";
//     if (status === "delivered") return "✓✓";
//     if (status === "seen") return "✓✓";
//   };

//   const handleSelectUser = (userId) => {
//     setActiveUserId(userId); // ✅ Fixed: setActiveUserId instead of undefined setActiveUser
//   };

//   /* Restore user list scroll */
//   useEffect(() => {
//     if (!activeUser && userListRef.current) {
//       userListRef.current.scrollTop = userListScroll;
//     }
//   }, [activeUser, userListScroll]);

//   /* Send message */
//   const handleSend = () => {
//     if (!messageInput && attachedFiles.length === 0) return;

//     const filesPayload = attachedFiles.length
//       ? attachedFiles.map((f) => ({
//           fileName: f.name,
//           fileURL: f.objectURL,
//           mime: f.type,
//         }))
//       : null;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       type: filesPayload ? "file" : "text",
//       content: messageInput,
//       fileName: attachedFiles.length === 1 ? attachedFiles[0].name : undefined,
//       fileURL: attachedFiles.length === 1 ? attachedFiles[0].objectURL : undefined,
//       files: filesPayload || undefined,
//       status: "sent",
//       reaction: null,
//     };

//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
//       )
//     );

//     setTimeout(() => updateMessageStatus(newMsg.id, "delivered"), 600);
//     setTimeout(() => updateMessageStatus(newMsg.id, "seen"), 1500);

//     attachedFiles.forEach((f) => setTimeout(() => { try { URL.revokeObjectURL(f.objectURL); } catch {} }, 10000));

//     setMessageInput("");
//     setAttachedFiles([]);
//   };

//   const updateMessageStatus = (msgId, newStatus) => {
//     setUsers((prev) =>
//       prev.map((u) => {
//         if (u.id !== activeUserId) return u;
//         const messages = u.messages.map((m) =>
//           m.sender === "me" && m.id === msgId && m.status !== "seen"
//             ? { ...m, status: newStatus }
//             : m
//         );
//         return { ...u, messages };
//       })
//     );
//   };

//   const fixedStyles = isMobile
//     ? { left: 0, width: "100%" }
//     : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         {/* HEADER */}
//         <Box
//           sx={{
//             p: 2,
//             px: { xs: 1.2, sm: 2, md: 2.5 },
//             marginTop: 7,
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: theme.palette.background.paper,
//             position: "fixed",
//             top: 0,
//             zIndex: 200,
//             ...fixedStyles,
//           }}
//         >
//           {activeUser ? (
//             <>
//               <ArrowBackIcon
//                 onClick={() => {
//                   if (userListRef.current) setUserListScroll(userListRef.current.scrollTop);
//                   setActiveUserId(null);
//                 }}
//                 sx={{ cursor: "pointer" }}
//               />
//               <Avatar
//                 sx={{ width: 32, height: 32 }}
//                 onClick={() => window.open(`/user-profile/${activeUser.id}`, "_blank")}
//               >
//                 {activeUser.avatar}
//               </Avatar>
//               <Typography variant="h6" fontWeight={600}>
//                 {activeUser.name}
//               </Typography>
//               {/* Three-dots menu */}
// <Box sx={{ marginLeft: "auto" }}>
//   <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//     <MoreVertIcon />
//   </IconButton>

//   <Menu
//     anchorEl={menuAnchor}
//     open={Boolean(menuAnchor)}
//     onClose={() => setMenuAnchor(null)}
//   >
//     <MenuItem onClick={() => { setMenuAnchor(null); }}>Search</MenuItem>
//     <MenuItem onClick={() => { setMenuAnchor(null); }}>Report</MenuItem>
//   </Menu>
// </Box>

//             </>
//           ) : (
//             <Typography variant="h6" fontWeight={600} sx={{ ml: 4 }}>
//               Chat
//             </Typography>
//           )}
//         </Box>

//         {/* BODY */}
//         <Box sx={{ flexGrow: 1, mt: "54px", mb: "64px" }}>
//           {!activeUser && (
//             <UserList
//               users={users}
//               setActiveUserId={setActiveUserId}
//               userListRef={userListRef}
//               setUserListScroll={setUserListScroll}
//               getStatusColor={getStatusColor}
//               getStatusIcon={getStatusIcon}
//               onSelectUser={handleSelectUser}
//             />
//           )}

//           {activeUser && (
//             <ChatView
//               activeUser={activeUser}
//               users={users}
//               setUsers={setUsers}
//               messageInput={messageInput}
//               setMessageInput={setMessageInput}
//               attachedFiles={attachedFiles}
//               setAttachedFiles={setAttachedFiles}
//               handleSend={handleSend}
//               renderMessageContent={renderMessageContent}
//               isMobile={isMobile}
//               sidebarWidth={sidebarWidth}
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }






// // src/pages/user/UserMessages.jsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Avatar,
//   IconButton,
//   TextField,
//   Link as MuiLink,
//   Menu,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";

// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import SendIcon from "@mui/icons-material/Send";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CloseIcon from "@mui/icons-material/Close";
// import { useThemeMode } from "../../context/ThemeModeContext";

// /* ------------------- Dummy Users ------------------- */
// const dummyUsers = [
//   {
//     id: 1,
//     name: "Alice",
//     avatar: "A",
//     messages: [
//       { id: 1, sender: "them", type: "text", content: "Can we swap?" },
//       { id: 2, sender: "me", type: "text", content: "Yes, tomorrow works.", status: "seen", reaction: null },
//       { id: 3, sender: "them", type: "text", content: "Perfect!" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Bob",
//     avatar: "B",
//     messages: [
//       { id: 4, sender: "them", type: "text", content: "Ready for our class?" },
//       { id: 5, sender: "me", type: "text", content: "Yes!", status: "delivered", reaction: null },
//     ],
//   },
// ];

// /* ----------------------------- URL and File Renderer ----------------------------- */
// const isImageName = (name = "") => !!name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
// const isVideoName = (name = "") => !!name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

// const renderMessageContent = (msg) => {
//   // If message contains multiple files
//   if (msg.type === "file" && Array.isArray(msg.files)) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {msg.files.map((f, idx) => {
//           const isImg = isImageName(f.fileName);
//           const isVid = isVideoName(f.fileName);
//           if (isImg) {
//             return (
//               <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
//                 <img
//                   src={f.fileURL}
//                   alt={f.fileName}
//                   style={{
//                     maxWidth: "320px",
//                     width: "100%",
//                     borderRadius: 12,
//                     display: "block",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//                   }}
//                 />
//               </a>
//             );
//           }
//           if (isVid) {
//             return (
//               <Box key={idx} sx={{ maxWidth: "320px", width: "100%" }}>
//                 <video
//                   src={f.fileURL}
//                   controls
//                   style={{
//                     width: "100%",
//                     borderRadius: 12,
//                     display: "block",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//                     background: "#000",
//                   }}
//                 />
//               </Box>
//             );
//           }

//           // fallback link
//           return (
//             <MuiLink key={idx} href={f.fileURL} target="_blank" underline="hover" sx={{ color: "inherit" }}>
//               📎 {f.fileName}
//             </MuiLink>
//           );
//         })}
//       </Box>
//     );
//   }

//   // Single file message (legacy support)
//   if (msg.type === "file" && msg.fileName) {
//     const isImg = isImageName(msg.fileName);
//     const isVid = isVideoName(msg.fileName);
//     if (isImg) {
//       return (
//         <a href={msg.fileURL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
//           <img
//             src={msg.fileURL}
//             alt={msg.fileName}
//             style={{
//               maxWidth: "320px",
//               width: "100%",
//               borderRadius: 12,
//               display: "block",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//             }}
//           />
//         </a>
//       );
//     }
//     if (isVid) {
//       return (
//         <Box sx={{ maxWidth: "320px", width: "100%" }}>
//           <video
//             src={msg.fileURL}
//             controls
//             style={{
//               width: "100%",
//               borderRadius: 12,
//               display: "block",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//               background: "#000",
//             }}
//           />
//         </Box>
//       );
//     }

//     return (
//       <MuiLink href={msg.fileURL} target="_blank" underline="hover" sx={{ color: "inherit" }}>
//         📎 {msg.fileName}
//       </MuiLink>
//     );
//   }

//   // text with link highlighting
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = (msg.content || "").split(urlRegex);
//   return parts.map((p, i) =>
//     urlRegex.test(p) ? (
//       <MuiLink key={i} href={p} target="_blank" underline="hover" sx={{ color: "inherit" }}>
//         {p}
//       </MuiLink>
//     ) : (
//       <span key={i}>{p}</span>
//     )
//   );
// };

// /* ===================================================================================== */
// export default function UserMessages() {
//   const theme = useTheme();
//   const { mode } = useThemeMode();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const sidebarWidth = 240;

//   const [users, setUsers] = useState(dummyUsers);
//   const [activeUserId, setActiveUserId] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [attachedFiles, setAttachedFiles] = useState([]); // support multiple
//   const [userListScroll, setUserListScroll] = useState(0);
//   const [menuAnchor, setMenuAnchor] = useState(null); // For three-dots menu

//   const chatEndRef = useRef(null);
//   const userListRef = useRef(null);
//   const inputRef = useRef(null);

//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   const activeUser = users.find((u) => u.id === activeUserId);

//   /* ----------------------------- Auto scroll ----------------------------- */
//   useEffect(() => {
//     if (!activeUser) return;
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeUser?.messages.length]);

//   useEffect(() => {
//     // restore user list scroll only when returning to list
//     if (!activeUser && userListRef.current) {
//       userListRef.current.scrollTop = userListScroll;
//     }
//   }, [activeUser, userListScroll]);

//   /* ----------------------------- Send Message ----------------------------- */
//   const handleSend = () => {
//     if (!messageInput && attachedFiles.length === 0) return;

//     // build message payload: if files exist, include files array
//     const filesPayload = attachedFiles.length
//       ? attachedFiles.map((f) => ({
//           fileName: f.name,
//           fileURL: f.objectURL, // created earlier
//           mime: f.type,
//         }))
//       : null;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       type: filesPayload ? "file" : "text",
//       content: messageInput,
//       // legacy single-file fields kept for backward compatibility
//       fileName: attachedFiles.length === 1 ? attachedFiles[0].name : undefined,
//       fileURL: attachedFiles.length === 1 ? attachedFiles[0].objectURL : undefined,
//       files: filesPayload || undefined,
//       status: "sent",
//       reaction: null,
//     };

//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
//       )
//     );

//     // simulate delivery/seen for demo (only update the exact message and don't overwrite seen)
//     setTimeout(() => updateMessageStatus(newMsg.id, "delivered"), 600);
//     setTimeout(() => updateMessageStatus(newMsg.id, "seen"), 1500);

//     // cleanup attached file objectURLs (we won't revoke immediately to allow display; revoke after small timeout)
//     attachedFiles.forEach((f) => {
//       // revoke after 10s to ensure UI can show if user stays
//       setTimeout(() => {
//         try {
//           URL.revokeObjectURL(f.objectURL);
//         } catch {}
//       }, 10000);
//     });

//     setMessageInput("");
//     setAttachedFiles([]);
//   };

//   const updateMessageStatus = (msgId, newStatus) => {
//     setUsers((prev) =>
//       prev.map((u) => {
//         if (u.id !== activeUserId) return u;
//         const messages = u.messages.map((m) => {
//           // Only update the exact message (and only if not already seen)
//           if (m.sender === "me" && m.id === msgId && m.status !== "seen") {
//             return { ...m, status: newStatus };
//           }
//           return m;
//         });
//         return { ...u, messages };
//       })
//     );
//   };

//   /* ----------------------------- Reaction Handling ----------------------------- */
//   const openReactionMenu = (event, msg) => {
//     setSelectedMessage(msg);
//     setReactionAnchor(event.currentTarget);
//   };
//   const applyReaction = (reaction) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id !== activeUserId
//           ? u
//           : {
//               ...u,
//               messages: u.messages.map((m) => {
//                 if (m.id === selectedMessage.id) {
//                   // If the same reaction is clicked, remove it
//                   return { ...m, reaction: m.reaction === reaction ? null : reaction };
//                 }
//                 return m;
//               }),
//             }
//       )
//     );
//     closeReactionMenu();
//   };
  
//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   /* ----------------------------- User List UI helpers ----------------------------- */
//   const getStatusIcon = (status) => {
//     if (!status) return "";
//     if (status === "sent") return "✓";
//     if (status === "delivered") return "✓✓";
//     if (status === "seen") return "✓✓";
//   };

//   const getStatusColor = (status) => {
//     if (status === "seen") return "#04ff00";
//     if (status === "delivered") return theme.palette.text.secondary;
//     return theme.palette.text.disabled;
//   };

//   const fixedStyles = isMobile
//     ? { left: 0, width: "100%" }
//     : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

//   /* ----------------------------- Attachment helpers ----------------------------- */
//   const handleFileInput = (fileList) => {
//     if (!fileList) return;
//     const arr = Array.from(fileList).slice(0, 8); // limit to reasonable number (optional)
//     const withURLs = arr.map((f) => ({ file: f, name: f.name, type: f.type, objectURL: URL.createObjectURL(f) }));
//     setAttachedFiles((prev) => [...prev, ...withURLs]);
//     // show filename in input field for UX (optional)
//     if (withURLs.length === 1) setMessageInput(withURLs[0].name);
//   };

//   const handlePaste = (e) => {
//     const items = e.clipboardData?.items;
//     if (!items) return;
//     const files = [];
//     for (let i = 0; i < items.length; i++) {
//       if (items[i].kind === "file") {
//         const file = items[i].getAsFile();
//         if (file) files.push(file);
//       }
//     }
//     if (files.length) handleFileInput(files);
//   };

//   const removeAttached = (index) => {
//     setAttachedFiles((prev) => {
//       const copy = [...prev];
//       const removed = copy.splice(index, 1)[0];
//       try {
//         URL.revokeObjectURL(removed.objectURL);
//       } catch {}
//       return copy;
//     });
//   };

//   /* ===================================================================================== */
//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         {/* HEADER */}
//         <Box
//           sx={{
//             p: 2,
//             px: { xs: 1.2, sm: 2, md: 2.5 },
//             marginTop: 7,
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: theme.palette.background.paper,
//             position: "fixed",
//             top: 0,
//             zIndex: 200,
//             ...fixedStyles,
//           }}
//         >
//           {activeUser ? (
//             <>
//               <IconButton
//                 onClick={() => {
//                   if (userListRef.current) setUserListScroll(userListRef.current.scrollTop);
//                   setActiveUserId(null);
//                 }}
//               >
//                 <ArrowBackIcon />
//               </IconButton>
//               <Avatar sx={{ width: 32, height: 32 }} onClick={() => window.open(`/user-profile/${activeUser.id}`, "_blank")}>{activeUser.avatar}</Avatar>
//               <Typography variant="h6" fontWeight={600}>
//                 {activeUser.name}
//               </Typography>

//               {/* Three-dots menu */}
//               <Box sx={{marginLeft: "auto"}}>
//                 <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
//                   <MoreVertIcon />
//                 </IconButton>
//                 <Menu
//                   anchorEl={menuAnchor}
//                   open={Boolean(menuAnchor)}
//                   onClose={() => setMenuAnchor(null)}
//                 >
//                   <MenuItem onClick={() => { /* handle search */ setMenuAnchor(null); }}>Search</MenuItem>
//                   <MenuItem onClick={() => { /* handle report */ setMenuAnchor(null); }}>Report</MenuItem>
//                 </Menu>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="h6" fontWeight={600} sx={{ ml: 4 }}>
//               Chat
//             </Typography>
//           )}
//         </Box>

//         {/* BODY */}
//         <Box sx={{ flexGrow: 1, mt: "54px", mb: "64px" }}>
//           {/* USER LIST */}
//           {!activeUser && (
//             <Box
//               ref={userListRef}
//               sx={{
//                 flexGrow: 1,
//                 overflowY: "auto",
//                 p: 1,
//                 bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//               }}
//             >
//               {users.map((u) => {
//                 const last = u.messages[u.messages.length - 1];
//                 return (
//                   <Box
//                     key={u.id}
//                     onClick={() => {
//                       if (userListRef.current) setUserListScroll(userListRef.current.scrollTop);
//                       setActiveUserId(u.id);
//                     }}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       p: 1,
//                       mb: 1,
//                       height: "64px",
//                       borderRadius: 5,
//                       boxShadow:
//                         theme.palette.mode === "dark"
//                           ? "0 3px 4px rgba(0,0,0,0.9)"
//                           : "0 3px 4px rgba(0,0,0,0.1)",
//                       bgcolor: theme.palette.mode === "dark" ? "#131313" : "#fff",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Avatar sx={{ mr: 2 }}>{u.avatar}</Avatar>
//                     <Box sx={{ minWidth: 0 }}>
//                       <Typography fontWeight="bold">{u.name}</Typography>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           opacity: 0.8,
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 0.5,
//                           maxWidth: "180px",
//                         }}
//                       >
//                         {last?.sender === "me" && (
//                           <span style={{ color: getStatusColor(last.status) }}>{getStatusIcon(last.status)}</span>
//                         )}
//                         {last?.content}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 );
//               })}
//             </Box>
//           )}

//           {/* CHAT VIEW */}
//           {activeUser && (
//             <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//               <Box
//                 sx={{
//                   flexGrow: 1,
//                   overflowY: "auto",
//                   p: 2,
//                   marginBottom: 7,
//                   bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
//                 }}
//               >
//                 {activeUser.messages.map((msg) => {
//                   const isMe = msg.sender === "me";
//                   const hasFiles = msg.type === "file" && (Array.isArray(msg.files) ? msg.files.length > 0 : Boolean(msg.fileName));
//                   const isImageMsg = hasFiles && ((Array.isArray(msg.files) && msg.files.every((f) => isImageName(f.fileName))) || isImageName(msg.fileName));
//                   return (
//                     <Box
//                       key={msg.id}
//                       sx={{
//                         display: "flex",
//                         flexDirection: isMe ? "row-reverse" : "row",
//                         mb: 2,
//                         gap: 1,
//                       }}
//                     >
//                       {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}

//                       <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
//                         <Paper
//                           onContextMenu={(e) => {
//                             e.preventDefault();
//                             openReactionMenu(e, msg);
//                           }}
//                           onClick={(e) => isMobile && openReactionMenu(e, msg)}
//                           sx={{
//                             p: hasFiles ? 0 : 1.5,
//                             bgcolor: hasFiles ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
//                             color: hasFiles ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
//                             borderRadius: 2,
//                             pb: hasFiles ? 0 : "20px",
//                             wordBreak: "break-word",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {renderMessageContent(msg)}

//                           {msg.reaction && (
//                             <Typography
//                             sx={{
//                                 position: "absolute",
//                                 bottom: -12,
//                                 right: 32,     // Always lock to the right side of the bubble
//                                 left: "auto", // Never use left again
//                                 fontSize: "14px",
//                                 background: theme.palette.background.paper,
//                                 borderRadius: "50%",
//                                 padding: "2px 6px",
//                                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                               }}
//                             >
//                               {msg.reaction}
//                             </Typography>
//                           )}
//                         </Paper>

//                         {/* ✅ ALWAYS VISIBLE REACTION BUTTON */}
//                         <IconButton
//                           size="small"
//                           onClick={(e) => openReactionMenu(e, msg)}
//                           sx={{
//                             fontSize: "18px",
//                             padding: "2px",
//                             opacity: 0.8,
//                           }}
//                         >
//                           <SentimentSatisfiedAltIcon/>
//                         </IconButton>

//                         {isMe && msg.status && (
//                           <Typography
//                             sx={{
//                               position: "absolute",
//                               right: 4,
//                               bottom: -18,
//                               fontSize: "11px",
//                               color: getStatusColor(msg.status),
//                             }}
//                           >
//                             {getStatusIcon(msg.status)}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>
//                   );
//                 })}
//                 <div ref={chatEndRef} />
//               </Box>

//               {/* Reaction Menu - Horizontal layout using slotProps */}
//               <Menu
//                 anchorEl={reactionAnchor}
//                 open={Boolean(reactionAnchor)}
//                 onClose={closeReactionMenu}
//                 slotProps={{
//                   paper: {
//                     sx: {
//                       padding: "auto",
//                       borderRadius: "30px",
//                       display: "flex",
//                       flexDirection: "row",
//                       boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//                     },
//                   },
//                   list: {
//                     sx: {
//                       display: "flex",
//                       flexDirection: "row",
//                       px: 0,
//                       py: 0.5,
//                     },
//                   },
//                 }}
//               >
//                 {reactionOptions.map((r) => (
//                   <MenuItem
//                     key={r}
//                     onClick={() => applyReaction(r)}
//                     sx={{
//                       fontSize: "22px",
//                       padding: "6px 10px",
//                       minWidth: "auto",
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {r}
//                   </MenuItem>
//                 ))}
//               </Menu>

//               {/* INPUT */}
//               <Box
//                 sx={{
//                   p: 1,
//                   px: { xs: 1.2, sm: 2, md: 2.5 },
//                   borderTop: "1px solid",
//                   borderColor: theme.palette.divider,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   bgcolor: theme.palette.background.paper,
//                   position: "fixed",
//                   bottom: 0,
//                   zIndex: 30,
//                   ...fixedStyles,
//                 }}
//               >
//                 {/* ATTACHMENT PREVIEWS (thumbnails) */}
//                 {attachedFiles.length > 0 && (
//                   <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 1 }}>
//                     {attachedFiles.map((f, idx) => {
//                       const isImg = isImageName(f.name);
//                       const isVid = isVideoName(f.name);
//                       return (
//                         <Box key={idx} sx={{ position: "relative", width: 60, height: 60, borderRadius: 1, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
//                           {isImg ? (
//                             <img src={f.objectURL} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
//                           ) : isVid ? (
//                             <video src={f.objectURL} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
//                           ) : (
//                             <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.04)" }}>
//                               <Typography variant="caption" sx={{ px: 0.5, textAlign: "center" }}>
//                                 {f.name.length > 10 ? `${f.name.slice(0, 8)}…` : f.name}
//                               </Typography>
//                             </Box>
//                           )}
//                           <IconButton
//                             size="small"
//                             onClick={() => removeAttached(idx)}
//                             sx={{
//                               position: "absolute",
//                               top: -8,
//                               right: -8,
//                               bgcolor: theme.palette.background.paper,
//                               boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//                             }}
//                           >
//                             <CloseIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       );
//                     })}
//                   </Box>
//                 )}

//                 <input
//                   type="file"
//                   id="file-upload"
//                   style={{ display: "none" }}
//                   multiple
//                   onChange={(e) => handleFileInput(e.target.files)}
//                 />
//                 <label htmlFor="file-upload">
//                   <IconButton component="span">
//                     <AttachFileIcon />
//                   </IconButton>
//                 </label>

//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Type message…"
//                   value={messageInput}
//                   inputRef={inputRef}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                   onPaste={(e) => {
//                     handlePaste(e);
//                   }}
//                   sx={{ bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5" }}
//                 />

//                 <IconButton color="primary" onClick={handleSend}>
//                   <SendIcon />
//                 </IconButton>

//                 {attachedFiles.length > 0 && (
//                   <IconButton
//                     onClick={() => {
//                       attachedFiles.forEach((f) => {
//                         try {
//                           URL.revokeObjectURL(f.objectURL);
//                         } catch {}
//                       });
//                       setAttachedFiles([]);
//                       setMessageInput("");
//                     }}
//                   >
//                     <CloseIcon />
//                   </IconButton>
//                 )}
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }