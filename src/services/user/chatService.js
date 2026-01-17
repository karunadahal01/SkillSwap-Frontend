// // src/services/user/chatService.js
// import api from '@/config/axios';

// /**
//  * Get list of users to chat with (users who have exchanged messages)
//  * @returns {Promise} - Array of ChatUserResponse
//  */
// export const getChatUsers = async () => {
//   try {
//     const response = await api.get('/api/chat/users');
//     return response.data; // ApiResponse with ChatUserResponse[] in data
//   } catch (error) {
//     console.error('Error fetching chat users:', error);
//     throw error;
//   }
// };

// /**
//  * Get conversation history between current user and another user
//  * @param {number} userId - The other user's ID
//  * @returns {Promise} - Array of MessageResponse
//  */
// export const getConversation = async (userId) => {
//   try {
//     const response = await api.get(`/api/messages/conversation/${userId}`);
//     return response.data; // ApiResponse with MessageResponse[] in data
//   } catch (error) {
//     console.error(`Error fetching conversation with user ${userId}:`, error);
//     throw error;
//   }
// };

// /**
//  * Send a message via REST API (fallback if WebSocket fails)
//  * @param {number} receiverId 
//  * @param {string} content 
//  * @returns {Promise} - MessageResponse
//  */
// export const sendMessage = async (receiverId, content) => {
//   try {
//     const response = await api.post('/api/messages', {
//       receiverId,
//       content,
//     });
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };

// /**
//  * Mark a message as read
//  * @param {number} messageId 
//  * @returns {Promise} - MessageResponse
//  */
// export const markMessageAsRead = async (messageId) => {
//   try {
//     const response = await api.patch(`/api/messages/read/${messageId}`);
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error(`Error marking message ${messageId} as read:`, error);
//     throw error;
//   }
// };

// export default {
//   getChatUsers,
//   getConversation,
//   sendMessage,
//   markMessageAsRead,
// };



// // src/services/user/chatService.js
// import api from '@/config/axios';

// /**
//  * Get list of users to chat with (users who have exchanged messages)
//  * @returns {Promise} - Array of ChatUserResponse
//  */
// export const getChatUsers = async () => {
//   try {
//     const response = await api.get('/api/chat/users');
//     return response.data; // ApiResponse with ChatUserResponse[] in data
//   } catch (error) {
//     console.error('Error fetching chat users:', error);
//     throw error;
//   }
// };

// /**
//  * Get conversation history between current user and another user
//  * @param {number} userId - The other user's ID
//  * @returns {Promise} - Array of MessageResponse
//  */
// export const getConversation = async (userId) => {
//   try {
//     const response = await api.get(`/api/messages/conversation/${userId}`);
//     return response.data; // ApiResponse with MessageResponse[] in data
//   } catch (error) {
//     console.error(`Error fetching conversation with user ${userId}:`, error);
//     throw error;
//   }
// };

// /**
//  * Send a text message via REST API
//  * @param {number} receiverId 
//  * @param {string} content 
//  * @returns {Promise} - MessageResponse
//  */
// export const sendMessage = async (receiverId, content) => {
//   try {
//     const response = await api.post('/api/messages', {
//       receiverId,
//       content,
//     });
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };

// /**
//  * ✅ NEW: Send message with file attachments
//  * @param {number} receiverId 
//  * @param {string} content 
//  * @param {Array<File>} files 
//  * @returns {Promise} - MessageResponse
//  */
// export const sendMessageWithFiles = async (receiverId, content, files) => {
//   try {
//     const formData = new FormData();
//     formData.append('receiverId', receiverId);
    
//     if (content) {
//       formData.append('content', content);
//     }
    
//     if (files && files.length > 0) {
//       files.forEach((file) => {
//         formData.append('files', file.file); // file.file is the actual File object
//       });
//     }

//     const response = await api.post('/api/messages/with-files', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
    
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error('Error sending message with files:', error);
//     throw error;
//   }
// };

// /**
//  * Mark a message as read
//  * @param {number} messageId 
//  * @returns {Promise} - MessageResponse
//  */
// export const markMessageAsRead = async (messageId) => {
//   try {
//     const response = await api.patch(`/api/messages/read/${messageId}`);
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error(`Error marking message ${messageId} as read:`, error);
//     throw error;
//   }
// };

// /**
//  * ✅ NEW: Add reaction to a message
//  * @param {number} messageId 
//  * @param {string} reaction - Emoji string
//  * @returns {Promise} - MessageResponse
//  */
// export const addReaction = async (messageId, reaction) => {
//   try {
//     const response = await api.post('/api/messages/reaction', {
//       messageId,
//       reaction,
//     });
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error(`Error adding reaction to message ${messageId}:`, error);
//     throw error;
//   }
// };

// /**
//  * ✅ NEW: Remove reaction from a message
//  * @param {number} messageId 
//  * @returns {Promise} - MessageResponse
//  */
// export const removeReaction = async (messageId) => {
//   try {
//     const response = await api.delete(`/api/messages/reaction/${messageId}`);
//     return response.data; // ApiResponse with MessageResponse in data
//   } catch (error) {
//     console.error(`Error removing reaction from message ${messageId}:`, error);
//     throw error;
//   }
// };

// export default {
//   getChatUsers,
//   getConversation,
//   sendMessage,
//   sendMessageWithFiles,
//   markMessageAsRead,
//   addReaction,
//   removeReaction,
// };



// // src/services/user/chatService.js
// import api from '@/config/axios';

// /**
//  * Get list of users to chat with (users who have exchanged messages)
//  * @returns {Promise} - Array of ChatUserResponse
//  */
// export const getChatUsers = async () => {
//   try {
//     const response = await api.get('/api/chat/users');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching chat users:', error);
//     throw error;
//   }
// };

// /**
//  * Get conversation history between current user and another user
//  * @param {number} userId - The other user's ID
//  * @returns {Promise} - Array of MessageResponse
//  */
// export const getConversation = async (userId) => {
//   try {
//     const response = await api.get(`/api/messages/conversation/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching conversation with user ${userId}:`, error);
//     throw error;
//   }
// };

// /**
//  * Send a text message via REST API
//  * @param {number} receiverId 
//  * @param {string} content 
//  * @returns {Promise} - MessageResponse
//  */
// export const sendMessage = async (receiverId, content) => {
//   try {
//     const response = await api.post('/api/messages', {
//       receiverId,
//       content,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };

// /**
//  * ✅ FIXED: Send message with file attachments
//  * @param {number} receiverId 
//  * @param {string} content 
//  * @param {Array<File>} files 
//  * @returns {Promise} - MessageResponse
//  */
// export const sendMessageWithFiles = async (receiverId, content, files) => {
//   try {
//     const formData = new FormData();
//     formData.append('receiverId', receiverId);
    
//     if (content && content.trim()) {
//       formData.append('content', content);
//     }
    
//     if (files && files.length > 0) {
//       console.log('📤 Appending files to FormData:', files.length);
//       files.forEach((fileObj, index) => {
//         console.log(`  File ${index}:`, fileObj.file.name, fileObj.file.type, fileObj.file.size);
//         formData.append('files', fileObj.file); // fileObj.file is the actual File object
//       });
//     }

//     // ✅ CRITICAL FIX: Get token and set it explicitly
//     const token = localStorage.getItem('accessToken');
    
//     if (!token) {
//       throw new Error('No access token found - please login again');
//     }
    
//     console.log('📤 Sending file upload request');
//     console.log('   Token present:', !!token);
//     console.log('   Receiver ID:', receiverId);
//     console.log('   Content:', content);
//     console.log('   Files count:', files?.length || 0);

//     const response = await api.post('/api/messages/with-files', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${token}`, // ✅ Explicitly set token
//       },
//       timeout: 60000, // 60 second timeout
//     });
    
//     console.log('✅ File upload response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error sending message with files:', error);
//     console.error('Error response:', error.response?.data);
//     console.error('Error status:', error.response?.status);
//     throw error;
//   }
// };

// /**
//  * Mark a message as read
//  * @param {number} messageId 
//  * @returns {Promise} - MessageResponse
//  */
// export const markMessageAsRead = async (messageId) => {
//   try {
//     const response = await api.patch(`/api/messages/read/${messageId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error marking message ${messageId} as read:`, error);
//     throw error;
//   }
// };

// /**
//  * Add reaction to a message
//  * @param {number} messageId 
//  * @param {string} reaction - Emoji string
//  * @returns {Promise} - MessageResponse
//  */
// export const addReaction = async (messageId, reaction) => {
//   try {
//     const response = await api.post('/api/messages/reaction', {
//       messageId,
//       reaction,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error adding reaction to message ${messageId}:`, error);
//     throw error;
//   }
// };

// /**
//  * Remove reaction from a message
//  * @param {number} messageId 
//  * @returns {Promise} - MessageResponse
//  */
// export const removeReaction = async (messageId) => {
//   try {
//     const response = await api.delete(`/api/messages/reaction/${messageId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error removing reaction from message ${messageId}:`, error);
//     throw error;
//   }
// };

// export default {
//   getChatUsers,
//   getConversation,
//   sendMessage,
//   sendMessageWithFiles,
//   markMessageAsRead,
//   addReaction,
//   removeReaction,
// };











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