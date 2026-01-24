// src/services/notificationService.js
import axios from "@config/axios";

// Get all notifications for current user
export const getAllNotifications = async () => {
  try {
    const response = await axios.get("/api/notifications");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Get only unread notifications
export const getUnreadNotifications = async () => {
  try {
    const response = await axios.get("/api/notifications/unread");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    throw error;
  }
};

// Get count of unread notifications
export const getUnreadCount = async () => {
  try {
    const response = await axios.get("/api/notifications/unread/count");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axios.put("/api/notifications/read-all");
    return response.data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};