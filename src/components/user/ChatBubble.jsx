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
//     // For file messages, don't open reaction menu on click
//     if (msg.type === "file") {
//       return;
//     }
    
//     // For text messages, open reaction menu
//     if (!isMe) {
//       openReactionMenu(e, msg);
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

//   // Show pending indicator
//   const isPending = msg._pending;

//   // Format timestamp
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     try {
//       const date = new Date(timestamp);
//       // Check if date is valid
//       if (isNaN(date.getTime())) return '';
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } catch (error) {
//       console.error('Error formatting time:', error);
//       return '';
//     }
//   };

//   const timeString = formatTime(msg.createdAt);
//   // console.log('Message time:', msg.createdAt, '-> formatted:', timeString); // Debug

//   return (
//     <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
//       {/* ✅ Show avatar for OTHER user's messages */}
//       {!isMe && (
//         <Avatar 
//           src={activeUser?.avatarUrl || undefined}
//           sx={{ width: 28, height: 28 }}
//         >
//           {getInitials(activeUser?.userName || activeUser?.fullName || 'U')}
//         </Avatar>
//       )}
      
//       <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
//         <Paper
//           onContextMenu={(e) => { 
//             e.preventDefault(); 
//             if (!isPending) {
//               openReactionMenu(e, msg); 
//             }
//           }}
//           onClick={handlePaperClick}
//           sx={{
//             p: msg.type === "file" ? 0 : 1.5,
//             bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
//             color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
//             borderRadius: 2,
//             wordBreak: "break-word",
//             cursor: msg.type === "file" ? "default" : "pointer",
//             boxShadow: msg.type === "file" ? "none" : undefined,
//             opacity: isPending ? 0.6 : 1,
//             position: 'relative',
//           }}
//         >
//           {/* Message content */}
//           {renderMessageContent(msg)}

//           {/* ✅ Timestamp and Status inside bubble */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: isMe ? 'flex-end' : 'flex-start',
//               gap: 0.5,
//               mt: msg.type === 'file' ? 0 : 0.5,
//               fontSize: '0.7rem',
//               color: isMe ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary,
//             }}
//           >
//             {/* Time - Always show if available */}
//             {timeString && (
//               <Typography sx={{ fontSize: '0.7rem' }}>
//                 {timeString}
//               </Typography>
//             )}

//             {/* ✅ Status for MY messages (inside bubble) */}
//             {isMe && !isPending && msg.status && (
//               <Typography 
//                 sx={{ 
//                   fontSize: '0.7rem',
//                   color: msg.status === 'seen' ? '#04ff00' : 'rgba(255,255,255,0.7)',
//                   fontWeight: msg.status === 'seen' ? 600 : 400,
//                 }}
//               >
//                 • {msg.status}
//               </Typography>
//             )}

//             {/* ✅ Sending indicator for pending messages */}
//             {isPending && isMe && (
//               <Typography 
//                 sx={{ 
//                   fontSize: '0.7rem',
//                   fontStyle: 'italic',
//                   color: 'rgb(255, 255, 255)',
//                 }}
//               >
//                 • Sending...
//               </Typography>
//             )}
//           </Box>

//           {/* ✅ Reaction positioned on the OPPOSITE side of sender */}
//           {msg.reaction && !isPending && (
//             <Typography
//               sx={{
//                 position: "absolute",
//                 bottom: -12,
//                 // Place reaction on left for my messages, right for their messages
//                 [isMe ? 'left' : 'right']: 4,
//                 fontSize: "12px",
//                 background: theme.palette.background.paper,
//                 borderRadius: "50%",
//                 padding: "2px 6px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                 border: `1px solid ${theme.palette.divider}`,
//               }}
//             >
//               {msg.reaction}
//             </Typography>
//           )}
//         </Paper>

//         {/* Reaction button - only show if not pending */}
//         {!isPending && (
//           <IconButton 
//             size="small" 
//             onClick={(e) => {
//               e.stopPropagation();
//               openReactionMenu(e, msg);
//             }} 
//             sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}
//           >
//             <SentimentSatisfiedAltIcon />
//           </IconButton>
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
    // For file messages, don't open reaction menu on click
    if (msg.type === "file") {
      return;
    }
    
    // For text messages, open reaction menu
    if (!isMe) {
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

  // Show pending indicator
  const isPending = msg._pending;

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  const timeString = formatTime(msg.createdAt);

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
      
      <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", flexDirection: isMe ? "row-reverse" : "row", alignItems: "center", gap: 1 }}>
        <Paper
          onContextMenu={(e) => { 
            e.preventDefault(); 
            if (!isPending) {
              openReactionMenu(e, msg); 
            }
          }}
          onClick={handlePaperClick}
          sx={{
            p: msg.type === "file" ? 0 : 1.5,
            bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
            color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
            // ✅ WhatsApp-style border radius with pointed corner
            borderRadius: msg.type === "file" 
              ? 2 
              : isMe 
                ? "25px 25px 0 25px"  // Pointed bottom-right for sent messages
                : "25px 25px 25px 0",  // Pointed bottom-left for received messages
            wordBreak: "break-word",
            cursor: msg.type === "file" ? "default" : "pointer",
            boxShadow: msg.type === "file" ? "none" : undefined,
            opacity: isPending ? 0.6 : 1,
            position: 'relative',
          }}
        >
          {/* Message content */}
          {renderMessageContent(msg)}

          {/* ✅ Timestamp and Status inside bubble */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMe ? 'flex-end' : 'flex-start',
              gap: 0.5,
              mt: msg.type === 'file' ? 0 : 0.5,
              fontSize: '0.7rem',
              color: isMe ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary,
            }}
          >
            {/* Time - Always show if available */}
            {timeString && (
              <Typography sx={{ fontSize: '0.7rem' }}>
                {timeString}
              </Typography>
            )}

            {/* ✅ Status for MY messages (inside bubble) */}
            {isMe && !isPending && msg.status && (
              <Typography 
                sx={{ 
                  fontSize: '0.7rem',
                  color: msg.status === 'seen' ? '#04ff00' : 'rgba(255,255,255,0.7)',
                  fontWeight: msg.status === 'seen' ? 600 : 400,
                }}
              >
                • {msg.status}
              </Typography>
            )}

            {/* ✅ Sending indicator for pending messages */}
            {isPending && isMe && (
              <Typography 
                sx={{ 
                  fontSize: '0.7rem',
                  fontStyle: 'italic',
                  color: 'rgb(255, 255, 255)',
                }}
              >
                • Sending...
              </Typography>
            )}
          </Box>

          {/* ✅ Reaction positioned on the OPPOSITE side of sender */}
          {msg.reaction && !isPending && (
            <Typography
              sx={{
                position: "absolute",
                bottom: -12,
                // Place reaction on left for my messages, right for their messages
                [isMe ? 'left' : 'right']: 4,
                fontSize: "12px",
                background: theme.palette.background.paper,
                borderRadius: "50%",
                padding: "2px 6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {msg.reaction}
            </Typography>
          )}
        </Paper>

        {/* Reaction button - only show if not pending */}
        {!isPending && (
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
        )}
      </Box>
    </Box>
  );
}