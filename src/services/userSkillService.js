// src/services/userSkillService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

/**
 * Get Auth Header safely
 * Returns {} if skipAuth is true or no token found
 */
const getAuthHeader = (skipAuth = false) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    if (skipAuth) return {};
    throw new Error("User not authenticated!");
  }
  return { Authorization: `Bearer ${token}` };
};

// ===== Skill APIs ===== //

/**
 * Get all available skills in the system
 * @param {boolean} skipAuth - if true, fetch without auth header
 * @returns {Promise<Array>} Array of all skills
 */
export const getAllSkills = async (skipAuth = false) => {
  try {
    const headers = getAuthHeader(skipAuth);
    const res = await axios.get(`${BASE_URL}/skills/all`, { headers });
    return res.data.data || [];
  } catch (error) {
    console.error("Error in getAllSkills:", error);
    throw error;
  }
};

/**
 * Create a new skill (Admin only)
 */
export const addSkill = async (skillData) => {
  try {
    const headers = getAuthHeader();
    const res = await axios.post(`${BASE_URL}/skills/add`, skillData, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in addSkill:", error);
    throw error;
  }
};

/**
 * Update an existing skill
 */
export const updateSkill = async (skillData) => {
  try {
    const headers = getAuthHeader();
    const res = await axios.put(`${BASE_URL}/skills/update`, skillData, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in updateSkill:", error);
    throw error;
  }
};

// ===== User Skill APIs ===== //

/**
 * Add a skill to user's profile
 */
export const addUserSkill = async (userId, skillData) => {
  try {
    const headers = getAuthHeader();
    const res = await axios.post(`${BASE_URL}/user/skills/add/${userId}`, skillData, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in addUserSkill:", error);
    throw error;
  }
};

/**
 * Remove a skill from user's profile
 */
export const removeUserSkill = async (userId, skillData) => {
  try {
    const headers = getAuthHeader();
    const res = await axios.delete(`${BASE_URL}/user/skills/remove/${userId}`, {
      headers,
      data: skillData,
    });
    return res.data;
  } catch (error) {
    console.error("Error in removeUserSkill:", error);
    throw error;
  }
};

/**
 * Update user's skill level
 */
export const updateUserSkillLevel = async (userId, skillData) => {
  try {
    const headers = getAuthHeader();
    const res = await axios.put(`${BASE_URL}/user/skills/update-level/${userId}`, skillData, { headers });
    return res.data;
  } catch (error) {
    console.error("Error in updateUserSkillLevel:", error);
    throw error;
  }
};

/**
 * Get all skills for a specific user
 */
export const getAllUserSkills = async (userId) => {
  try {
    const headers = getAuthHeader();
    const res = await axios.get(`${BASE_URL}/user/skills/all/${userId}`, { headers });
    return res.data.data || [];
  } catch (error) {
    console.error("Error in getAllUserSkills:", error);
    throw error;
  }
};
