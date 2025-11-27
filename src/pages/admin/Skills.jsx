import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Skills() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Manage Skills
      </Typography>
      <Typography>
        Here you can view, add, and manage all the skills users offer on SkillSwap.
      </Typography>
    </Box>
  );
}
