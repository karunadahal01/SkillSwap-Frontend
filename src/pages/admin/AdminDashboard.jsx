// // src/pages/admin/AdminDashboard.jsx
// import React from 'react';
// import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
// import PeopleIcon from '@mui/icons-material/People';
// import SchoolIcon from '@mui/icons-material/School';
// import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// export default function AdminDashboard() {
//   const theme = useTheme();
//   const isLight = theme.palette.mode === 'light';

//   // Stats card colors
//   const cardColors = {
//     users: isLight ? '#e3f2fd' : '#0d47a1',
//     skills: isLight ? '#f3e5f5' : '#4a148c',
//     swaps: isLight ? '#e8f5e9' : '#1b5e20',
//     active: isLight ? '#fff3e0' : '#e65100',
//   };

//   // Dashboard stats
//   const stats = [
//     { title: 'Total Users', value: 1280, icon: <PeopleIcon color="primary" />, color: cardColors.users },
//     { title: 'Total Skills', value: 345, icon: <SchoolIcon color="secondary" />, color: cardColors.skills },
//     { title: 'Total Swaps', value: 220, icon: <SwapHorizIcon sx={{ color: '#43a047' }} />, color: cardColors.swaps },
//     { title: 'Active Users', value: 480, icon: <TrendingUpIcon sx={{ color: '#ff9800' }} />, color: cardColors.active },
//   ];

//   // Example: Top Skills (admin relevant)
//   const topSkills = [
//     { id: 1, skill: 'Guitar', count: 120 },
//     { id: 2, skill: 'Cooking', count: 95 },
//     { id: 3, skill: 'Photography', count: 80 },
//     { id: 4, skill: 'Yoga', count: 70 },
//     { id: 5, skill: 'Painting', count: 60 },
//   ];

//   // Swaps per month for chart
//   const swapsPerMonth = [
//     { month: 'Jan', swaps: 20 },
//     { month: 'Feb', swaps: 15 },
//     { month: 'Mar', swaps: 25 },
//     { month: 'Apr', swaps: 30 },
//     { month: 'May', swaps: 28 },
//     { month: 'Jun', swaps: 32 },
//     { month: 'Jul', swaps: 18 },
//     { month: 'Aug', swaps: 22 },
//     { month: 'Sep', swaps: 24 },
//     { month: 'Oct', swaps: 20 },
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header */}
//       <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
//         SkillSwap Admin Dashboard
//       </Typography>

//       {/* Stats Cards */}
//       <Grid container spacing={4} sx={{ mb: 4 }}>
//         {stats.map((item) => (
//           <Grid item xs={12} sm={6} md={3} key={item.title}>
//             <Paper
//               sx={{
//                 p: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 backgroundColor: item.color,
//                 color: isLight ? '#000' : '#fff',
//                 transition: '0.3s',
//                 '&:hover': { transform: 'scale(1.03)', boxShadow: theme.shadows[6] },
//               }}
//               elevation={3}
//             >
//               <Box>
//                 <Typography variant="body2" sx={{ opacity: 0.8 }}>{item.title}</Typography>
//                 <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
//               </Box>
//               {item.icon}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Swaps Chart */}
//       <Paper
//         sx={{
//           p: 2,
//           mb: 4,
//           backgroundColor: theme.palette.background.paper,
//           transition: 'background-color 0.3s ease',
//         }}
//         elevation={3}
//       >
//         <Typography variant="h6" gutterBottom fontWeight="bold">Swaps Per Month</Typography>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={swapsPerMonth}>
//             <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
//             <YAxis stroke={theme.palette.text.secondary} />
//             <Tooltip />
//             <Bar dataKey="swaps" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </Paper>

//       {/* Top Skills */}
//       <Paper
//         sx={{
//           p: 2,
//           backgroundColor: theme.palette.background.paper,
//           transition: 'background-color 0.3s ease',
//         }}
//         elevation={3}
//       >
//         <Typography variant="h6" gutterBottom fontWeight="bold">Top Skills</Typography>
//         <Box sx={{ maxHeight: 250, overflowY: 'auto' }}>
//           {topSkills.map((skill) => (
//             <Box
//               key={skill.id}
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 py: 1,
//                 borderBottom: `1px solid ${theme.palette.divider}`,
//                 '&:last-child': { borderBottom: 'none' },
//               }}
//             >
//               <Typography>{skill.skill}</Typography>
//               <Typography color="text.secondary">{skill.count} Users</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }






// // src/pages/admin/AdminDashboard.jsx
// import React from 'react';
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   useTheme,
//   Stack,
//   Card,
//   CardContent,
//   Divider,
//   LinearProgress,
// } from '@mui/material';
// import {
//   People as PeopleIcon,
//   School as SchoolIcon,
//   SwapHoriz as SwapHorizIcon,
//   TrendingUp as TrendingUpIcon,
//   Dashboard as DashboardIcon,
//   EmojiEvents,
// } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// export default function AdminDashboard() {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';

//   // Dashboard stats
//   const stats = [
//     {
//       title: 'Total Users',
//       value: 1280,
//       icon: <PeopleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       change: '+12%',
//     },
//     {
//       title: 'Total Skills',
//       value: 345,
//       icon: <SchoolIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//       change: '+8%',
//     },
//     {
//       title: 'Total Swaps',
//       value: 220,
//       icon: <SwapHorizIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//       change: '+15%',
//     },
//     {
//       title: 'Active Users',
//       value: 480,
//       icon: <TrendingUpIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//       change: '+5%',
//     },
//   ];

//   // Top Skills
//   const topSkills = [
//     { id: 1, skill: 'Guitar', count: 120, percentage: 100 },
//     { id: 2, skill: 'Cooking', count: 95, percentage: 79 },
//     { id: 3, skill: 'Photography', count: 80, percentage: 67 },
//     { id: 4, skill: 'Yoga', count: 70, percentage: 58 },
//     { id: 5, skill: 'Painting', count: 60, percentage: 50 },
//   ];

//   // Swaps per month for chart
//   const swapsPerMonth = [
//     { month: 'Jan', swaps: 20 },
//     { month: 'Feb', swaps: 15 },
//     { month: 'Mar', swaps: 25 },
//     { month: 'Apr', swaps: 30 },
//     { month: 'May', swaps: 28 },
//     { month: 'Jun', swaps: 32 },
//     { month: 'Jul', swaps: 18 },
//     { month: 'Aug', swaps: 22 },
//     { month: 'Sep', swaps: 24 },
//     { month: 'Oct', swaps: 20 },
//   ];

//   // Chart colors for each bar
//   const chartColors = [
//     '#667eea', '#f093fb', '#4facfe', '#fa709a', '#667eea',
//     '#f093fb', '#4facfe', '#fa709a', '#667eea', '#f093fb'
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: isDark
//           ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
//           : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
//         py: 6,
//         px: { xs: 1, sm: 2 },
//       }}
//     >
//       <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2.5, sm: 3, md: 4 },
//             mb: { xs: 2, sm: 3, md: 4 },
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark
//               ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
//               : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             position: 'relative',
//             overflow: 'hidden',
//             '&::before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               right: 0,
//               width: { xs: '200px', sm: '300px' },
//               height: { xs: '200px', sm: '300px' },
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '50%',
//               transform: 'translate(30%, -30%)',
//             },
//           }}
//         >
//           <Stack
//             direction="row"
//             alignItems="center"
//             spacing={{ xs: 1, sm: 1.5 }}
//             sx={{ position: 'relative', zIndex: 1, mb: { xs: 0.5, sm: 1 } }}
//           >
//             <DashboardIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
//             <Typography
//               variant="h4"
//               fontWeight={700}
//               sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}
//             >
//               Admin Dashboard
//             </Typography>
//           </Stack>
//           <Typography
//             variant="body1"
//             sx={{
//               opacity: 0.9,
//               fontSize: { xs: '0.875rem', sm: '1rem' },
//               position: 'relative',
//               zIndex: 1,
//             }}
//           >
//             Monitor platform statistics and user activity
//           </Typography>
//         </Paper>

//         {/* Stats Cards */}
//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
//           {stats.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   height: '100%',
//                   borderRadius: { xs: 2, md: 3 },
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-8px)',
//                     boxShadow: isDark
//                       ? '0 12px 24px rgba(0,0,0,0.4)'
//                       : '0 12px 24px rgba(0,0,0,0.1)',
//                     borderColor: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                   <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
//                     <Box>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
//                       >
//                         {stat.title}
//                       </Typography>
//                       <Typography
//                         variant="h4"
//                         fontWeight={700}
//                         sx={{ mb: 0.5, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
//                       >
//                         {stat.value.toLocaleString()}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: '#4caf50',
//                           fontWeight: 600,
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         }}
//                       >
//                         {stat.change} this month
//                       </Typography>
//                     </Box>
//                     <Box
//                       sx={{
//                         width: { xs: 44, sm: 50 },
//                         height: { xs: 44, sm: 50 },
//                         borderRadius: 2,
//                         background: stat.gradient,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                       }}
//                     >
//                       {stat.icon}
//                     </Box>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//           {/* Swaps Chart */}
//           <Grid item xs={12} lg={8}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 height: '100%',
//               }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1.5}
//                 sx={{ mb: 3 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <SwapHorizIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
//                     Swaps Per Month
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                     Monthly swap activity overview
//                   </Typography>
//                 </Box>
//               </Stack>

//               <ResponsiveContainer width="100%" height={280}>
//                 <BarChart data={swapsPerMonth}>
//                   <XAxis
//                     dataKey="month"
//                     stroke={theme.palette.text.secondary}
//                     style={{ fontSize: '0.875rem' }}
//                   />
//                   <YAxis
//                     stroke={theme.palette.text.secondary}
//                     style={{ fontSize: '0.875rem' }}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: isDark ? '#1e1e2e' : '#ffffff',
//                       border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
//                       borderRadius: '8px',
//                       color: theme.palette.text.primary,
//                     }}
//                   />
//                   <Bar dataKey="swaps" radius={[8, 8, 0, 0]}>
//                     {swapsPerMonth.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={chartColors[index]} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>

//           {/* Top Skills */}
//           <Grid item xs={12} lg={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 height: '100%',
//               }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1.5}
//                 sx={{ mb: 3 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <EmojiEvents sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
//                     Top Skills
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                     Most popular skills
//                   </Typography>
//                 </Box>
//               </Stack>

//               <Stack spacing={2.5}>
//                 {topSkills.map((skill, index) => (
//                   <Box key={skill.id}>
//                     <Stack
//                       direction="row"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       sx={{ mb: 1 }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={1.5}>
//                         <Box
//                           sx={{
//                             width: 32,
//                             height: 32,
//                             borderRadius: '50%',
//                             background: `linear-gradient(135deg, ${chartColors[index]} 0%, ${chartColors[index + 1] || chartColors[0]} 100%)`,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: 'white',
//                             fontWeight: 700,
//                             fontSize: '0.875rem',
//                           }}
//                         >
//                           {index + 1}
//                         </Box>
//                         <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                           {skill.skill}
//                         </Typography>
//                       </Stack>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         fontWeight={600}
//                         sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
//                       >
//                         {skill.count} users
//                       </Typography>
//                     </Stack>
//                     <LinearProgress
//                       variant="determinate"
//                       value={skill.percentage}
//                       sx={{
//                         height: 6,
//                         borderRadius: 3,
//                         backgroundColor: isDark
//                           ? 'rgba(255,255,255,0.1)'
//                           : 'rgba(0,0,0,0.08)',
//                         '& .MuiLinearProgress-bar': {
//                           borderRadius: 3,
//                           background: `linear-gradient(90deg, ${chartColors[index]} 0%, ${chartColors[index + 1] || chartColors[0]} 100%)`,
//                         },
//                       }}
//                     />
//                   </Box>
//                 ))}
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }


// // src/pages/admin/AdminDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   useTheme,
//   Stack,
//   Card,
//   CardContent,
//   CircularProgress,
//   Alert,
//   IconButton,
//   Chip,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   LinearProgress,
//   Avatar,
// } from '@mui/material';
// import {
//   People as PeopleIcon,
//   School as SchoolIcon,
//   SwapHoriz as SwapHorizIcon,
//   TrendingUp as TrendingUpIcon,
//   Dashboard as DashboardIcon,
//   EmojiEvents,
//   Refresh as RefreshIcon,
//   AdminPanelSettings as AdminIcon,
//   CheckCircle as CheckCircleIcon,
//   HourglassEmpty as PendingIcon,
//   Cancel as CancelIcon,
// } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
// import { getAllUsers } from '@/services/admin/adminUserService';
// import { getAllSkills } from '@/services/skillService';
// import api from '@/config/axios';
// import toast from 'react-hot-toast';

// export default function AdminDashboard() {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';

//   // State Management
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Data States
//   const [users, setUsers] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [matchRequests, setMatchRequests] = useState([]);
  
//   // Computed Stats
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalSkills: 0,
//     totalSwaps: 0,
//     activeUsers: 0,
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch all data in parallel
//       const [usersRes, skillsRes, matchRequestsRes] = await Promise.all([
//         getAllUsers(),
//         getAllSkills(),
//         api.get('/api/match/requests').catch(() => ({ data: { data: [] } })), // Fallback if endpoint not available
//       ]);

//       const usersData = usersRes.data || [];
//       const skillsData = skillsRes || [];
//       const matchRequestsData = matchRequestsRes.data?.data || [];

//       setUsers(usersData);
//       setSkills(skillsData);
//       setMatchRequests(matchRequestsData);

//       // Calculate stats
//       const completedSwaps = matchRequestsData.filter(
//         req => req.status === 'COMPLETED'
//       ).length;

//       // Active users = users who have made or received requests
//       const activeUserIds = new Set();
//       matchRequestsData.forEach(req => {
//         activeUserIds.add(req.fromUserId);
//         activeUserIds.add(req.toUserId);
//       });

//       setStats({
//         totalUsers: usersData.length,
//         totalSkills: skillsData.length,
//         totalSwaps: completedSwaps,
//         activeUsers: activeUserIds.size,
//       });

//     } catch (err) {
//       console.error('Error fetching dashboard data:', err);
//       setError(err.response?.data?.message || 'Failed to load dashboard data');
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchDashboardData();
//     setRefreshing(false);
//     toast.success('Dashboard refreshed');
//   };

//   // Calculate top skills by counting user skills
//   const getTopSkills = () => {
//     // Group skills by category
//     const categoryCount = {};
//     skills.forEach(skill => {
//       const category = skill.category || 'Uncategorized';
//       categoryCount[category] = (categoryCount[category] || 0) + 1;
//     });

//     // Convert to array and sort
//     return Object.entries(categoryCount)
//       .map(([name, count]) => ({ name, count }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5);
//   };

//   // Calculate match request distribution
//   const getMatchRequestStats = () => {
//     const statusCount = {
//       PENDING: 0,
//       ACCEPTED: 0,
//       COMPLETED: 0,
//       DECLINED: 0,
//     };

//     matchRequests.forEach(req => {
//       if (statusCount.hasOwnProperty(req.status)) {
//         statusCount[req.status]++;
//       }
//     });

//     return [
//       { name: 'Pending', value: statusCount.PENDING, color: '#ffa726' },
//       { name: 'Accepted', value: statusCount.ACCEPTED, color: '#42a5f5' },
//       { name: 'Completed', value: statusCount.COMPLETED, color: '#66bb6a' },
//       { name: 'Declined', value: statusCount.DECLINED, color: '#ef5350' },
//     ];
//   };

//   // Chart colors
//   const chartColors = [
//     '#667eea', '#f093fb', '#4facfe', '#fa709a', '#667eea',
//   ];

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           background: isDark
//             ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
//             : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
//         }}
//       >
//         <CircularProgress size={50} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           minHeight: '100vh',
//           background: isDark
//             ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
//             : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
//           py: 6,
//           px: { xs: 1, sm: 2 },
//         }}
//       >
//         <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
//           <Alert
//             severity="error"
//             action={
//               <IconButton color="inherit" size="small" onClick={handleRefresh}>
//                 <RefreshIcon />
//               </IconButton>
//             }
//           >
//             {error}
//           </Alert>
//         </Box>
//       </Box>
//     );
//   }

//   const statsCards = [
//     {
//       title: 'Total Users',
//       value: stats.totalUsers,
//       icon: <PeopleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     },
//     {
//       title: 'Total Skills',
//       value: stats.totalSkills,
//       icon: <SchoolIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     },
//     {
//       title: 'Total Swaps',
//       value: stats.totalSwaps,
//       icon: <SwapHorizIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//     },
//     {
//       title: 'Active Users',
//       value: stats.activeUsers,
//       icon: <TrendingUpIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
//       gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//     },
//   ];

//   const topSkills = getTopSkills();
//   const matchRequestStats = getMatchRequestStats();
//   const recentUsers = users.slice(0, 5);

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: isDark
//           ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
//           : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
//         py: 6,
//         px: { xs: 1, sm: 2 },
//       }}
//     >
//       <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2.5, sm: 3, md: 4 },
//             mb: { xs: 2, sm: 3, md: 4 },
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark
//               ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
//               : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             position: 'relative',
//             overflow: 'hidden',
//             '&::before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               right: 0,
//               width: { xs: '200px', sm: '300px' },
//               height: { xs: '200px', sm: '300px' },
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '50%',
//               transform: 'translate(30%, -30%)',
//             },
//           }}
//         >
//           <Stack
//             direction="row"
//             alignItems="center"
//             justifyContent="space-between"
//             sx={{ position: 'relative', zIndex: 1 }}
//           >
//             <Box>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={{ xs: 1, sm: 1.5 }}
//                 sx={{ mb: { xs: 0.5, sm: 1 } }}
//               >
//                 <DashboardIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
//                 <Typography
//                   variant="h4"
//                   fontWeight={700}
//                   sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}
//                 >
//                   Admin Dashboard
//                 </Typography>
//               </Stack>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   opacity: 0.9,
//                   fontSize: { xs: '0.875rem', sm: '1rem' },
//                 }}
//               >
//                 Monitor platform statistics and activity
//               </Typography>
//             </Box>
//             <IconButton
//               onClick={handleRefresh}
//               disabled={refreshing}
//               sx={{
//                 color: 'white',
//                 bgcolor: 'rgba(255,255,255,0.1)',
//                 '&:hover': {
//                   bgcolor: 'rgba(255,255,255,0.2)',
//                   transform: 'rotate(180deg)',
//                 },
//                 transition: 'all 0.3s ease',
//               }}
//             >
//               <RefreshIcon />
//             </IconButton>
//           </Stack>
//         </Paper>

//         {/* Stats Cards */}
//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
//           {statsCards.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   height: '100%',
//                   borderRadius: { xs: 2, md: 3 },
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-8px)',
//                     boxShadow: isDark
//                       ? '0 12px 24px rgba(0,0,0,0.4)'
//                       : '0 12px 24px rgba(0,0,0,0.1)',
//                     borderColor: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                   <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
//                     <Box>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
//                       >
//                         {stat.title}
//                       </Typography>
//                       <Typography
//                         variant="h4"
//                         fontWeight={700}
//                         sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
//                       >
//                         {stat.value.toLocaleString()}
//                       </Typography>
//                     </Box>
//                     <Box
//                       sx={{
//                         width: { xs: 44, sm: 50 },
//                         height: { xs: 44, sm: 50 },
//                         borderRadius: 2,
//                         background: stat.gradient,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                       }}
//                     >
//                       {stat.icon}
//                     </Box>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//           {/* Match Requests Distribution */}
//           <Grid item xs={12} lg={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 height: '100%',
//               }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1.5}
//                 sx={{ mb: 3 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <SwapHorizIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
//                     Match Requests Status
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                     Current distribution of all match requests
//                   </Typography>
//                 </Box>
//               </Stack>

//               {matchRequests.length > 0 ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280 }}>
//                   <ResponsiveContainer width="100%" height={280}>
//                     <PieChart>
//                       <Pie
//                         data={matchRequestStats}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, value }) => `${name}: ${value}`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {matchRequestStats.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: isDark ? '#1e1e2e' : '#ffffff',
//                           border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
//                           borderRadius: '8px',
//                         }}
//                       />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </Box>
//               ) : (
//                 <Box sx={{ textAlign: 'center', py: 8 }}>
//                   <Typography color="text.secondary">No match requests yet</Typography>
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Top Skill Categories */}
//           <Grid item xs={12} lg={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 height: '100%',
//               }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1.5}
//                 sx={{ mb: 3 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <EmojiEvents sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
//                     Top Skill Categories
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                     Most popular skill categories
//                   </Typography>
//                 </Box>
//               </Stack>

//               {topSkills.length > 0 ? (
//                 <Stack spacing={2.5}>
//                   {topSkills.map((skill, index) => {
//                     const maxCount = topSkills[0]?.count || 1;
//                     const percentage = (skill.count / maxCount) * 100;
                    
//                     return (
//                       <Box key={index}>
//                         <Stack
//                           direction="row"
//                           justifyContent="space-between"
//                           alignItems="center"
//                           sx={{ mb: 1 }}
//                         >
//                           <Stack direction="row" alignItems="center" spacing={1.5}>
//                             <Box
//                               sx={{
//                                 width: 32,
//                                 height: 32,
//                                 borderRadius: '50%',
//                                 background: `linear-gradient(135deg, ${chartColors[index]} 0%, ${chartColors[index + 1] || chartColors[0]} 100%)`,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 color: 'white',
//                                 fontWeight: 700,
//                                 fontSize: '0.875rem',
//                               }}
//                             >
//                               {index + 1}
//                             </Box>
//                             <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                               {skill.name}
//                             </Typography>
//                           </Stack>
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             fontWeight={600}
//                             sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
//                           >
//                             {skill.count} skills
//                           </Typography>
//                         </Stack>
//                         <LinearProgress
//                           variant="determinate"
//                           value={percentage}
//                           sx={{
//                             height: 6,
//                             borderRadius: 3,
//                             backgroundColor: isDark
//                               ? 'rgba(255,255,255,0.1)'
//                               : 'rgba(0,0,0,0.08)',
//                             '& .MuiLinearProgress-bar': {
//                               borderRadius: 3,
//                               background: `linear-gradient(90deg, ${chartColors[index]} 0%, ${chartColors[index + 1] || chartColors[0]} 100%)`,
//                             },
//                           }}
//                         />
//                       </Box>
//                     );
//                   })}
//                 </Stack>
//               ) : (
//                 <Box sx={{ textAlign: 'center', py: 8 }}>
//                   <Typography color="text.secondary">No skills added yet</Typography>
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Recent Users */}
//           <Grid item xs={12} lg={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 sx={{ mb: 2 }}
//               >
//                 <Stack direction="row" alignItems="center" spacing={1.5}>
//                   <Box
//                     sx={{
//                       width: { xs: 36, sm: 40 },
//                       height: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <PeopleIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
//                   </Box>
//                   <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
//                     Recent Users
//                   </Typography>
//                 </Stack>
//                 <Typography variant="caption" color="text.secondary">
//                   Latest 5 users
//                 </Typography>
//               </Stack>

//               {recentUsers.length > 0 ? (
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow
//                         sx={{
//                           backgroundColor: isDark
//                             ? 'rgba(255,255,255,0.05)'
//                             : 'rgba(0,0,0,0.02)',
//                         }}
//                       >
//                         <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                           User
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                           Email
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                           Role
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {recentUsers.map((user) => (
//                         <TableRow
//                           key={user.id}
//                           hover
//                           sx={{
//                             '&:hover': {
//                               backgroundColor: isDark
//                                 ? 'rgba(255,255,255,0.03)'
//                                 : 'rgba(0,0,0,0.02)',
//                             },
//                           }}
//                         >
//                           <TableCell>
//                             <Stack direction="row" alignItems="center" spacing={1.5}>
//                               <Avatar
//                                 src={user.avatarUrl || undefined}
//                                 sx={{
//                                   bgcolor: user.avatarUrl
//                                     ? 'transparent'
//                                     : theme.palette.primary.main,
//                                   color: '#fff',
//                                   width: 32,
//                                   height: 32,
//                                 }}
//                               >
//                                 {!user.avatarUrl &&
//                                   (user.username?.charAt(0).toUpperCase() || 'U')}
//                               </Avatar>
//                               <Typography sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
//                                 {user.username}
//                               </Typography>
//                             </Stack>
//                           </TableCell>
//                           <TableCell sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
//                             {user.email}
//                           </TableCell>
//                           <TableCell>
//                             <Chip
//                               label={user.role}
//                               color={user.role === 'ADMIN' ? 'error' : 'primary'}
//                               size="small"
//                               icon={user.role === 'ADMIN' ? <AdminIcon /> : <PeopleIcon />}
//                               sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : (
//                 <Box sx={{ textAlign: 'center', py: 8 }}>
//                   <Typography color="text.secondary">No users yet</Typography>
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Quick Stats Summary */}
//           <Grid item xs={12} lg={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1.5}
//                 sx={{ mb: 3 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <TrendingUpIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
//                 </Box>
//                 <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
//                   Platform Activity
//                 </Typography>
//               </Stack>

//               <Stack spacing={2.5}>
//                 {/* Admin Users */}
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2.5,
//                     borderRadius: 2,
//                     background: isDark
//                       ? 'rgba(255,255,255,0.05)'
//                       : 'rgba(0,0,0,0.02)',
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" justifyContent="space-between">
//                     <Stack direction="row" alignItems="center" spacing={1.5}>
//                       <AdminIcon sx={{ color: '#ef5350', fontSize: 24 }} />
//                       <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                         Admin Users
//                       </Typography>
//                     </Stack>
//                     <Typography variant="h5" fontWeight={700} color="error.main">
//                       {users.filter(u => u.role === 'ADMIN').length}
//                     </Typography>
//                   </Stack>
//                 </Paper>

//                 {/* Regular Users */}
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2.5,
//                     borderRadius: 2,
//                     background: isDark
//                       ? 'rgba(255,255,255,0.05)'
//                       : 'rgba(0,0,0,0.02)',
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" justifyContent="space-between">
//                     <Stack direction="row" alignItems="center" spacing={1.5}>
//                       <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
//                       <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                         Regular Users
//                       </Typography>
//                     </Stack>
//                     <Typography variant="h5" fontWeight={700} color="primary.main">
//                       {users.filter(u => u.role === 'USER').length}
//                     </Typography>
//                   </Stack>
//                 </Paper>

//                 {/* Pending Requests */}
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2.5,
//                     borderRadius: 2,
//                     background: isDark
//                       ? 'rgba(255,255,255,0.05)'
//                       : 'rgba(0,0,0,0.02)',
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" justifyContent="space-between">
//                     <Stack direction="row" alignItems="center" spacing={1.5}>
//                       <PendingIcon sx={{ color: '#ffa726', fontSize: 24 }} />
//                       <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                         Pending Requests
//                       </Typography>
//                     </Stack>
//                     <Typography variant="h5" fontWeight={700} sx={{ color: '#ffa726' }}>
//                       {matchRequests.filter(r => r.status === 'PENDING').length}
//                     </Typography>
//                   </Stack>
//                 </Paper>

//                 {/* Skill Categories */}
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 2.5,
//                     borderRadius: 2,
//                     background: isDark
//                       ? 'rgba(255,255,255,0.05)'
//                       : 'rgba(0,0,0,0.02)',
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" justifyContent="space-between">
//                     <Stack direction="row" alignItems="center" spacing={1.5}>
//                       <SchoolIcon sx={{ color: '#f093fb', fontSize: 24 }} />
//                       <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                         Skill Categories
//                       </Typography>
//                     </Stack>
//                     <Typography variant="h5" fontWeight={700} sx={{ color: '#f093fb' }}>
//                       {new Set(skills.map(s => s.category)).size}
//                     </Typography>
//                   </Stack>
//                 </Paper>
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }




// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  Stack,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  SwapHoriz as SwapHorizIcon,
  TrendingUp as TrendingUpIcon,
  Dashboard as DashboardIcon,
  EmojiEvents,
  Refresh as RefreshIcon,
  AdminPanelSettings as AdminIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as PendingIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { getAllUsers } from '@/services/admin/adminUserService';
import { getAllSkills } from '@/services/skillService';
import api from '@/config/axios';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // State Management
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // Data States
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [matchRequests, setMatchRequests] = useState([]);
  
  // Computed Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSkills: 0,
    totalSwaps: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [usersRes, skillsRes, matchRequestsRes] = await Promise.all([
        getAllUsers(),
        getAllSkills(),
        api.get('/api/match/admin/all'), // ✅ CHANGED: Now using admin endpoint
      ]);

      const usersData = usersRes.data || [];
      const skillsData = skillsRes || [];
      const matchRequestsData = matchRequestsRes.data?.data || [];

      console.log('📊 Dashboard Data:', {
        users: usersData.length,
        skills: skillsData.length,
        matchRequests: matchRequestsData.length,
        matchRequestsSample: matchRequestsData[0],
      });

      setUsers(usersData);
      setSkills(skillsData);
      setMatchRequests(matchRequestsData);

      // Calculate stats
      const completedSwaps = matchRequestsData.filter(
        req => req.status === 'COMPLETED' // ✅ FIXED: Using exact enum value
      ).length;

      console.log('✅ Completed Swaps:', completedSwaps);

      // Active users = users who have made or received requests
      const activeUserIds = new Set();
      matchRequestsData.forEach(req => {
        activeUserIds.add(req.fromUserId);
        activeUserIds.add(req.toUserId);
      });

      console.log('✅ Active Users:', activeUserIds.size);

      setStats({
        totalUsers: usersData.length,
        totalSkills: skillsData.length,
        totalSwaps: completedSwaps,
        activeUsers: activeUserIds.size,
      });

    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
      console.error('❌ Error details:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
    toast.success('Dashboard refreshed');
  };

  // Calculate top skills by counting user skills
  const getTopSkills = () => {
    // Group skills by category
    const categoryCount = {};
    skills.forEach(skill => {
      const category = skill.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Convert to array and sort
    return Object.entries(categoryCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Calculate match request distribution
  const getMatchRequestStats = () => {
    const statusCount = {
      PENDING: 0,
      ACCEPTED: 0,
      COMPLETION_REQUESTED: 0,
      COMPLETED: 0,
      DECLINED: 0,
    };

    matchRequests.forEach(req => {
      if (statusCount.hasOwnProperty(req.status)) {
        statusCount[req.status]++;
      }
    });

    console.log('📈 Match Request Stats:', statusCount);

    return [
      { name: 'Pending', value: statusCount.PENDING, color: '#ffa726' },
      { name: 'Accepted', value: statusCount.ACCEPTED, color: '#42a5f5' },
      { name: 'In Progress', value: statusCount.COMPLETION_REQUESTED, color: '#ab47bc' },
      { name: 'Completed', value: statusCount.COMPLETED, color: '#66bb6a' },
      { name: 'Declined', value: statusCount.DECLINED, color: '#ef5350' },
    ].filter(stat => stat.value > 0); // Only show statuses that have data
  };

  // Chart colors
  const chartColors = [
    '#667eea', '#f093fb', '#4facfe', '#fa709a', '#667eea',
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
          py: 6,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          <Alert
            severity="error"
            action={
              <IconButton color="inherit" size="small" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Total Skills',
      value: stats.totalSkills,
      icon: <SchoolIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Total Swaps',
      value: stats.totalSwaps,
      icon: <SwapHorizIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <TrendingUpIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
  ];

  const topSkills = getTopSkills();
  const matchRequestStats = getMatchRequestStats();
  const recentUsers = users.slice(0, 5);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        py: 6,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark
              ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: { xs: '200px', sm: '300px' },
              height: { xs: '200px', sm: '300px' },
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 1, sm: 1.5 }}
                sx={{ mb: { xs: 0.5, sm: 1 } }}
              >
                <DashboardIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}
                >
                  Admin Dashboard
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                Monitor platform statistics and activity
              </Typography>
            </Box>
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  transform: 'rotate(180deg)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Stack>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 }}}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: { xs: 2, md: 3 },
                  background: isDark ? '#1e1e2e' : '#ffffff',
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark
                      ? '0 12px 24px rgba(0,0,0,0.4)'
                      : '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
                      >
                        {stat.value.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ml:1.5,
                        width: { xs: 44, sm: 50 },
                        height: { xs: 44, sm: 50 },
                        borderRadius: 2,
                        background: stat.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {/* Match Requests Distribution */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                width: 400,
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                height: '100%',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SwapHorizIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
                    Match Requests Status
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Current distribution of all match requests
                  </Typography>
                </Box>
              </Stack>

              {matchRequests.length > 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280 }}>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={matchRequestStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {matchRequestStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? '#1e1e2e' : '#ffffff',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography color="text.secondary">No match requests yet</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

                    {/* Quick Stats Summary */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUpIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
                  Platform Activity
                </Typography>
              </Stack>

              <Stack spacing={2.5}>
                {/* Admin Users */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <AdminIcon sx={{ color: '#ef5350', fontSize: 24 }} />
                      <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        Admin Users
                      </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={700} color="error.main">
                      {users.filter(u => u.role === 'ADMIN').length}
                    </Typography>
                  </Stack>
                </Paper>

                {/* Regular Users */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
                      <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        Regular Users
                      </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {users.filter(u => u.role === 'USER').length}
                    </Typography>
                  </Stack>
                </Paper>

                {/* Pending Requests */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <PendingIcon sx={{ color: '#ffa726', fontSize: 24 }} />
                      <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        Pending Requests
                      </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#ffa726', ml:4 }}>
                      {matchRequests.filter(r => r.status === 'PENDING').length}
                    </Typography>
                  </Stack>
                </Paper>

                {/* Skill Categories */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <SchoolIcon sx={{ color: '#f093fb', fontSize: 24 }} />
                      <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        Skill Categories
                      </Typography>
                    </Stack>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#f093fb' }}>
                      {new Set(skills.map(s => s.category)).size}
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>
            </Paper>
          </Grid>

          {/* Checkpoint 1 */}

          {/* Recent Users */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PeopleIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
                    Recent Users
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Latest 5 users
                </Typography>
              </Stack>

              {recentUsers.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: isDark
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.02)',
                        }}
                      >
                        <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          User
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          Email
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          Role
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          hover
                          sx={{
                            '&:hover': {
                              backgroundColor: isDark
                                ? 'rgba(255,255,255,0.03)'
                                : 'rgba(0,0,0,0.02)',
                            },
                          }}
                        >
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                              <Avatar
                                src={user.avatarUrl || undefined}
                                sx={{
                                  bgcolor: user.avatarUrl
                                    ? 'transparent'
                                    : theme.palette.primary.main,
                                  color: '#fff',
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                {!user.avatarUrl &&
                                  (user.username?.charAt(0).toUpperCase() || 'U')}
                              </Avatar>
                              <Typography sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                                {user.username}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.role}
                              color={user.role === 'ADMIN' ? 'error' : 'primary'}
                              size="small"
                              icon={user.role === 'ADMIN' ? <AdminIcon /> : <PeopleIcon />}
                              sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography color="text.secondary">No users yet</Typography>
                </Box>
              )}
            </Paper>
          </Grid>
          
          {/* Top Skill Categories */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                height: '100%',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmojiEvents sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
                    Top Skill Categories
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Most popular skill categories
                  </Typography>
                </Box>
              </Stack>

              {topSkills.length > 0 ? (
                <Stack spacing={2.5}>
                  {topSkills.map((skill, index) => {
                    const maxCount = topSkills[0]?.count || 1;
                    const percentage = (skill.count / maxCount) * 100;
                    
                    return (
                      <Box key={index}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 1 }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${chartColors[index]} 0%, ${chartColors[index + 1] || chartColors[0]} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                              }}
                            >
                              {index + 1}
                            </Box>
                            <Typography fontWeight={600} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                              {skill.name}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={600}
                            sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                          >
                            {skill.count} skills
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: isDark
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(0,0,0,0.08)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: `linear-gradient(90deg, ${chartColors[index]} 0%, ${chartColors[index + 1] || chartColors[0]} 100%)`,
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography color="text.secondary">No skills added yet</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

{/* Checkpoint 2 */}
        </Grid>
      </Box>
    </Box>
  );
}