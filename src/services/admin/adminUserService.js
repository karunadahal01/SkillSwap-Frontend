// src/services/admin/adminUserService.js
import axios from "@/config/axios";

/**
 * GET all users (Admin)
 */
export const getAllUsers = async () => {
  const response = await axios.get("/api/admin/users");
  return response.data; // ApiResponse
};

/**
 * GET user by ID (Admin)
 */
export const getUserById = async (id) => {
  const response = await axios.get(`/api/admin/users/${id}`);
  return response.data; // ApiResponse
};

/**
 * UPDATE user by ID (Admin)
 */
export const updateUserById = async (id, userData) => {
  const response = await axios.put(`/api/admin/users/${id}`, userData);
  return response.data; // ApiResponse
};

/**
 * DELETE user by ID (Admin)
 */
export const deleteUserById = async (id) => {
  const response = await axios.delete(`/api/admin/users/${id}`);
  return response.data; // ApiResponse
};
