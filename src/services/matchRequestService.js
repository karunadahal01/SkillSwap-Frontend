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

/**
 * Request completion (Step 1 - First user marks as complete)
 * @param {number} requestId - ID of the match request
 * @returns {Promise<Object>}
 */
export const requestCompletion = async (requestId) => {
  const response = await api.put(`/api/match/requests/${requestId}/complete`);
  return response.data;
};

/**
 * Confirm completion (Step 2 - Second user confirms)
 * @param {number} requestId - ID of the match request
 * @returns {Promise<Object>}
 */
export const confirmCompletion = async (requestId) => {
  const response = await api.put(`/api/match/requests/${requestId}/confirm`);
  return response.data;
};