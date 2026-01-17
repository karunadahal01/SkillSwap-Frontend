// src/utils/chatUtils.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

// ✅ Helper to get full image URL
const getFullUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://192.168.254.4:8080';
  return `${baseUrl}/${cleanPath}`;
};

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
            const fileURL = file.fileURL || file.fileUrl || file.objectURL;
            const mimeType = file.mimeType || file.type || '';
            
            // ✅ Get full URL for the file
            const fullUrl = getFullUrl(fileURL);
            
            const isImage = /image\/(jpeg|jpg|png|gif|webp|bmp)/i.test(mimeType);
            const isVideo = /video\/(mp4|webm|ogg|mov|m4v)/i.test(mimeType);

            if (isImage) {
              return (
                <Box
                  key={idx}
                  onClick={() => setLightboxImage && setLightboxImage(fullUrl)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxWidth: 300,
                    '&:hover': { opacity: 0.9 },
                  }}
                >
                  <img
                    src={fullUrl}
                    alt={fileName}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      console.error('Failed to load image:', fullUrl);
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                    }}
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
                    src={fullUrl}
                    controls
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block' 
                    }}
                    onError={(e) => {
                      console.error('Failed to load video:', fullUrl);
                    }}
                  />
                </Box>
              );
            }

            // Other file types - show as download link
            return (
              <Link
                key={idx}
                href={fullUrl}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'inherit',
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
    <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {detectLinks(msg.content || '')}
    </Typography>
  );
};