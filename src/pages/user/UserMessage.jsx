import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeMode } from "../../context/ThemeModeContext";

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "A",
    messages: [
      { id: 1, sender: "them", type: "text", content: "Can we swap?" },
      { id: 2, sender: "me", type: "text", content: "Yes, tomorrow works.", status: "seen" },
      { id: 3, sender: "them", type: "text", content: "Perfect!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    avatar: "B",
    messages: [
      { id: 4, sender: "them", type: "text", content: "Ready for our class?" },
      { id: 5, sender: "me", type: "text", content: "Yes!", status: "delivered" },
    ],
  },
];

const renderMessageContent = (msg) => {
  if (msg.type === "file") {
    return (
      <MuiLink href={msg.fileURL} target="_blank" underline="hover" sx={{ color: "#fff" }}>
        📎 {msg.fileName}
      </MuiLink>
    );
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

export default function UserMessages() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile detection
  const sidebarWidth = 240; // match your sidebar width

  const [users, setUsers] = useState(dummyUsers);
  const [activeUserId, setActiveUserId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [userListScroll, setUserListScroll] = useState(0);

  const userListRef = useRef(null);
  const chatEndRef = useRef(null);

  const activeUser = users.find((u) => u.id === activeUserId);

  useEffect(() => {
    if (!activeUser) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeUser?.messages.length]);

  useEffect(() => {
    if (!activeUser && userListRef.current) {
      userListRef.current.scrollTop = userListScroll;
    }
  }, [activeUser]);

  const handleSend = () => {
    if (!messageInput && !attachedFile) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: attachedFile ? "file" : "text",
      content: messageInput,
      fileName: attachedFile?.name,
      fileURL: attachedFile ? URL.createObjectURL(attachedFile) : null,
      status: "delivered",
    };

    setUsers((prev) =>
      prev.map((u) =>
        u.id === activeUserId ? { ...u, messages: [...u.messages, newMsg] } : u
      )
    );

    setMessageInput("");
    setAttachedFile(null);
  };

  const openChat = (id) => {
    if (userListRef.current) {
      setUserListScroll(userListRef.current.scrollTop);
    }
    setActiveUserId(id);
  };

  const getTickColor = (status) => {
    if (status === "seen") return "#04ff00ff"; // green
    if (status === "delivered") return theme.palette.mode === "dark" ? "#ffffffff" : "#3e3e3eff";
    return "transparent";
  };

  const fixedStyles = isMobile
    ? { left: 0, width: "100%" }
    : { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Chat Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            marginTop: 7,
            marginLeft: 0,
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
              <Typography variant="h6" fontWeight="600">
                {activeUser.name}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" fontWeight="600" sx={{marginLeft:4}}>
              Messages
            </Typography>
          )}
        </Box>

        {/* BODY */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            mt: "54px", // height of header
            mb: "64px", // height of input
          }}
        >
          {/* USER LIST */}
          {!activeUser && (
            <Box
              ref={userListRef}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                p: 1,
                bgcolor: theme.palette.mode === "dark" ? "#191818ff" : "#f4f6f8",
              }}
            >
              {users.map((u) => {
                const last = u.messages[u.messages.length - 1];
                const isBold = last?.sender === "them";

                return (
                  <Box
                    key={u.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === "dark" ? "#131313ff" : "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => openChat(u.id)}
                  >
                    <Avatar sx={{ mr: 2 }}>{u.avatar}</Avatar>
                    <Box sx={{ width: "100%" }}>
                      <Typography fontWeight="bold">{u.name}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: isBold ? "bold" : "normal", opacity: 0.8 }}
                        noWrap
                      >
                        {last?.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* CHAT AREA */}
          {activeUser && (
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  p: 1,
                  marginBottom: 7,
                  bgcolor: theme.palette.mode === "dark" ? "#191818ff" : "#f4f6f8",
                }}
              >
                {activeUser.messages.map((msg) => {
                  const isMe = msg.sender === "me";

                  return (
                    <Box
                      key={msg.id}
                      sx={{
                        display: "flex",
                        flexDirection: isMe ? "row-reverse" : "row",
                        alignItems: "flex-end",
                        mb: 2,
                        gap: 1,
                      }}
                    >
                      {!isMe && <Avatar sx={{ width: 28, height: 28 }}>{activeUser.avatar}</Avatar>}
                      {isMe && <Box sx={{ width: 0 }} />}

                      <Box sx={{ position: "relative", maxWidth: "70%" }}>
                        <Paper
                          sx={{
                            p: 1.5,
                            bgcolor: isMe ? theme.palette.primary.main : theme.palette.background.paper,
                            color: isMe ? "#fff" : theme.palette.text.primary,
                            borderRadius: 4,
                            wordBreak: "break-word",
                            pb: msg.sender === "me" ? "12px" : "12px",
                          }}
                        >
                          {renderMessageContent(msg)}
                        </Paper>

                        {isMe && msg.status && (
                          <Typography
                            sx={{
                              position: "absolute",
                              marginRight: 1,
                              right: 1,
                              fontSize: "11px",
                              color: getTickColor(msg.status),
                              opacity: 1,
                            }}
                          >
                            {msg.status === "seen" ? "✓✓" : "✓"}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}

                <div ref={chatEndRef} />
              </Box>

              {/* INPUT BAR */}
              <Box
                sx={{
                  p: 1,
                  borderTop: "1px solid",
                  borderColor: theme.palette.divider,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginLeft: 0,
                  bgcolor: theme.palette.background.paper,
                  position: "fixed",
                  bottom: 0,
                  zIndex: 30,
                  ...fixedStyles,
                }}
              >
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
                  placeholder="Type message…"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  size="small"
                  sx={{
                    bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                    input: { color: theme.palette.text.primary },
                  }}
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
