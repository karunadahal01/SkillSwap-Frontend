// // src/services/userSwapService.js
// import axios from "@config/axios";

// /* ================= CREATE SWAP REQUEST ================= */
// export const createMatchRequest = async (payload) => {
//   const res = await axios.post("/api/match/request", payload);
//   return res.data;
// };

// /* ================= GET USER SWAPS ================= */
// export const getUserSwaps = async () => {
//   const res = await axios.get("/api/match/requests");
//   return res.data;
// };

// /* ================= RESPOND TO REQUEST ================= */
// export const respondToMatchRequest = async (id, action) => {
//   // action = "ACCEPT", "DECLINE", "COMPLETE"
//   const res = await axios.put(`/api/match/requests/${id}?action=${action}`);
//   return res.data;
// };

// /* ================= CANCEL OUTGOING REQUEST ================= */
// export const cancelMatchRequest = async (id) => {
//   const res = await axios.delete(`/api/match/requests/${id}`);
//   return res.data;
// };

// // Fetch all offered/requested skills for a user
// export const getUserSkills = async (userId) => {
//   const res = await axios.get(`/api/user/skills/all/${userId}`);
//   return res.data.data; // returns array of skills
// };





// // src/services/userSwapService.js
// import axios from "@config/axios";

// // Create a match request
// export const createMatchRequest = async (payload) => {
//   // payload = { fromUserSkillId, toUserId, toUserSkillId }
//   const res = await axios.post("/api/match/request", payload);
//   return res.data;
// };

// // Get all match requests for current user
// export const getMyMatchRequests = async () => {
//   const res = await axios.get("/api/match/requests");
//   return res.data;
// };

// // Respond to a request (ACCEPT or REJECT)
// export const respondToMatchRequest = async (id, action) => {
//   const res = await axios.put(`/api/match/requests/${id}?action=${action}`);
//   return res.data;
// };

// // Cancel a request sent by current user
// export const cancelMatchRequest = async (id) => {
//   const res = await axios.delete(`/api/match/requests/${id}`);
//   return res.data;
// };

// export const getUserSwaps = async () => {
//   const res = await axios.get("/api/match/requests");
//   return res.data;
// };
// src/services/matchRequestService.js
import api from "@config/axios";

/**
 * Create a match/swap request
 * @param {Object} request - { fromUserSkillId, toUserId, toUserSkillId }
 * @returns {Promise<Object>} - MatchRequestResponse
 */
export const createMatchRequest = async (request) => {
  const response = await api.post("/api/match/request", request);
  return response.data;
};

/**
 * Get all match requests for the authenticated user
 * @returns {Promise<Object>} - ApiResponse with array of MatchRequestResponse
 */
export const getMatchRequests = async () => {
  const response = await api.get("/api/match/requests");
  return response.data;
};

/**
 * Respond to a match request (ACCEPT or DECLINE)
 * @param {number} requestId - ID of the match request
 * @param {string} action - "ACCEPT" or "DECLINE"
 * @returns {Promise<Object>} - Updated MatchRequestResponse
 */
export const respondToMatchRequest = async (requestId, action) => {
  const response = await api.put(`/api/match/requests/${requestId}`, null, {
    params: { action },
  });
  return response.data;
};

/**
 * Cancel a match request
 * @param {number} requestId - ID of the match request to cancel
 * @returns {Promise<Object>}
 */
export const cancelMatchRequest = async (requestId) => {
  const response = await api.delete(`/api/match/requests/${requestId}`);
  return response.data;
};