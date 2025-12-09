import React, { useRef, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import ChatBubble from "@components/user/ChatBubble";
import ReactionMenu from "@components/user/ReactionMenu";
import {ChatInput} from "@components/user/ChatInput";

export default function ChatView({
  activeUser,
  users,
  setUsers,
  messageInput,
  setMessageInput,
  attachedFiles,
  setAttachedFiles,
  handleSend,
  renderMessageContent,
  isMobile,
  sidebarWidth,
}) {
  const theme = useTheme();
  const chatEndRef = useRef(null);

  // Reaction menu state
  const [reactionAnchor, setReactionAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const reactionOptions = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

  /* ------------------- Scroll to bottom on new messages ------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeUser?.messages.length]);

  /* ------------------- Reaction handlers ------------------- */
  const openReactionMenu = (event, msg) => {
    setSelectedMessage(msg);
    setReactionAnchor(event.currentTarget);
  };

  const closeReactionMenu = () => {
    setReactionAnchor(null);
    setSelectedMessage(null);
  };

  const applyReaction = (reaction) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id !== activeUser.id
          ? u
          : {
              ...u,
              messages: u.messages.map((m) => {
                if (m.id === selectedMessage.id) {
                  return { ...m, reaction: m.reaction === reaction ? null : reaction };
                }
                return m;
              }),
            }
      )
    );
    closeReactionMenu();
  };

  /* ------------------- Message status helpers ------------------- */
  const getStatusColor = (status) => {
    if (status === "seen") return "#04ff00";
    if (status === "delivered") return theme.palette.text.secondary;
    return theme.palette.text.disabled;
  };

  const getStatusIcon = (status) => {
    if (!status) return "";
    if (status === "sent") return "✓";
    if (status === "delivered") return "✓✓";
    if (status === "seen") return "✓✓";
  };

  const fixedStyles = { left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      {/* CHAT BODY */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          marginBottom: 7,
          bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
        }}
      >
        {activeUser.messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            msg={msg}
            activeUser={activeUser}
            isMe={msg.sender === "me"}
            openReactionMenu={openReactionMenu}
            getStatusColor={getStatusColor}
            renderMessageContent={renderMessageContent}
          />
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Reaction Menu */}
      <ReactionMenu
        anchorEl={reactionAnchor}
        open={Boolean(reactionAnchor)}
        onClose={closeReactionMenu}
        onSelectReaction={applyReaction}
        reactionOptions={reactionOptions}
      />

      {/* Chat Input */}
      <ChatInput
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
        handleSend={handleSend}
        handleFileInput={(files) => {
          const arr = Array.from(files).slice(0, 8);
          const withURLs = arr.map((f) => ({ file: f, name: f.name, type: f.type, objectURL: URL.createObjectURL(f) }));
          setAttachedFiles((prev) => [...prev, ...withURLs]);
          if (withURLs.length === 1) setMessageInput(withURLs[0].name);
        }}
        removeAttached={(index) => {
          setAttachedFiles((prev) => {
            const copy = [...prev];
            const removed = copy.splice(index, 1)[0];
            try { URL.revokeObjectURL(removed.objectURL); } catch {}
            return copy;
          });
        }}
      />
    </Box>
  );
}
