// // src/pages/user/UserBrowse.jsx
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   Button,
//   Chip,
//   useTheme,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   CircularProgress,
//   Modal,
//   Card,
//   CardContent,
//   Stack,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import {
//   Search,
//   SwapHoriz,
//   Cancel,
//   Person,
//   TrendingUp,
//   FilterList,
//   Code,
// } from "@mui/icons-material";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, getMatchRequests, cancelMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const navigate = useNavigate(); // Add this line
//   const { user } = useContext(AuthContext);
//   const isDark = theme.palette.mode === 'dark';

//   const [skills, setSkills] = useState([]);
//   const [myOfferSkills, setMyOfferSkills] = useState([]);
//   const [myPendingRequests, setMyPendingRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const [cancelModal, setCancelModal] = useState({
//     open: false,
//     requestId: null,
//     skillName: null,
//   });
//   const [cancelling, setCancelling] = useState(false);

//   const categories = ["C Programming", "JavaScript", "Java", ".NET", "Python"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();

//         const currentUser = users.find((u) => u.email === user?.email);
        
//         if (currentUser) {
//           const offerSkills = currentUser.skills
//             .filter((s) => s.type === "OFFER")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//             }));
//           setMyOfferSkills(offerSkills);
//         }

//         const otherOfferSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName,
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//                 ownerId: u.userId,
//                 ownerAvatar: u.avatarUrl,
//               }))
//           );
        
//         setSkills(otherOfferSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
//   }, [user]);

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await getMatchRequests();
        
//         if (response.success && Array.isArray(response.data)) {
//           const pending = response.data
//             .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
//             .map((req) => ({
//               requestId: req.id,
//               toUserSkillId: req.toUserSkillId,
//               skillName: req.toUserSkillName,
//             }));
//           setMyPendingRequests(pending);
//         }
//       } catch (error) {
//         console.error("Failed to fetch pending requests", error);
//       }
//     };

//     if (user?.id) fetchPendingRequests();
//   }, [user]);

//   /* ================= FILTERING ================= */
//   const filteredSkills = skills.filter(
//     (skill) =>
//       skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory ? skill.category === selectedCategory : true)
//   );

//   /* ================= PAGINATION ================= */
//   const skillsPerPage = 6;
//   const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
//   const displayedSkills = filteredSkills.slice(
//     (currentPage - 1) * skillsPerPage,
//     currentPage * skillsPerPage
//   );

//   /* ================= UTILITIES ================= */
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const getPendingRequest = (skillId) => {
//     return myPendingRequests.find((req) => req.toUserSkillId === skillId);
//   };

//   /* ================= ACTIONS ================= */
//   const openRequestDialog = (skill) => {
//     if (myOfferSkills.length === 0) {
//       showSnackbar(
//         "You need to add OFFER skills in your profile first to request swaps",
//         "warning"
//       );
//       return;
//     }
//     setRequestDialog({ open: true, skill });
//     setSelectedMySkill("");
//   };

//   const closeRequestDialog = () => {
//     setRequestDialog({ open: false, skill: null });
//     setSelectedMySkill("");
//   };

//   const handleRequestSwap = async () => {
//     if (!selectedMySkill) {
//       showSnackbar("Please select a skill you want to offer", "warning");
//       return;
//     }

//     const { skill } = requestDialog;

//     try {
//       setRequesting(true);

//       const request = {
//         fromUserSkillId: parseInt(selectedMySkill),
//         toUserId: skill.ownerId,
//         toUserSkillId: skill.id,
//       };

//       const response = await createMatchRequest(request);

//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
        
//         setMyPendingRequests((prev) => [
//           ...prev,
//           {
//             requestId: response.data.id,
//             toUserSkillId: skill.id,
//             skillName: skill.skillName,
//           },
//         ]);
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to send request", error);
//       showSnackbar(
//         error.response?.data?.message || 
//         error.response?.data?.error || 
//         error.message || 
//         "Failed to send swap request",
//         "error"
//       );
//     } finally {
//       setRequesting(false);
//     }
//   };

//   const openCancelModal = (pendingRequest) => {
//     setCancelModal({
//       open: true,
//       requestId: pendingRequest.requestId,
//       skillName: pendingRequest.skillName,
//     });
//   };

//   const closeCancelModal = () => {
//     setCancelModal({
//       open: false,
//       requestId: null,
//       skillName: null,
//     });
//   };

//   const handleCancelRequest = async () => {
//     try {
//       setCancelling(true);
      
//       const response = await cancelMatchRequest(cancelModal.requestId);

//       if (response.success) {
//         showSnackbar(`Request for "${cancelModal.skillName}" cancelled!`, "info");
        
//         setMyPendingRequests((prev) =>
//           prev.filter((req) => req.requestId !== cancelModal.requestId)
//         );
        
//         closeCancelModal();
//       } else {
//         showSnackbar(response.message || "Failed to cancel request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to cancel request", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to cancel request",
//         "error"
//       );
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const getLevelColor = (level) => {
//     const colors = {
//       BEGINNER: 'info',
//       INTERMEDIATE: 'warning',
//       ADVANCED: 'success',
//       EXPERT: 'error',
//     };
//     return colors[level] || 'default';
//   };

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
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//             <Code sx={{ fontSize: 32 }} />
//             <Typography variant="h4" fontWeight={700}>
//               Browse Skills
//             </Typography>
//           </Box>
//           <Typography variant="body1" sx={{ opacity: 0.9 }}>
//             Discover talented individuals and exchange skills
//           </Typography>
//         </Paper>

//         {/* Info Alert */}
//         {myOfferSkills.length === 0 && (
//           <Alert
//             severity="info"
//             sx={{
//               mb: 3,
//               borderRadius: 2,
//               '& .MuiAlert-icon': {
//                 fontSize: 28,
//               },
//             }}
//           >
//             <Typography variant="body2" fontWeight={500}>
//               You need to add OFFER skills in your profile before requesting swaps.
//               Go to your profile and add skills you can teach!
//             </Typography>
//           </Alert>
//         )}

//         {/* Search & Filters */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 3,
//             mb: 3,
//             borderRadius: 3,
//             background: isDark ? '#1e1e2e' : '#ffffff',
//             border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//           }}
//         >
//           <Stack spacing={2}>
//             <TextField
//               placeholder="Search skills..."
//               size="small"
//               fullWidth
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                 },
//               }}
//             />

//             <Box>
//               <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
//                 <FilterList fontSize="small" />
//                 <Typography variant="body2" fontWeight={600}>
//                   Filter by Category
//                 </Typography>
//               </Stack>
//               <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
//                 <Chip
//                   label="All"
//                   clickable
//                   color={selectedCategory === "" ? "primary" : "default"}
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setCurrentPage(1);
//                   }}
//                   sx={{ fontWeight: 600 }}
//                 />
//                 {categories.map((cat) => (
//                   <Chip
//                     key={cat}
//                     label={cat}
//                     clickable
//                     color={selectedCategory === cat ? "primary" : "default"}
//                     onClick={() => {
//                       setSelectedCategory(selectedCategory === cat ? "" : cat);
//                       setCurrentPage(1);
//                     }}
//                     sx={{ fontWeight: 600 }}
//                   />
//                 ))}
//               </Stack>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* Loading State */}
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress size={50} />
//           </Box>
//         ) : (
//           <>
//             {/* Skills Grid */}
//             {displayedSkills.length === 0 ? (
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 6,
//                   textAlign: 'center',
//                   borderRadius: 3,
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: 3,
//                   }}
//                 >
//                   <Search sx={{ fontSize: 40, color: 'white' }} />
//                 </Box>
//                 <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
//                   No skills found
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Try adjusting your search or filters
//                 </Typography>
//               </Paper>
//             ) : (
//               <Grid container spacing={3}>
//                 {displayedSkills.map((skill) => {
//                   const pendingRequest = getPendingRequest(skill.id);
//                   const hasPendingRequest = !!pendingRequest;

//                   return (
//                     <Grid item xs={12} sm={6} lg={4} key={skill.id}>
//                       <Card
//                         elevation={0}
//                         sx={{
//                           height: '100%',
//                           borderRadius: 3,
//                           background: isDark ? '#1e1e2e' : '#ffffff',
//                           border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             transform: 'translateY(-8px)',
//                             boxShadow: isDark
//                               ? '0 12px 24px rgba(0,0,0,0.4)'
//                               : '0 12px 24px rgba(0,0,0,0.1)',
//                           },
//                         }}
//                       >
//                         <CardContent sx={{ p: 3 }}>
//                           {/* Skill Header */}
//                           <Box
//                             sx={{
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: 2,
//                               mb: 2,
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 width: 50,
//                                 height: 50,
//                                 borderRadius: 2,
//                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }}
//                             >
//                               <Code sx={{ color: 'white', fontSize: 28 }} />
//                             </Box>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography variant="h6" fontWeight={700} noWrap>
//                                 {skill.skillName}
//                               </Typography>
//                               <Chip
//                                 label={skill.level}
//                                 size="small"
//                                 color={getLevelColor(skill.level)}
//                                 sx={{ mt: 0.5, fontWeight: 600, fontSize: '0.7rem' }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2 }} />

//                           {/* Owner Info */}
//                           <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
//                             <Avatar
//                               src={skill.ownerAvatar}
//                               alt={skill.ownerName}
//                               sx={{ 
//                                 width: 36, 
//                                 height: 36,
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                   transform: 'scale(1.1)',
//                                   transition: 'transform 0.2s ease',
//                                 }
//                               }}
//                               onClick={() => navigate(`/user/other-profile/${skill.ownerId}`)}
//                             >
//                               {skill.ownerName?.charAt(0)}
//                             </Avatar>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography variant="body2" color="text.secondary" fontSize="0.7rem">
//                                 Offered by
//                               </Typography>
//                               <Typography variant="body2" fontWeight={600} noWrap>
//                                 {skill.ownerName}
//                               </Typography>
//                             </Box>
//                           </Stack>

//                           {/* Category */}
//                           <Chip
//                             label={skill.category}
//                             size="small"
//                             variant="outlined"
//                             color="secondary"
//                             sx={{ mb: 2, fontWeight: 500 }}
//                           />

//                           {/* Action Button */}
//                           {hasPendingRequest ? (
//                             <Button
//                               fullWidth
//                               variant="outlined"
//                               color="error"
//                               startIcon={<Cancel />}
//                               onClick={() => openCancelModal(pendingRequest)}
//                               sx={{
//                                 borderRadius: 2,
//                                 py: 1.2,
//                                 fontWeight: 600,
//                                 borderWidth: 2,
//                                 '&:hover': {
//                                   borderWidth: 2,
//                                 },
//                               }}
//                             >
//                               Cancel Request
//                             </Button>
//                           ) : (
//                             <Button
//                               fullWidth
//                               variant="contained"
//                               startIcon={<SwapHoriz />}
//                               onClick={() => openRequestDialog(skill)}
//                               disabled={myOfferSkills.length === 0}
//                               sx={{
//                                 borderRadius: 2,
//                                 py: 1.2,
//                                 fontWeight: 600,
//                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                 '&:hover': {
//                                   background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
//                                 },
//                               }}
//                             >
//                               Request Swap
//                             </Button>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     variant={currentPage === i + 1 ? 'contained' : 'outlined'}
//                     onClick={() => setCurrentPage(i + 1)}
//                     sx={{
//                       minWidth: 40,
//                       borderRadius: 2,
//                       fontWeight: 600,
//                     }}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </Box>
//             )}
//           </>
//         )}
//       </Box>

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             background: isDark ? '#1e1e2e' : '#ffffff',
//           },
//         }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6" fontWeight={700}>
//             Request Skill Swap
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           {requestDialog.skill && (
//             <Stack spacing={3}>
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
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                   You want to learn
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600} color="primary">
//                   {requestDialog.skill.skillName}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mt: 0.5 }}>
//                   from <strong>{requestDialog.skill.ownerName}</strong>
//                 </Typography>
//               </Paper>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer in exchange"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 helperText="Choose one of your OFFER skills to exchange"
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {myOfferSkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Stack>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 2 }}>
//           <Button
//             onClick={closeRequestDialog}
//             disabled={requesting}
//             sx={{ borderRadius: 2, fontWeight: 500 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting ? <CircularProgress size={20} /> : <SwapHoriz />}
//             sx={{
//               borderRadius: 2,
//               fontWeight: 600,
//               px: 3,
//             }}
//           >
//             {requesting ? 'Sending...' : 'Send Request'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Cancel Confirmation Modal */}
//       <Modal open={cancelModal.open} onClose={closeCancelModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             maxWidth: '95%',
//             bgcolor: isDark ? '#1e1e2e' : 'background.paper',
//             borderRadius: 3,
//             p: 4,
//             boxShadow: 24,
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
//             Cancel Request?
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//             Are you sure you want to cancel the request for "{cancelModal.skillName}"?
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="center">
//             <Button
//               variant="outlined"
//               onClick={closeCancelModal}
//               disabled={cancelling}
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               No
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleCancelRequest}
//               disabled={cancelling}
//               startIcon={cancelling ? <CircularProgress size={20} /> : <Cancel />}
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




// // src/pages/user/UserBrowse.jsx
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   Button,
//   Chip,
//   useTheme,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   CircularProgress,
//   Modal,
//   Card,
//   CardContent,
//   Stack,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import {
//   Search,
//   SwapHoriz,
//   Cancel,
//   Person,
//   TrendingUp,
//   FilterList,
//   Code,
// } from "@mui/icons-material";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, getMatchRequests, cancelMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const isDark = theme.palette.mode === 'dark';

//   const [skills, setSkills] = useState([]);
//   const [myOfferSkills, setMyOfferSkills] = useState([]);
//   const [myPendingRequests, setMyPendingRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const [cancelModal, setCancelModal] = useState({
//     open: false,
//     requestId: null,
//     skillName: null,
//   });
//   const [cancelling, setCancelling] = useState(false);

//   const categories = ["C Programming", "JavaScript", "Java", ".NET", "Python"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();

//         const currentUser = users.find((u) => u.email === user?.email);
        
//         if (currentUser) {
//           const offerSkills = currentUser.skills
//             .filter((s) => s.type === "OFFER")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//             }));
//           setMyOfferSkills(offerSkills);
//         }

//         const otherOfferSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName,
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//                 ownerId: u.userId,
//                 ownerAvatar: u.avatarUrl,
//               }))
//           );
        
//         setSkills(otherOfferSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
//   }, [user]);

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await getMatchRequests();
        
//         if (response.success && Array.isArray(response.data)) {
//           const pending = response.data
//             .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
//             .map((req) => ({
//               requestId: req.id,
//               toUserSkillId: req.toUserSkillId,
//               skillName: req.toUserSkillName,
//             }));
//           setMyPendingRequests(pending);
//         }
//       } catch (error) {
//         console.error("Failed to fetch pending requests", error);
//       }
//     };

//     if (user?.id) fetchPendingRequests();
//   }, [user]);

//   /* ================= FILTERING ================= */
//   const filteredSkills = skills.filter(
//     (skill) =>
//       skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory ? skill.category === selectedCategory : true)
//   );

//   /* ================= PAGINATION ================= */
//   const skillsPerPage = 6;
//   const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
//   const displayedSkills = filteredSkills.slice(
//     (currentPage - 1) * skillsPerPage,
//     currentPage * skillsPerPage
//   );

//   /* ================= UTILITIES ================= */
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const getPendingRequest = (skillId) => {
//     return myPendingRequests.find((req) => req.toUserSkillId === skillId);
//   };

//   /* ================= ACTIONS ================= */
//   const openRequestDialog = (skill) => {
//     if (myOfferSkills.length === 0) {
//       showSnackbar(
//         "You need to add OFFER skills in your profile first to request swaps",
//         "warning"
//       );
//       return;
//     }
//     setRequestDialog({ open: true, skill });
//     setSelectedMySkill("");
//   };

//   const closeRequestDialog = () => {
//     setRequestDialog({ open: false, skill: null });
//     setSelectedMySkill("");
//   };

//   const handleRequestSwap = async () => {
//     if (!selectedMySkill) {
//       showSnackbar("Please select a skill you want to offer", "warning");
//       return;
//     }

//     const { skill } = requestDialog;

//     try {
//       setRequesting(true);

//       const request = {
//         fromUserSkillId: parseInt(selectedMySkill),
//         toUserId: skill.ownerId,
//         toUserSkillId: skill.id,
//       };

//       const response = await createMatchRequest(request);

//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
        
//         setMyPendingRequests((prev) => [
//           ...prev,
//           {
//             requestId: response.data.id,
//             toUserSkillId: skill.id,
//             skillName: skill.skillName,
//           },
//         ]);
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to send request", error);
//       showSnackbar(
//         error.response?.data?.message || 
//         error.response?.data?.error || 
//         error.message || 
//         "Failed to send swap request",
//         "error"
//       );
//     } finally {
//       setRequesting(false);
//     }
//   };

//   const openCancelModal = (pendingRequest) => {
//     setCancelModal({
//       open: true,
//       requestId: pendingRequest.requestId,
//       skillName: pendingRequest.skillName,
//     });
//   };

//   const closeCancelModal = () => {
//     setCancelModal({
//       open: false,
//       requestId: null,
//       skillName: null,
//     });
//   };

//   const handleCancelRequest = async () => {
//     try {
//       setCancelling(true);
      
//       const response = await cancelMatchRequest(cancelModal.requestId);

//       if (response.success) {
//         showSnackbar(`Request for "${cancelModal.skillName}" cancelled!`, "info");
        
//         setMyPendingRequests((prev) =>
//           prev.filter((req) => req.requestId !== cancelModal.requestId)
//         );
        
//         closeCancelModal();
//       } else {
//         showSnackbar(response.message || "Failed to cancel request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to cancel request", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to cancel request",
//         "error"
//       );
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const getLevelColor = (level) => {
//     const colors = {
//       BEGINNER: 'info',
//       INTERMEDIATE: 'warning',
//       ADVANCED: 'success',
//       EXPERT: 'error',
//     };
//     return colors[level] || 'default';
//   };

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
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: { xs: 1, sm: 2 } }}>
//             <Code sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
//             <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
//               Browse Skills
//             </Typography>
//           </Box>
//           <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//             Discover talented individuals and exchange skills
//           </Typography>
//         </Paper>

//         {/* Info Alert */}
//         {myOfferSkills.length === 0 && (
//           <Alert
//             severity="info"
//             sx={{
//               mb: { xs: 2, sm: 3 },
//               borderRadius: 2,
//               '& .MuiAlert-icon': {
//                 fontSize: { xs: 24, sm: 28 },
//               },
//               fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//             }}
//           >
//             <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//               You need to add OFFER skills in your profile before requesting swaps.
//               Go to your profile and add skills you can teach!
//             </Typography>
//           </Alert>
//         )}

//         {/* Search & Filters */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             mb: { xs: 2, sm: 3 },
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark ? '#1e1e2e' : '#ffffff',
//             border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//           }}
//         >
//           <Stack spacing={2}>
//             <TextField
//               placeholder="Search skills..."
//               size="small"
//               fullWidth
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                 },
//                 '& .MuiInputBase-input': {
//                   fontSize: { xs: "0.875rem", sm: "1rem" },
//                 },
//               }}
//             />

//             <Box>
//               <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
//                 <FilterList fontSize="small" />
//                 <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   Filter by Category
//                 </Typography>
//               </Stack>
//               <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
//                 <Chip
//                   label="All"
//                   clickable
//                   color={selectedCategory === "" ? "primary" : "default"}
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setCurrentPage(1);
//                   }}
//                   sx={{ fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
//                 />
//                 {categories.map((cat) => (
//                   <Chip
//                     key={cat}
//                     label={cat}
//                     clickable
//                     color={selectedCategory === cat ? "primary" : "default"}
//                     onClick={() => {
//                       setSelectedCategory(selectedCategory === cat ? "" : cat);
//                       setCurrentPage(1);
//                     }}
//                     sx={{ fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
//                   />
//                 ))}
//               </Stack>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* Loading State */}
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress size={50} />
//           </Box>
//         ) : (
//           <>
//             {/* Skills Grid */}
//             {displayedSkills.length === 0 ? (
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 4, sm: 5, md: 6 },
//                   textAlign: 'center',
//                   borderRadius: { xs: 2, md: 3 },
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 64, sm: 80 },
//                     height: { xs: 64, sm: 80 },
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: { xs: 2, sm: 3 },
//                   }}
//                 >
//                   <Search sx={{ fontSize: { xs: 32, sm: 40 }, color: 'white' }} />
//                 </Box>
//                 <Typography variant="h6" fontWeight={600} sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
//                   No skills found
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   Try adjusting your search or filters
//                 </Typography>
//               </Paper>
//             ) : (
//               <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//                 {displayedSkills.map((skill) => {
//                   const pendingRequest = getPendingRequest(skill.id);
//                   const hasPendingRequest = !!pendingRequest;

//                   return (
//                     <Grid item xs={12} sm={6} lg={4} key={skill.id}>
//                       <Card
//                         elevation={0}
//                         sx={{
//                           height: '100%',
//                           width: 370,
//                           borderRadius: { xs: 2, md: 3 },
//                           background: isDark ? '#1e1e2e' : '#ffffff',
//                           border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             transform: 'translateY(-8px)',
//                             boxShadow: isDark
//                               ? '0 12px 24px rgba(0,0,0,0.4)'
//                               : '0 12px 24px rgba(0,0,0,0.1)',
//                           },
//                         }}
//                       >
//                         <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                           {/* Skill Header */}
//                           <Box
//                             sx={{
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: { xs: 1.5, sm: 2 },
//                               mb: 2,
                              
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 width: { xs: 44, sm: 50 },
//                                 height: { xs: 44, sm: 50 },
//                                 borderRadius: 2,
//                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }}
//                             >
//                               <Code sx={{ color: 'white', fontSize: { xs: 24, sm: 28 } }} />
//                             </Box>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography variant="h6" fontWeight={700} noWrap sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
//                                 {skill.skillName}
//                               </Typography>
//                               <Chip
//                                 label={skill.level}
//                                 size="small"
//                                 color={getLevelColor(skill.level)}
//                                 sx={{ mt: 0.5, fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.7rem" } }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2 }} />

//                           {/* Owner Info */}
//                           <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
//                             <Avatar
//                               src={skill.ownerAvatar}
//                               alt={skill.ownerName}
//                               sx={{ 
//                                 width: { xs: 32, sm: 36 }, 
//                                 height: { xs: 32, sm: 36 },
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                   transform: 'scale(1.1)',
//                                   transition: 'transform 0.2s ease',
//                                 }
//                               }}
//                               onClick={() => navigate(`/user/other-profile/${skill.ownerId}`)}
//                             >
//                               {skill.ownerName?.charAt(0)}
//                             </Avatar>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography variant="body2" color="text.secondary" fontSize={{ xs: "0.65rem", sm: "0.7rem" }}>
//                                 Offered by
//                               </Typography>
//                               <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                                 {skill.ownerName}
//                               </Typography>
//                             </Box>
//                           </Stack>

//                           {/* Category */}
//                           <Chip
//                             label={skill.category}
//                             size="small"
//                             variant="outlined"
//                             color="secondary"
//                             sx={{ mb: 2, fontWeight: 500, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
//                           />

//                           {/* Action Button */}
//                           {hasPendingRequest ? (
//                             <Button
//                               fullWidth
//                               variant="outlined"
//                               color="error"
//                               startIcon={<Cancel />}
//                               onClick={() => openCancelModal(pendingRequest)}
//                               sx={{
//                                 borderRadius: 2,
//                                 py: { xs: 1, sm: 1.2 },
//                                 fontWeight: 600,
//                                 borderWidth: 2,
//                                 fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                                 '&:hover': {
//                                   borderWidth: 2,
//                                 },
//                               }}
//                             >
//                               Cancel Request
//                             </Button>
//                           ) : (
//                             <Button
//                               fullWidth
//                               variant="contained"
//                               startIcon={<SwapHoriz />}
//                               onClick={() => openRequestDialog(skill)}
//                               disabled={myOfferSkills.length === 0}
//                               sx={{
//                                 borderRadius: 2,
//                                 py: { xs: 1, sm: 1.2 },
//                                 fontWeight: 600,
//                                 fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                 '&:hover': {
//                                   background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
//                                 },
//                               }}
//                             >
//                               Request Swap
//                             </Button>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: { xs: 3, sm: 4 }, flexWrap: 'wrap' }}>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     variant={currentPage === i + 1 ? 'contained' : 'outlined'}
//                     onClick={() => setCurrentPage(i + 1)}
//                     sx={{
//                       minWidth: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       fontWeight: 600,
//                       fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </Box>
//             )}
//           </>
//         )}
//       </Box>

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             background: isDark ? '#1e1e2e' : '#ffffff',
//             m: { xs: 2, sm: 3 },
//           },
//         }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//             Request Skill Swap
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           {requestDialog.skill && (
//             <Stack spacing={3}>
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
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   You want to learn
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600} color="primary" sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
//                   {requestDialog.skill.skillName}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mt: 0.5, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   from <strong>{requestDialog.skill.ownerName}</strong>
//                 </Typography>
//               </Paper>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer in exchange"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 helperText="Choose one of your OFFER skills to exchange"
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   },
//                   '& .MuiInputBase-input': {
//                     fontSize: { xs: "0.875rem", sm: "1rem" },
//                   },
//                 }}
//               >
//                 {myOfferSkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Stack>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
//           <Button
//             onClick={closeRequestDialog}
//             disabled={requesting}
//             sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting ? <CircularProgress size={20} /> : <SwapHoriz />}
//             sx={{
//               borderRadius: 2,
//               fontWeight: 600,
//               px: { xs: 2, sm: 3 },
//               fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//             }}
//           >
//             {requesting ? 'Sending...' : 'Send Request'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Cancel Confirmation Modal */}
//       <Modal open={cancelModal.open} onClose={closeCancelModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: { xs: '90%', sm: 400 },
//             maxWidth: '95%',
//             bgcolor: isDark ? '#1e1e2e' : 'background.paper',
//             borderRadius: 3,
//             p: { xs: 3, sm: 4 },
//             boxShadow: 24,
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h6" fontWeight={600} sx={{ mb: 3, fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//             Cancel Request?
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//             Are you sure you want to cancel the request for "{cancelModal.skillName}"?
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="center">
//             <Button
//               variant="outlined"
//               onClick={closeCancelModal}
//               disabled={cancelling}
//               sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
//             >
//               No
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleCancelRequest}
//               disabled={cancelling}
//               startIcon={cancelling ? <CircularProgress size={20} /> : <Cancel />}
//               sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
//             >
//               {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




// // src/pages/user/UserBrowse.jsx
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   Button,
//   Chip,
//   useTheme,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   CircularProgress,
//   Modal,
//   Card,
//   CardContent,
//   Stack,
//   Avatar,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import {
//   Search,
//   SwapHoriz,
//   Cancel,
//   Person,
//   TrendingUp,
//   FilterList,
//   Code,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, getMatchRequests, cancelMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const isDark = theme.palette.mode === 'dark';

//   const [skills, setSkills] = useState([]);
//   const [myOfferSkills, setMyOfferSkills] = useState([]);
//   const [myPendingRequests, setMyPendingRequests] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const [cancelModal, setCancelModal] = useState({
//     open: false,
//     requestId: null,
//     skillName: null,
//   });
//   const [cancelling, setCancelling] = useState(false);

//   const categories = ["C Programming", "JavaScript", "Java", ".NET", "Python"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();

//         const currentUser = users.find((u) => u.email === user?.email);
        
//         if (currentUser) {
//           const offerSkills = currentUser.skills
//             .filter((s) => s.type === "OFFER")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//             }));
//           setMyOfferSkills(offerSkills);
//         }

//         const otherOfferSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName,
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//                 ownerId: u.userId,
//                 ownerAvatar: u.avatarUrl,
//               }))
//           );
        
//         setSkills(otherOfferSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
//   }, [user]);

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await getMatchRequests();
        
//         if (response.success && Array.isArray(response.data)) {
//           const pending = response.data
//             .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
//             .map((req) => ({
//               requestId: req.id,
//               toUserSkillId: req.toUserSkillId,
//               skillName: req.toUserSkillName,
//             }));
//           setMyPendingRequests(pending);
//         }
//       } catch (error) {
//         console.error("Failed to fetch pending requests", error);
//       }
//     };

//     if (user?.id) fetchPendingRequests();
//   }, [user]);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       const users = await getAllUsers();
//       const currentUser = users.find((u) => u.email === user?.email);
      
//       if (currentUser) {
//         const offerSkills = currentUser.skills
//           .filter((s) => s.type === "OFFER")
//           .map((s) => ({
//             id: s.userSkillId,
//             skillName: s.skillName,
//             level: s.level,
//           }));
//         setMyOfferSkills(offerSkills);
//       }

//       const otherOfferSkills = users
//         .filter((u) => u.email !== user?.email)
//         .flatMap((u) =>
//           u.skills
//             .filter((s) => s.type === "OFFER")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//               category: s.skillName,
//               ownerName: u.fullName,
//               ownerEmail: u.email,
//               ownerId: u.userId,
//               ownerAvatar: u.avatarUrl,
//             }))
//         );
      
//       setSkills(otherOfferSkills);

//       const response = await getMatchRequests();
//       if (response.success && Array.isArray(response.data)) {
//         const pending = response.data
//           .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
//           .map((req) => ({
//             requestId: req.id,
//             toUserSkillId: req.toUserSkillId,
//             skillName: req.toUserSkillName,
//           }));
//         setMyPendingRequests(pending);
//       }
      
//       showSnackbar('Skills refreshed', 'success');
//     } catch (error) {
//       console.error("Failed to refresh", error);
//       showSnackbar("Failed to refresh skills", "error");
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   /* ================= FILTERING ================= */
//   const filteredSkills = skills.filter(
//     (skill) =>
//       skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory ? skill.category === selectedCategory : true)
//   );

//   /* ================= PAGINATION ================= */
//   const skillsPerPage = 6;
//   const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
//   const displayedSkills = filteredSkills.slice(
//     (currentPage - 1) * skillsPerPage,
//     currentPage * skillsPerPage
//   );

//   /* ================= UTILITIES ================= */
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const getPendingRequest = (skillId) => {
//     return myPendingRequests.find((req) => req.toUserSkillId === skillId);
//   };

//   /* ================= ACTIONS ================= */
//   const openRequestDialog = (skill) => {
//     if (myOfferSkills.length === 0) {
//       showSnackbar(
//         "You need to add OFFER skills in your profile first to request swaps",
//         "warning"
//       );
//       return;
//     }
//     setRequestDialog({ open: true, skill });
//     setSelectedMySkill("");
//   };

//   const closeRequestDialog = () => {
//     setRequestDialog({ open: false, skill: null });
//     setSelectedMySkill("");
//   };

//   const handleRequestSwap = async () => {
//     if (!selectedMySkill) {
//       showSnackbar("Please select a skill you want to offer", "warning");
//       return;
//     }

//     const { skill } = requestDialog;

//     try {
//       setRequesting(true);

//       const request = {
//         fromUserSkillId: parseInt(selectedMySkill),
//         toUserId: skill.ownerId,
//         toUserSkillId: skill.id,
//       };

//       const response = await createMatchRequest(request);

//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
        
//         setMyPendingRequests((prev) => [
//           ...prev,
//           {
//             requestId: response.data.id,
//             toUserSkillId: skill.id,
//             skillName: skill.skillName,
//           },
//         ]);
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to send request", error);
//       showSnackbar(
//         error.response?.data?.message || 
//         error.response?.data?.error || 
//         error.message || 
//         "Failed to send swap request",
//         "error"
//       );
//     } finally {
//       setRequesting(false);
//     }
//   };

//   const openCancelModal = (pendingRequest) => {
//     setCancelModal({
//       open: true,
//       requestId: pendingRequest.requestId,
//       skillName: pendingRequest.skillName,
//     });
//   };

//   const closeCancelModal = () => {
//     setCancelModal({
//       open: false,
//       requestId: null,
//       skillName: null,
//     });
//   };

//   const handleCancelRequest = async () => {
//     try {
//       setCancelling(true);
      
//       const response = await cancelMatchRequest(cancelModal.requestId);

//       if (response.success) {
//         showSnackbar(`Request for "${cancelModal.skillName}" cancelled!`, "info");
        
//         setMyPendingRequests((prev) =>
//           prev.filter((req) => req.requestId !== cancelModal.requestId)
//         );
        
//         closeCancelModal();
//       } else {
//         showSnackbar(response.message || "Failed to cancel request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to cancel request", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to cancel request",
//         "error"
//       );
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const getLevelColor = (level) => {
//     const colors = {
//       BEGINNER: 'info',
//       INTERMEDIATE: 'warning',
//       ADVANCED: 'success',
//       EXPERT: 'error',
//     };
//     return colors[level] || 'default';
//   };

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
//           }}
//         >
//           <Stack
//             direction="row"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: { xs: 1, sm: 2 } }}>
//                 <Code sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
//                 <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
//                   Browse Skills
//                 </Typography>
//               </Box>
//               <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                 Discover talented individuals and exchange skills
//               </Typography>
//             </Box>
//             <IconButton
//               onClick={handleRefresh}
//               disabled={refreshing}
//               sx={{
//                 color: "white",
//                 bgcolor: "rgba(255,255,255,0.1)",
//                 "&:hover": {
//                   bgcolor: "rgba(255,255,255,0.2)",
//                   transform: "rotate(180deg)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <RefreshIcon />
//             </IconButton>
//           </Stack>
//         </Paper>

//         {/* Info Alert */}
//         {myOfferSkills.length === 0 && (
//           <Alert
//             severity="info"
//             sx={{
//               mb: { xs: 2, sm: 3 },
//               borderRadius: 2,
//               '& .MuiAlert-icon': {
//                 fontSize: { xs: 24, sm: 28 },
//               },
//               fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//             }}
//           >
//             <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//               You need to add OFFER skills in your profile before requesting swaps.
//               Go to your profile and add skills you can teach!
//             </Typography>
//           </Alert>
//         )}

//         {/* Search & Filters */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             mb: { xs: 2, sm: 3 },
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark ? '#1e1e2e' : '#ffffff',
//             border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//           }}
//         >
//           <Stack spacing={2}>
//             <TextField
//               placeholder="Search skills..."
//               size="small"
//               fullWidth
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                 },
//                 '& .MuiInputBase-input': {
//                   fontSize: { xs: "0.875rem", sm: "1rem" },
//                 },
//               }}
//             />

//             <Box>
//               <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
//                 <FilterList fontSize="small" />
//                 <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   Filter by Category
//                 </Typography>
//               </Stack>
//               <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
//                 <Chip
//                   label="All"
//                   clickable
//                   color={selectedCategory === "" ? "primary" : "default"}
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setCurrentPage(1);
//                   }}
//                   sx={{ fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
//                 />
//                 {categories.map((cat) => (
//                   <Chip
//                     key={cat}
//                     label={cat}
//                     clickable
//                     color={selectedCategory === cat ? "primary" : "default"}
//                     onClick={() => {
//                       setSelectedCategory(selectedCategory === cat ? "" : cat);
//                       setCurrentPage(1);
//                     }}
//                     sx={{ fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
//                   />
//                 ))}
//               </Stack>
//             </Box>
//           </Stack>
//         </Paper>

//         {/* Loading State */}
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress size={50} />
//           </Box>
//         ) : (
//           <>
//             {/* Skills Grid */}
//             {displayedSkills.length === 0 ? (
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 4, sm: 5, md: 6 },
//                   textAlign: 'center',
//                   borderRadius: { xs: 2, md: 3 },
//                   background: isDark ? '#1e1e2e' : '#ffffff',
//                   border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 64, sm: 80 },
//                     height: { xs: 64, sm: 80 },
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: { xs: 2, sm: 3 },
//                   }}
//                 >
//                   <Search sx={{ fontSize: { xs: 32, sm: 40 }, color: 'white' }} />
//                 </Box>
//                 <Typography variant="h6" fontWeight={600} sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
//                   No skills found
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   Try adjusting your search or filters
//                 </Typography>
//               </Paper>
//             ) : (
//               <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//                 {displayedSkills.map((skill) => {
//                   const pendingRequest = getPendingRequest(skill.id);
//                   const hasPendingRequest = !!pendingRequest;

//                   return (
//                     <Grid item xs={12} sm={6} lg={4} key={skill.id}>
//                       <Card
//                         elevation={0}
//                         sx={{
//                           height: '100%',
//                           width: 370,
//                           borderRadius: { xs: 2, md: 3 },
//                           background: isDark ? '#1e1e2e' : '#ffffff',
//                           border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             transform: 'translateY(-8px)',
//                             boxShadow: isDark
//                               ? '0 12px 24px rgba(0,0,0,0.4)'
//                               : '0 12px 24px rgba(0,0,0,0.1)',
//                           },
//                         }}
//                       >
//                         <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
//                           {/* Skill Header */}
//                           <Box
//                             sx={{
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: { xs: 1.5, sm: 2 },
//                               mb: 2,
                              
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 width: { xs: 44, sm: 50 },
//                                 height: { xs: 44, sm: 50 },
//                                 borderRadius: 2,
//                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }}
//                             >
//                               <Code sx={{ color: 'white', fontSize: { xs: 24, sm: 28 } }} />
//                             </Box>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography variant="h6" fontWeight={700} noWrap sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
//                                 {skill.skillName}
//                               </Typography>
//                               <Chip
//                                 label={skill.level}
//                                 size="small"
//                                 color={getLevelColor(skill.level)}
//                                 sx={{ mt: 0.5, fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.7rem" } }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2 }} />

//                           {/* Owner Info */}
//                           <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
//                             <Avatar
//                               src={skill.ownerAvatar}
//                               alt={skill.ownerName}
//                               sx={{ 
//                                 width: { xs: 32, sm: 36 }, 
//                                 height: { xs: 32, sm: 36 },
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                   transform: 'scale(1.1)',
//                                   transition: 'transform 0.2s ease',
//                                 }
//                               }}
//                               onClick={() => navigate(`/user/other-profile/${skill.ownerId}`)}
//                             >
//                               {skill.ownerName?.charAt(0)}
//                             </Avatar>
//                             <Box sx={{ flex: 1, minWidth: 0 }}>
//                               <Typography variant="body2" color="text.secondary" fontSize={{ xs: "0.65rem", sm: "0.7rem" }}>
//                                 Offered by
//                               </Typography>
//                               <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                                 {skill.ownerName}
//                               </Typography>
//                             </Box>
//                           </Stack>

//                           {/* Category */}
//                           <Chip
//                             label={skill.category}
//                             size="small"
//                             variant="outlined"
//                             color="secondary"
//                             sx={{ mb: 2, fontWeight: 500, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
//                           />

//                           {/* Action Button */}
//                           {hasPendingRequest ? (
//                             <Button
//                               fullWidth
//                               variant="outlined"
//                               color="error"
//                               startIcon={<Cancel />}
//                               onClick={() => openCancelModal(pendingRequest)}
//                               sx={{
//                                 borderRadius: 2,
//                                 py: { xs: 1, sm: 1.2 },
//                                 fontWeight: 600,
//                                 borderWidth: 2,
//                                 fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                                 '&:hover': {
//                                   borderWidth: 2,
//                                 },
//                               }}
//                             >
//                               Cancel Request
//                             </Button>
//                           ) : (
//                             <Button
//                               fullWidth
//                               variant="contained"
//                               startIcon={<SwapHoriz />}
//                               onClick={() => openRequestDialog(skill)}
//                               disabled={myOfferSkills.length === 0}
//                               sx={{
//                                 borderRadius: 2,
//                                 py: { xs: 1, sm: 1.2 },
//                                 fontWeight: 600,
//                                 fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                 '&:hover': {
//                                   background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
//                                 },
//                               }}
//                             >
//                               Request Swap
//                             </Button>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: { xs: 3, sm: 4 }, flexWrap: 'wrap' }}>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     variant={currentPage === i + 1 ? 'contained' : 'outlined'}
//                     onClick={() => setCurrentPage(i + 1)}
//                     sx={{
//                       minWidth: { xs: 36, sm: 40 },
//                       borderRadius: 2,
//                       fontWeight: 600,
//                       fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                     }}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </Box>
//             )}
//           </>
//         )}
//       </Box>

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             background: isDark ? '#1e1e2e' : '#ffffff',
//             m: { xs: 2, sm: 3 },
//           },
//         }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//             Request Skill Swap
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           {requestDialog.skill && (
//             <Stack spacing={3}>
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
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   You want to learn
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600} color="primary" sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
//                   {requestDialog.skill.skillName}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mt: 0.5, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//                   from <strong>{requestDialog.skill.ownerName}</strong>
//                 </Typography>
//               </Paper>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer in exchange"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 helperText="Choose one of your OFFER skills to exchange"
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   },
//                   '& .MuiInputBase-input': {
//                     fontSize: { xs: "0.875rem", sm: "1rem" },
//                   },
//                 }}
//               >
//                 {myOfferSkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Stack>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
//           <Button
//             onClick={closeRequestDialog}
//             disabled={requesting}
//             sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting ? <CircularProgress size={20} /> : <SwapHoriz />}
//             sx={{
//               borderRadius: 2,
//               fontWeight: 600,
//               px: { xs: 2, sm: 3 },
//               fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//             }}
//           >
//             {requesting ? 'Sending...' : 'Send Request'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Cancel Confirmation Modal */}
//       <Modal open={cancelModal.open} onClose={closeCancelModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: { xs: '90%', sm: 400 },
//             maxWidth: '95%',
//             bgcolor: isDark ? '#1e1e2e' : 'background.paper',
//             borderRadius: 3,
//             p: { xs: 3, sm: 4 },
//             boxShadow: 24,
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h6" fontWeight={600} sx={{ mb: 3, fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//             Cancel Request?
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//             Are you sure you want to cancel the request for "{cancelModal.skillName}"?
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="center">
//             <Button
//               variant="outlined"
//               onClick={closeCancelModal}
//               disabled={cancelling}
//               sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
//             >
//               No
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleCancelRequest}
//               disabled={cancelling}
//               startIcon={cancelling ? <CircularProgress size={20} /> : <Cancel />}
//               sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
//             >
//               {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }
























// src/pages/user/UserBrowse.jsx
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress,
  Modal,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Search,
  SwapHoriz,
  Cancel,
  Person,
  TrendingUp,
  FilterList,
  Code,
  Refresh as RefreshIcon,
  RateReview, // ✅ NEW IMPORT
} from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "@services/userService";
import { createMatchRequest, getMatchRequests, cancelMatchRequest } from "@services/matchRequestService";
import AuthContext from "@context/AuthContext";
import ReviewList from "@components/user/ReviewList"; // ✅ NEW IMPORT

export default function UserBrowse() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isDark = theme.palette.mode === 'dark';

  const [skills, setSkills] = useState([]);
  const [myOfferSkills, setMyOfferSkills] = useState([]);
  const [myPendingRequests, setMyPendingRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [requestDialog, setRequestDialog] = useState({
    open: false,
    skill: null,
  });
  const [selectedMySkill, setSelectedMySkill] = useState("");
  const [requesting, setRequesting] = useState(false);

  const [cancelModal, setCancelModal] = useState({
    open: false,
    requestId: null,
    skillName: null,
  });
  const [cancelling, setCancelling] = useState(false);

  // ✅ NEW STATE FOR REVIEWS
  const [reviewModal, setReviewModal] = useState({
    open: false,
    userId: null,
    userName: null,
  });

  const categories = ["C Programming", "JavaScript", "Java", ".NET", "Python"];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();

        const currentUser = users.find((u) => u.email === user?.email);
        
        if (currentUser) {
          const offerSkills = currentUser.skills
            .filter((s) => s.type === "OFFER")
            .map((s) => ({
              id: s.userSkillId,
              skillName: s.skillName,
              level: s.level,
            }));
          setMyOfferSkills(offerSkills);
        }

        const otherOfferSkills = users
          .filter((u) => u.email !== user?.email)
          .flatMap((u) =>
            u.skills
              .filter((s) => s.type === "OFFER")
              .map((s) => ({
                id: s.userSkillId,
                skillName: s.skillName,
                level: s.level,
                category: s.skillName,
                ownerName: u.fullName,
                ownerEmail: u.email,
                ownerId: u.userId,
                ownerAvatar: u.avatarUrl,
              }))
          );
        
        setSkills(otherOfferSkills);
      } catch (error) {
        console.error("Failed to fetch skills", error);
        showSnackbar("Failed to load skills", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchSkills();
  }, [user]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await getMatchRequests();
        
        if (response.success && Array.isArray(response.data)) {
          const pending = response.data
            .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
            .map((req) => ({
              requestId: req.id,
              toUserSkillId: req.toUserSkillId,
              skillName: req.toUserSkillName,
            }));
          setMyPendingRequests(pending);
        }
      } catch (error) {
        console.error("Failed to fetch pending requests", error);
      }
    };

    if (user?.id) fetchPendingRequests();
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const users = await getAllUsers();
      const currentUser = users.find((u) => u.email === user?.email);
      
      if (currentUser) {
        const offerSkills = currentUser.skills
          .filter((s) => s.type === "OFFER")
          .map((s) => ({
            id: s.userSkillId,
            skillName: s.skillName,
            level: s.level,
          }));
        setMyOfferSkills(offerSkills);
      }

      const otherOfferSkills = users
        .filter((u) => u.email !== user?.email)
        .flatMap((u) =>
          u.skills
            .filter((s) => s.type === "OFFER")
            .map((s) => ({
              id: s.userSkillId,
              skillName: s.skillName,
              level: s.level,
              category: s.skillName,
              ownerName: u.fullName,
              ownerEmail: u.email,
              ownerId: u.userId,
              ownerAvatar: u.avatarUrl,
            }))
        );
      
      setSkills(otherOfferSkills);

      const response = await getMatchRequests();
      if (response.success && Array.isArray(response.data)) {
        const pending = response.data
          .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
          .map((req) => ({
            requestId: req.id,
            toUserSkillId: req.toUserSkillId,
            skillName: req.toUserSkillName,
          }));
        setMyPendingRequests(pending);
      }
      
      showSnackbar('Skills refreshed', 'success');
    } catch (error) {
      console.error("Failed to refresh", error);
      showSnackbar("Failed to refresh skills", "error");
    } finally {
      setRefreshing(false);
    }
  };

  /* ================= FILTERING ================= */
  const filteredSkills = skills.filter(
    (skill) =>
      skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? skill.category === selectedCategory : true)
  );

  /* ================= PAGINATION ================= */
  const skillsPerPage = 6;
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
  const displayedSkills = filteredSkills.slice(
    (currentPage - 1) * skillsPerPage,
    currentPage * skillsPerPage
  );

  /* ================= UTILITIES ================= */
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const getPendingRequest = (skillId) => {
    return myPendingRequests.find((req) => req.toUserSkillId === skillId);
  };

  // ✅ NEW FUNCTION - Open review modal
  const openReviewModal = (skill) => {
    setReviewModal({
      open: true,
      userId: skill.ownerId,
      userName: skill.ownerName,
    });
  };

  /* ================= ACTIONS ================= */
  const openRequestDialog = (skill) => {
    if (myOfferSkills.length === 0) {
      showSnackbar(
        "You need to add OFFER skills in your profile first to request swaps",
        "warning"
      );
      return;
    }
    setRequestDialog({ open: true, skill });
    setSelectedMySkill("");
  };

  const closeRequestDialog = () => {
    setRequestDialog({ open: false, skill: null });
    setSelectedMySkill("");
  };

  const handleRequestSwap = async () => {
    if (!selectedMySkill) {
      showSnackbar("Please select a skill you want to offer", "warning");
      return;
    }

    const { skill } = requestDialog;

    try {
      setRequesting(true);

      const request = {
        fromUserSkillId: parseInt(selectedMySkill),
        toUserId: skill.ownerId,
        toUserSkillId: skill.id,
      };

      const response = await createMatchRequest(request);

      if (response.success) {
        showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
        closeRequestDialog();
        
        setMyPendingRequests((prev) => [
          ...prev,
          {
            requestId: response.data.id,
            toUserSkillId: skill.id,
            skillName: skill.skillName,
          },
        ]);
      } else {
        showSnackbar(response.message || "Failed to send request", "error");
      }
    } catch (error) {
      console.error("Failed to send request", error);
      showSnackbar(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Failed to send swap request",
        "error"
      );
    } finally {
      setRequesting(false);
    }
  };

  const openCancelModal = (pendingRequest) => {
    setCancelModal({
      open: true,
      requestId: pendingRequest.requestId,
      skillName: pendingRequest.skillName,
    });
  };

  const closeCancelModal = () => {
    setCancelModal({
      open: false,
      requestId: null,
      skillName: null,
    });
  };

  const handleCancelRequest = async () => {
    try {
      setCancelling(true);
      
      const response = await cancelMatchRequest(cancelModal.requestId);

      if (response.success) {
        showSnackbar(`Request for "${cancelModal.skillName}" cancelled!`, "info");
        
        setMyPendingRequests((prev) =>
          prev.filter((req) => req.requestId !== cancelModal.requestId)
        );
        
        closeCancelModal();
      } else {
        showSnackbar(response.message || "Failed to cancel request", "error");
      }
    } catch (error) {
      console.error("Failed to cancel request", error);
      showSnackbar(
        error.response?.data?.message || "Failed to cancel request",
        "error"
      );
    } finally {
      setCancelling(false);
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      BEGINNER: 'info',
      INTERMEDIATE: 'warning',
      ADVANCED: 'success',
      EXPERT: 'error',
    };
    return colors[level] || 'default';
  };

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
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: { xs: 1, sm: 2 } }}>
                <Code sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
                  Browse Skills
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                Discover talented individuals and exchange skills
              </Typography>
            </Box>
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "rotate(180deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Stack>
        </Paper>

        {/* Info Alert */}
        {myOfferSkills.length === 0 && (
          <Alert
            severity="info"
            sx={{
              mb: { xs: 2, sm: 3 },
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: { xs: 24, sm: 28 },
              },
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              You need to add OFFER skills in your profile before requesting swaps.
              Go to your profile and add skills you can teach!
            </Typography>
          </Alert>
        )}

        {/* Search & Filters */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark ? '#1e1e2e' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <Stack spacing={2}>
            <TextField
              placeholder="Search skills..."
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />

            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                <FilterList fontSize="small" />
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                  Filter by Category
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip
                  label="All"
                  clickable
                  color={selectedCategory === "" ? "primary" : "default"}
                  onClick={() => {
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  sx={{ fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
                />
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    clickable
                    color={selectedCategory === cat ? "primary" : "default"}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat ? "" : cat);
                      setCurrentPage(1);
                    }}
                    sx={{ fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {/* Skills Grid */}
            {displayedSkills.length === 0 ? (
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
                <Box
                  sx={{
                    width: { xs: 64, sm: 80 },
                    height: { xs: 64, sm: 80 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: { xs: 2, sm: 3 },
                  }}
                >
                  <Search sx={{ fontSize: { xs: 32, sm: 40 }, color: 'white' }} />
                </Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                  No skills found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                  Try adjusting your search or filters
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                {displayedSkills.map((skill) => {
                  const pendingRequest = getPendingRequest(skill.id);
                  const hasPendingRequest = !!pendingRequest;

                  return (
                    <Grid item xs={12} sm={6} lg={4} key={skill.id}>
                      <Card
                        elevation={0}
                        sx={{
                          width: 370,
                          height: '100%',
                          borderRadius: { xs: 2, md: 3 },
                          background: isDark ? '#1e1e2e' : '#ffffff',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: isDark
                              ? '0 12px 24px rgba(0,0,0,0.4)'
                              : '0 12px 24px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                          {/* Skill Header */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: { xs: 1.5, sm: 2 },
                              mb: 2,
                            }}
                          >
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
                              <Code sx={{ color: 'white', fontSize: { xs: 24, sm: 28 } }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="h6" fontWeight={700} noWrap sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                                {skill.skillName}
                              </Typography>
                              <Chip
                                label={skill.level}
                                size="small"
                                color={getLevelColor(skill.level)}
                                sx={{ mt: 0.5, fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.7rem" } }}
                              />
                            </Box>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* Owner Info */}
                          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                            <Avatar
                              src={skill.ownerAvatar}
                              alt={skill.ownerName}
                              sx={{ 
                                width: { xs: 32, sm: 36 }, 
                                height: { xs: 32, sm: 36 },
                                cursor: 'pointer',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                  transition: 'transform 0.2s ease',
                                }
                              }}
                              onClick={() => navigate(`/user/other-profile/${skill.ownerId}`)}
                            >
                              {skill.ownerName?.charAt(0)}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="body2" color="text.secondary" fontSize={{ xs: "0.65rem", sm: "0.7rem" }}>
                                Offered by
                              </Typography>
                              <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                                {skill.ownerName}
                              </Typography>
                            </Box>
                          </Stack>

                          {/* Category */}
                          <Chip
                            label={skill.category}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            sx={{ mb: 2, fontWeight: 500, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                          />

                          {/* ✅ NEW - View Reviews Button */}
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<RateReview />}
                            onClick={() => openReviewModal(skill)}
                            sx={{
                              borderRadius: 2,
                              py: { xs: 1, sm: 1.2 },
                              fontWeight: 600,
                              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                              mb: 1.5,
                            }}
                          >
                            View Reviews
                          </Button>

                          {/* Action Button */}
                          {hasPendingRequest ? (
                            <Button
                              fullWidth
                              variant="outlined"
                              color="error"
                              startIcon={<Cancel />}
                              onClick={() => openCancelModal(pendingRequest)}
                              sx={{
                                borderRadius: 2,
                                py: { xs: 1, sm: 1.2 },
                                fontWeight: 600,
                                borderWidth: 2,
                                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                                '&:hover': {
                                  borderWidth: 2,
                                },
                              }}
                            >
                              Cancel Request
                            </Button>
                          ) : (
                            <Button
                              fullWidth
                              variant="contained"
                              startIcon={<SwapHoriz />}
                              onClick={() => openRequestDialog(skill)}
                              disabled={myOfferSkills.length === 0}
                              sx={{
                                borderRadius: 2,
                                py: { xs: 1, sm: 1.2 },
                                fontWeight: 600,
                                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
                                },
                              }}
                            >
                              Request Swap
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: { xs: 3, sm: 4 }, flexWrap: 'wrap' }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                    onClick={() => setCurrentPage(i + 1)}
                    sx={{
                      minWidth: { xs: 36, sm: 40 },
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Request Swap Dialog */}
      <Dialog
        open={requestDialog.open}
        onClose={closeRequestDialog}
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
            Request Skill Swap
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {requestDialog.skill && (
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  background: isDark
                    ? 'rgba(102, 126, 234, 0.1)'
                    : 'rgba(102, 126, 234, 0.08)',
                  border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                  You want to learn
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary" sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                  {requestDialog.skill.skillName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                  from <strong>{requestDialog.skill.ownerName}</strong>
                </Typography>
              </Paper>

              <TextField
                select
                fullWidth
                label="Select skill you want to offer in exchange"
                value={selectedMySkill}
                onChange={(e) => setSelectedMySkill(e.target.value)}
                helperText="Choose one of your OFFER skills to exchange"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              >
                {myOfferSkills.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.skillName} ({skill.level})
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
          <Button
            onClick={closeRequestDialog}
            disabled={requesting}
            sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRequestSwap}
            variant="contained"
            disabled={requesting || !selectedMySkill}
            startIcon={requesting ? <CircularProgress size={20} /> : <SwapHoriz />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            {requesting ? 'Sending...' : 'Send Request'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Modal */}
      <Modal open={cancelModal.open} onClose={closeCancelModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            maxWidth: '95%',
            bgcolor: isDark ? '#1e1e2e' : 'background.paper',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3, fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
            Cancel Request?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
            Are you sure you want to cancel the request for "{cancelModal.skillName}"?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              onClick={closeCancelModal}
              disabled={cancelling}
              sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelRequest}
              disabled={cancelling}
              startIcon={cancelling ? <CircularProgress size={20} /> : <Cancel />}
              sx={{ borderRadius: 2, px: { xs: 2, sm: 3 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
            >
              {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* ✅ NEW - Review List Modal */}
      <ReviewList
        open={reviewModal.open}
        onClose={() => setReviewModal({ open: false, userId: null, userName: null })}
        userId={reviewModal.userId}
        userName={reviewModal.userName}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}