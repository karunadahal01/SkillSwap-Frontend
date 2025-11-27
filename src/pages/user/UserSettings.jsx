// src/pages/user/UserSettings.jsx
import { Box, Typography } from '@mui/material';

export default function UserSettings() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is where users can update their profile and preferences.
      </Typography>
    </Box>
  );
}
