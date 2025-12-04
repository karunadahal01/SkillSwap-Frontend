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

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
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
const isImageName = (name = "") => !!name.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
const isVideoName = (name = "") => !!name.match(/\.(mp4|webm|ogg|mov|m4v)$/i);

const renderMessageContent = (msg) => {
  // If message contains multiple files
  if (msg.type === "file" && Array.isArray(msg.files)) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {msg.files.map((f, idx) => {
          const isImg = isImageName(f.fileName);
          const isVid = isVideoName(f.fileName);
          if (isImg) {
            return (
              <a key={idx} href={f.fileURL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <img
                  src={f.fileURL}
                  alt={f.fileName}
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                    borderRadius: 12,
                    display: "block",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  }}
                />
              </a>
            );
          }
          if (isVid) {
            return (
              <Box key={idx} sx={{ maxWidth: "320px", width: "100%" }}>
                <video
                  src={f.fileURL}
                  controls
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    display: "block",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    background: "#000",
                  }}
                />
              </Box>
            );
          }

          // fallback link
          return (
            <MuiLink key={idx} href={f.fileURL} target="_blank" underline="hover" sx={{ color: "inherit" }}>
              📎 {f.fileName}
            </MuiLink>
          );
        })}
      </Box>
    );
  }

  // Single file message (legacy support)
  if (msg.type === "file" && msg.fileName) {
    const isImg = isImageName(msg.fileName);
    const isVid = isVideoName(msg.fileName);
    if (isImg) {
      return (
        <a href={msg.fileURL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
          <img
            src={msg.fileURL}
            alt={msg.fileName}
            style={{
              maxWidth: "320px",
              width: "100%",
              borderRadius: 12,
              display: "block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          />
        </a>
      );
    }
    if (isVid) {
      return (
        <Box sx={{ maxWidth: "320px", width: "100%" }}>
          <video
            src={msg.fileURL}
            controls
            style={{
              width: "100%",
              borderRadius: 12,
              display: "block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              background: "#000",
            }}
          />
        </Box>
      );
    }

    return (
      <MuiLink href={msg.fileURL} target="_blank" underline="hover" sx={{ color: "inherit" }}>
        📎 {msg.fileName}
      </MuiLink>
    );
  }

  // text with link highlighting
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = (msg.content || "").split(urlRegex);
  return parts.map((p, i) =>
    urlRegex.test(p) ? (
      <MuiLink key={i} href={p} target="_blank" underline="hover" sx={{ color: "inherit" }}>
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
  const [attachedFiles, setAttachedFiles] = useState([]); // support multiple
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
    // restore user list scroll only when returning to list
    if (!activeUser && userListRef.current) {
      userListRef.current.scrollTop = userListScroll;
    }
  }, [activeUser, userListScroll]);

  /* ----------------------------- Send Message ----------------------------- */
  const handleSend = () => {
    if (!messageInput && attachedFiles.length === 0) return;

    // build message payload: if files exist, include files array
    const filesPayload = attachedFiles.length
      ? attachedFiles.map((f) => ({
          fileName: f.name,
          fileURL: f.objectURL, // created earlier
          mime: f.type,
        }))
      : null;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: filesPayload ? "file" : "text",
      content: messageInput,
      // legacy single-file fields kept for backward compatibility
      fileName: attachedFiles.length === 1 ? attachedFiles[0].name : undefined,
      fileURL: attachedFiles.length === 1 ? attachedFiles[0].objectURL : undefined,
      files: filesPayload || undefined,
      status: "sent",
      reaction: null,
    };

    setUsers((prev) =>
      prev.map((u) =>
        u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
      )
    );

    // simulate delivery/seen for demo (only update the exact message and don't overwrite seen)
    setTimeout(() => updateMessageStatus(newMsg.id, "delivered"), 600);
    setTimeout(() => updateMessageStatus(newMsg.id, "seen"), 1500);

    // cleanup attached file objectURLs (we won't revoke immediately to allow display; revoke after small timeout)
    attachedFiles.forEach((f) => {
      // revoke after 10s to ensure UI can show if user stays
      setTimeout(() => {
        try {
          URL.revokeObjectURL(f.objectURL);
        } catch {}
      }, 10000);
    });

    setMessageInput("");
    setAttachedFiles([]);
  };

  const updateMessageStatus = (msgId, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== activeUserId) return u;
        const messages = u.messages.map((m) => {
          // Only update the exact message (and only if not already seen)
          if (m.sender === "me" && m.id === msgId && m.status !== "seen") {
            return { ...m, status: newStatus };
          }
          return m;
        });
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

  /* ----------------------------- User List UI helpers ----------------------------- */
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

  /* ----------------------------- Attachment helpers ----------------------------- */
  const handleFileInput = (fileList) => {
    if (!fileList) return;
    const arr = Array.from(fileList).slice(0, 8); // limit to reasonable number (optional)
    const withURLs = arr.map((f) => ({ file: f, name: f.name, type: f.type, objectURL: URL.createObjectURL(f) }));
    setAttachedFiles((prev) => [...prev, ...withURLs]);
    // show filename in input field for UX (optional)
    if (withURLs.length === 1) setMessageInput(withURLs[0].name);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const files = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file") {
        const file = items[i].getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length) handleFileInput(files);
  };

  const removeAttached = (index) => {
    setAttachedFiles((prev) => {
      const copy = [...prev];
      const removed = copy.splice(index, 1)[0];
      try {
        URL.revokeObjectURL(removed.objectURL);
      } catch {}
      return copy;
    });
  };

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
              <IconButton
                onClick={() => {
                  if (userListRef.current) setUserListScroll(userListRef.current.scrollTop);
                  setActiveUserId(null);
                }}
              >
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
                      if (userListRef.current) setUserListScroll(userListRef.current.scrollTop);
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
                          <span style={{ color: getStatusColor(last.status) }}>{getStatusIcon(last.status)}</span>
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
                  const hasFiles = msg.type === "file" && (Array.isArray(msg.files) ? msg.files.length > 0 : Boolean(msg.fileName));
                  const isImageMsg = hasFiles && ((Array.isArray(msg.files) && msg.files.every((f) => isImageName(f.fileName))) || isImageName(msg.fileName));
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

                      <Box sx={{ maxWidth: "70%", position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
                        <Paper
                          onContextMenu={(e) => {
                            e.preventDefault();
                            openReactionMenu(e, msg);
                          }}
                          onClick={(e) => isMobile && openReactionMenu(e, msg)}
                          sx={{
                            p: hasFiles ? 0 : 1.5,
                            bgcolor: hasFiles ? "transparent" : isMe ? theme.palette.primary.main : theme.palette.background.paper,
                            color: hasFiles ? "inherit" : isMe ? "#fff" : theme.palette.text.primary,
                            borderRadius: 2,
                            pb: hasFiles ? 0 : "20px",
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
                                right: 32,     // Always lock to the right side of the bubble
                                left: "auto", // Never use left again
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

                        {/* ✅ ALWAYS VISIBLE REACTION BUTTON */}
                        <IconButton
                          size="small"
                          onClick={(e) => openReactionMenu(e, msg)}
                          sx={{
                            fontSize: "18px",
                            padding: "2px",
                            opacity: 0.8,
                          }}
                        >
                          <SentimentSatisfiedAltIcon/>
                        </IconButton>

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
                {/* ATTACHMENT PREVIEWS (thumbnails) */}
                {attachedFiles.length > 0 && (
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 1 }}>
                    {attachedFiles.map((f, idx) => {
                      const isImg = isImageName(f.name);
                      const isVid = isVideoName(f.name);
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
                  fullWidth
                  size="small"
                  placeholder="Type message…"
                  value={messageInput}
                  inputRef={inputRef}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  onPaste={(e) => {
                    handlePaste(e);
                  }}
                  sx={{ bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5" }}
                />

                <IconButton color="primary" onClick={handleSend}>
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
