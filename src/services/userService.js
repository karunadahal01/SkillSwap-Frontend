// src/services/userService.js
import axios from "@config/axios"; // use your existing axios instance

// Fetch all users with their skills
export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/users"); // your backend endpoint
    return response.data.data; // data inside ApiResponse
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
