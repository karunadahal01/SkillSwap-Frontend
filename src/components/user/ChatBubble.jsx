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
  renderMessageContent = (m) => m.content, // Default safe
}) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", mb: 2, gap: 1 }}>
      {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
      <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
        <Paper
          onContextMenu={(e) => { e.preventDefault(); openReactionMenu(e, msg); }}
          onClick={(e) => isMe && openReactionMenu(e, msg)}
          sx={{
            p: msg.type === "file" ? 0 : 1.5,
            bgcolor: msg.type === "file" ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
            color: msg.type === "file" ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
            borderRadius: 2,
            pb: msg.type === "file" ? 0 : "20px",
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

        {/* Always-visible reaction button */}
        <IconButton size="small" onClick={(e) => openReactionMenu(e, msg)} sx={{ fontSize: "18px", padding: "2px", opacity: 0.8 }}>
          <SentimentSatisfiedAltIcon />
        </IconButton>

        {isMe && msg.status && (
          <Typography sx={{ position: "absolute", right: 4, bottom: -18, fontSize: "11px", color: getStatusColor(msg.status) }}>
            {msg.status}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
