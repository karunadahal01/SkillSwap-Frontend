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
// const renderMessageContent = (msg) => {
//   if (msg.type === "file") {
//     const isImage = msg.fileName?.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
//     if (isImage) {
//       return (
//         <Box
//           component="img"
//           src={msg.fileURL}
//           alt={msg.fileName}
//           sx={{ maxWidth: "100%", borderRadius: 2, cursor: "pointer" }}
//           onClick={() => window.open(msg.fileURL, "_blank")}
//         />
//       );
//     }
//     return (
//       <MuiLink href={msg.fileURL} target="_blank" underline="hover" sx={{ color: "#fff" }}>
//         📎 {msg.fileName}
//       </MuiLink>
//     );
//   }

//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = msg.content.split(urlRegex);

//   return parts.map((p, i) =>
//     urlRegex.test(p) ? (
//       <MuiLink key={i} href={p} target="_blank" underline="hover" sx={{ color: "#fff" }}>
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
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [userListScroll, setUserListScroll] = useState(0);

//   const chatEndRef = useRef(null);
//   const userListRef = useRef(null);

//   /* ----------------------------- Reaction Menu State ----------------------------- */
//   const [reactionAnchor, setReactionAnchor] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

//   const activeUser = users.find((u) => u.id === activeUserId);

//   /* ----------------------------- Auto scroll on new messages ----------------------------- */
//   useEffect(() => {
//     if (!activeUser) return;
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeUser?.messages.length]);

//   useEffect(() => {
//     if (!activeUser && userListRef.current) {
//       userListRef.current.scrollTop = userListScroll;
//     }
//   }, [activeUser]);

//   /* ----------------------------- Paste Image Support ----------------------------- */
//   const handleFileInput = (file) => {
//     setAttachedFile(file);
//     if (file) setMessageInput(file.name);
//   };

//   const handlePaste = (e) => {
//     const items = e.clipboardData.items;
//     for (let i = 0; i < items.length; i++) {
//       const item = items[i];
//       if (item.type.indexOf("image") !== -1) {
//         const file = item.getAsFile();
//         handleFileInput(file);
//         e.preventDefault();
//       }
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("paste", handlePaste);
//     return () => document.removeEventListener("paste", handlePaste);
//   }, []);

//   /* ----------------------------- Send Message ----------------------------- */
//   const handleSend = () => {
//     if (!messageInput && !attachedFile) return;

//     const newMsg = {
//       id: Date.now(),
//       sender: "me",
//       type: attachedFile ? "file" : "text",
//       content: messageInput,
//       fileName: attachedFile?.name,
//       fileURL: attachedFile ? URL.createObjectURL(attachedFile) : null,
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

//     setMessageInput("");
//     setAttachedFile(null);
//   };

//   /* ----------------------------- Update Message Status ----------------------------- */
//   const updateMessageStatus = (msgId, newStatus) => {
//     setUsers((prev) =>
//       prev.map((u) => {
//         if (u.id !== activeUserId) return u;

//         const messages = u.messages.map((m) => {
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
//       prev.map((u) => {
//         if (u.id !== activeUserId) return u;
//         return {
//           ...u,
//           messages: u.messages.map((m) =>
//             m.id === selectedMessage.id ? { ...m, reaction } : m
//           ),
//         };
//       })
//     );
//     closeReactionMenu();
//   };

//   const closeReactionMenu = () => {
//     setReactionAnchor(null);
//     setSelectedMessage(null);
//   };

//   /* ----------------------------- User List Tick Color ----------------------------- */
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
//               <IconButton onClick={() => setActiveUserId(null)}>
//                 <ArrowBackIcon />
//               </IconButton>
//               <Avatar sx={{ width: 32, height: 32 }}>{activeUser.avatar}</Avatar>
//               <Typography variant="h6" fontWeight={600}>
//                 {activeUser.name}
//               </Typography>
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
//                       setUserListScroll(userListRef.current.scrollTop);
//                       setActiveUserId(u.id);
//                     }}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       p: 1,
//                       mb: 1,
//                       height: "64px",
//                       borderRadius: 5,
//                       boxShadow: theme.palette.mode === "dark"
//                         ? "0 3px 4px rgba(0,0,0,0.9)"
//                         : "0 3px 4px rgba(0,0,0,0.1)",
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
//                           <span style={{ color: getStatusColor(last.status) }}>
//                             {getStatusIcon(last.status)}
//                           </span>
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
              
//               {/* CHAT MESSAGES */}
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

//                       <Box sx={{ maxWidth: "70%", position: "relative" }}>
//                         <Paper
//                           onContextMenu={(e) => {
//                             e.preventDefault();
//                             openReactionMenu(e, msg);
//                           }}
//                           onClick={(e) => isMobile && openReactionMenu(e, msg)}
//                           sx={{
//                             p: 1.5,
//                             bgcolor: isMe ? theme.palette.primary.main : theme.palette.background.paper,
//                             color: isMe ? "#fff" : theme.palette.text.primary,
//                             borderRadius: 4,
//                             pb: "20px",
//                             wordBreak: "break-word",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {renderMessageContent(msg)}

//                           {/* Reaction Display */}
//                           {msg.reaction && (
//                             <Typography
//                               sx={{
//                                 position: "absolute",
//                                 bottom: -12,
//                                 right: isMe ? 6 : "auto",
//                                 left: isMe ? "auto" : 6,
//                                 fontSize: "16px",
//                               }}
//                             >
//                               {msg.reaction}
//                             </Typography>
//                           )}
//                         </Paper>

//                         {/* Status ticks under my messages */}
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

//               {/* Reaction Menu */}
//               <Menu anchorEl={reactionAnchor} open={Boolean(reactionAnchor)} onClose={closeReactionMenu}>
//                 {reactionOptions.map((r) => (
//                   <MenuItem key={r} onClick={() => applyReaction(r)} sx={{ fontSize: "20px" }}>
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
//                   flexDirection: "column",
//                   gap: 1,
//                   bgcolor: theme.palette.background.paper,
//                   position: "fixed",
//                   bottom: 0,
//                   zIndex: 30,
//                   ...fixedStyles,
//                 }}
//               >
//                 {/* Image Preview */}
//                 {attachedFile && (
//                   <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
//                     <Box
//                       component="img"
//                       src={URL.createObjectURL(attachedFile)}
//                       alt={attachedFile.name}
//                       sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover", mr: 1 }}
//                     />
//                     <IconButton onClick={() => { setAttachedFile(null); setMessageInput(""); }}>
//                       <CloseIcon />
//                     </IconButton>
//                   </Box>
//                 )}

//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <input
//                     type="file"
//                     id="file-upload"
//                     style={{ display: "none" }}
//                     onChange={(e) => handleFileInput(e.target.files[0])}
//                   />

//                   <label htmlFor="file-upload">
//                     <IconButton component="span">
//                       <AttachFileIcon />
//                     </IconButton>
//                   </label>

//                   <TextField
//                     fullWidth
//                     size="small"
//                     placeholder="Type message…"
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                     sx={{
//                       bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
//                     }}
//                   />

//                   <IconButton color="primary" onClick={handleSend}>
//                     <SendIcon />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }


// src/pages/user/UserMessages.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Link as MuiLink,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeMode } from "../../context/ThemeModeContext";

/* ------------------- Dummy Users ------------------- */
const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "A",
    messages: [
      { id: 1, sender: "them", type: "text", content: "Can we swap?" },
      { id: 2, sender: "me", type: "text", content: "Yes, tomorrow works.", status: "seen", reaction: null },
      { id: 3, sender: "them", type: "text", content: "Perfect!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    avatar: "B",
    messages: [
      { id: 4, sender: "them", type: "text", content: "Ready for our class?" },
      { id: 5, sender: "me", type: "text", content: "Yes!", status: "delivered", reaction: null },
    ],
  },
];

/* ----------------------------- URL and File Renderer ----------------------------- */
const renderMessageContent = (msg) => {
  if (msg.type === "file") {
    const isImage = msg.fileName?.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
    if (isImage) {
      return (
        <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">
          <img
            src={msg.fileURL}
            alt={msg.fileName}
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          />
        </a>
      );
    } else {
      return (
        <MuiLink href={msg.fileURL} target="_blank" underline="hover" sx={{ color: "#fff" }}>
          📎 {msg.fileName}
        </MuiLink>
      );
    }
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = msg.content.split(urlRegex);

  return parts.map((p, i) =>
    urlRegex.test(p) ? (
      <MuiLink key={i} href={p} target="_blank" underline="hover" sx={{ color: "#fff" }}>
        {p}
      </MuiLink>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

/* ===================================================================================== */
export default function UserMessages() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sidebarWidth = 240;

  const [users, setUsers] = useState(dummyUsers);
  const [activeUserId, setActiveUserId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [userListScroll, setUserListScroll] = useState(0);

  const chatEndRef = useRef(null);
  const userListRef = useRef(null);
  const inputRef = useRef(null);

  const [reactionAnchor, setReactionAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

  const activeUser = users.find((u) => u.id === activeUserId);

  /* ----------------------------- Auto scroll ----------------------------- */
  useEffect(() => {
    if (!activeUser) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeUser?.messages.length]);

  useEffect(() => {
    if (!activeUser && userListRef.current) {
      userListRef.current.scrollTop = userListScroll;
    }
  }, [activeUser]);

  /* ----------------------------- Send Message ----------------------------- */
  const handleSend = () => {
    if (!messageInput && !attachedFile) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: attachedFile ? "file" : "text",
      content: messageInput,
      fileName: attachedFile?.name,
      fileURL: attachedFile ? URL.createObjectURL(attachedFile) : null,
      status: "sent",
      reaction: null,
    };

    setUsers((prev) =>
      prev.map((u) =>
        u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
      )
    );

    setTimeout(() => updateMessageStatus(newMsg.id, "delivered"), 600);
    setTimeout(() => updateMessageStatus(newMsg.id, "seen"), 1500);

    setMessageInput("");
    setAttachedFile(null);
  };

  const updateMessageStatus = (msgId, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== activeUserId) return u;
        const messages = u.messages.map((m) =>
          m.sender === "me" && m.id === msgId && m.status !== "seen"
            ? { ...m, status: newStatus }
            : m
        );
        return { ...u, messages };
      })
    );
  };

  /* ----------------------------- Reaction Handling ----------------------------- */
  const openReactionMenu = (event, msg) => {
    setSelectedMessage(msg);
    setReactionAnchor(event.currentTarget);
  };

  const applyReaction = (reaction) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id !== activeUserId
          ? u
          : {
              ...u,
              messages: u.messages.map((m) =>
                m.id === selectedMessage.id ? { ...m, reaction } : m
              ),
            }
      )
    );
    closeReactionMenu();
  };

  const closeReactionMenu = () => {
    setReactionAnchor(null);
    setSelectedMessage(null);
  };

  /* ----------------------------- User List Tick Color ----------------------------- */
  const getStatusIcon = (status) => {
    if (!status) return "";
    if (status === "sent") return "✓";
    if (status === "delivered") return "✓✓";
    if (status === "seen") return "✓✓";
  };

  const getStatusColor = (status) => {
    if (status === "seen") return "#04ff00";
    if (status === "delivered") return theme.palette.text.secondary;
    return theme.palette.text.disabled;
  };

  const fixedStyles = isMobile
    ? { left: 0, width: "100%" }
    : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

  /* ===================================================================================== */
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            px: { xs: 1.2, sm: 2, md: 2.5 },
            marginTop: 7,
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: theme.palette.background.paper,
            position: "fixed",
            top: 0,
            zIndex: 200,
            ...fixedStyles,
          }}
        >
          {activeUser ? (
            <>
              <IconButton onClick={() => setActiveUserId(null)}>
                <ArrowBackIcon />
              </IconButton>
              <Avatar sx={{ width: 32, height: 32 }}>{activeUser.avatar}</Avatar>
              <Typography variant="h6" fontWeight={600}>
                {activeUser.name}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" fontWeight={600} sx={{ ml: 4 }}>
              Chat
            </Typography>
          )}
        </Box>

        {/* BODY */}
        <Box sx={{ flexGrow: 1, mt: "54px", mb: "64px" }}>
          {/* USER LIST */}
          {!activeUser && (
            <Box
              ref={userListRef}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                p: 1,
                bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
              }}
            >
              {users.map((u) => {
                const last = u.messages[u.messages.length - 1];
                return (
                  <Box
                    key={u.id}
                    onClick={() => {
                      setUserListScroll(userListRef.current.scrollTop);
                      setActiveUserId(u.id);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      mb: 1,
                      height: "64px",
                      borderRadius: 5,
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 3px 4px rgba(0,0,0,0.9)"
                          : "0 3px 4px rgba(0,0,0,0.1)",
                      bgcolor: theme.palette.mode === "dark" ? "#131313" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>{u.avatar}</Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight="bold">{u.name}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.8,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          maxWidth: "180px",
                        }}
                      >
                        {last?.sender === "me" && (
                          <span style={{ color: getStatusColor(last.status) }}>
                            {getStatusIcon(last.status)}
                          </span>
                        )}
                        {last?.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* CHAT VIEW */}
          {activeUser && (
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  p: 2,
                  marginBottom: 7,
                  bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
                }}
              >
                {activeUser.messages.map((msg) => {
                  const isMe = msg.sender === "me";
                  const isImage =
                    msg.type === "file" &&
                    msg.fileName?.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
                  return (
                    <Box
                      key={msg.id}
                      sx={{
                        display: "flex",
                        flexDirection: isMe ? "row-reverse" : "row",
                        mb: 2,
                        gap: 1,
                      }}
                    >
                      {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
                      <Box sx={{ maxWidth: "70%", position: "relative" }}>
                        <Paper
                          onContextMenu={(e) => {
                            e.preventDefault();
                            openReactionMenu(e, msg);
                          }}
                          onClick={(e) => isMobile && openReactionMenu(e, msg)}
                          sx={{
                            p: isImage ? 0 : 1.5,
                            bgcolor: isImage ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
                            color: isImage ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
                            borderRadius: 2,
                            pb: isImage ? 0 : "20px",
                            wordBreak: "break-word",
                            cursor: "pointer",
                          }}
                        >
                          {renderMessageContent(msg)}
                          {msg.reaction && (
                            <Typography
                              sx={{
                                position: "absolute",
                                bottom: -12,
                                right: isMe ? 6 : "auto",
                                left: isMe ? "auto" : 6,
                                fontSize: "16px",
                              }}
                            >
                              {msg.reaction}
                            </Typography>
                          )}
                        </Paper>
                        {isMe && msg.status && (
                          <Typography
                            sx={{
                              position: "absolute",
                              right: 4,
                              bottom: -18,
                              fontSize: "11px",
                              color: getStatusColor(msg.status),
                            }}
                          >
                            {getStatusIcon(msg.status)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
                <div ref={chatEndRef} />
              </Box>

              {/* Reaction Menu */}
              <Menu anchorEl={reactionAnchor} open={Boolean(reactionAnchor)} onClose={closeReactionMenu}>
                {reactionOptions.map((r) => (
                  <MenuItem key={r} onClick={() => applyReaction(r)} sx={{ fontSize: "20px" }}>
                    {r}
                  </MenuItem>
                ))}
              </Menu>

              {/* INPUT */}
              <Box
                sx={{
                  p: 1,
                  px: { xs: 1.2, sm: 2, md: 2.5 },
                  borderTop: "1px solid",
                  borderColor: theme.palette.divider,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: theme.palette.background.paper,
                  position: "fixed",
                  bottom: 0,
                  zIndex: 30,
                  ...fixedStyles,
                }}
              >
                {/* IMAGE PREVIEW */}
                {attachedFile && attachedFile.type.startsWith("image/") && (
                  <Box
                    sx={{
                      mr: 1,
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      maxHeight: 60,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(attachedFile)}
                      alt={attachedFile.name}
                      style={{ height: 60, borderRadius: "8px", objectFit: "cover" }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: "absolute", top: -6, right: -6 }}
                      onClick={() => {
                        setAttachedFile(null);
                        setMessageInput("");
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}

                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setAttachedFile(file);
                    if (file) setMessageInput(file.name);
                  }}
                />
                <label htmlFor="file-upload">
                  <IconButton component="span">
                    <AttachFileIcon />
                  </IconButton>
                </label>

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type message…"
                  value={messageInput}
                  inputRef={inputRef}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  onPaste={(e) => {
                    const items = e.clipboardData.items;
                    for (let i = 0; i < items.length; i++) {
                      if (items[i].kind === "file") {
                        const file = items[i].getAsFile();
                        setAttachedFile(file);
                        if (file) setMessageInput(file.name);
                      }
                    }
                  }}
                  sx={{ bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5" }}
                />

                <IconButton color="primary" onClick={handleSend}>
                  <SendIcon />
                </IconButton>

                {attachedFile && (
                  <IconButton
                    onClick={() => {
                      setAttachedFile(null);
                      setMessageInput("");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
