// src/pages/user/UserMessageList.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Badge,
  CircularProgress,
  useTheme,
  Paper,
  InputAdornment,
  TextField,
  Chip,
  Stack,
} from '@mui/material';
import {
  Search,
  Message,
  CircleOutlined,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/context/ChatContext';
import { getProfileByUserId } from '@/services/profileService';

const HEADER_HEIGHT = 180;

export default function UserMessageList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { chatUsers, fetchChatUsers, loading } = useChat();
  const [userProfiles, setUserProfiles] = useState({});
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    fetchChatUsers();
  }, [fetchChatUsers]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!chatUsers.length) return;

      setLoadingProfiles(true);
      const profiles = {};

      try {
        await Promise.all(
          chatUsers.map(async (chatUser) => {
            try {
              const profile = await getProfileByUserId(chatUser.userId);
              profiles[chatUser.userId] = profile;
            } catch (error) {
              console.error(`Error fetching profile for user ${chatUser.userId}:`, error);
            }
          })
        );
        setUserProfiles(profiles);
      } finally {
        setLoadingProfiles(false);
      }
    };

    fetchProfiles();
  }, [chatUsers]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const diff = new Date() - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  // Filter chat users based on search query
  const filteredChatUsers = chatUsers.filter((chatUser) => {
    const profile = userProfiles[chatUser.userId];
    const displayName = profile?.fullName || chatUser.userName || 'User';
    const lastMessage = chatUser.lastMessage || '';
    
    return (
      displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading && chatUsers.length === 0) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          top: theme.mixins.toolbar.minHeight,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          zIndex: 1100,
          background: isDark
            ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 3,
          borderRadius: 4,
          paddingTop: 6,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Message sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight={700}>
            Messages
          </Typography>
          {chatUsers.length > 0 && (
            <Chip
              label={chatUsers.length}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        {/* Search Bar */}
        <TextField
          size="small"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'rgba(255,255,255,0.7)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255,255,255,0.5)',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255,255,255,0.6)',
              opacity: 1,
            },
          }}
        />
      </Paper>

      {/* Scrollable List */}
      <Box
        sx={{
          position: 'absolute',
          top: `calc(${theme.mixins.toolbar.minHeight}px + ${HEADER_HEIGHT}px)`,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          px: 2,
          pt: 2,
        }}
      >
        {filteredChatUsers.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 8,
              mx: 'auto',
              maxWidth: 500,
              mt: 4,
              borderRadius: 3,
              background: isDark ? '#1e1e2e' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Message sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery
                ? 'Try searching with different keywords'
                : 'Swap with other users to start conversations after being matched'}
            </Typography>
          </Paper>
        ) : (
          <List sx={{ maxWidth: 900, mx: 'auto', pb: 2 }}>
            {filteredChatUsers.map((chatUser) => {
              const profile = userProfiles[chatUser.userId];
              const displayName = profile?.fullName || chatUser.userName || 'User';
              const avatarUrl = profile?.avatarUrl || null;
              const hasUnread = chatUser.unreadCount > 0;

              return (
                <ListItem key={chatUser.userId} disablePadding sx={{ mb: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      width: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      background: isDark ? '#1e1e2e' : '#ffffff',
                      border: `1px solid ${
                        hasUnread
                          ? theme.palette.primary.main
                          : isDark
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.08)'
                      }`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark
                          ? '0 12px 24px rgba(0,0,0,0.4)'
                          : '0 12px 24px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => navigate(`/user/messages/${chatUser.userId}`)}
                      sx={{
                        px: 3,
                        py: 2,
                        '&:hover': {
                          bgcolor: 'transparent',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          color="success"
                          variant="dot"
                          overlap="circular"
                          invisible={!chatUser.isOnline}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          sx={{
                            '& .MuiBadge-dot': {
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              border: '2px solid',
                              borderColor: isDark ? '#1e1e2e' : '#ffffff',
                            },
                          }}
                        >
                          <Avatar
                            src={avatarUrl || undefined}
                            alt={displayName}
                            onClick={() => navigate(`/user/other-profile/${chatUser.userId}`)}
                            sx={{
                              width: 56,
                              height: 56,
                              border: '2px solid',
                              borderColor: hasUnread ? 'primary.main' : 'transparent',
                            }}
                          >
                            {getInitials(displayName)}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>

                      <ListItemText
                        sx={{ ml: 2 }}
                        primary={
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography
                              fontWeight={hasUnread ? 700 : 600}
                              fontSize="1rem"
                              noWrap
                              sx={{ flex: 1 }}
                            >
                              {displayName}
                            </Typography>
                            {chatUser.isOnline && (
                              <Chip
                                label="Online"
                                size="small"
                                color="success"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                }}
                              />
                            )}
                          </Stack>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{
                              fontWeight: hasUnread ? 600 : 400,
                              mt: 0.5,
                            }}
                          >
                            {chatUser.lastMessage || 'No messages yet'}
                          </Typography>
                        }
                      />

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: 1,
                          ml: 2,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {formatTime(chatUser.lastMessageTime)}
                        </Typography>

                        {hasUnread && (
                          <Box
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              color: '#fff',
                              borderRadius: '999px',
                              minWidth: 24,
                              height: 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              px: 0.8,
                              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
                            }}
                          >
                            {chatUser.unreadCount}
                          </Box>
                        )}
                      </Box>
                    </ListItemButton>
                  </Paper>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
}