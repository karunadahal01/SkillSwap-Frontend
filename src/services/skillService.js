// src/services/skillService.js
import axios from "@config/axios";

export const updateSkill = async (payload) => {
  const res = await axios.put("/api/skills/update", payload);
  return res.data;
};
