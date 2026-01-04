// src/services/userSkillService.js
import api from "../config/axios";

// ===== Skill APIs ===== //

export const getAllSkills = async (skipAuth = false) => {
  try {
    // ✅ FIXED: No need to manually add Authorization header - axios interceptor handles it
    const res = await api.get("/api/skills/all");
    return res.data.data || [];
  } catch (error) {
    console.error("Error in getAllSkills:", error);
    throw error;
  }
};

export const addSkill = async (skillData) => {
  try {
    // ✅ FIXED: Removed manual header - axios interceptor handles it
    const res = await api.post("/api/skills/add", skillData);
    return res.data;
  } catch (error) {
    console.error("Error in addSkill:", error);
    throw error;
  }
};

export const updateSkill = async (skillData) => {
  try {
    // ✅ FIXED: Removed manual header - axios interceptor handles it
    const res = await api.put("/api/skills/update", skillData);
    return res.data;
  } catch (error) {
    console.error("Error in updateSkill:", error);
    throw error;
  }
};

// ===== User Skill APIs ===== //

export const addUserSkill = async (userId, skillData) => {
  // ✅ FIXED: Removed manual header - axios interceptor handles it
  const res = await api.post(`/api/user/skills/add/${userId}`, skillData);
  return res.data;
};

export const removeUserSkill = async (userId, skillData) => {
  // ✅ FIXED: Removed manual header - axios interceptor handles it
  const res = await api.delete(`/api/user/skills/remove/${userId}`, { data: skillData });
  return res.data;
};

export const updateUserSkillLevel = async (userId, skillData) => {
  // ✅ FIXED: Removed manual header - axios interceptor handles it
  const res = await api.put(`/api/user/skills/update-level/${userId}`, skillData);
  return res.data;
};

export const getAllUserSkills = async (userId) => {
  // ✅ FIXED: Removed manual header - axios interceptor handles it
  const res = await api.get(`/api/user/skills/all/${userId}`);
  return res.data.data || [];
};