// // src/utils/chatUtils.jsx
// import React from 'react';
// import { Box, Typography, Link } from '@mui/material';

// /**
//  * Detect URLs in text and convert to clickable links
//  */
// const detectLinks = (text) => {
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = text.split(urlRegex);
  
//   return parts.map((part, index) => {
//     if (part.match(urlRegex)) {
//       return (
//         <Link
//           key={index}
//           href={part}
//           target="_blank"
//           rel="noopener noreferrer"
//           sx={{
//             color: 'inherit',
//             textDecoration: 'underline',
//             '&:hover': {
//               textDecoration: 'underline',
//               opacity: 0.8,
//             },
//           }}
//         >
//           {part}
//         </Link>
//       );
//     }
//     return part;
//   });
// };

// /**
//  * Render message content based on type
//  */
// export const renderMessageContent = (msg, setLightboxImage) => {
//   // Handle file messages
//   if (msg.type === 'file' && msg.files?.length > 0) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//         {/* Show text content if exists */}
//         {msg.content && (
//           <Typography sx={{ mb: 1 }}>
//             {detectLinks(msg.content)}
//           </Typography>
//         )}
        
//         {/* Render files */}
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           {msg.files.map((file, idx) => {
//             const isImage = /image\/(jpeg|jpg|png|gif|webp|bmp)/i.test(file.mimeType);
//             const isVideo = /video\/(mp4|webm|ogg|mov|m4v)/i.test(file.mimeType);

//             if (isImage) {
//               return (
//                 <Box
//                   key={idx}
//                   onClick={() => setLightboxImage && setLightboxImage(file.fileURL)}
//                   sx={{
//                     cursor: 'pointer',
//                     borderRadius: 2,
//                     overflow: 'hidden',
//                     maxWidth: 300,
//                     '&:hover': { opacity: 0.9 },
//                   }}
//                 >
//                   <img
//                     src={file.fileURL}
//                     alt={file.fileName}
//                     style={{ width: '100%', height: 'auto', display: 'block' }}
//                   />
//                 </Box>
//               );
//             }

//             if (isVideo) {
//               return (
//                 <Box
//                   key={idx}
//                   sx={{
//                     borderRadius: 2,
//                     overflow: 'hidden',
//                     maxWidth: 300,
//                   }}
//                 >
//                   <video
//                     src={file.fileURL}
//                     controls
//                     style={{ width: '100%', height: 'auto', display: 'block' }}
//                   />
//                 </Box>
//               );
//             }

//             // Other file types - show as download link
//             return (
//               <Link
//                 key={idx}
//                 href={file.fileURL}
//                 download={file.fileName}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   p: 1,
//                   borderRadius: 1,
//                   bgcolor: 'rgba(0,0,0,0.05)',
//                   textDecoration: 'none',
//                   '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' },
//                 }}
//               >
//                 📄 {file.fileName}
//               </Link>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   }

//   // Handle text messages with link detection
//   return (
//     <Typography>
//       {detectLinks(msg.content || '')}
//     </Typography>
//   );
// };





// // src/utils/chatUtils.jsx
// import React from 'react';
// import { Box, Typography, Link } from '@mui/material';

// /**
//  * Detect URLs in text and convert to clickable links
//  */
// const detectLinks = (text) => {
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   const parts = text.split(urlRegex);
  
//   return parts.map((part, index) => {
//     if (part.match(urlRegex)) {
//       return (
//         <Link
//           key={index}
//           href={part}
//           target="_blank"
//           rel="noopener noreferrer"
//           sx={{
//             color: 'inherit',
//             textDecoration: 'underline',
//             '&:hover': {
//               textDecoration: 'underline',
//               opacity: 0.8,
//             },
//           }}
//         >
//           {part}
//         </Link>
//       );
//     }
//     return part;
//   });
// };

// /**
//  * Render message content based on type
//  */
// export const renderMessageContent = (msg, setLightboxImage) => {
//   // ✅ Handle both 'files' (optimistic) and 'attachments' (from backend)
//   const files = msg.attachments || msg.files || [];
  
//   // Handle file messages
//   if (files.length > 0) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//         {/* Show text content if exists */}
//         {msg.content && msg.content.trim() && (
//           <Typography sx={{ mb: 1 }}>
//             {detectLinks(msg.content)}
//           </Typography>
//         )}
        
//         {/* Render files */}
//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           {files.map((file, idx) => {
//             // Handle both optimistic (files) and backend (attachments) format
//             const fileName = file.fileName || file.name || 'file';
//             const fileURL = file.fileUrl || file.objectURL;
//             const mimeType = file.mimeType || file.type || '';
            
//             const isImage = /image\/(jpeg|jpg|png|gif|webp|bmp)/i.test(mimeType);
//             const isVideo = /video\/(mp4|webm|ogg|mov|m4v)/i.test(mimeType);

//             if (isImage) {
//               return (
//                 <Box
//                   key={idx}
//                   onClick={() => setLightboxImage && setLightboxImage(fileURL)}
//                   sx={{
//                     cursor: 'pointer',
//                     borderRadius: 2,
//                     overflow: 'hidden',
//                     maxWidth: 300,
//                     '&:hover': { opacity: 0.9 },
//                   }}
//                 >
//                   <img
//                     src={fileURL}
//                     alt={fileName}
//                     style={{ width: '100%', height: 'auto', display: 'block' }}
//                   />
//                 </Box>
//               );
//             }

//             if (isVideo) {
//               return (
//                 <Box
//                   key={idx}
//                   sx={{
//                     borderRadius: 2,
//                     overflow: 'hidden',
//                     maxWidth: 300,
//                   }}
//                 >
//                   <video
//                     src={fileURL}
//                     controls
//                     style={{ width: '100%', height: 'auto', display: 'block' }}
//                   />
//                 </Box>
//               );
//             }

//             // Other file types - show as download link
//             return (
//               <Link
//                 key={idx}
//                 href={fileURL}
//                 download={fileName}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   p: 1,
//                   borderRadius: 1,
//                   bgcolor: 'rgba(0,0,0,0.05)',
//                   textDecoration: 'none',
//                   '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' },
//                 }}
//               >
//                 📄 {fileName}
//               </Link>
//             );
//           })}
//         </Box>
//       </Box>
//     );
//   }

//   // Handle text messages with link detection
//   return (
//     <Typography>
//       {detectLinks(msg.content || '')}
//     </Typography>
//   );
// };





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
  // ✅ Handle both 'files' (optimistic) and 'attachments' (from backend)
  const files = msg.attachments || msg.files || [];
  
  // Handle file messages
  if (files.length > 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Show text content if exists */}
        {msg.content && msg.content.trim() && (
          <Typography sx={{ mb: 1 }}>
            {detectLinks(msg.content)}
          </Typography>
        )}
        
        {/* Render files */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {files.map((file, idx) => {
            // Handle both optimistic (files) and backend (attachments) format
            const fileName = file.fileName || file.name || 'file';
            const fileURL = file.fileUrl || file.objectURL;
            const mimeType = file.mimeType || file.type || '';
            
            const isImage = /image\/(jpeg|jpg|png|gif|webp|bmp)/i.test(mimeType);
            const isVideo = /video\/(mp4|webm|ogg|mov|m4v)/i.test(mimeType);

            if (isImage) {
              return (
                <Box
                  key={idx}
                  onClick={() => setLightboxImage && setLightboxImage(fileURL)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxWidth: 300,
                    '&:hover': { opacity: 0.9 },
                  }}
                >
                  <img
                    src={fileURL}
                    alt={fileName}
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
                    src={fileURL}
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
                href={fileURL}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'rgba(255,255,255,0.2)', // ✅ Lighter background
                  color: '#000000', // ✅ White text for visibility
                  textDecoration: 'none',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.3)',
                    textDecoration: 'underline',
                  },
                }}
              >
                📄 {fileName}
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