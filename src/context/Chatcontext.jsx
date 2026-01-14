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
        wsService.disconnect();
        hasInitialized.current = false;
        setWsConnected(false);
      }
    };
  }, [user, token]);

  // Handle incoming WebSocket messages
  const handleIncomingMessage = useCallback((messageData) => {
    const { senderId, receiverId, messageId, content, createdAt, isRead } = messageData;
    
    // Determine the other user's ID
    const otherUserId = senderId === user.id ? receiverId : senderId;

    // Update conversations
    setConversations((prev) => {
      const existing = prev[otherUserId] || [];
      
      // Check if message already exists (avoid duplicates)
      const alreadyExists = existing.some(msg => msg.messageId === messageId);
      if (alreadyExists) return prev;

      return {
        ...prev,
        [otherUserId]: [
          ...existing,
          {
            messageId,
            senderId,
            receiverId,
            content,
            isRead,
            createdAt,
            type: 'text',
            sender: senderId === user.id ? 'me' : 'them',
          },
        ],
      };
    });

    // Update chat users list (move to top, update last message)
    setChatUsers((prev) => {
      const others = prev.filter(u => u.userId !== otherUserId);
      const currentUser = prev.find(u => u.userId === otherUserId);
      
      if (currentUser) {
        return [
          { ...currentUser, lastMessage: content, lastMessageTime: createdAt },
          ...others,
        ];
      }
      
      return prev;
    });
  }, [user]);

  // Handle read receipts
  const handleReadReceipt = useCallback((messageData) => {
    const { messageId, senderId, receiverId } = messageData;
    
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

  // Send message via WebSocket
  const sendMessage = useCallback(async (receiverId, content) => {
    if (!wsConnected) {
      console.warn('⚠️ WebSocket not connected, message may not be sent in real-time');
      return;
    }

    try {
      wsService.sendMessage(receiverId, content);
    } catch (error) {
      console.error('Error sending message via WebSocket:', error);
      throw error;
    }
  }, [wsConnected]);

  // Mark message as read
  const markAsRead = useCallback((messageId) => {
    if (!wsConnected) {
      console.warn('⚠️ WebSocket not connected');
      return;
    }

    try {
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