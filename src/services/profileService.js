// src/services/user/profileService.js
import axios from "@config/axios";

export const getProfile = async () => {
  return axios.get("/api/profile/me");
};

export const updateProfile = async (data) => {
  return axios.put("/api/profile/me", data);
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("file", file);  // must match @RequestPart("file")

  const res = await axios.post("/api/profile/upload-avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data?.data; // this should be the full URL returned from backend
};

