// src/context/ChatContext.jsx - EMAIL FIX VERSION
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
        console.log('=== WEBSOCKET INIT START ===');
        console.log('🔌 Connecting WebSocket for user:', user.email);  // ✅ Changed to email
        console.log('   User ID:', user.id);
        console.log('🔑 Token preview:', token.substring(0, 20) + '...');
        
        await wsService.connect(token);
        setWsConnected(true);
        hasInitialized.current = true;

        // ✅ CRITICAL: Subscribe using EMAIL instead of ID
        wsService.subscribeToMessages(user.email, handleIncomingMessage);
        
        // Subscribe to read receipts
        wsService.subscribeToReadReceipts(user.email, handleReadReceipt);
        
        console.log('✅ WebSocket initialized successfully');
        console.log('=== WEBSOCKET INIT END ===\n');
      } catch (error) {
        console.error('=== WEBSOCKET INIT FAILED ===');
        console.error('❌ Error:', error);
        console.error('=== END ERROR ===\n');
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
    console.log('\n=== INCOMING MESSAGE START ===');
    console.log('📨 Raw WebSocket data:', JSON.stringify(messageData, null, 2));
    
    const { senderId, receiverId, messageId, content, createdAt, isRead, attachments } = messageData;
    
    const otherUserId = senderId === user.id ? receiverId : senderId;
    const isMyMessage = senderId === user.id;

    console.log('📝 Message details:', {
      messageId,
      senderId,
      receiverId,
      otherUserId,
      isMyMessage,
      currentUserId: user.id,
      hasAttachments: !!(attachments && attachments.length > 0)
    });

    const newMessage = {
      messageId,
      senderId,
      receiverId,
      content: content || '',
      isRead,
      createdAt,
      type: (attachments && attachments.length > 0) ? 'file' : 'text',
      sender: isMyMessage ? 'me' : 'them',
      attachments: attachments || [],
    };

    console.log('✅ Created message object:', newMessage);

    setConversations((prev) => {
      const existing = prev[otherUserId] || [];
      
      const pendingMessages = existing.filter(m => m._pending);
      console.log(`⏳ Found ${pendingMessages.length} pending messages`);
      
      let foundPending = false;
      let replacedIndex = -1;
      
      const updated = existing.map((msg, index) => {
        if (!msg._pending) return msg;
        
        const contentMatch = msg.content === content;
        const hasIncomingFiles = attachments && attachments.length > 0;
        const hasPendingFiles = msg.attachments && msg.attachments.length > 0;
        const fileMatch = hasIncomingFiles && hasPendingFiles;
        const senderMatch = msg.senderId === senderId;
        const receiverMatch = msg.receiverId === receiverId;
        
        if (!foundPending && senderMatch && receiverMatch && (contentMatch || fileMatch)) {
          console.log(`✅ MATCH FOUND! Replacing pending message at index ${index}`);
          foundPending = true;
          replacedIndex = index;
          return newMessage;
        }
        
        return msg;
      });
      
      if (foundPending) {
        console.log(`🔄 Successfully replaced pending message`);
      } else {
        const alreadyExists = updated.some(msg => msg.messageId === messageId);
        if (alreadyExists) {
          console.log('⚠️ Message already exists, skipping');
          return prev;
        }
        
        console.log('➕ Adding new message');
        updated.push(newMessage);
      }
      
      console.log('=== INCOMING MESSAGE END ===\n');
      
      return {
        ...prev,
        [otherUserId]: updated,
      };
    });

    // Update chat users list
    setChatUsers((prev) => {
      const others = prev.filter(u => u.userId !== otherUserId);
      const currentUser = prev.find(u => u.userId === otherUserId);
      
      let displayText = content || '';
      if (attachments && attachments.length > 0) {
        const mimeType = attachments[0].mimeType || '';
        if (mimeType.startsWith('image/')) displayText = '📷 Photo';
        else if (mimeType.startsWith('video/')) displayText = '🎥 Video';
        else displayText = '📎 File';
      }
      
      if (currentUser) {
        return [
          { 
            ...currentUser, 
            lastMessage: displayText, 
            lastMessageTime: createdAt,
            unreadCount: !isMyMessage ? (currentUser.unreadCount || 0) + 1 : currentUser.unreadCount
          },
          ...others,
        ];
      }
      
      return prev;
    });

  }, [user]);

  // Handle read receipts
  const handleReadReceipt = useCallback((messageData) => {
    console.log('\n=== READ RECEIPT ===');
    console.log('✅ Read receipt data:', messageData);
    
    const { messageId, senderId, receiverId } = messageData;
    const otherUserId = senderId === user.id ? receiverId : senderId;

    setConversations((prev) => ({
      ...prev,
      [otherUserId]: (prev[otherUserId] || []).map((msg) =>
        msg.messageId === messageId ? { ...msg, isRead: true } : msg
      )
    }));
    
    console.log('=== READ RECEIPT END ===\n');
  }, [user]);

  const fetchChatUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getChatUsers();
      if (response.success && response.data) {
        console.log('📋 Chat users fetched:', response.data.length, 'users');
        setChatUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching chat users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConversation = useCallback(async (userId) => {
    console.log(`\n=== FETCHING CONVERSATION with user ${userId} ===`);
    setLoading(true);
    try {
      const response = await getConversation(userId);
      
      if (response.success && response.data) {
        const messages = response.data.map((msg) => ({
          ...msg,
          type: (msg.attachments && msg.attachments.length > 0) ? 'file' : 'text',
          sender: msg.senderId === user.id ? 'me' : 'them',
        }));
        
        console.log(`💬 Loaded ${messages.length} messages from history`);
        
        setConversations((prev) => ({
          ...prev,
          [userId]: messages,
        }));
      }
      console.log('=== FETCH CONVERSATION END ===\n');
    } catch (error) {
      console.error(`Error fetching conversation with user ${userId}:`, error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const sendMessage = useCallback(async (receiverId, content, files = []) => {
    console.log('\n=== SENDING MESSAGE START ===');
    console.log('📤 Send request:', {
      receiverId,
      content: content || '(empty)',
      filesCount: files.length,
      wsConnected
    });
    
    if (!wsConnected) {
      console.error('❌ WebSocket not connected!');
      throw new Error('Not connected to chat server');
    }

    try {
      const hasFiles = files.length > 0;
      const messageType = hasFiles ? 'file' : 'text';
      const displayContent = content || '';
      
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const tempMessage = {
        messageId: tempId,
        senderId: user.id,
        receiverId,
        content: displayContent,
        isRead: false,
        createdAt: new Date().toISOString(),
        type: messageType,
        sender: 'me',
        _pending: true,
        attachments: hasFiles ? files.map(f => ({
          fileName: f.name,
          fileUrl: f.objectURL,
          mimeType: f.type,
        })) : [],
      };

      console.log('✨ Created optimistic message');

      setConversations((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] || []), tempMessage],
      }));
      console.log('✅ Optimistic message added to UI');

      // Update chat users list
      setChatUsers((prev) => {
        const others = prev.filter(u => u.userId !== receiverId);
        const currentUser = prev.find(u => u.userId === receiverId);
        
        let displayText = displayContent;
        if (hasFiles) {
          const mimeType = files[0].type || '';
          if (mimeType.startsWith('image/')) displayText = '📷 Photo';
          else if (mimeType.startsWith('video/')) displayText = '🎥 Video';
          else displayText = '📎 File';
        }
        
        if (currentUser) {
          return [
            { 
              ...currentUser, 
              lastMessage: displayText, 
              lastMessageTime: tempMessage.createdAt,
            },
            ...others,
          ];
        }
        
        return prev;
      });

      if (hasFiles) {
        console.log('📤 Sending via REST API (files)...');
        const { sendMessageWithFiles } = await import('@/services/user/chatService');
        const response = await sendMessageWithFiles(receiverId, content, files);
        
        if (response.success) {
          console.log('✅ REST API send successful');
          console.log('⏳ Waiting for WebSocket broadcast...');
        } else {
          throw new Error('Failed to send files');
        }
      } else {
        console.log('📤 Sending via WebSocket (text)...');
        wsService.sendMessage(receiverId, content);
        console.log('✅ WebSocket send successful');
        console.log('⏳ Waiting for WebSocket broadcast...');
      }
      
      console.log('=== SENDING MESSAGE END (WAITING FOR RESPONSE) ===\n');
      
    } catch (error) {
      console.error('=== SENDING MESSAGE FAILED ===');
      console.error('❌ Error:', error);
      
      setConversations((prev) => ({
        ...prev,
        [receiverId]: (prev[receiverId] || []).filter(msg => !msg._pending),
      }));
      
      console.log('🗑️ Removed optimistic message');
      throw error;
    }
  }, [wsConnected, user]);

  const markAsRead = useCallback((messageId) => {
    if (!wsConnected) {
      console.warn('⚠️ Cannot mark as read - WebSocket not connected');
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