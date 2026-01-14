// // src/services/user/chatService.js
// import axios from "@config/axios";

// // Fetch chat users eligible to chat with current user
// export const getChatUsers = async () => {
//   try {
//     const response = await axios.get("/api/chat/users");
//     return response.data?.data || [];
//   } catch (error) {
//     console.error("Error fetching chat users:", error);
//     return [];
//   }
// };

// // Fetch conversation with a specific user
// export const getConversation = async (otherUserId) => {
//   try {
//     const response = await axios.get(`/api/messages/conversation/${otherUserId}`);
//     return response.data?.data || [];
//   } catch (error) {
//     console.error("Error fetching conversation:", error);
//     return [];
//   }
// };

// // Send a message to a specific user
// export const sendMessage = async (otherUserId, messageContent) => {
//   try {
//     const response = await axios.post("/api/messages", {
//       receiverId: otherUserId,
//       content: messageContent,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error sending message:", error);
//     return null;
//   }
// };



// src/services/user/chatService.js
import api from '@/config/axios';

/**
 * Get list of users to chat with (users who have exchanged messages)
 * @returns {Promise} - Array of ChatUserResponse
 */
export const getChatUsers = async () => {
  try {
    const response = await api.get('/api/chat/users');
    return response.data; // ApiResponse with ChatUserResponse[] in data
  } catch (error) {
    console.error('Error fetching chat users:', error);
    throw error;
  }
};

/**
 * Get conversation history between current user and another user
 * @param {number} userId - The other user's ID
 * @returns {Promise} - Array of MessageResponse
 */
export const getConversation = async (userId) => {
  try {
    const response = await api.get(`/api/messages/conversation/${userId}`);
    return response.data; // ApiResponse with MessageResponse[] in data
  } catch (error) {
    console.error(`Error fetching conversation with user ${userId}:`, error);
    throw error;
  }
};

/**
 * Send a message via REST API (fallback if WebSocket fails)
 * @param {number} receiverId 
 * @param {string} content 
 * @returns {Promise} - MessageResponse
 */
export const sendMessage = async (receiverId, content) => {
  try {
    const response = await api.post('/api/messages', {
      receiverId,
      content,
    });
    return response.data; // ApiResponse with MessageResponse in data
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Mark a message as read
 * @param {number} messageId 
 * @returns {Promise} - MessageResponse
 */
export const markMessageAsRead = async (messageId) => {
  try {
    const response = await api.patch(`/api/messages/read/${messageId}`);
    return response.data; // ApiResponse with MessageResponse in data
  } catch (error) {
    console.error(`Error marking message ${messageId} as read:`, error);
    throw error;
  }
};

export default {
  getChatUsers,
  getConversation,
  sendMessage,
  markMessageAsRead,
};