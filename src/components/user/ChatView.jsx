// src/components/user/ChatView.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Box, useTheme, Dialog, DialogContent } from '@mui/material';
import ChatBubble from '@components/user/ChatBubble';
import ReactionMenu from '@components/user/ReactionMenu';
import { ChatInput } from '@components/user/ChatInput';
import { renderMessageContent } from '@utils/chatUtils';
import { addReaction, removeReaction } from '@/services/user/chatService';

export default function ChatView({
  activeUser,
  messages = [],
  currentUserId,
  messageInput,
  setMessageInput,
  attachedFiles,
  setAttachedFiles,
  handleSend,
  isMobile,
  sidebarWidth,
  inputRef,
  keyboardHeight,
}) {
  const theme = useTheme();
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [reactionAnchor, setReactionAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [inputHeight, setInputHeight] = useState(70);
  const [lightboxImage, setLightboxImage] = useState(null);

  const reactionOptions = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

  const getStatusColor = (isRead) => {
    if (isRead) return '#04ff00';
    return theme.palette.text.secondary;
  };

  // ✅ Fixed: Scroll to bottom with null check
  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        // ✅ Check if ref still exists before scrolling
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);
    }
  }, [messages.length]);

  const openReactionMenu = (event, msg) => {
    setSelectedMessage(msg);
    setReactionAnchor(event.currentTarget);
  };

  const closeReactionMenu = () => {
    setReactionAnchor(null);
    setSelectedMessage(null);
  };

  const applyReaction = async (reaction) => {
    if (!selectedMessage || !selectedMessage.messageId) {
      console.error('No message selected or messageId missing');
      closeReactionMenu();
      return;
    }

    // Don't allow reactions on pending messages
    if (selectedMessage._pending) {
      console.warn('Cannot react to pending messages');
      closeReactionMenu();
      return;
    }

    try {
      console.log('Applying reaction:', reaction, 'to message:', selectedMessage.messageId);
      
      // If clicking the same reaction that's already there, remove it
      if (selectedMessage.reaction === reaction) {
        await removeReaction(selectedMessage.messageId);
      } else {
        await addReaction(selectedMessage.messageId, reaction);
      }
      
      // The reaction update will come through WebSocket or we could update locally
      // For now, just close the menu - the WebSocket will update the UI
      console.log('Reaction applied successfully');
    } catch (error) {
      console.error('Error applying reaction:', error);
    } finally {
      closeReactionMenu();
    }
  };

  const bottomPadding = inputHeight + keyboardHeight + 10;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Chat messages container */}
      <Box
        ref={chatContainerRef}
        sx={{
          marginTop: 4,
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          p: 2,
          pb: `${bottomPadding}px`,
          bgcolor: theme.palette.mode === 'dark' ? '#191818' : '#f4f6f8',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          
          return (
            <ChatBubble
              key={msg.messageId}
              msg={{
                id: msg.messageId,
                messageId: msg.messageId,
                content: msg.content,
                type: msg.type || 'text',
                sender: msg.sender,
                status: isMe ? (msg.isRead ? 'seen' : 'delivered') : null,
                reaction: msg.reaction || null,
                files: msg.attachments || msg.files || [],
                createdAt: msg.createdAt, // ✅ CRITICAL: Pass createdAt
                _pending: msg._pending,
              }}
              activeUser={activeUser}
              isMe={isMe}
              openReactionMenu={openReactionMenu}
              getStatusColor={() => getStatusColor(msg.isRead)}
              renderMessageContent={(m) => renderMessageContent(m, setLightboxImage)}
            />
          );
        })}

        <div ref={chatEndRef} style={{ height: '1px' }} />
      </Box>

      {/* Reaction menu */}
      <ReactionMenu
        anchorEl={reactionAnchor}
        open={Boolean(reactionAnchor)}
        onClose={closeReactionMenu}
        onSelectReaction={applyReaction}
        reactionOptions={reactionOptions}
      />

      {/* Chat input */}
      <ChatInput
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
        handleSend={handleSend}
        inputRef={inputRef}
        sidebarWidth={sidebarWidth}
        keyboardHeight={keyboardHeight}
        onHeightChange={setInputHeight}
        handleFileInput={(files) => {
          const arr = Array.from(files).slice(0, 8);
          const withURLs = arr.map((f) => ({
            file: f,
            name: f.name,
            type: f.type,
            objectURL: URL.createObjectURL(f),
          }));
          setAttachedFiles((prev) => [...prev, ...withURLs]);
        }}
        removeAttached={(index) => {
          setAttachedFiles((prev) => {
            const copy = [...prev];
            const removed = copy.splice(index, 1)[0];
            try {
              URL.revokeObjectURL(removed.objectURL);
            } catch {}
            return copy;
          });
        }}
      />

      {/* Image lightbox */}
      <Dialog open={Boolean(lightboxImage)} onClose={() => setLightboxImage(null)} maxWidth="lg">
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          <img src={lightboxImage} alt="" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}