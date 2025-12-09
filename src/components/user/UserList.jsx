import React from "react";
import { Box, Avatar, Typography, useTheme } from "@mui/material";

export default function UserList({ users, activeUserId, onSelectUser, getStatusIcon, getStatusColor }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        p: 1,
        bgcolor: theme.palette.mode === "dark" ? "#191818" : "#f4f6f8",
      }}
    >
      {users.map((u) => {
        const last = u.messages[u.messages.length - 1];
        return (
          <Box
            key={u.id}
            onClick={() => onSelectUser(u.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              mb: 1,
              height: "64px",
              borderRadius: 5,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 3px 4px rgba(0,0,0,0.9)"
                  : "0 3px 4px rgba(0,0,0,0.1)",
              bgcolor: theme.palette.mode === "dark" ? "#131313" : "#fff",
              cursor: "pointer",
            }}
          >
            <Avatar sx={{ mr: 2 }}>{u.avatar}</Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight="bold">{u.name}</Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  maxWidth: "180px",
                }}
              >
                {last?.sender === "me" && (
                  <span style={{ color: getStatusColor(last.status) }}>{getStatusIcon(last.status)}</span>
                )}
                {last?.content}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
