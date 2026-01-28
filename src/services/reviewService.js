// src/services/reviewService.js
import api from "@config/axios";

/**
 * Create a new review
 * @param {Object} reviewData - { revieweeId, matchRequestId, comment }
 * @returns {Promise<Object>} - ReviewResponse
 */
export const createReview = async (reviewData) => {
  const response = await api.post("/api/reviews", reviewData);
  return response.data;
};

/**
 * Update an existing review
 * @param {number} reviewId - ID of the review to update
 * @param {Object} reviewData - { comment }
 * @returns {Promise<Object>} - Updated ReviewResponse
 */
export const updateReview = async (reviewId, reviewData) => {
  const response = await api.put(`/api/reviews/${reviewId}`, reviewData);
  return response.data;
};

/**
 * Delete a review
 * @param {number} reviewId - ID of the review to delete
 * @returns {Promise<Object>}
 */
export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/api/reviews/${reviewId}`);
  return response.data;
};

/**
 * Get a single review by ID
 * @param {number} reviewId - ID of the review
 * @returns {Promise<Object>} - ReviewResponse
 */
export const getReviewById = async (reviewId) => {
  const response = await api.get(`/api/reviews/${reviewId}`);
  return response.data;
};

/**
 * Get all reviews written by current user
 * @returns {Promise<Array>} - Array of ReviewResponse
 */
export const getMyReviews = async () => {
  const response = await api.get("/api/reviews/my-reviews");
  return response.data.data || [];
};

/**
 * Get all reviews received by a specific user
 * @param {number} userId - ID of the user
 * @returns {Promise<Array>} - Array of ReviewResponse
 */
export const getReviewsForUser = async (userId) => {
  const response = await api.get(`/api/reviews/user/${userId}`);
  return response.data.data || [];
};

/**
 * Get all reviews for a specific match
 * @param {number} matchRequestId - ID of the match request
 * @returns {Promise<Array>} - Array of ReviewResponse
 */
export const getReviewsForMatch = async (matchRequestId) => {
  const response = await api.get(`/api/reviews/match/${matchRequestId}`);
  return response.data.data || [];
};