  // import React, { useRef, useEffect } from "react";
  // import {
  //   Box,
  //   TextField,
  //   IconButton,
  //   Typography,
  //   useTheme,
  //   useMediaQuery,
  // } from "@mui/material";
  // import AttachFileIcon from "@mui/icons-material/AttachFile";
  // import SendIcon from "@mui/icons-material/Send";
  // import CloseIcon from "@mui/icons-material/Close";
  // import { Capacitor } from "@capacitor/core";

  // export function ChatInput({
  //   messageInput,
  //   setMessageInput,
  //   attachedFiles,
  //   setAttachedFiles,
  //   handleSend,
  //   handleFileInput,
  //   removeAttached,
  //   sidebarWidth = 240,
  //   inputRef,
  //   keyboardHeight = 0,
  //   onHeightChange,
  // }) {
  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //   const isNative = Capacitor.isNativePlatform();

  //   const inputBoxRef = useRef(null);

  //   // Measure height dynamically and report to parent
  //   useEffect(() => {
  //     if (inputBoxRef.current && onHeightChange) {
  //       const height = inputBoxRef.current.offsetHeight;
  //       onHeightChange(height);
  //     }
  //   }, [attachedFiles.length, onHeightChange]);

  //   const fixedStyles = isMobile
  //     ? { left: 0, width: "100%" }
  //     : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

  //   const onSend = (e) => {
  //     if (e) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }
  //     if (!messageInput.trim() && attachedFiles.length === 0) return;

  //     handleSend();

  //     // Keep keyboard open
  //     if (inputRef?.current) {
  //       inputRef.current.focus();
  //       requestAnimationFrame(() => {
  //         if (inputRef.current) {
  //           inputRef.current.focus();
  //           inputRef.current.setSelectionRange(0, 0);
  //         }
  //       });
  //     }
  //   };

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       onSend(e);
  //     }
  //   };

  //   // Position input above keyboard
  //   const bottomPosition = keyboardHeight > 0 ? keyboardHeight : 0;

  //   return (
  //     <Box
  //       ref={inputBoxRef}
  //       sx={{
  //         ...fixedStyles,
  //         position: "fixed",
  //         bottom: `${bottomPosition}px`, // Moves up with keyboard
  //         zIndex: 1000,
  //         bgcolor: theme.palette.background.paper,
  //         transition: isNative ? "bottom 0.3s ease-out" : "none",
  //         paddingBottom: isNative ? "env(safe-area-inset-bottom, 0)" : 0,
  //       }}
  //     >
  //       {/* Attachment preview bar */}
  //       {attachedFiles.length > 0 && (
  //         <Box
  //           sx={{
  //             width: "100%",
  //             p: 1,
  //             pb: 0.5,
  //             display: "flex",
  //             gap: 1,
  //             overflowX: "auto",
  //             bgcolor: theme.palette.background.paper,
  //             borderTop: "1px solid",
  //             borderColor: theme.palette.divider,
  //           }}
  //         >
  //           {attachedFiles.map((f, idx) => {
  //             const isImg = /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(f.name);
  //             const isVid = /\.(mp4|webm|ogg|mov|m4v)$/i.test(f.name);

  //             return (
  //               <Box
  //                 key={idx}
  //                 sx={{
  //                   position: "relative",
  //                   width: 70,
  //                   height: 70,
  //                   borderRadius: 1,
  //                   overflow: "hidden",
  //                   flexShrink: 0,
  //                   boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
  //                 }}
  //               >
  //                 {isImg ? (
  //                   <img
  //                     src={f.objectURL}
  //                     alt={f.name}
  //                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
  //                   />
  //                 ) : isVid ? (
  //                   <video
  //                     src={f.objectURL}
  //                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
  //                   />
  //                 ) : (
  //                   <Box
  //                     sx={{
  //                       width: "100%",
  //                       height: "100%",
  //                       display: "flex",
  //                       alignItems: "center",
  //                       justifyContent: "center",
  //                       bgcolor: "rgba(0,0,0,0.06)",
  //                       px: 0.5,
  //                       textAlign: "center",
  //                     }}
  //                   >
  //                     <Typography variant="caption">
  //                       {f.name.length > 10 ? f.name.slice(0, 8) + "…" : f.name}
  //                     </Typography>
  //                   </Box>
  //                 )}
  //                 <IconButton
  //                   size="small"
  //                   onClick={() => removeAttached(idx)}
  //                   sx={{
  //                     position: "absolute",
  //                     top: -8,
  //                     right: -8,
  //                     bgcolor: theme.palette.background.paper,
  //                     boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
  //                   }}
  //                 >
  //                   <CloseIcon fontSize="small" />
  //                 </IconButton>
  //               </Box>
  //             );
  //           })}
  //         </Box>
  //       )}

  //       {/* Input area */}
  //       <Box
  //         sx={{
  //           px: 2,
  //           py: 1,
  //           display: "flex",
  //           alignItems: "center",
  //           gap: 1,
  //           bgcolor: theme.palette.background.paper,
  //           borderTop: "1px solid",
  //           borderColor: theme.palette.divider,
  //           width: "100%",
  //         }}
  //       >
  //         <input
  //           type="file"
  //           id="file-upload"
  //           style={{ display: "none" }}
  //           multiple
  //           onChange={(e) => handleFileInput(e.target.files)}
  //         />
  //         <label htmlFor="file-upload">
  //           <IconButton component="span">
  //             <AttachFileIcon />
  //           </IconButton>
  //         </label>

  //         <TextField
  //           inputRef={inputRef}
  //           fullWidth
  //           size="small"
  //           placeholder="Type message…"
  //           value={messageInput}
  //           onChange={(e) => setMessageInput(e.target.value)}
  //           onKeyDown={handleKeyDown}
  //           multiline
  //           maxRows={4}
  //           sx={{
  //             bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
  //             borderRadius: 8,
  //             "& .MuiOutlinedInput-root": {
  //               borderRadius: 8,
  //             },
  //           }}
  //         />

  //         <IconButton
  //           color="primary"
  //           onClick={onSend}
  //           disabled={!messageInput.trim() && attachedFiles.length === 0}
  //         >
  //           <SendIcon />
  //         </IconButton>

  //         {attachedFiles.length > 0 && (
  //           <IconButton
  //             onClick={() => {
  //               attachedFiles.forEach((f) => {
  //                 try {
  //                   URL.revokeObjectURL(f.objectURL);
  //                 } catch {}
  //               });
  //               setAttachedFiles([]);
  //             }}
  //           >
  //             <CloseIcon />
  //           </IconButton>
  //         )}
  //       </Box>
  //     </Box>
  //   );
  // }



  import React, { useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Capacitor } from "@capacitor/core";

export function ChatInput({
  messageInput,
  setMessageInput,
  attachedFiles,
  setAttachedFiles,
  handleSend,
  handleFileInput,
  removeAttached,
  sidebarWidth = 240,
  inputRef,
  keyboardHeight = 0,
  onHeightChange,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isNative = Capacitor.isNativePlatform();

  const inputBoxRef = useRef(null);

  // Measure height dynamically and report to parent
  useEffect(() => {
    if (inputBoxRef.current && onHeightChange) {
      const height = inputBoxRef.current.offsetHeight;
      onHeightChange(height);
    }
  }, [attachedFiles.length, onHeightChange]);

  const fixedStyles = isMobile
    ? { left: 0, width: "100%" }
    : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

  const onSend = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!messageInput.trim() && attachedFiles.length === 0) return;

    handleSend();

    // Keep keyboard open
    if (inputRef?.current) {
      inputRef.current.focus();
      requestAnimationFrame(() => {
        if (inputRef?.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(0, 0);
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(e);
    }
  };

  // Position input above keyboard
  const bottomPosition = keyboardHeight > 0 ? keyboardHeight : 0;

  return (
    <Box
      ref={inputBoxRef}
      sx={{
        ...fixedStyles,
        position: "fixed",
        bottom: `${bottomPosition}px`, // Moves up with keyboard
        zIndex: 1000,
        bgcolor: theme.palette.background.paper,
        transition: isNative ? "bottom 0.3s ease-out" : "none",
        paddingBottom: isNative ? "env(safe-area-inset-bottom, 0)" : 0,
      }}
    >
      {/* Attachment preview bar */}
      {attachedFiles.length > 0 && (
        <Box
          sx={{
            width: "100%",
            p: 1,
            pb: 0.5,
            display: "flex",
            gap: 1,
            overflowX: "auto",
            bgcolor: theme.palette.background.paper,
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
          }}
        >
          {attachedFiles.map((f, idx) => {
            const isImg = /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(f.name);
            const isVid = /\.(mp4|webm|ogg|mov|m4v)$/i.test(f.name);

            return (
              <Box
                key={idx}
                sx={{
                  position: "relative",
                  width: 70,
                  height: 70,
                  borderRadius: 1,
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}
              >
                {isImg ? (
                  <img
                    src={f.objectURL}
                    alt={f.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : isVid ? (
                  <video
                    src={f.objectURL}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(0,0,0,0.06)",
                      px: 0.5,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption">
                      {f.name.length > 10 ? f.name.slice(0, 8) + "…" : f.name}
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
                    boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      )}

      {/* Input area */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: theme.palette.background.paper,
          borderTop: "1px solid",
          borderColor: theme.palette.divider,
          width: "100%",
        }}
      >
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          multiple
          onChange={(e) => handleFileInput(e.target.files)}
        />
        <label htmlFor="file-upload">
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
        </label>

        <TextField
          inputRef={inputRef}
          fullWidth
          size="small"
          placeholder="Type message…"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          multiline
          maxRows={4}
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
            borderRadius: 8,
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          }}
        />

        <IconButton
          color="primary"
          onClick={onSend}
          disabled={!messageInput.trim() && attachedFiles.length === 0}
        >
          <SendIcon />
        </IconButton>

        {attachedFiles.length > 0 && (
          <IconButton
            onClick={() => {
              attachedFiles.forEach((f) => {
                try {
                  URL.revokeObjectURL(f.objectURL);
                } catch {}
              });
              setAttachedFiles([]);
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}