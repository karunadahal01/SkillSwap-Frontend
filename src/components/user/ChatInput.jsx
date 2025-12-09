
import React from "react";
import { Box, TextField, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

export function ChatInput({
  messageInput,
  setMessageInput,
  attachedFiles,
  setAttachedFiles,
  handleSend,
  handleFileInput,
  removeAttached,
  sidebarWidth = 240, // fallback
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fixedStyles = isMobile
    ? { left: 0, width: "100%" }
    : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

  return (
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
      {/* Attachment previews */}
      {attachedFiles.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 1 }}>
          {attachedFiles.map((f, idx) => {
            const isImg = f.name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
            const isVid = f.name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

            return (
              <Box key={idx} sx={{ position: "relative", width: 60, height: 60, borderRadius: 1, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
                {isImg ? (
                  <img src={f.objectURL} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : isVid ? (
                  <video src={f.objectURL} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0.04)" }}>
                    <Typography variant="caption" sx={{ px: 0.5, textAlign: "center" }}>
                      {f.name.length > 10 ? `${f.name.slice(0, 8)}…` : f.name}
                    </Typography>
                  </Box>
                )}

                <IconButton
                  size="small"
                  onClick={() => removeAttached(idx)}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      )}

      <input type="file" id="file-upload" style={{ display: "none" }} multiple onChange={(e) => handleFileInput(e.target.files)} />
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
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        sx={{ bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",    
            borderRadius: 12, // <-- adjust this number as you like (px)
            "& .MuiOutlinedInput-root": {
            borderRadius: 12, // ensures input box corners are rounded
            }, 
          }}
      />

      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>

      {attachedFiles.length > 0 && (
        <IconButton
          onClick={() => {
            attachedFiles.forEach((f) => { try { URL.revokeObjectURL(f.objectURL); } catch {} });
            setAttachedFiles([]);
            setMessageInput("");
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}
