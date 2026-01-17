// src/services/user/chatService.js
import api from '@/config/axios';

export const getChatUsers = async () => {
  try {
    const response = await api.get('/api/chat/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching chat users:', error);
    throw error;
  }
};

export const getConversation = async (userId) => {
  try {
    const response = await api.get(`/api/messages/conversation/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching conversation with user ${userId}:`, error);
    throw error;
  }
};

export const sendMessage = async (receiverId, content) => {
  try {
    const response = await api.post('/api/messages', {
      receiverId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * ✅ CRITICAL FIX: Send message with file attachments
 */
export const sendMessageWithFiles = async (receiverId, content, files) => {
  try {
    console.log('📤 sendMessageWithFiles called with:', {
      receiverId,
      content,
      filesCount: files?.length,
      files: files
    });

    const formData = new FormData();
    formData.append('receiverId', receiverId);
    
    if (content && content.trim()) {
      formData.append('content', content);
    }
    
    if (files && files.length > 0) {
      console.log('📎 Processing files for upload:');
      files.forEach((fileObj, index) => {
        // ✅ CRITICAL: Extract the actual File object
        const actualFile = fileObj.file || fileObj;
        
        console.log(`  File ${index}:`, {
          hasFileProperty: !!fileObj.file,
          fileName: actualFile.name,
          fileType: actualFile.type,
          fileSize: actualFile.size,
          isActualFile: actualFile instanceof File
        });
        
        if (!(actualFile instanceof File)) {
          console.error(`❌ Item at index ${index} is not a File object:`, actualFile);
          throw new Error(`Invalid file at index ${index} - not a File object`);
        }
        
        formData.append('files', actualFile);
      });
    }

    // ✅ Get token from localStorage
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('❌ No access token found');
      throw new Error('No access token found - please login again');
    }
    
    console.log('📤 Sending multipart request');
    console.log('   Token present:', !!token);
    console.log('   Token preview:', token.substring(0, 20) + '...');

    const response = await api.post('/api/messages/with-files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 60000,
    });
    
    console.log('✅ Upload successful:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ sendMessageWithFiles error:', error);
    console.error('   Error message:', error.message);
    console.error('   Error response:', error.response?.data);
    console.error('   Error status:', error.response?.status);
    console.error('   Error headers:', error.response?.headers);
    throw error;
  }
};

export const markMessageAsRead = async (messageId) => {
  try {
    const response = await api.patch(`/api/messages/read/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(`Error marking message ${messageId} as read:`, error);
    throw error;
  }
};

export const addReaction = async (messageId, reaction) => {
  try {
    const response = await api.post('/api/messages/reaction', {
      messageId,
      reaction,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding reaction to message ${messageId}:`, error);
    throw error;
  }
};

export const removeReaction = async (messageId) => {
  try {
    const response = await api.delete(`/api/messages/reaction/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing reaction from message ${messageId}:`, error);
    throw error;
  }
};

export default {
  getChatUsers,
  getConversation,
  sendMessage,
  sendMessageWithFiles,
  markMessageAsRead,
  addReaction,
  removeReaction,
};