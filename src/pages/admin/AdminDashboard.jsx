// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // Stats card colors
  const cardColors = {
    users: isLight ? '#e3f2fd' : '#0d47a1',
    skills: isLight ? '#f3e5f5' : '#4a148c',
    swaps: isLight ? '#e8f5e9' : '#1b5e20',
    active: isLight ? '#fff3e0' : '#e65100',
  };

  // Dashboard stats
  const stats = [
    { title: 'Total Users', value: 1280, icon: <PeopleIcon color="primary" />, color: cardColors.users },
    { title: 'Total Skills', value: 345, icon: <SchoolIcon color="secondary" />, color: cardColors.skills },
    { title: 'Total Swaps', value: 220, icon: <SwapHorizIcon sx={{ color: '#43a047' }} />, color: cardColors.swaps },
    { title: 'Active Users', value: 480, icon: <TrendingUpIcon sx={{ color: '#ff9800' }} />, color: cardColors.active },
  ];

  // Example: Top Skills (admin relevant)
  const topSkills = [
    { id: 1, skill: 'Guitar', count: 120 },
    { id: 2, skill: 'Cooking', count: 95 },
    { id: 3, skill: 'Photography', count: 80 },
    { id: 4, skill: 'Yoga', count: 70 },
    { id: 5, skill: 'Painting', count: 60 },
  ];

  // Swaps per month for chart
  const swapsPerMonth = [
    { month: 'Jan', swaps: 20 },
    { month: 'Feb', swaps: 15 },
    { month: 'Mar', swaps: 25 },
    { month: 'Apr', swaps: 30 },
    { month: 'May', swaps: 28 },
    { month: 'Jun', swaps: 32 },
    { month: 'Jul', swaps: 18 },
    { month: 'Aug', swaps: 22 },
    { month: 'Sep', swaps: 24 },
    { month: 'Oct', swaps: 20 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        SkillSwap Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
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
                '&:hover': { transform: 'scale(1.03)', boxShadow: theme.shadows[6] },
              }}
              elevation={3}
            >
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>{item.title}</Typography>
                <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
              </Box>
              {item.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Swaps Chart */}
      <Paper
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.3s ease',
        }}
        elevation={3}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">Swaps Per Month</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={swapsPerMonth}>
            <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip />
            <Bar dataKey="swaps" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Top Skills */}
      <Paper
        sx={{
          p: 2,
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.3s ease',
        }}
        elevation={3}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">Top Skills</Typography>
        <Box sx={{ maxHeight: 250, overflowY: 'auto' }}>
          {topSkills.map((skill) => (
            <Box
              key={skill.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Typography>{skill.skill}</Typography>
              <Typography color="text.secondary">{skill.count} Users</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
