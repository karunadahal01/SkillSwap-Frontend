// src/pages/admin/AdminHome.jsx
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function AdminDashboard() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  // Adaptive color palette for both modes
  const cardColors = {
    users: isLight ? '#e3f2fd' : '#0d47a1', // light blue / deep blue
    skills: isLight ? '#f3e5f5' : '#4a148c', // lavender / dark purple
    swaps: isLight ? '#e8f5e9' : '#1b5e20', // greenish / dark green
    active: isLight ? '#fff3e0' : '#e65100', // orange tint / burnt orange
  };

  const stats = [
    { title: 'Total Users', value: 1280, icon: <PeopleIcon color="primary" />, color: cardColors.users },
    { title: 'Total Skills', value: 345, icon: <SchoolIcon color="secondary" />, color: cardColors.skills },
    { title: 'Total Swaps', value: 220, icon: <SwapHorizIcon sx={{ color: '#43a047' }} />, color: cardColors.swaps },
    { title: 'Active Users', value: 480, icon: <TrendingUpIcon sx={{ color: '#ff9800' }} />, color: cardColors.active },
  ];

  const recentSwaps = [
    { id: 1, users: 'Alice ↔ Bob', skill: 'Guitar for Painting', date: 'Oct 10, 2025' },
    { id: 2, users: 'John ↔ Sara', skill: 'Cooking for Yoga', date: 'Oct 9, 2025' },
    { id: 3, users: 'Liam ↔ Emma', skill: 'Photography for Coding', date: 'Oct 7, 2025' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        SkillSwap Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={5} sx={{ mb: 4 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: item.color,
                color: isLight ? '#000' : '#fff',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: theme.shadows[6],
                },
              }}
              elevation={3}
            >
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
              {item.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Swaps Section */}
      <Paper
        sx={{
          p: 2,
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.3s ease',
        }}
        elevation={3}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Recent Swaps
        </Typography>
        {recentSwaps.map((swap) => (
          <Box
            key={swap.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Typography>{swap.users}</Typography>
            <Typography color="text.secondary">{swap.skill}</Typography>
            <Typography color="text.secondary" variant="body2">
              {swap.date}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
