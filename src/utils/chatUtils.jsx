// /* ----------------- File Type Helpers ----------------- */
// export const isImageName = (name = "") => !!name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
// export const isVideoName = (name = "") => !!name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

// /* ----------------- Render Message Content ----------------- */
// export const renderMessageContent = (msg) => {
//   // multiple file message
//   if (msg.type === "file" && Array.isArray(msg.files)) {
//     return msg.files.map((f, idx) => {
//       const isImg = isImageName(f.fileName);
//       const isVid = isVideoName(f.fileName);

//       if (isImg) return (
//         <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer">
//           <img src={f.fileURL} alt={f.fileName} style={{ maxWidth: "320px", width: "100%", cursor: "pointer" }} />
//         </a>
//       );
//       if (isVid) return <video key={idx} src={f.fileURL} controls style={{ maxWidth: "320px", width: "100%" }} />;

//       return (
//         <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer">
//           📎 {f.fileName}
//         </a>
//       );
//     });
//   }

//   // single file
//   if (msg.type === "file" && msg.fileName) {
//     const isImg = isImageName(msg.fileName);
//     const isVid = isVideoName(msg.fileName);
//     if (isImg) return (
//       <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">
//         <img src={msg.fileURL} alt={msg.fileName} style={{ maxWidth: "320px", width: "100%", cursor: "pointer" }} />
//       </a>
//     );
//     if (isVid) return <video src={msg.fileURL} controls style={{ maxWidth: "320px", width: "100%" }} />;
//     return <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">📎 {msg.fileName}</a>;
//   }

//   // text with link highlighting
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = (msg.content || "").split(urlRegex);
//   return parts.map((p, i) =>
//     urlRegex.test(p) ? (
//       <a key={i} href={p} target="_blank" rel="noopener noreferrer">{p}</a>
//     ) : (
//       <span key={i}>{p}</span>
//     )
//   );
// };

// // src/utils/chatUtils.jsx
// import React from "react";
// import { Box, Typography } from "@mui/material";

// export function renderMessageContent(msg) {
//   console.log("Rendering message:", msg); // Debug log

//   // Handle text messages
//   if (msg.type === "text" || (!msg.type && msg.content)) {
//     return <Typography>{msg.content}</Typography>;
//   }

//   // Handle file messages
//   if (msg.type === "file" && msg.files && msg.files.length > 0) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {/* Show text if present */}
//         {msg.content && (
//           <Typography sx={{ mb: 1, px: 1.5, pt: 1.5 }}>{msg.content}</Typography>
//         )}
        
//         {/* Show files */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: msg.content ? 1 : 0 }}>
//           {msg.files.map((file, idx) => {
//             const isImg = /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(file.fileName);
//             const isVid = /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.fileName);

//             console.log("Rendering file:", file.fileName, "URL:", file.fileURL, "isImg:", isImg); // Debug

//             return (
//               <Box
//                 key={idx}
//                 sx={{
//                   width: msg.files.length === 1 ? 280 : 140,
//                   height: msg.files.length === 1 ? 280 : 140,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                   bgcolor: "background.paper",
//                 }}
//               >
//                 {isImg ? (
//                   <img
//                     src={file.fileURL}
//                     alt={file.fileName}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       display: "block",
//                     }}
//                     onError={(e) => {
//                       console.error("Image failed to load:", file.fileURL);
//                       e.target.style.display = "none";
//                       e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;color:#666;">Failed to load image<br/>${file.fileName}</div>`;
//                     }}
//                   />
//                 ) : isVid ? (
//                   <video
//                     src={file.fileURL}
//                     controls
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       display: "block",
//                       backgroundColor: "#000",
//                     }}
//                     onError={(e) => {
//                       console.error("Video failed to load:", file.fileURL);
//                     }}
//                   />
//                 ) : (
//                   <Box
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       bgcolor: "rgba(0,0,0,0.05)",
//                       p: 2,
//                     }}
//                   >
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         textAlign: "center",
//                         wordBreak: "break-word",
//                         color: "text.secondary",
//                       }}
//                     >
//                       📄 {file.fileName}
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   }

//   // Fallback
//   return <Typography>{msg.content || "Message"}</Typography>;
// }

// // src/utils/chatUtils.jsx
// import React from "react";
// import { Box, Typography } from "@mui/material";

// export function renderMessageContent(msg) {
//   // Handle text messages
//   if (msg.type === "text" || (!msg.type && msg.content)) {
//     return <Typography>{msg.content}</Typography>;
//   }

//   // Handle file messages
//   if (msg.type === "file" && msg.files && msg.files.length > 0) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {/* Show text if present */}
//         {msg.content && (
//           <Typography sx={{ mb: 1, px: 1.5, pt: 1.5 }}>{msg.content}</Typography>
//         )}
        
//         {/* Show files */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: msg.content ? 1 : 0 }}>
//           {msg.files.map((file, idx) => {
//             const isImg = /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(file.fileName);
//             const isVid = /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.fileName);

//             if (isImg) {
//               // Image rendering
//               return (
//                 <Box
//                   key={idx}
//                   component="a"
//                   href={file.fileURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                   sx={{
//                     width: msg.files.length === 1 ? 280 : 140,
//                     height: msg.files.length === 1 ? 280 : 140,
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                     bgcolor: "background.paper",
//                     cursor: "pointer",
//                     display: "block",
//                     transition: "transform 0.2s",
//                     "&:hover": {
//                       transform: "scale(1.02)",
//                     },
//                   }}
//                 >
//                   <img
//                     src={file.fileURL}
//                     alt=""
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       display: "block",
//                     }}
//                   />
//                 </Box>
//               );
//             }

//             if (isVid) {
//               // Video rendering with proper aspect ratio
//               return (
//                 <Box
//                   key={idx}
//                   onClick={(e) => e.stopPropagation()}
//                   sx={{
//                     width: msg.files.length === 1 ? 280 : 140,
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                     bgcolor: "#000",
//                   }}
//                 >
//                   <video
//                     src={file.fileURL}
//                     controls
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       display: "block",
//                       maxHeight: msg.files.length === 1 ? "400px" : "200px",
//                     }}
//                   />
//                 </Box>
//               );
//             }

//             // Other files
//             return (
//               <Box
//                 key={idx}
//                 sx={{
//                   width: msg.files.length === 1 ? 280 : 140,
//                   height: msg.files.length === 1 ? 280 : 140,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                   bgcolor: "rgba(0,0,0,0.05)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   p: 2,
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     textAlign: "center",
//                     wordBreak: "break-word",
//                     color: "text.secondary",
//                   }}
//                 >
//                   📄 {file.fileName}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   }

//   // Fallback
//   return <Typography>{msg.content || "Message"}</Typography>;
// }


// // src/utils/chatUtils.jsx
// import React from "react";
// import { Box, Typography } from "@mui/material";

// export function renderMessageContent(msg, onFileClick) {
//   // Handle text messages
//   if (msg.type === "text" || (!msg.type && msg.content)) {
//     return <Typography>{msg.content}</Typography>;
//   }

//   // Handle file messages
//   if (msg.type === "file" && msg.files && msg.files.length > 0) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {/* Show text if present */}
//         {msg.content && (
//           <Typography sx={{ mb: 1, px: 1.5, pt: 1.5 }}>{msg.content}</Typography>
//         )}

//         {/* Show files */}
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: msg.content ? 1 : 0 }}>
//           {msg.files.map((file, idx) => {
//             const isImg = /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(file.fileName);
//             const isVid = /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.fileName);

//             if (isImg) {
//               // Image rendering
//               return (
//                 <Box
//                   key={idx}
//                   sx={{
//                     width: msg.files.length === 1 ? 280 : 140,
//                     height: msg.files.length === 1 ? 280 : 140,
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                     bgcolor: "background.paper",
//                     cursor: "pointer",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (onFileClick) onFileClick(file.fileURL);
//                   }}
//                 >
//                   <img
//                     src={file.fileURL}
//                     alt=""
//                     style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//                   />
//                 </Box>
//               );
//             }

//             if (isVid) {
//               // Video rendering
//               return (
//                 <Box
//                   key={idx}
//                   onClick={(e) => e.stopPropagation()}
//                   sx={{
//                     width: msg.files.length === 1 ? 280 : 140,
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                     bgcolor: "#000",
//                   }}
//                 >
//                   <video
//                     src={file.fileURL}
//                     controls
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       display: "block",
//                       maxHeight: msg.files.length === 1 ? "400px" : "200px",
//                     }}
//                   />
//                 </Box>
//               );
//             }

//             // Other files
//             return (
//               <Box
//                 key={idx}
//                 sx={{
//                   width: msg.files.length === 1 ? 280 : 140,
//                   height: msg.files.length === 1 ? 280 : 140,
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                   bgcolor: "rgba(0,0,0,0.05)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   p: 2,
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   sx={{ textAlign: "center", wordBreak: "break-word", color: "text.secondary" }}
//                 >
//                   📄 {file.fileName}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   }

//   // Fallback
//   return <Typography>{msg.content || "Message"}</Typography>;
// }




// src/utils/chatUtils.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

/**
 * Detect URLs in text and convert to clickable links
 */
const detectLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <Link
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'inherit',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              opacity: 0.8,
            },
          }}
        >
          {part}
        </Link>
      );
    }
    return part;
  });
};

/**
 * Render message content based on type
 */
export const renderMessageContent = (msg, setLightboxImage) => {
  // Handle file messages
  if (msg.type === 'file' && msg.files?.length > 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Show text content if exists */}
        {msg.content && (
          <Typography sx={{ mb: 1 }}>
            {detectLinks(msg.content)}
          </Typography>
        )}
        
        {/* Render files */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {msg.files.map((file, idx) => {
            const isImage = /image\/(jpeg|jpg|png|gif|webp|bmp)/i.test(file.mimeType);
            const isVideo = /video\/(mp4|webm|ogg|mov|m4v)/i.test(file.mimeType);

            if (isImage) {
              return (
                <Box
                  key={idx}
                  onClick={() => setLightboxImage && setLightboxImage(file.fileURL)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxWidth: 300,
                    '&:hover': { opacity: 0.9 },
                  }}
                >
                  <img
                    src={file.fileURL}
                    alt={file.fileName}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </Box>
              );
            }

            if (isVideo) {
              return (
                <Box
                  key={idx}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxWidth: 300,
                  }}
                >
                  <video
                    src={file.fileURL}
                    controls
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </Box>
              );
            }

            // Other file types - show as download link
            return (
              <Link
                key={idx}
                href={file.fileURL}
                download={file.fileName}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' },
                }}
              >
                📄 {file.fileName}
              </Link>
            );
          })}
        </Box>
      </Box>
    );
  }

  // Handle text messages with link detection
  return (
    <Typography>
      {detectLinks(msg.content || '')}
    </Typography>
  );
};