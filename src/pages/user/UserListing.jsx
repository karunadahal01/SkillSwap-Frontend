// // src/pages/user/UserListing.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   CircularProgress,
//   Grid,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   IconButton,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Alert,
//   useTheme,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   School as SchoolIcon,
//   AssessmentOutlined as AssessmentIcon,
//   EmojiEvents,
//   TrendingUp,
// } from "@mui/icons-material";
// import { useAuth } from "@context/AuthContext";
// import {
//   getAllUserSkills,
//   removeUserSkill,
//   updateUserSkillLevel,
// } from "@services/userSkillService";
// import AddSkillAssessment from "@components/user/AddSkillAssessment";
// import toast from "react-hot-toast";

// const SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

// const LEVEL_COLORS = {
//   BEGINNER: "info",
//   INTERMEDIATE: "warning",
//   ADVANCED: "success",
// };

// const LEVEL_DESCRIPTIONS = {
//   BEGINNER: "Just starting out",
//   INTERMEDIATE: "Comfortable with basics",
//   ADVANCED: "Proficient and experienced",
// };

// const TYPE_COLORS = {
//   OFFER: "success",
//   LEARN: "primary",
// };

// export default function UserListing() {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';
  
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openAssessmentDialog, setOpenAssessmentDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [editLevel, setEditLevel] = useState("");

//   const fetchUserSkills = async () => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       const res = await getAllUserSkills(user.id);
//       setSkills(res);
//     } catch (err) {
//       console.error("Failed to fetch user skills:", err);
//       toast.error("Failed to load your skills");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserSkills();
//   }, [user]);

//   const handleUpdateLevel = async () => {
//     if (!selectedSkill) return;

//     try {
//       await updateUserSkillLevel(user.id, {
//         userSkillId: selectedSkill.userSkillId,
//         level: editLevel,
//       });
//       toast.success("Skill level updated successfully!");
//       setOpenEditDialog(false);
//       setSelectedSkill(null);
//       fetchUserSkills();
//     } catch (err) {
//       console.error("Failed to update skill level:", err);
//       toast.error(err.response?.data?.message || "Failed to update skill level");
//     }
//   };

//   const handleDeleteSkill = async () => {
//     if (!selectedSkill) return;

//     try {
//       await removeUserSkill(user.id, {
//         skillId: selectedSkill.skillId,
//         type: selectedSkill.type,
//       });
//       toast.success("Skill removed successfully!");
//       setOpenDeleteDialog(false);
//       setSelectedSkill(null);
//       fetchUserSkills();
//     } catch (err) {
//       console.error("Failed to remove skill:", err);
//       toast.error(err.response?.data?.message || "Failed to remove skill");
//     }
//   };

//   const openEdit = (skill) => {
//     setSelectedSkill(skill);
//     setEditLevel(skill.level);
//     setOpenEditDialog(true);
//   };

//   const openDelete = (skill) => {
//     setSelectedSkill(skill);
//     setOpenDeleteDialog(true);
//   };

//   if (!user) {
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
//         <Paper
//           elevation={0}
//           sx={{
//             p: 6,
//             textAlign: 'center',
//             borderRadius: 3,
//             background: isDark ? '#1e1e2e' : '#ffffff',
//             border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//           }}
//         >
//           <Typography variant="h6" color="text.secondary">
//             Please login to view your skills.
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

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

//   const userSkillIds = skills.map(s => s.skillId);
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
//         px: 2,
//       }}
//     >
//       <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
//         {/* Header */}
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
//               width: '300px',
//               height: '300px',
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '50%',
//               transform: 'translate(30%, -30%)',
//             },
//           }}
//         >
//           <Stack
//             direction={{ xs: 'column', sm: 'row' }}
//             justifyContent="space-between"
//             alignItems={{ xs: 'flex-start', sm: 'center' }}
//             spacing={2}
//             sx={{ position: 'relative', zIndex: 1 }}
//           >
//             <Box>
//               <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
//                 <EmojiEvents sx={{ fontSize: 32 }} />
//                 <Typography variant="h4" fontWeight={700}>
//                   My Skill Listings
//                 </Typography>
//               </Stack>
//               <Typography variant="body1" sx={{ opacity: 0.9 }}>
//                 Manage your offered skills and proficiency levels
//               </Typography>
//             </Box>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => setOpenAssessmentDialog(true)}
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 borderRadius: 2,
//                 fontWeight: 600,
//                 bgcolor: 'rgba(255,255,255,0.2)',
//                 color: 'white',
//                 border: '2px solid rgba(255,255,255,0.3)',
//                 '&:hover': {
//                   bgcolor: 'rgba(255,255,255,0.3)',
//                   border: '2px solid rgba(255,255,255,0.5)',
//                 },
//                 textTransform: 'none',
//               }}
//             >
//               Add Skill
//             </Button>
//           </Stack>
//         </Paper>

//         {/* Stats Cards */}
//         {skills.length > 0 && (
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={4}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 }}
//               >
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Box
//                     sx={{
//                       width: 50,
//                       height: 50,
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <SchoolIcon sx={{ color: 'white' }} />
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
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 }}
//               >
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Box
//                     sx={{
//                       width: 50,
//                       height: 50,
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <TrendingUp sx={{ color: 'white' }} />
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
//               </Paper>
//             </Grid>
            
//           </Grid>
//         )}

//         {/* Skills Grid */}
//         {skills.length === 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               p: 8,
//               textAlign: 'center',
//               borderRadius: 3,
//               background: isDark ? '#1e1e2e' : '#ffffff',
//               border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 100,
//                 height: 100,
//                 borderRadius: '50%',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 mx: 'auto',
//                 mb: 3,
//               }}
//             >
//               <SchoolIcon sx={{ fontSize: 60, color: 'white' }} />
//             </Box>
//             <Typography variant="h5" fontWeight={700} gutterBottom>
//               No skills added yet
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
//               Start building your skill profile by taking an assessment and showcase your expertise
//             </Typography>
//             <Button
//               variant="contained"
//               size="large"
//               startIcon={<AssessmentIcon />}
//               onClick={() => setOpenAssessmentDialog(true)}
//               sx={{
//                 px: 5,
//                 py: 1.8,
//                 borderRadius: 3,
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
//                 '&:hover': {
//                   boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4)',
//                   transform: 'translateY(-2px)',
//                 },
//                 transition: 'all 0.3s ease',
//               }}
//             >
//               Take Skill Assessment
//             </Button>
//           </Paper>
//         ) : (
//           <Grid container spacing={3}>
//             {skills.map((skill) => (
//               <Grid item xs={12} sm={6} md={4} key={skill.userSkillId}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     borderRadius: 3,
//                     background: isDark ? '#1e1e2e' : '#ffffff',
//                     border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-8px)',
//                       boxShadow: isDark
//                         ? '0 12px 24px rgba(0,0,0,0.4)'
//                         : '0 12px 24px rgba(0,0,0,0.1)',
//                       borderColor: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ flexGrow: 1, p: 3 }}>
//                     <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
//                       <Box
//                         sx={{
//                           width: 56,
//                           height: 56,
//                           borderRadius: 2,
//                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           flexShrink: 0,
//                         }}
//                       >
//                         <SchoolIcon sx={{ fontSize: 32, color: 'white' }} />
//                       </Box>
//                       <Box sx={{ flex: 1, minWidth: 0 }}>
//                         <Typography variant="h6" fontWeight={700} noWrap sx={{ mb: 1 }}>
//                           {skill.skillName}
//                         </Typography>
//                         <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
//                           <Chip
//                             label={skill.level}
//                             color={LEVEL_COLORS[skill.level]}
//                             size="small"
//                             sx={{ fontWeight: 600 }}
//                           />
//                           <Chip
//                             label={skill.type}
//                             color={TYPE_COLORS[skill.type]}
//                             size="small"
//                             variant="outlined"
//                             sx={{ fontWeight: 600 }}
//                           />
//                         </Stack>
//                       </Box>
//                     </Stack>

//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 2,
//                         borderRadius: 2,
//                         background: isDark
//                           ? 'rgba(255,255,255,0.05)'
//                           : 'rgba(0,0,0,0.02)',
//                       }}
//                     >
//                       <Typography variant="caption" color="text.secondary" display="block">
//                         Proficiency Level
//                       </Typography>
//                       <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
//                         {LEVEL_DESCRIPTIONS[skill.level]}
//                       </Typography>
//                     </Paper>
//                   </CardContent>

//                   <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       startIcon={<EditIcon />}
//                       onClick={() => openEdit(skill)}
//                       sx={{
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         textTransform: 'none',
//                         borderWidth: 2,
//                         '&:hover': {
//                           borderWidth: 2,
//                         },
//                       }}
//                     >
//                       Update
//                     </Button>
//                     <IconButton
//                       size="small"
//                       onClick={() => openDelete(skill)}
//                       sx={{
//                         color: 'error.main',
//                         border: '2px solid',
//                         borderColor: 'error.main',
//                         borderRadius: 2,
//                         '&:hover': {
//                           bgcolor: 'error.main',
//                           color: 'white',
//                         },
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {/* Assessment Dialog */}
//         <AddSkillAssessment
//           open={openAssessmentDialog}
//           onClose={() => setOpenAssessmentDialog(false)}
//           onSkillAdded={fetchUserSkills}
//           excludeSkillIds={userSkillIds}
//         />

//         {/* Edit Level Dialog */}
//         <Dialog
//           open={openEditDialog}
//           onClose={() => setOpenEditDialog(false)}
//           maxWidth="sm"
//           fullWidth
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               background: isDark ? '#1e1e2e' : '#ffffff',
//             },
//           }}
//         >
//           <DialogTitle sx={{ pb: 1 }}>
//             <Typography variant="h6" fontWeight={700}>
//               Update Skill Level
//             </Typography>
//           </DialogTitle>
//           <DialogContent>
//             <Stack spacing={3} sx={{ mt: 2 }}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2.5,
//                   borderRadius: 2,
//                   background: isDark
//                     ? 'rgba(102, 126, 234, 0.1)'
//                     : 'rgba(102, 126, 234, 0.08)',
//                   border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
//                 }}
//               >
//                 <Typography variant="caption" color="text.secondary">
//                   Skill Name
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5, mb: 1 }}>
//                   {selectedSkill?.skillName}
//                 </Typography>
//                 <Chip
//                   label={`Current: ${selectedSkill?.level}`}
//                   size="small"
//                   color={LEVEL_COLORS[selectedSkill?.level]}
//                   sx={{ fontWeight: 600 }}
//                 />
//               </Paper>
//               <TextField
//                 select
//                 label="New Proficiency Level"
//                 value={editLevel}
//                 onChange={(e) => setEditLevel(e.target.value)}
//                 fullWidth
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {SKILL_LEVELS.map((level) => (
//                   <MenuItem key={level} value={level}>
//                     <Box>
//                       <Typography fontWeight={600}>{level}</Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {LEVEL_DESCRIPTIONS[level]}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Stack>
//           </DialogContent>
//           <DialogActions sx={{ p: 3, pt: 2 }}>
//             <Button
//               onClick={() => setOpenEditDialog(false)}
//               sx={{ borderRadius: 2, fontWeight: 500 }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleUpdateLevel}
//               disabled={editLevel === selectedSkill?.level}
//               sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}
//             >
//               Update Level
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Confirmation Dialog */}
//         <Dialog
//           open={openDeleteDialog}
//           onClose={() => setOpenDeleteDialog(false)}
//           maxWidth="xs"
//           fullWidth
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               background: isDark ? '#1e1e2e' : '#ffffff',
//             },
//           }}
//         >
//           <DialogTitle sx={{ pb: 1 }}>
//             <Typography variant="h6" fontWeight={700} color="error">
//               Remove Skill?
//             </Typography>
//           </DialogTitle>
//           <DialogContent>
//             <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
//               This action cannot be undone.
//             </Alert>
//             <Typography>
//               Are you sure you want to remove <strong>{selectedSkill?.skillName}</strong> from your
//               skill listings?
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ p: 3, pt: 2 }}>
//             <Button
//               onClick={() => setOpenDeleteDialog(false)}
//               sx={{ borderRadius: 2, fontWeight: 500 }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleDeleteSkill}
//               sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}
//             >
//               Remove Skill
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// }





// src/pages/user/UserListing.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Stack,
  Alert,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  AssessmentOutlined as AssessmentIcon,
  EmojiEvents,
  TrendingUp,
} from "@mui/icons-material";
import { useAuth } from "@context/AuthContext";
import {
  getAllUserSkills,
  removeUserSkill,
  updateUserSkillLevel,
} from "@services/userSkillService";
import AddSkillAssessment from "@components/user/AddSkillAssessment";
import toast from "react-hot-toast";

const SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const LEVEL_COLORS = {
  BEGINNER: "info",
  INTERMEDIATE: "warning",
  ADVANCED: "success",
};

const LEVEL_DESCRIPTIONS = {
  BEGINNER: "Just starting out",
  INTERMEDIATE: "Comfortable with basics",
  ADVANCED: "Proficient and experienced",
};

const TYPE_COLORS = {
  OFFER: "success",
  LEARN: "primary",
};

export default function UserListing() {
  const { user } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAssessmentDialog, setOpenAssessmentDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editLevel, setEditLevel] = useState("");

  const fetchUserSkills = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await getAllUserSkills(user.id);
      setSkills(res);
    } catch (err) {
      console.error("Failed to fetch user skills:", err);
      toast.error("Failed to load your skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, [user]);

  const handleUpdateLevel = async () => {
    if (!selectedSkill) return;

    try {
      await updateUserSkillLevel(user.id, {
        userSkillId: selectedSkill.userSkillId,
        level: editLevel,
      });
      toast.success("Skill level updated successfully!");
      setOpenEditDialog(false);
      setSelectedSkill(null);
      fetchUserSkills();
    } catch (err) {
      console.error("Failed to update skill level:", err);
      toast.error(err.response?.data?.message || "Failed to update skill level");
    }
  };

  const handleDeleteSkill = async () => {
    if (!selectedSkill) return;

    try {
      await removeUserSkill(user.id, {
        skillId: selectedSkill.skillId,
        type: selectedSkill.type,
      });
      toast.success("Skill removed successfully!");
      setOpenDeleteDialog(false);
      setSelectedSkill(null);
      fetchUserSkills();
    } catch (err) {
      console.error("Failed to remove skill:", err);
      toast.error(err.response?.data?.message || "Failed to remove skill");
    }
  };

  const openEdit = (skill) => {
    setSelectedSkill(skill);
    setEditLevel(skill.level);
    setOpenEditDialog(true);
  };

  const openDelete = (skill) => {
    setSelectedSkill(skill);
    setOpenDeleteDialog(true);
  };

  if (!user) {
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
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5, md: 6 },
            textAlign: 'center',
            borderRadius: { xs: 2, md: 3 },
            background: isDark ? '#1e1e2e' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            Please login to view your skills.
          </Typography>
        </Paper>
      </Box>
    );
  }

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

  const userSkillIds = skills.map(s => s.skillId);
  const offerSkills = skills.filter(s => s.type === 'OFFER');
  const learnSkills = skills.filter(s => s.type === 'LEARN');

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
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={{ xs: 2, sm: 2 }}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: { xs: 0.5, sm: 1 } }}>
                <EmojiEvents sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
                  My Skill Listings
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                Manage your offered skills and proficiency levels
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAssessmentDialog(true)}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                  border: '2px solid rgba(255,255,255,0.5)',
                },
                textTransform: 'none',
                alignSelf: { xs: 'stretch', sm: 'auto' },
              }}
            >
              Add Skill
            </Button>
          </Stack>
        </Paper>

        {/* Stats Cards */}
        {skills.length > 0 && (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: { xs: 2, md: 3 },
                  background: isDark ? '#1e1e2e' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 44, sm: 50 },
                      height: { xs: 44, sm: 50 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SchoolIcon sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}>
                      {skills.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Total Skills
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: { xs: 2, md: 3 },
                  background: isDark ? '#1e1e2e' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 44, sm: 50 },
                      height: { xs: 44, sm: 50 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}>
                      {offerSkills.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Skills to Offer
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Skills Grid */}
        {skills.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              textAlign: 'center',
              borderRadius: { xs: 2, md: 3 },
              background: isDark ? '#1e1e2e' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <Box
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: { xs: 2, sm: 3 },
              }}
            >
              <SchoolIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'white' }} />
            </Box>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
              No skills added yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, maxWidth: 500, mx: 'auto', fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Start building your skill profile by taking an assessment and showcase your expertise
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AssessmentIcon />}
              onClick={() => setOpenAssessmentDialog(true)}
              sx={{
                px: { xs: 4, sm: 5 },
                py: { xs: 1.5, sm: 1.8 },
                borderRadius: 3,
                fontWeight: 600,
                fontSize: { xs: "0.9375rem", sm: "1rem" },
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Take Skill Assessment
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {skills.map((skill) => (
              <Grid item xs={12} sm={6} md={4} key={skill.userSkillId}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    width: 370,
                    display: 'flex',
                    flexDirection: 'column',
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
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 } }}>
                    <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: { xs: 48, sm: 56 },
                          height: { xs: 48, sm: 56 },
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <SchoolIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: 'white' }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6" fontWeight={700} noWrap sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                          {skill.skillName}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                          <Chip
                            label={skill.level}
                            color={LEVEL_COLORS[skill.level]}
                            size="small"
                            sx={{ fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                          />
                          <Chip
                            label={skill.type}
                            color={TYPE_COLORS[skill.type]}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                          />
                        </Stack>
                      </Box>
                    </Stack>

                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 2,
                        background: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
                        Proficiency Level
                      </Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                        {LEVEL_DESCRIPTIONS[skill.level]}
                      </Typography>
                    </Paper>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => openEdit(skill)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                        textTransform: 'none',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                        },
                      }}
                    >
                      Update
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => openDelete(skill)}
                      sx={{
                        color: 'error.main',
                        border: '2px solid',
                        borderColor: 'error.main',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'error.main',
                          color: 'white',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Assessment Dialog */}
        <AddSkillAssessment
          open={openAssessmentDialog}
          onClose={() => setOpenAssessmentDialog(false)}
          onSkillAdded={fetchUserSkills}
          excludeSkillIds={userSkillIds}
        />

        {/* Edit Level Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: isDark ? '#1e1e2e' : '#ffffff',
              m: { xs: 2, sm: 3 },
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
              Update Skill Level
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: 2,
                  background: isDark
                    ? 'rgba(102, 126, 234, 0.1)'
                    : 'rgba(102, 126, 234, 0.08)',
                  border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                  Skill Name
                </Typography>
                <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5, mb: 1, fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                  {selectedSkill?.skillName}
                </Typography>
                <Chip
                  label={`Current: ${selectedSkill?.level}`}
                  size="small"
                  color={LEVEL_COLORS[selectedSkill?.level]}
                  sx={{ fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                />
              </Paper>
              <TextField
                select
                label="New Proficiency Level"
                value={editLevel}
                onChange={(e) => setEditLevel(e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              >
                {SKILL_LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Box>
                      <Typography fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>{level}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                        {LEVEL_DESCRIPTIONS[level]}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
            <Button
              onClick={() => setOpenEditDialog(false)}
              sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateLevel}
              disabled={editLevel === selectedSkill?.level}
              sx={{ borderRadius: 2, fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
            >
              Update Level
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: isDark ? '#1e1e2e' : '#ffffff',
              m: { xs: 2, sm: 3 },
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={700} color="error" sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
              Remove Skill?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              This action cannot be undone.
            </Alert>
            <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Are you sure you want to remove <strong>{selectedSkill?.skillName}</strong> from your
              skill listings?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteSkill}
              sx={{ borderRadius: 2, fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
            >
              Remove Skill
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}