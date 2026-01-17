// src/components/user/UserList.jsx
import React from "react";
import { Box, Avatar, Typography, Badge, useTheme } from "@mui/material";

// ✅ Helper to get full avatar URL
const getAvatarUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://192.168.254.4:8080';
  return `${baseUrl}/${cleanPath}`;
};

export default function UserList({
  users,
  activeUserId,
  onSelectUser,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        p: 2,
        bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
        height: "100%",
      }}
    >
      {users.length === 0 && (
        <Typography align="center" sx={{ mt: 5, opacity: 0.6 }}>
          No users to display
        </Typography>
      )}

      {users.map((user) => {
        const isActive = user.userId === activeUserId;
        const fullAvatarUrl = getAvatarUrl(user.avatarURL);

        return (
          <Box
            key={user.userId}
            onClick={() => onSelectUser(user.userId)}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              mb: 1,
              borderRadius: 3,
              cursor: "pointer",
              bgcolor: isActive
                ? theme.palette.mode === "dark"
                  ? "#292929"
                  : "#e0f7fa"
                : theme.palette.mode === "dark"
                ? "#131313"
                : "#fff",
              "&:hover": {
                bgcolor: theme.palette.mode === "dark" ? "#1f1f1f" : "#f0f0f0",
              },
            }}
          >
            {/* Avatar with online status badge */}
            <Badge
              variant="dot"
              color={user.online ? "success" : "default"}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                '& .MuiBadge-badge': {
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: theme.palette.background.paper,
                },
              }}
            >
              <Avatar
                src={fullAvatarUrl}
                sx={{ mr: 2, width: 48, height: 48 }}
                imgProps={{
                  onError: (e) => {
                    console.error('Failed to load avatar:', fullAvatarUrl);
                    e.target.style.display = 'none';
                  }
                }}
              >
                {!fullAvatarUrl && user.fullName
                  ? user.fullName.charAt(0).toUpperCase()
                  : user.username?.charAt(0).toUpperCase() || '?'}
              </Avatar>
            </Badge>

            {/* Name and last message */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                fontWeight={user.unreadCount > 0 ? "bold" : "medium"}
                noWrap
              >
                {user.fullName || user.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: user.unreadCount > 0 ? 1 : 0.7,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: user.unreadCount > 0 ? "bold" : "normal",
                }}
              >
                {user.lastMessage || "No messages yet"}
              </Typography>
            </Box>

            {/* Timestamp and unread badge */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
              {user.lastMessageTime && (
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.6, whiteSpace: "nowrap" }}
                >
                  {new Date(user.lastMessageTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              )}
              
              {user.unreadCount > 0 && (
                <Badge
                  badgeContent={user.unreadCount}
                  color="primary"
                  sx={{ mt: 0.5 }}
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}