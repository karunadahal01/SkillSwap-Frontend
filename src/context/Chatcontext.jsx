// src/context/ChatContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import wsService from '@/config/websocket';
import { getChatUsers, getConversation } from '@/services/user/chatService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user, token } = useAuth();
  
  const [chatUsers, setChatUsers] = useState([]);
  const [conversations, setConversations] = useState({});
  const [loading, setLoading] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  
  const hasInitialized = useRef(false);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!user || !token || hasInitialized.current) return;

    const initWebSocket = async () => {
      try {
        console.log('🔌 Connecting WebSocket for user:', user.id);
        await wsService.connect(token);
        setWsConnected(true);
        hasInitialized.current = true;

        // Subscribe to messages
        wsService.subscribeToMessages(user.id, handleIncomingMessage);
        
        // Subscribe to read receipts
        wsService.subscribeToReadReceipts(user.id, handleReadReceipt);
        
        console.log('✅ WebSocket initialized for user:', user.id);
      } catch (error) {
        console.error('❌ WebSocket connection failed:', error);
        setWsConnected(false);
      }
    };

    initWebSocket();

    return () => {
      if (hasInitialized.current) {
        console.log('🔌 Disconnecting WebSocket');
        wsService.disconnect();
        hasInitialized.current = false;
        setWsConnected(false);
      }
    };
  }, [user, token]);

  // Handle incoming WebSocket messages
  const handleIncomingMessage = useCallback((messageData) => {
    console.log('📨 RAW WebSocket message received:', messageData);
    
    const { senderId, receiverId, messageId, content, createdAt, isRead, attachments } = messageData;
    
    // Determine the other user's ID
    const otherUserId = senderId === user.id ? receiverId : senderId;

    console.log('📝 Processing message:', {
      messageId,
      senderId,
      receiverId,
      otherUserId,
      isMyMessage: senderId === user.id,
      currentUserId: user.id,
      hasAttachments: attachments && attachments.length > 0
    });

    // ✅ Create message object with proper structure
    const newMessage = {
      messageId,
      senderId,
      receiverId,
      content,
      isRead,
      createdAt,
      type: (attachments && attachments.length > 0) ? 'file' : 'text',
      sender: senderId === user.id ? 'me' : 'them',
      attachments: attachments || [],
    };

    console.log('✅ Created message object:', newMessage);

    // ✅ Update conversations - replace pending message or add new one
    setConversations((prev) => {
      console.log('📂 Current conversations:', prev);
      const existing = prev[otherUserId] || [];
      
      // ✅ CRITICAL FIX: Check if this is replacing a pending message
      // Match by content and sender for text messages
      // Match by attachments for file messages
      const pendingIndex = existing.findIndex(msg => {
        if (!msg._pending) return false;
        
        // For file messages, match by having attachments
        if (attachments && attachments.length > 0) {
          return msg.senderId === senderId && msg.files && msg.files.length > 0;
        }
        
        // For text messages, match by content
        return msg.senderId === senderId && msg.content === content;
      });
      
      if (pendingIndex !== -1) {
        // Replace pending message with real one
        console.log('🔄 Replacing pending message at index', pendingIndex, 'with real message');
        const updated = [...existing];
        updated[pendingIndex] = newMessage;
        return {
          ...prev,
          [otherUserId]: updated,
        };
      }
      
      // Check if message already exists (avoid duplicates)
      const alreadyExists = existing.some(msg => msg.messageId === messageId);
      if (alreadyExists) {
        console.log('⚠️ Message already exists, skipping duplicate');
        return prev;
      }

      console.log('✅ Adding new message to conversation with user:', otherUserId);
      const updated = {
        ...prev,
        [otherUserId]: [...existing, newMessage],
      };
      console.log('📂 Updated conversations:', updated);
      return updated;
    });

    // ✅ Update chat users list (move to top, update last message)
    setChatUsers((prev) => {
      const others = prev.filter(u => u.userId !== otherUserId);
      const currentUser = prev.find(u => u.userId === otherUserId);
      
      // Determine display text
      let displayText = content;
      if (attachments && attachments.length > 0) {
        const mimeType = attachments[0].mimeType || '';
        if (mimeType.startsWith('image/')) {
          displayText = '📷 Photo';
        } else if (mimeType.startsWith('video/')) {
          displayText = '🎥 Video';
        } else {
          displayText = '📎 File';
        }
      }
      
      if (currentUser) {
        return [
          { 
            ...currentUser, 
            lastMessage: displayText, 
            lastMessageTime: createdAt,
            // Increment unread count if message is from other user
            unreadCount: senderId !== user.id ? (currentUser.unreadCount || 0) + 1 : currentUser.unreadCount
          },
          ...others,
        ];
      }
      
      return prev;
    });

    console.log('✅ Message processing complete');
  }, [user]);

  // Handle read receipts
  const handleReadReceipt = useCallback((messageData) => {
    console.log('✅ Read receipt received:', messageData);
    
    const { messageId, senderId, receiverId, isRead } = messageData;
    
    const otherUserId = senderId === user.id ? receiverId : senderId;

    setConversations((prev) => ({
      ...prev,
      [otherUserId]: (prev[otherUserId] || []).map((msg) =>
        msg.messageId === messageId ? { ...msg, isRead: true } : msg
      ),
    }));
  }, [user]);

  // Fetch chat users
  const fetchChatUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getChatUsers();
      
      if (response.success && response.data) {
        console.log('📋 Chat users fetched:', response.data);
        setChatUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching chat users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch conversation with a specific user
  const fetchConversation = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await getConversation(userId);
      
      if (response.success && response.data) {
        const messages = response.data.map((msg) => ({
          ...msg,
          type: 'text',
          sender: msg.senderId === user.id ? 'me' : 'them',
        }));
        
        console.log('💬 Conversation fetched for user', userId, ':', messages);
        
        setConversations((prev) => ({
          ...prev,
          [userId]: messages,
        }));
      }
    } catch (error) {
      console.error(`Error fetching conversation with user ${userId}:`, error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Send message via WebSocket with optimistic update
  const sendMessage = useCallback(async (receiverId, content, files = []) => {
    if (!wsConnected) {
      console.error('⚠️ WebSocket not connected, cannot send message');
      return;
    }

    try {
      console.log('📤 Sending message via WebSocket:', { receiverId, content, files });
      
      // Determine message type and display text
      const hasFiles = files.length > 0;
      const messageType = hasFiles ? 'file' : 'text';
      const displayContent = content || (hasFiles ? '📎 Attachment' : '');
      
      // ✅ Optimistically add message to UI immediately
      const tempMessage = {
        messageId: `temp-${Date.now()}`, // Temporary ID
        senderId: user.id,
        receiverId,
        content: displayContent,
        isRead: false,
        createdAt: new Date().toISOString(),
        type: messageType,
        sender: 'me',
        _pending: true, // Mark as pending
        files: hasFiles ? files.map(f => ({
          fileName: f.name,
          fileURL: f.objectURL,
          mimeType: f.type,
        })) : undefined,
      };

      // Add to conversations immediately
      setConversations((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] || []), tempMessage],
      }));

      // Update chat users list
      setChatUsers((prev) => {
        const others = prev.filter(u => u.userId !== receiverId);
        const currentUser = prev.find(u => u.userId === receiverId);
        
        if (currentUser) {
          return [
            { 
              ...currentUser, 
              lastMessage: displayContent, 
              lastMessageTime: tempMessage.createdAt,
            },
            ...others,
          ];
        }
        
        return prev;
      });

      // ✅ Send via REST API if files are attached, otherwise use WebSocket
      if (hasFiles) {
        // Use REST API for file uploads
        const { sendMessageWithFiles } = await import('@/services/user/chatService');
        const response = await sendMessageWithFiles(receiverId, content, files);
        
        if (response.success) {
          console.log('✅ Message with files sent via REST API:', response.data);
          
          // ✅ The real message will come back via WebSocket
          // For now, just log success - WebSocket will handle UI update
        }
      } else {
        // Use WebSocket for text-only messages
        wsService.sendMessage(receiverId, content);
        console.log('✅ Message sent to WebSocket');
      }
      
    } catch (error) {
      console.error('❌ Error sending message via WebSocket:', error);
      
      // Remove the optimistic message on error
      setConversations((prev) => ({
        ...prev,
        [receiverId]: (prev[receiverId] || []).filter(msg => !msg._pending),
      }));
      
      throw error;
    }
  }, [wsConnected, user]);

  // Mark message as read
  const markAsRead = useCallback((messageId) => {
    if (!wsConnected) {
      console.warn('⚠️ WebSocket not connected');
      return;
    }

    try {
      console.log('📖 Marking message as read:', messageId);
      wsService.markAsRead(messageId);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }, [wsConnected]);

  const value = {
    chatUsers,
    conversations,
    loading,
    wsConnected,
    fetchChatUsers,
    fetchConversation,
    sendMessage,
    markAsRead,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;