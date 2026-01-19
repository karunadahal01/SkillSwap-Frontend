// // src/services/skillService.js
// import axios from "@config/axios";


// // ===== Skill APIs ===== //

// export const getAllSkills = async (skipAuth = false) => {
//   try {
//     // ✅ FIXED: No need to manually add Authorization header - axios interceptor handles it
//     const res = await api.get("/api/skills/all");
//     return res.data.data || [];
//   } catch (error) {
//     console.error("Error in getAllSkills:", error);
//     throw error;
//   }
// };

// export const addSkill = async (skillData) => {
//   try {
//     // ✅ FIXED: Removed manual header - axios interceptor handles it
//     const res = await api.post("/api/skills/add", skillData);
//     return res.data;
//   } catch (error) {
//     console.error("Error in addSkill:", error);
//     throw error;
//   }
// };

// export const updateSkill = async (skillData) => {
//   try {
//     // ✅ FIXED: Removed manual header - axios interceptor handles it
//     const res = await api.put("/api/skills/update", skillData);
//     return res.data;
//   } catch (error) {
//     console.error("Error in updateSkill:", error);
//     throw error;
//   }
// };




// src/services/skillService.js
import api from "@config/axios";

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

export const deleteSkill = async (skillId) => {
  try {
    const res = await api.delete(`/api/skills/delete/${skillId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deleteSkill:", error);
    throw error;
  }
};

export const getSkillById = async (skillId) => {
  try {
    const res = await api.get(`/api/skills/${skillId}`);
    return res.data.data;
  } catch (error) {
    console.error("Error in getSkillById:", error);
    throw error;
  }
};