// import React from "react";
// import { Box, Paper, Typography, Avatar, IconButton, useTheme } from "@mui/material";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

// export default function ChatBubble({ msg, activeUser, isMe, openReactionMenu, getStatusColor, renderMessageContent }) {
//   const theme = useTheme();

//   return (
//     <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
//       {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
//       <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
//         <Paper
//           onContextMenu={(e) => { e.preventDefault(); openReactionMenu(e, msg); }}
//           onClick={(e) => isMe && openReactionMenu(e, msg)}
//           sx={{
//             p: msg.type === "file" ? 0 : 1.5,
//             bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
//             color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
//             borderRadius: 2,
//             pb: msg.type === "file" ? 0 : "20px",
//             wordBreak: "break-word",
//             cursor: "pointer",
//           }}
//         >
//           {renderMessageContent(msg)}

//           {msg.reaction && (
//             <Typography
//               sx={{
//                 position: "absolute",
//                 bottom: -12,
//                 right: 32,
//                 fontSize: "14px",
//                 background: theme.palette.background.paper,
//                 borderRadius: "50%",
//                 padding: "2px 6px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               }}
//             >
//               {msg.reaction}
//             </Typography>
//           )}
//         </Paper>

//         {/* Always-visible reaction button */}
//         <IconButton size="small" onClick={(e) => openReactionMenu(e, msg)} sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}>
//           <SentimentSatisfiedAltIcon />
//         </IconButton>

//         {isMe && msg.status && (
//           <Typography sx={{ position: "absolute", right: 4, bottom: -18, fontSize: "11px", color: getStatusColor(msg.status) }}>
//             {msg.status}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }


// // src/components/user/ChatBubble.jsx
// import React from "react";
// import { Box, Paper, Typography, Avatar, IconButton, useTheme } from "@mui/material";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

// export default function ChatBubble({
//   msg,
//   activeUser,
//   isMe,
//   openReactionMenu,
//   getStatusColor,
//   renderMessageContent = (m) => m.content, // Default safe
// }) {
//   const theme = useTheme();

//   return (
//     <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
//       {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
//       <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
//         <Paper
//           onContextMenu={(e) => { e.preventDefault(); openReactionMenu(e, msg); }}
//           onClick={(e) => isMe && openReactionMenu(e, msg)}
//           sx={{
//             p: msg.type === "file" ? 0 : 1.5,
//             bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
//             color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
//             borderRadius: 2,
//             pb: msg.type === "file" ? 0 : "20px",
//             wordBreak: "break-word",
//             cursor: "pointer",
//           }}
//         >
//           {renderMessageContent(msg)}

//           {msg.reaction && (
//             <Typography
//               sx={{
//                 position: "absolute",
//                 bottom: -12,
//                 right: 32,
//                 fontSize: "14px",
//                 background: theme.palette.background.paper,
//                 borderRadius: "50%",
//                 padding: "2px 6px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               }}
//             >
//               {msg.reaction}
//             </Typography>
//           )}
//         </Paper>

//         {/* Always-visible reaction button */}
//         <IconButton size="small" onClick={(e) => openReactionMenu(e, msg)} sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}>
//           <SentimentSatisfiedAltIcon />
//         </IconButton>

//         {isMe && msg.status && (
//           <Typography sx={{ position: "absolute", right: 4, bottom: -18, fontSize: "11px", color: getStatusColor(msg.status) }}>
//             {msg.status}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }



// // src/components/user/ChatBubble.jsx
// import React from "react";
// import { Box, Paper, Typography, Avatar, IconButton, useTheme } from "@mui/material";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

// export default function ChatBubble({
//   msg,
//   activeUser,
//   isMe,
//   openReactionMenu,
//   getStatusColor,
//   renderMessageContent,
// }) {
//   const theme = useTheme();

//   return (
//     <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
//       {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
//       <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
//         <Paper
//           onContextMenu={(e) => { e.preventDefault(); openReactionMenu(e, msg); }}
//           onClick={(e) => isMe && openReactionMenu(e, msg)}
//           sx={{
//             p: msg.type === "file" ? 0 : 1.5,
//             bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
//             color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
//             borderRadius: 2,
//             pb: msg.type === "file" ? 0 : "20px",
//             wordBreak: "break-word",
//             cursor: "pointer",
//             boxShadow: msg.type === "file" ? "none" : undefined,
//           }}
//         >
//           {renderMessageContent(msg)}

//           {msg.reaction && (
//             <Typography
//               sx={{
//                 position: "absolute",
//                 bottom: -12,
//                 right: 32,
//                 fontSize: "14px",
//                 background: theme.palette.background.paper,
//                 borderRadius: "50%",
//                 padding: "2px 6px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               }}
//             >
//               {msg.reaction}
//             </Typography>
//           )}
//         </Paper>

//         {/* Always-visible reaction button */}
//         <IconButton 
//           size="small" 
//           onClick={(e) => openReactionMenu(e, msg)} 
//           sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}
//         >
//           <SentimentSatisfiedAltIcon />
//         </IconButton>

//         {isMe && msg.status && (
//           <Typography 
//             sx={{ 
//               position: "absolute", 
//               right: 4, 
//               bottom: -18, 
//               fontSize: "11px", 
//               color: getStatusColor(msg.status) 
//             }}
//           >
//             {msg.status}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }


// // src/components/user/ChatBubble.jsx
// import React from "react";
// import { Box, Paper, Typography, Avatar, IconButton, useTheme } from "@mui/material";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

// export default function ChatBubble({
//   msg,
//   activeUser,
//   isMe,
//   openReactionMenu,
//   getStatusColor,
//   renderMessageContent,
// }) {
//   const theme = useTheme();

//   const handlePaperClick = (e) => {
//     // For file messages, don't open reaction menu
//     // Files handle their own clicks
//     if (msg.type === "file") {
//       return;
//     }
    
//     // For text messages, open reaction menu
//     if (isMe) {
//       openReactionMenu(e, msg);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
//       {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
//       <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
//         <Paper
//           onContextMenu={(e) => { 
//             e.preventDefault(); 
//             openReactionMenu(e, msg); 
//           }}
//           onClick={handlePaperClick}
//           sx={{
//             p: msg.type === "file" ? 0 : 1.5,
//             bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
//             color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
//             borderRadius: 2,
//             pb: msg.type === "file" ? 0 : "20px",
//             wordBreak: "break-word",
//             cursor: msg.type === "file" ? "default" : "pointer",
//             boxShadow: msg.type === "file" ? "none" : undefined,
//           }}
//         >
//           {renderMessageContent(msg)}

//           {msg.reaction && (
//             <Typography
//               sx={{
//                 position: "absolute",
//                 bottom: -12,
//                 right: 32,
//                 fontSize: "14px",
//                 background: theme.palette.background.paper,
//                 borderRadius: "50%",
//                 padding: "2px 6px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               }}
//             >
//               {msg.reaction}
//             </Typography>
//           )}
//         </Paper>

//         {/* Reaction button */}
//         <IconButton 
//           size="small" 
//           onClick={(e) => {
//             e.stopPropagation();
//             openReactionMenu(e, msg);
//           }} 
//           sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}
//         >
//           <SentimentSatisfiedAltIcon />
//         </IconButton>

//         {isMe && msg.status && (
//           <Typography 
//             sx={{ 
//               position: "absolute", 
//               right: 4, 
//               bottom: -18, 
//               fontSize: "11px", 
//               color: getStatusColor(msg.status) 
//             }}
//           >
//             {msg.status}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }



// src/components/user/ChatBubble.jsx
import React from "react";
import { Box, Paper, Typography, Avatar, IconButton, useTheme } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function ChatBubble({
  msg,
  activeUser,
  isMe,
  openReactionMenu,
  getStatusColor,
  renderMessageContent,
}) {
  const theme = useTheme();

  const handlePaperClick = (e) => {
    // For file messages, don't open reaction menu
    if (msg.type === "file") {
      return;
    }
    
    // For text messages, open reaction menu
    if (isMe) {
      openReactionMenu(e, msg);
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

  return (
    <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
      {/* ✅ Show avatar for OTHER user's messages */}
      {!isMe && (
        <Avatar 
          src={activeUser?.avatarUrl || undefined}
          sx={{ width: 28, height: 28 }}
        >
          {getInitials(activeUser?.userName || activeUser?.fullName || 'U')}
        </Avatar>
      )}
      
      <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
        <Paper
          onContextMenu={(e) => { 
            e.preventDefault(); 
            openReactionMenu(e, msg); 
          }}
          onClick={handlePaperClick}
          sx={{
            p: msg.type === "file" ? 0 : 1.5,
            bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
            color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
            borderRadius: 2,
            pb: msg.type === "file" ? 0 : "20px",
            wordBreak: "break-word",
            cursor: msg.type === "file" ? "default" : "pointer",
            boxShadow: msg.type === "file" ? "none" : undefined,
          }}
        >
          {renderMessageContent(msg)}

          {msg.reaction && (
            <Typography
              sx={{
                position: "absolute",
                bottom: -12,
                right: 32,
                fontSize: "14px",
                background: theme.palette.background.paper,
                borderRadius: "50%",
                padding: "2px 6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              {msg.reaction}
            </Typography>
          )}
        </Paper>

        {/* Reaction button */}
        <IconButton 
          size="small" 
          onClick={(e) => {
            e.stopPropagation();
            openReactionMenu(e, msg);
          }} 
          sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}
        >
          <SentimentSatisfiedAltIcon />
        </IconButton>

        {/* ✅ Show message status for MY messages */}
        {isMe && msg.status && (
          <Typography 
            sx={{ 
              position: "absolute", 
              right: 4, 
              bottom: -18, 
              fontSize: "11px", 
              color: getStatusColor(msg.status) 
            }}
          >
            {msg.status}
          </Typography>
        )}
      </Box>
    </Box>
  );
}