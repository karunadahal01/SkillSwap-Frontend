// // src/pages/user/UserProfile.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Grid,
//   Chip,
//   Stack,
//   Button,
//   Divider,
//   useTheme,
//   CircularProgress,
//   Card,
//   CardContent,
//   LinearProgress,
// } from "@mui/material";
// import {
//   Email,
//   Person,
//   School,
//   EmojiEvents,
//   TrendingUp,
//   Edit,
// } from "@mui/icons-material";
// import { useAuth } from "@context/AuthContext";
// import { getProfile } from "@services/profileService";
// import { getAllUserSkills } from "@services/userSkillService";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const LEVEL_COLORS = {
//   BEGINNER: "info",
//   INTERMEDIATE: "warning",
//   ADVANCED: "success",
// };

// const LEVEL_PROGRESS = {
//   BEGINNER: 33,
//   INTERMEDIATE: 66,
//   ADVANCED: 100,
// };

// export default function UserProfile() {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const isDark = theme.palette.mode === 'dark';

//   const [profile, setProfile] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     try {
//       const [profileRes, skillsRes] = await Promise.all([
//         getProfile(),
//         getAllUserSkills(user.id),
//       ]);
      
//       setProfile(profileRes.data.data);
//       setSkills(skillsRes);
//     } catch (err) {
//       console.error("Failed to fetch profile data:", err);
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   if (!profile) {
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
//         <Typography variant="h6" color="text.secondary">
//           Profile not found
//         </Typography>
//       </Box>
//     );
//   }

//   const offerSkills = skills.filter(s => s.type === 'OFFER');
//   const learnSkills = skills.filter(s => s.type === 'LEARN');

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: isDark
//           ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
//           : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
//         py: 4,
//         px: 2,
//       }}
//     >
//       <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//         {/* Profile Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 4,
//             mb: 4,
//             borderRadius: 3,
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
//               width: '400px',
//               height: '400px',
//               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
//               borderRadius: '50%',
//               transform: 'translate(30%, -30%)',
//             },
//           }}
//         >
//           <Stack
//             direction={{ xs: 'column', md: 'row' }}
//             spacing={3}
//             alignItems={{ xs: 'center', md: 'flex-start' }}
//             sx={{ position: 'relative', zIndex: 1 }}
//           >
//             {/* Avatar */}
//             <Avatar
//               src={profile.avatarUrl}
//               alt={profile.fullName}
//               sx={{
//                 width: { xs: 120, md: 150 },
//                 height: { xs: 120, md: 150 },
//                 border: '5px solid rgba(255,255,255,0.3)',
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//                 fontSize: '3rem',
//                 fontWeight: 700,
//                 background: !profile.avatarUrl
//                   ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//                   : 'transparent',
//               }}
//             >
//               {profile.fullName?.charAt(0)}
//             </Avatar>

//             {/* Info */}
//             <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
//               <Typography variant="h3" fontWeight={800} gutterBottom>
//                 {profile.fullName || 'User'}
//               </Typography>
//               <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
//                 @{profile.username}
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.85, mb: 3, maxWidth: 600 }}>
//                 {profile.bio || 'No bio available'}
//               </Typography>
//               <Stack
//                 direction={{ xs: 'column', sm: 'row' }}
//                 spacing={2}
//                 justifyContent={{ xs: 'center', md: 'flex-start' }}
//               >
//                 <Button
//                   variant="contained"
//                   startIcon={<Edit />}
//                   onClick={() => navigate('/user/settings')}
//                   sx={{
//                     bgcolor: 'rgba(255,255,255,0.2)',
//                     color: 'white',
//                     border: '2px solid rgba(255,255,255,0.3)',
//                     '&:hover': {
//                       bgcolor: 'rgba(255,255,255,0.3)',
//                     },
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     px: 3,
//                   }}
//                 >
//                   Edit Profile
//                 </Button>
//               </Stack>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: 3,
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: 3 }}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Box
//                     sx={{
//                       width: 56,
//                       height: 56,
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <School sx={{ fontSize: 28, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="h4" fontWeight={700}>
//                       {skills.length}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Total Skills
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: 3,
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: 3 }}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Box
//                     sx={{
//                       width: 56,
//                       height: 56,
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <TrendingUp sx={{ fontSize: 28, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="h4" fontWeight={700}>
//                       {offerSkills.length}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Skills to Offer
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Grid container spacing={3}>
//           {/* Contact Information */}
//           <Grid item xs={12} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} gutterBottom>
//                 Contact Information
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Stack spacing={2.5}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Person sx={{ color: 'primary.main' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Username
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600}>
//                       {profile.username}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Email sx={{ color: 'primary.main' }} />
//                   </Box>
//                   <Box sx={{ flex: 1, minWidth: 0 }}>
//                     <Typography variant="caption" color="text.secondary">
//                       Email
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600} noWrap>
//                       {profile.email}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Paper>
//           </Grid>

//           {/* Skills Section */}
//           <Grid item xs={12} md={8}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//                 <Typography variant="h6" fontWeight={700}>
//                   My Skills
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={() => navigate('/user/listings')}
//                   sx={{
//                     borderRadius: 2,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     marginLeft: 4,
//                   }}
//                 >
//                   Manage Skills
//                 </Button>
//               </Stack>
//               <Divider sx={{ mb: 3 }} />

//               {skills.length === 0 ? (
//                 <Box sx={{ textAlign: 'center', py: 4 }}>
//                   <School sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//                   <Typography variant="body1" color="text.secondary">
//                     No skills added yet
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Grid container spacing={2}>
//                   {skills.map((skill) => (
//                     <Grid item xs={12} sm={6} key={skill.userSkillId}>
//                       <Paper
//                         elevation={0}
//                         sx={{
//                           p: 2.5,
//                           borderRadius: 2,
//                           background: isDark
//                             ? 'rgba(255,255,255,0.05)'
//                             : 'rgba(0,0,0,0.02)',
//                           border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
//                         }}
//                       >
//                         <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
//                           <Typography variant="body1" fontWeight={700}>
//                             {skill.skillName}
//                           </Typography>
//                           <Chip
//                             label={skill.type}
//                             size="small"
//                             color={skill.type === 'OFFER' ? 'success' : 'primary'}
//                             sx={{ fontWeight: 600, fontSize: '0.7rem', marginLeft: 4, }}
//                           />
//                         </Stack>
//                         <Chip
//                           label={skill.level}
//                           size="small"
//                           color={LEVEL_COLORS[skill.level]}
//                           sx={{ mb: 1.5, fontWeight: 600 }}
//                         />
//                         <LinearProgress
//                           variant="determinate"
//                           value={LEVEL_PROGRESS[skill.level]}
//                           sx={{
//                             height: 6,
//                             borderRadius: 3,
//                             backgroundColor: isDark
//                               ? 'rgba(255,255,255,0.1)'
//                               : 'rgba(0,0,0,0.1)',
//                           }}
//                         />
//                       </Paper>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }




// // src/pages/user/UserProfile.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Grid,
//   Chip,
//   Stack,
//   Button,
//   Divider,
//   useTheme,
//   CircularProgress,
//   Card,
//   CardContent,
//   LinearProgress,
// } from "@mui/material";
// import {
//   Email,
//   Person,
//   School,
//   EmojiEvents,
//   TrendingUp,
//   Edit,
// } from "@mui/icons-material";
// import { useAuth } from "@context/AuthContext";
// import { getProfile } from "@services/profileService";
// import { getAllUserSkills } from "@services/userSkillService";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const LEVEL_COLORS = {
//   BEGINNER: "info",
//   INTERMEDIATE: "warning",
//   ADVANCED: "success",
// };

// const LEVEL_PROGRESS = {
//   BEGINNER: 33,
//   INTERMEDIATE: 66,
//   ADVANCED: 100,
// };

// export default function AdminProfile() {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const isDark = theme.palette.mode === 'dark';

//   const [profile, setProfile] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     try {
//       const [profileRes, skillsRes] = await Promise.all([
//         getProfile(),
//         getAllUserSkills(user.id),
//       ]);
      
//       setProfile(profileRes.data.data);
//       setSkills(skillsRes);
//     } catch (err) {
//       console.error("Failed to fetch profile data:", err);
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   if (!profile) {
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
//         <Typography variant="h6" color="text.secondary">
//           Profile not found
//         </Typography>
//       </Box>
//     );
//   }

//   const offerSkills = skills.filter(s => s.type === 'OFFER');
//   const learnSkills = skills.filter(s => s.type === 'LEARN');

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
//       <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//         {/* Profile Header */}
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
//               width: { xs: '250px', sm: '350px', md: '400px' },
//               height: { xs: '250px', sm: '350px', md: '400px' },
//               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
//               borderRadius: '50%',
//               transform: 'translate(30%, -30%)',
//             },
//           }}
//         >
//           <Stack
//             direction={{ xs: 'column', md: 'row' }}
//             spacing={{ xs: 2, sm: 2.5, md: 3 }}
//             alignItems={{ xs: 'center', md: 'flex-start' }}
//             sx={{ position: 'relative', zIndex: 1 }}
//           >
//             {/* Avatar */}
//             <Avatar
//               src={profile.avatarUrl}
//               alt={profile.fullName}
//               sx={{
//                 width: { xs: 100, sm: 120, md: 150 },
//                 height: { xs: 100, sm: 120, md: 150 },
//                 border: { xs: '4px solid rgba(255,255,255,0.3)', md: '5px solid rgba(255,255,255,0.3)' },
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//                 fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//                 fontWeight: 700,
//                 background: !profile.avatarUrl
//                   ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//                   : 'transparent',
//               }}
//             >
//               {profile.fullName?.charAt(0)}
//             </Avatar>

//             {/* Info */}
//             <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
//               <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" } }}>
//                 {profile.fullName || 'User'}
//               </Typography>
//               <Typography variant="h6" sx={{ opacity: 0.9, mb: { xs: 1.5, sm: 2 }, fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
//                 @{profile.username}
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.85, mb: { xs: 2, sm: 2.5, md: 3 }, maxWidth: 600, fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" } }}>
//                 {profile.bio || 'No bio available'}
//               </Typography>
//               <Stack
//                 direction={{ xs: 'column', sm: 'row' }}
//                 spacing={2}
//                 justifyContent={{ xs: 'center', md: 'flex-start' }}
//               >
//                 <Button
//                   variant="contained"
//                   startIcon={<Edit />}
//                   onClick={() => navigate('/user/settings')}
//                   sx={{
//                     bgcolor: 'rgba(255,255,255,0.2)',
//                     color: 'white',
//                     border: '2px solid rgba(255,255,255,0.3)',
//                     '&:hover': {
//                       bgcolor: 'rgba(255,255,255,0.3)',
//                     },
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     px: { xs: 2.5, sm: 3 },
//                     py: { xs: 1, sm: 1.2 },
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                   }}
//                 >
//                   Edit Profile
//                 </Button>
//               </Stack>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* Stats Cards */}
//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                 <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                   <Box
//                     sx={{
//                       width: { xs: 48, sm: 56 },
//                       height: { xs: 48, sm: 56 },
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <School sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}>
//                       {skills.length}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
//                       Total Skills
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                 <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                   <Box
//                     sx={{
//                       width: { xs: 48, sm: 56 },
//                       height: { xs: 48, sm: 56 },
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <TrendingUp sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}>
//                       {offerSkills.length}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
//                       Skills to Offer
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//           {/* Contact Information */}
//           <Grid item xs={12} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//                 Contact Information
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Stack spacing={2.5}>
//                 <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
//                   <Box
//                     sx={{
//                       width: { xs: 36, sm: 40 },
//                       height: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Person sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
//                       Username
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                       {profile.username}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
//                   <Box
//                     sx={{
//                       width: { xs: 36, sm: 40 },
//                       height: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Email sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
//                   </Box>
//                   <Box sx={{ flex: 1, minWidth: 0 }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
//                       Email
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600} noWrap sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                       {profile.email}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Paper>
//           </Grid>

//           {/* Skills Section */}
//           <Grid item xs={12} md={8}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 2 }} spacing={{ xs: 1.5, sm: 0 }}>
//                 <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//                   My Skills
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={() => navigate('/user/listings')}
//                   sx={{
//                     borderRadius: 2,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     fontSize: { xs: "0.75rem", sm: "0.8125rem" },
//                     alignSelf: { xs: 'stretch', sm: 'auto' },
//                   }}
//                 >
//                   Manage Skills
//                 </Button>
//               </Stack>
//               <Divider sx={{ mb: 3 }} />

//               {skills.length === 0 ? (
//                 <Box sx={{ textAlign: 'center', py: 4 }}>
//                   <School sx={{ fontSize: { xs: 40, sm: 48 }, color: 'text.disabled', mb: 2 }} />
//                   <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                     No skills added yet
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//                   {skills.map((skill) => (
//                     <Grid item xs={12} sm={6} key={skill.userSkillId}>
//                       <Paper
//                         elevation={0}
//                         sx={{
//                           p: { xs: 2, sm: 2.5 },
//                           borderRadius: 2,
//                           background: isDark
//                             ? 'rgba(255,255,255,0.05)'
//                             : 'rgba(0,0,0,0.02)',
//                           border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
//                         }}
//                       >
//                         <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
//                           <Typography variant="body1" fontWeight={700} sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
//                             {skill.skillName}
//                           </Typography>
//                           <Chip
//                             label={skill.type}
//                             size="small"
//                             color={skill.type === 'OFFER' ? 'success' : 'primary'}
//                             sx={{ fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.7rem" }, ml: 1 }}
//                           />
//                         </Stack>
//                         <Chip
//                           label={skill.level}
//                           size="small"
//                           color={LEVEL_COLORS[skill.level]}
//                           sx={{ mb: 1.5, fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
//                         />
//                         <LinearProgress
//                           variant="determinate"
//                           value={LEVEL_PROGRESS[skill.level]}
//                           sx={{
//                             height: { xs: 5, sm: 6 },
//                             borderRadius: 3,
//                             backgroundColor: isDark
//                               ? 'rgba(255,255,255,0.1)'
//                               : 'rgba(0,0,0,0.1)',
//                           }}
//                         />
//                       </Paper>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }






// // src/pages/admin/AdminProfile.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Grid,
//   Chip,
//   Stack,
//   Button,
//   Divider,
//   useTheme,
//   CircularProgress,
//   Card,
//   CardContent,
// } from "@mui/material";
// import {
//   Email,
//   Person,
//   AdminPanelSettings,
//   Dashboard,
//   Security,
//   Edit,
//   ManageAccounts,
// } from "@mui/icons-material";
// import { useAuth } from "@context/AuthContext";
// import { getProfile } from "@services/profileService";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function AdminProfile() {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const isDark = theme.palette.mode === 'dark';

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     try {
//       const profileRes = await getProfile();
//       setProfile(profileRes.data.data);
//     } catch (err) {
//       console.error("Failed to fetch profile data:", err);
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   if (!profile) {
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
//         <Typography variant="h6" color="text.secondary">
//           Profile not found
//         </Typography>
//       </Box>
//     );
//   }

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
//       <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//         {/* Admin Profile Header */}
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
//               width: { xs: '250px', sm: '350px', md: '400px' },
//               height: { xs: '250px', sm: '350px', md: '400px' },
//               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
//               borderRadius: '50%',
//               transform: 'translate(30%, -30%)',
//             },
//           }}
//         >
//           <Stack
//             direction={{ xs: 'column', md: 'row' }}
//             spacing={{ xs: 2, sm: 2.5, md: 3 }}
//             alignItems={{ xs: 'center', md: 'flex-start' }}
//             sx={{ position: 'relative', zIndex: 1 }}
//           >
//             {/* Admin Avatar - No Badge */}
//             <Avatar
//               src={profile.avatarUrl}
//               alt={profile.fullName}
//               sx={{
//                 width: { xs: 100, sm: 120, md: 150 },
//                 height: { xs: 100, sm: 120, md: 150 },
//                 border: { xs: '4px solid rgba(255,255,255,0.3)', md: '5px solid rgba(255,255,255,0.3)' },
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
//                 fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//                 fontWeight: 700,
//                 background: !profile.avatarUrl
//                   ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//                   : 'transparent',
//               }}
//             >
//               {profile.fullName?.charAt(0)}
//             </Avatar>

//             {/* Admin Info */}
//             <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
//               <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" } }}>
//                 {profile.fullName || 'Administrator'}
//               </Typography>
//               <Typography variant="h6" sx={{ opacity: 0.9, mb: { xs: 1.5, sm: 2 }, fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
//                 @{profile.username}
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.85, mb: { xs: 2, sm: 2.5, md: 3 }, maxWidth: 600, fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" } }}>
//                 {profile.bio || 'System Administrator - Full access to platform management and user administration'}
//               </Typography>
//               <Stack
//                 direction={{ xs: 'column', sm: 'row' }}
//                 spacing={2}
//                 justifyContent={{ xs: 'center', md: 'flex-start' }}
//               >
//                 <Button
//                   variant="contained"
//                   startIcon={<Edit />}
//                   onClick={() => navigate('/admin/settings')}
//                   sx={{
//                     bgcolor: 'rgba(255,255,255,0.2)',
//                     color: 'white',
//                     border: '2px solid rgba(255,255,255,0.3)',
//                     '&:hover': {
//                       bgcolor: 'rgba(255,255,255,0.3)',
//                     },
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     px: { xs: 2.5, sm: 3 },
//                     py: { xs: 1, sm: 1.2 },
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                   }}
//                 >
//                   Edit Profile
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<Dashboard />}
//                   onClick={() => navigate('/admin')}
//                   sx={{
//                     color: 'white',
//                     borderColor: 'rgba(255,255,255,0.5)',
//                     '&:hover': {
//                       borderColor: 'white',
//                       bgcolor: 'rgba(255,255,255,0.1)',
//                     },
//                     borderRadius: 2,
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     px: { xs: 2.5, sm: 3 },
//                     py: { xs: 1, sm: 1.2 },
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                   }}
//                 >
//                   Admin Dashboard
//                 </Button>
//               </Stack>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* Admin Stats Cards */}
//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                 <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                   <Box
//                     sx={{
//                       width: { xs: 48, sm: 56 },
//                       height: { xs: 48, sm: 56 },
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <AdminPanelSettings sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
//                       Role
//                     </Typography>
//                     <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
//                       Administrator
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                 <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                   <Box
//                     sx={{
//                       width: { xs: 48, sm: 56 },
//                       height: { xs: 48, sm: 56 },
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Security sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
//                       Access Level
//                     </Typography>
//                     <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
//                       Full Access
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: isDark
//                     ? '0 12px 24px rgba(0,0,0,0.4)'
//                     : '0 12px 24px rgba(0,0,0,0.08)',
//                 },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                 <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                   <Box
//                     sx={{
//                       width: { xs: 48, sm: 56 },
//                       height: { xs: 48, sm: 56 },
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <ManageAccounts sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
//                       Permissions
//                     </Typography>
//                     <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
//                       All Systems
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//           {/* Admin Contact Information */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//                 Administrator Information
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Stack spacing={2.5}>
//                 <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
//                   <Box
//                     sx={{
//                       width: { xs: 36, sm: 40 },
//                       height: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Person sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
//                       Username
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                       {profile.username}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
//                   <Box
//                     sx={{
//                       width: { xs: 36, sm: 40 },
//                       height: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Email sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
//                   </Box>
//                   <Box sx={{ flex: 1, minWidth: 0 }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
//                       Email
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600} noWrap sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                       {profile.email}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
//                   <Box
//                     sx={{
//                       width: { xs: 36, sm: 40 },
//                       height: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       background: isDark
//                         ? 'rgba(102, 126, 234, 0.15)'
//                         : 'rgba(102, 126, 234, 0.1)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <AdminPanelSettings sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
//                       Role
//                     </Typography>
//                     <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                       Admin
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Paper>
//           </Grid>

//           {/* Admin Capabilities */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? '#1e1e2e' : '#ffffff',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//                 Administrator Capabilities
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Stack spacing={1.5}>
//                 <Chip
//                   icon={<AdminPanelSettings />}
//                   label="Full User Management Access"
//                   sx={{
//                     justifyContent: 'flex-start',
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                     py: 2.5,
//                     bgcolor: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
//                     color: 'primary.main',
//                     border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
//                     '& .MuiChip-icon': { color: 'primary.main' },
//                   }}
//                 />
//                 <Chip
//                   icon={<Security />}
//                   label="System Configuration & Security"
//                   sx={{
//                     justifyContent: 'flex-start',
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                     py: 2.5,
//                     bgcolor: isDark ? 'rgba(245, 87, 108, 0.1)' : 'rgba(245, 87, 108, 0.05)',
//                     color: '#f5576c',
//                     border: `1px solid ${isDark ? 'rgba(245, 87, 108, 0.2)' : 'rgba(245, 87, 108, 0.15)'}`,
//                     '& .MuiChip-icon': { color: '#f5576c' },
//                   }}
//                 />
//                 <Chip
//                   icon={<Dashboard />}
//                   label="Platform Analytics & Reporting"
//                   sx={{
//                     justifyContent: 'flex-start',
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                     py: 2.5,
//                     bgcolor: isDark ? 'rgba(79, 172, 254, 0.1)' : 'rgba(79, 172, 254, 0.05)',
//                     color: '#4facfe',
//                     border: `1px solid ${isDark ? 'rgba(79, 172, 254, 0.2)' : 'rgba(79, 172, 254, 0.15)'}`,
//                     '& .MuiChip-icon': { color: '#4facfe' },
//                   }}
//                 />
//                 <Chip
//                   icon={<ManageAccounts />}
//                   label="Content Moderation & Management"
//                   sx={{
//                     justifyContent: 'flex-start',
//                     fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                     py: 2.5,
//                     bgcolor: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
//                     color: '#a855f7',
//                     border: `1px solid ${isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)'}`,
//                     '& .MuiChip-icon': { color: '#a855f7' },
//                   }}
//                 />
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }




// src/pages/admin/AdminProfile.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Chip,
  Stack,
  Button,
  Divider,
  useTheme,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  Email,
  Person,
  AdminPanelSettings,
  Dashboard,
  Security,
  Edit,
  ManageAccounts,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useAuth } from "@context/AuthContext";
import { getProfile } from "@services/profileService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === 'dark';

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const profileRes = await getProfile();
      setProfile(profileRes.data.data);
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProfileData();
    setRefreshing(false);
    toast.success('Profile refreshed');
  };

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

  if (!profile) {
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
        <Typography variant="h6" color="text.secondary">
          Profile not found
        </Typography>
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
        py: 6,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Admin Profile Header */}
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
              width: { xs: '250px', sm: '350px', md: '400px' },
              height: { xs: '250px', sm: '350px', md: '400px' },
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
            },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, sm: 2.5, md: 3 }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            {/* Admin Avatar - No Badge */}
            <Avatar
              src={profile.avatarUrl}
              alt={profile.fullName}
              sx={{
                width: { xs: 100, sm: 120, md: 150 },
                height: { xs: 100, sm: 120, md: 150 },
                border: { xs: '4px solid rgba(255,255,255,0.3)', md: '5px solid rgba(255,255,255,0.3)' },
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                background: !profile.avatarUrl
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'transparent',
              }}
            >
              {profile.fullName?.charAt(0)}
            </Avatar>

            {/* Admin Info */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" } }}>
                {profile.fullName || 'Administrator'}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: { xs: 1.5, sm: 2 }, fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                @{profile.username}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.85, mb: { xs: 2, sm: 2.5, md: 3 }, maxWidth: 600, fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" } }}>
                {profile.bio || 'System Administrator - Full access to platform management and user administration'}
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => navigate('/admin/settings')}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    px: { xs: 2.5, sm: 3 },
                    py: { xs: 1, sm: 1.2 },
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Dashboard />}
                  onClick={() => navigate('/admin')}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    px: { xs: 2.5, sm: 3 },
                    py: { xs: 1, sm: 1.2 },
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  }}
                >
                  Admin Dashboard
                </Button>
              </Stack>
            </Box>

            {/* Refresh Button */}
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                position: { xs: 'static', md: 'absolute' },
                top: { md: 20 },
                right: { md: 20 },
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

        {/* Admin Stats Cards */}
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: isDark
                    ? '0 12px 24px rgba(0,0,0,0.4)'
                    : '0 12px 24px rgba(0,0,0,0.08)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AdminPanelSettings sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Role
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      Administrator
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: isDark
                    ? '0 12px 24px rgba(0,0,0,0.4)'
                    : '0 12px 24px rgba(0,0,0,0.08)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Security sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Access Level
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      Full Access
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: isDark
                    ? '0 12px 24px rgba(0,0,0,0.4)'
                    : '0 12px 24px rgba(0,0,0,0.08)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ManageAccounts sx={{ fontSize: { xs: 24, sm: 28 }, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Permissions
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      All Systems
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {/* Admin Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
                Administrator Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
                  <Box
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      borderRadius: 2,
                      background: isDark
                        ? 'rgba(102, 126, 234, 0.15)'
                        : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Person sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                      Username
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                      {profile.username}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
                  <Box
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      borderRadius: 2,
                      background: isDark
                        ? 'rgba(102, 126, 234, 0.15)'
                        : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Email sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={600} noWrap sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                      {profile.email}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
                  <Box
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      borderRadius: 2,
                      background: isDark
                        ? 'rgba(102, 126, 234, 0.15)'
                        : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AdminPanelSettings sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                      Role
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                      Admin
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Admin Capabilities */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? '#1e1e2e' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
                Administrator Capabilities
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1.5}>
                <Chip
                  icon={<AdminPanelSettings />}
                  label="Full User Management Access"
                  sx={{
                    justifyContent: 'flex-start',
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    py: 2.5,
                    bgcolor: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
                    color: 'primary.main',
                    border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
                    '& .MuiChip-icon': { color: 'primary.main' },
                  }}
                />
                <Chip
                  icon={<Security />}
                  label="System Configuration & Security"
                  sx={{
                    justifyContent: 'flex-start',
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    py: 2.5,
                    bgcolor: isDark ? 'rgba(245, 87, 108, 0.1)' : 'rgba(245, 87, 108, 0.05)',
                    color: '#f5576c',
                    border: `1px solid ${isDark ? 'rgba(245, 87, 108, 0.2)' : 'rgba(245, 87, 108, 0.15)'}`,
                    '& .MuiChip-icon': { color: '#f5576c' },
                  }}
                />
                <Chip
                  icon={<Dashboard />}
                  label="Platform Analytics & Reporting"
                  sx={{
                    justifyContent: 'flex-start',
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    py: 2.5,
                    bgcolor: isDark ? 'rgba(79, 172, 254, 0.1)' : 'rgba(79, 172, 254, 0.05)',
                    color: '#4facfe',
                    border: `1px solid ${isDark ? 'rgba(79, 172, 254, 0.2)' : 'rgba(79, 172, 254, 0.15)'}`,
                    '& .MuiChip-icon': { color: '#4facfe' },
                  }}
                />
                <Chip
                  icon={<ManageAccounts />}
                  label="Content Moderation & Management"
                  sx={{
                    justifyContent: 'flex-start',
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    py: 2.5,
                    bgcolor: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
                    color: '#a855f7',
                    border: `1px solid ${isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)'}`,
                    '& .MuiChip-icon': { color: '#a855f7' },
                  }}
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}