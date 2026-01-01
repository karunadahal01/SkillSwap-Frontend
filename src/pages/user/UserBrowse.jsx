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
//   Modal,
//   useTheme,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState } from "react";

// const dummySkills = [
//   { id: 1, skill: "Guitar Lessons", owner: "Alice", category: "Music", description: "Learn acoustic guitar basics." },
//   { id: 2, skill: "Painting", owner: "Bob", category: "Art", description: "Watercolor painting for beginners." },
//   { id: 3, skill: "Yoga", owner: "Sara", category: "Fitness", description: "Morning yoga sessions at home." },
//   { id: 4, skill: "Cooking", owner: "John", category: "Culinary", description: "Italian cooking recipes." },
//   { id: 5, skill: "Photography", owner: "Emma", category: "Creative", description: "Digital photography basics." },
//   { id: 6, skill: "Java", owner: "Mark", category: "Coding", description: "Learn Java Core." },
//   { id: 7, skill: "React", owner: "Joe", category: "Coding", description: "Learn React Basics." },
//   { id: 8, skill: "Python", owner: "Lucy", category: "Coding", description: "Learn Python Fundamentals." },
//   { id: 9, skill: "Piano", owner: "Tom", category: "Music", description: "Beginner piano lessons." },
//   { id: 10, skill: "Sketching", owner: "Nina", category: "Art", description: "Learn sketching techniques." },
// ];

// const ownerProfiles = {
//   Alice: { bio: "Music teacher, 5 years experience", skills: ["Guitar", "Piano"] },
//   Bob: { bio: "Freelance artist", skills: ["Painting", "Sketching"] },
//   Sara: { bio: "Fitness trainer", skills: ["Yoga", "Meditation"] },
//   John: { bio: "Chef", skills: ["Cooking", "Baking"] },
//   Emma: { bio: "Photographer", skills: ["Photography"] },
//   Mark: { bio: "Software engineer", skills: ["Java", "Spring"] },
//   Joe: { bio: "Frontend dev", skills: ["React", "CSS"] },
//   Lucy: { bio: "Python enthusiast", skills: ["Python", "Data Analysis"] },
//   Tom: { bio: "Pianist", skills: ["Piano"] },
//   Nina: { bio: "Art lover", skills: ["Sketching", "Painting"] },
// };

// export default function UserBrowse() {
//   const theme = useTheme();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [profileModalOpen, setProfileModalOpen] = useState(false);
//   const [selectedOwner, setSelectedOwner] = useState("");
//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding"];

//   const filteredSkills = dummySkills.filter(
//     (skill) =>
//       skill.skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory ? skill.category === selectedCategory : true)
//   );

//   // Pagination
//   const skillsPerPage = 6;
//   const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
//   const displayedSkills = filteredSkills.slice(
//     (currentPage - 1) * skillsPerPage,
//     currentPage * skillsPerPage
//   );

//   const handleOwnerClick = (owner) => {
//     setSelectedOwner(owner);
//     setProfileModalOpen(true);
//   };

//   const toggleSwapRequest = (skillId, skillName) => {
//     if (requestedSwaps.includes(skillId)) {
//       setRequestedSwaps((prev) => prev.filter((id) => id !== skillId));
//       setSnackbarMsg(`Swap request for "${skillName}" cancelled.`);
//     } else {
//       setRequestedSwaps((prev) => [...prev, skillId]);
//       setSnackbarMsg(`Swap requested for "${skillName}".`);
//     }
//     setSnackbarOpen(true);
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, marginTop:4}}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         Browse Skills
//       </Typography>

//       {/* Search & Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           sx={{ flex: 1, minWidth: 200 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Skill Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography variant="body2" color="text.secondary">
//               No skills found.
//             </Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);
//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   width: "100%", // Full width
//                   boxSizing: "border-box",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {skill.skill}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="primary"
//                     sx={{ cursor: "pointer" }}
//                     onClick={() => handleOwnerClick(skill.owner)}
//                   >
//                     Owner: {skill.owner}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{ mt: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
//                   >
//                     {skill.description}
//                   </Typography>
//                   <Chip label={skill.category} size="small" sx={{ mt: 1 }} color="secondary" />
//                 </Box>
//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() => toggleSwapRequest(skill.id, skill.skill)}
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             mt: 3,
//             gap: 1,
//             position: "sticky",
//             bottom: 0,
//             bgcolor: theme.palette.background.default,
//             py: 1.5,
//             borderTop: `1px solid ${theme.palette.divider}`,
//           }}
//         >
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Owner Profile Modal */}
//       <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 350 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             {selectedOwner}'s Profile
//           </Typography>
//           {selectedOwner && ownerProfiles[selectedOwner] && (
//             <>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Bio: {ownerProfiles[selectedOwner].bio}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Skills: {ownerProfiles[selectedOwner].skills.join(", ")}
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={() => setProfileModalOpen(false)}
//               >
//                 Close
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="info"
//           sx={{ width: "100%" }}
//         >
//           {snackbarMsg}
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
//   Modal,
//   useTheme,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useEffect, useState } from "react";
// import { getAllUsers } from "@services/userService";

// export default function UserBrowse() {
//   const theme = useTheme();

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [profileModalOpen, setProfileModalOpen] = useState(false);
//   const [selectedOwner, setSelectedOwner] = useState(null);

//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding"];

//   /* ================= FETCH USERS & OFFER SKILLS ================= */
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getAllUsers();

//         const flattenedSkills = data.flatMap((user) =>
//           user.skills
//             .filter((skill) => skill.type === "OFFER") // 🔥 ONLY OFFER SKILLS
//             .map((skill) => ({
//               id: skill.userSkillId,
//               skillName: skill.skillName,
//               category: skill.skillName, // adjust later if backend adds category
//               level: skill.level,
//               owner: user,
//             }))
//         );

//         setSkills(flattenedSkills);
//       } catch (error) {
//         console.error("Failed to load skills", error);
//       }
//     };

//     fetchUsers();
//   }, []);

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

//   /* ================= HANDLERS ================= */
//   const handleOwnerClick = (owner) => {
//     setSelectedOwner(owner);
//     setProfileModalOpen(true);
//   };

//   const toggleSwapRequest = (skillId, skillName) => {
//     if (requestedSwaps.includes(skillId)) {
//       setRequestedSwaps((prev) => prev.filter((id) => id !== skillId));
//       setSnackbarMsg(`Swap request for "${skillName}" cancelled.`);
//     } else {
//       setRequestedSwaps((prev) => [...prev, skillId]);
//       setSnackbarMsg(`Swap requested for "${skillName}".`);
//     }
//     setSnackbarOpen(true);
//   };

//   /* ================= UI ================= */
//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, marginTop: 4 }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         Browse Skills
//       </Typography>

//       {/* Search & Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           sx={{ flex: 1, minWidth: 200 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Skill Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography variant="body2" color="text.secondary">
//               No skills found.
//             </Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   width: "100%",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {skill.skillName}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="primary"
//                     sx={{ cursor: "pointer" }}
//                     onClick={() => handleOwnerClick(skill.owner)}
//                   >
//                     Owner: {skill.owner.fullName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip
//                     label={skill.category}
//                     size="small"
//                     sx={{ mt: 1 }}
//                     color="secondary"
//                   />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() =>
//                     toggleSwapRequest(skill.id, skill.skillName)
//                   }
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             mt: 3,
//             gap: 1,
//           }}
//         >
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Owner Profile Modal */}
//       <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 350 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           {selectedOwner && (
//             <>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 {selectedOwner.fullName}
//               </Typography>
//               <Typography variant="body2">
//                 Email: {selectedOwner.email}
//               </Typography>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 2 }}
//                 onClick={() => setProfileModalOpen(false)}
//               >
//                 Close
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
//   Modal,
//   useTheme,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const users = await getAllUsers();

//         const offerSkills = users
//           // ❌ hide logged-in user's own listings
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER") // OFFER ONLY
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder until backend adds category
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//               }))
//           );

//         setSkills(offerSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//       }
//     };

//     if (user?.email) {
//       fetchSkills();
//     }
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

//   /* ================= ACTIONS ================= */
//   const toggleSwapRequest = (skillId, skillName) => {
//     if (requestedSwaps.includes(skillId)) {
//       setRequestedSwaps((prev) => prev.filter((id) => id !== skillId));
//       setSnackbarMsg(`Swap request cancelled for "${skillName}".`);
//     } else {
//       setRequestedSwaps((prev) => [...prev, skillId]);
//       setSnackbarMsg(`Swap requested for "${skillName}".`);
//     }
//     setSnackbarOpen(true);
//   };

//   /* ================= UI ================= */
//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">
//               No skills found.
//             </Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">
//                     {skill.skillName}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mt: 0.5 }}
//                   >
//                     Owner: {skill.ownerName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip
//                     label={skill.category}
//                     size="small"
//                     sx={{ mt: 1 }}
//                     color="secondary"
//                   />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() =>
//                     toggleSwapRequest(skill.id, skill.skillName)
//                   }
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 1,
//             mt: 3,
//           }}
//         >
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const users = await getAllUsers();

//         const offerSkills = users
//           .filter((u) => u.email !== user?.email) // hide own listings
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//               }))
//           );

//         setSkills(offerSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//       }
//     };

//     if (user?.email) fetchSkills();
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

//   /* ================= ACTIONS ================= */
//   const toggleSwapRequest = (skillId, skillName) => {
//     if (requestedSwaps.includes(skillId)) {
//       setRequestedSwaps((prev) => prev.filter((id) => id !== skillId));
//       setSnackbarMsg(`Swap request cancelled for "${skillName}".`);
//     } else {
//       setRequestedSwaps((prev) => [...prev, skillId]);
//       setSnackbarMsg(`Swap requested for "${skillName}".`);
//     }
//     setSnackbarOpen(true);
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           {/* ✅ ALL OPTION */}
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />

//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">
//               No skills found.
//             </Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">
//                     {skill.skillName}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mt: 0.5 }}
//                   >
//                     Owner: {skill.ownerName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip
//                     label={skill.category}
//                     size="small"
//                     sx={{ mt: 1 }}
//                     color="secondary"
//                   />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() =>
//                     toggleSwapRequest(skill.id, skill.skillName)
//                   }
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, cancelMatchRequest } from "@services/userSwapService";
// import AuthContext from "@context/AuthContext";
// import { useSwap } from "@context/SwapContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);
//   const { requestedSwaps, addSwap, removeSwap } = useSwap();

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH USERS & SKILLS ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const users = await getAllUsers();
//         const offerSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//               }))
//           );
//         setSkills(offerSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//       }
//     };

//     if (user?.email) fetchSkills();
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

//   /* ================= SWAP ACTION ================= */
//   const toggleSwapRequest = async (skill) => {
//     try {
//       if (requestedSwaps.includes(skill.id)) {
//         await cancelMatchRequest(skill.id);
//         removeSwap(skill.id);
//         setSnackbarMsg(`Swap request cancelled for "${skill.skillName}".`);
//       } else {
//         await createMatchRequest({ requestedSkillId: skill.id });
//         addSwap(skill.id);
//         setSnackbarMsg(`Swap requested for "${skill.skillName}".`);
//       }
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error(err);
//       setSnackbarMsg(err.response?.data?.message || "Action failed.");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Categories */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => { setSelectedCategory(""); setCurrentPage(1); }}
//           />
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => { setSelectedCategory(selectedCategory === cat ? "" : cat); setCurrentPage(1); }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Skill Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">No skills found.</Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": { transform: "scale(1.02)", boxShadow: theme.shadows[6] },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">{skill.skillName}</Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                     Owner: {skill.ownerName}
//                   </Typography>
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>
//                   <Chip label={skill.category} size="small" sx={{ mt: 1 }} color="secondary" />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() => toggleSwapRequest(skill)}
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, cancelMatchRequest } from "@services/userSwapService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const users = await getAllUsers();

//         const offerSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//                 ownerId: u.id,
//               }))
//           );

//         setSkills(offerSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//       }
//     };

//     if (user?.email) fetchSkills();
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

//   /* ================= ACTIONS ================= */
//   const toggleSwapRequest = async (skill) => {
//     try {
//       // Ensure the user has an offered skill selected
//       const offeredSkillId = user?.offeredSkillId;
//       if (!offeredSkillId) {
//         setSnackbarMsg("Please select your offered skill first in your profile.");
//         setSnackbarOpen(true);
//         return;
//       }

//       if (requestedSwaps.includes(skill.id)) {
//         // Cancel swap request
//         await cancelMatchRequest(skill.id);
//         setRequestedSwaps((prev) => prev.filter((id) => id !== skill.id));
//         setSnackbarMsg(`Swap request cancelled for "${skill.skillName}".`);
//       } else {
//         // Create swap request
//         await createMatchRequest({
//           fromUserSkillId: offeredSkillId,
//           toUserId: skill.ownerId,
//           toUserSkillId: skill.id,
//         });
//         setRequestedSwaps((prev) => [...prev, skill.id]);
//         setSnackbarMsg(`Swap requested for "${skill.skillName}".`);
//       }

//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error(err);
//       setSnackbarMsg(err.response?.data?.message || "Action failed.");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">No skills found.</Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">{skill.skillName}</Typography>

//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                     Owner: {skill.ownerName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip label={skill.category} size="small" sx={{ mt: 1 }} color="secondary" />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() => toggleSwapRequest(skill)}
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, cancelMatchRequest } from "@services/userSwapService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const users = await getAllUsers();

//         // Flatten all users' offered skills excluding current user
//         const offerSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//                 ownerId: u.id,
//               }))
//           );

//         setSkills(offerSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         setSnackbarMsg("Failed to load skills.");
//         setSnackbarOpen(true);
//       }
//     };

//     if (user?.email) fetchSkills();
//   }, [user]);

//   /* ================= GET USER OFFERED SKILLS ================= */
//   const offeredSkills = user?.skills?.filter((s) => s.type === "OFFER") || [];

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

//   /* ================= ACTIONS ================= */
//   const toggleSwapRequest = async (skill) => {
//     if (offeredSkills.length === 0) {
//       setSnackbarMsg("Please add at least one offered skill in your profile before sending a swap request.");
//       setSnackbarOpen(true);
//       return;
//     }

//     const mySkill = offeredSkills[0]; // Using first offered skill by default

//     try {
//       if (requestedSwaps.includes(skill.id)) {
//         // Cancel swap request
//         await cancelMatchRequest(skill.id);
//         setRequestedSwaps((prev) => prev.filter((id) => id !== skill.id));
//         setSnackbarMsg(`Swap request cancelled for "${skill.skillName}".`);
//       } else {
//         // Create swap request
//         await createMatchRequest({
//           fromUserSkillId: mySkill.userSkillId,
//           toUserId: skill.ownerId,
//           toUserSkillId: skill.id,
//         });
//         setRequestedSwaps((prev) => [...prev, skill.id]);
//         setSnackbarMsg(`Swap requested for "${skill.skillName}".`);
//       }
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error(err);
//       setSnackbarMsg(err.response?.data?.message || "Action failed.");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />

//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">No skills found.</Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">{skill.skillName}</Typography>

//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                     Owner: {skill.ownerName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip label={skill.category} size="small" sx={{ mt: 1 }} color="secondary" />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() => toggleSwapRequest(skill)}
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, cancelMatchRequest } from "@services/userSwapService";
// import AuthContext from "@context/AuthContext";
// import axios from "@config/axios";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [allSkills, setAllSkills] = useState([]); // skills from other users
//   const [myOfferedSkills, setMyOfferedSkills] = useState([]); // your offered skills
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH CURRENT USER'S OFFERED SKILLS ================= */
//   useEffect(() => {
//     const fetchMySkills = async () => {
//       try {
//         if (!user?.id) return;
//         const res = await axios.get(`/api/user/skills/all/${user.id}`);
//         const offered = res.data.data.filter((s) => s.type === "OFFER");
//         setMyOfferedSkills(offered);
//       } catch (err) {
//         console.error("Failed to fetch my skills:", err);
//       }
//     };

//     fetchMySkills();
//   }, [user]);

//   /* ================= FETCH OTHER USERS' SKILLS ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         if (!user?.id) return;
//         const users = await getAllUsers();

//         const offerSkills = users
//           .filter((u) => u.id !== user.id) // exclude self
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,   // toUserSkillId
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder
//                 ownerName: u.fullName,
//                 ownerId: u.id,        // toUserId
//               }))
//           );

//         setAllSkills(offerSkills);
//       } catch (err) {
//         console.error("Failed to fetch skills:", err);
//       }
//     };

//     fetchSkills();
//   }, [user]);

//   /* ================= FILTERING ================= */
//   const filteredSkills = allSkills.filter(
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

//   /* ================= SWAP REQUEST ACTION ================= */
//   const toggleSwapRequest = async (skill) => {
//     try {
//       if (requestedSwaps.includes(skill.id)) {
//         // Cancel swap request
//         await cancelMatchRequest(skill.id);
//         setRequestedSwaps((prev) => prev.filter((id) => id !== skill.id));
//         setSnackbarMsg(`Swap request cancelled for "${skill.skillName}".`);
//       } else {
//         // Validate user has at least one offered skill
//         if (myOfferedSkills.length === 0) {
//           setSnackbarMsg("Please add at least one offered skill in your profile first.");
//           setSnackbarOpen(true);
//           return;
//         }

//         // Use first offered skill as fromUserSkillId
//         const payload = {
//           fromUserSkillId: myOfferedSkills[0].userSkillId,
//           toUserId: skill.ownerId,
//           toUserSkillId: skill.id,
//         };

//         await createMatchRequest(payload);
//         setRequestedSwaps((prev) => [...prev, skill.id]);
//         setSnackbarMsg(`Swap requested for "${skill.skillName}".`);
//       }

//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error(err);
//       setSnackbarMsg(err.response?.data?.message || "Action failed.");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />

//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">
//               No skills found.
//             </Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">{skill.skillName}</Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mt: 0.5 }}
//                   >
//                     Owner: {skill.ownerName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip
//                     label={skill.category}
//                     size="small"
//                     sx={{ mt: 1 }}
//                     color="secondary"
//                   />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() => toggleSwapRequest(skill)}
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest, cancelMatchRequest } from "@services/userSwapService";
// import AuthContext from "@context/AuthContext";
// import axios from "@config/axios";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [myOfferedSkills, setMyOfferedSkills] = useState([]);
//   const [requestedSwaps, setRequestedSwaps] = useState([]);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const users = await getAllUsers();

//         // Get all offer skills from other users
//         const offerSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // placeholder
//                 ownerName: u.fullName,
//                 ownerId: u.id,
//               }))
//           );
//         setSkills(offerSkills);

//         // Fetch my offered skills for swap
//         const mySkillsRes = await axios.get(`/api/user/skills/all/${user.id}`);
//         const offered = mySkillsRes.data.data.filter((s) => s.type === "OFFER");
//         setMyOfferedSkills(offered);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//       }
//     };

//     if (user?.email) fetchSkills();
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

//   /* ================= ACTIONS ================= */
//   const toggleSwapRequest = async (skill) => {
//     try {
//       if (requestedSwaps.includes(skill.id)) {
//         // Cancel request
//         await cancelMatchRequest(skill.id);
//         setRequestedSwaps((prev) => prev.filter((id) => id !== skill.id));
//         setSnackbarMsg(`Swap request cancelled for "${skill.skillName}".`);
//       } else {
//         if (myOfferedSkills.length === 0) {
//           setSnackbarMsg("Please add at least one offered skill in your profile first.");
//           setSnackbarOpen(true);
//           return;
//         }

//         const payload = {
//           fromUserSkillId: Number(myOfferedSkills[0].userSkillId),
//           toUserId: Number(skill.ownerId),
//           toUserSkillId: Number(skill.id),
//         };

//         // Validate payload
//         if (!payload.fromUserSkillId || !payload.toUserId || !payload.toUserSkillId) {
//           setSnackbarMsg("Invalid swap request. Please try again.");
//           setSnackbarOpen(true);
//           return;
//         }

//         console.log("Swap request payload:", payload);
//         await createMatchRequest(payload);
//         setRequestedSwaps((prev) => [...prev, skill.id]);
//         setSnackbarMsg(`Swap requested for "${skill.skillName}".`);
//       }
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error(err);
//       setSnackbarMsg(err.response?.data?.message || "Action failed.");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />

//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Listings */}
//       <Grid container spacing={3}>
//         {displayedSkills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography color="text.secondary">No skills found.</Typography>
//           </Grid>
//         )}

//         {displayedSkills.map((skill) => {
//           const isRequested = requestedSwaps.includes(skill.id);

//           return (
//             <Grid item xs={12} key={skill.id} display="flex">
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: theme.shadows[6],
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography fontWeight="bold">{skill.skillName}</Typography>

//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                     Owner: {skill.ownerName}
//                   </Typography>

//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Level: {skill.level}
//                   </Typography>

//                   <Chip label={skill.category} size="small" sx={{ mt: 1 }} color="secondary" />
//                 </Box>

//                 <Button
//                   variant={isRequested ? "outlined" : "contained"}
//                   color={isRequested ? "error" : "primary"}
//                   startIcon={<SwapHorizIcon />}
//                   sx={{ mt: 2 }}
//                   onClick={() => toggleSwapRequest(skill)}
//                 >
//                   {isRequested ? "Cancel Request" : "Request Swap"}
//                 </Button>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <Button
//               key={i + 1}
//               variant={currentPage === i + 1 ? "contained" : "outlined"}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </Button>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={2500}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [mySkills, setMySkills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Snackbar
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Request Dialog
//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requestMessage, setRequestMessage] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();

//         // Get current user's WANT skills (what I'm looking for)
//         const currentUser = users.find((u) => u.email === user?.email);
//         if (currentUser) {
//           const wantSkills = currentUser.skills
//             .filter((s) => s.type === "WANT")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//             }));
//           setMySkills(wantSkills);
//         }

//         // Get other users' OFFER skills
//         const offerSkills = users
//           .filter((u) => u.email !== user?.email)
//           .flatMap((u) =>
//             u.skills
//               .filter((s) => s.type === "OFFER")
//               .map((s) => ({
//                 id: s.userSkillId,
//                 skillName: s.skillName,
//                 level: s.level,
//                 category: s.skillName, // Use skillName as category or map accordingly
//                 ownerName: u.fullName,
//                 ownerEmail: u.email,
//                 ownerId: u.id,
//               }))
//           );
//         setSkills(offerSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
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

//   /* ================= ACTIONS ================= */
//   const openRequestDialog = (skill) => {
//     setRequestDialog({ open: true, skill });
//     setSelectedMySkill("");
//     setRequestMessage("");
//   };

//   const closeRequestDialog = () => {
//     setRequestDialog({ open: false, skill: null });
//     setSelectedMySkill("");
//     setRequestMessage("");
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
//         toUserId: skill.ownerId,
//         offeredSkillId: parseInt(selectedMySkill),
//         requestedSkillId: skill.id,
//         message: requestMessage.trim() || undefined,
//       };

//       const response = await createMatchRequest(request);
      
//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to create match request", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to send swap request",
//         "error"
//       );
//     } finally {
//       setRequesting(false);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Loading State */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Listings */}
//           <Grid container spacing={3}>
//             {displayedSkills.length === 0 && (
//               <Grid item xs={12}>
//                 <Typography color="text.secondary">No skills found.</Typography>
//               </Grid>
//             )}

//             {displayedSkills.map((skill) => (
//               <Grid item xs={12} key={skill.id} display="flex">
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "scale(1.02)",
//                       boxShadow: theme.shadows[6],
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography fontWeight="bold">{skill.skillName}</Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ mt: 0.5 }}
//                     >
//                       Owner: {skill.ownerName}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       Level: {skill.level}
//                     </Typography>
//                     <Chip
//                       label={skill.category}
//                       size="small"
//                       sx={{ mt: 1 }}
//                       color="secondary"
//                     />
//                   </Box>

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SwapHorizIcon />}
//                     sx={{ mt: 2 }}
//                     onClick={() => openRequestDialog(skill)}
//                     disabled={mySkills.length === 0}
//                   >
//                     Request Swap
//                   </Button>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Box
//               sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
//             >
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <Button
//                   key={i + 1}
//                   variant={currentPage === i + 1 ? "contained" : "outlined"}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}
//             </Box>
//           )}
//         </>
//       )}

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Request Skill Swap</DialogTitle>
//         <DialogContent>
//           {requestDialog.skill && (
//             <>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 You want to learn:{" "}
//                 <strong>{requestDialog.skill.skillName}</strong> from{" "}
//                 <strong>{requestDialog.skill.ownerName}</strong>
//               </Typography>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 sx={{ mb: 2 }}
//                 helperText={
//                   mySkills.length === 0
//                     ? "You need to add WANT skills in your profile first"
//                     : "Choose a skill to offer in exchange"
//                 }
//               >
//                 {mySkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Message (optional)"
//                 placeholder="Add a message to introduce yourself..."
//                 value={requestMessage}
//                 onChange={(e) => setRequestMessage(e.target.value)}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeRequestDialog} disabled={requesting}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting && <CircularProgress size={20} />}
//           >
//             {requesting ? "Sending..." : "Send Request"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// -----------------------------------------------------------------------------------

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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [myOfferSkills, setMyOfferSkills] = useState([]); // Skills I can offer
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Snackbar
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Request Dialog
//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();

//         // Get current user's OFFER skills (what I can teach/offer to others)
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
//           console.log("My OFFER skills:", offerSkills);
//         }

//         // Get other users' OFFER skills (what they can teach me)
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
//                 ownerId: u.id,
//               }))
//           );
//         setSkills(otherOfferSkills);
//         console.log("Other users' OFFER skills:", otherOfferSkills);
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
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
//         fromUserSkillId: parseInt(selectedMySkill), // My skill ID (what I offer)
//         toUserId: skill.ownerId, // Other user's ID
//         toUserSkillId: skill.id, // Their skill ID (what I want)
//       };

//       console.log("Sending request:", request);
//       const response = await createMatchRequest(request);
//       console.log("Response:", response);

//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("Failed to create match request", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to send swap request",
//         "error"
//       );
//     } finally {
//       setRequesting(false);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Info message if no offer skills */}
//       {myOfferSkills.length === 0 && (
//         <Alert severity="info" sx={{ mb: 2 }}>
//           You need to add OFFER skills in your profile before requesting swaps.
//           Go to your profile and add skills you can teach!
//         </Alert>
//       )}

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Loading State */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Listings */}
//           <Grid container spacing={3}>
//             {displayedSkills.length === 0 && (
//               <Grid item xs={12}>
//                 <Typography color="text.secondary">No skills found.</Typography>
//               </Grid>
//             )}

//             {displayedSkills.map((skill) => (
//               <Grid item xs={12} key={skill.id} display="flex">
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "scale(1.02)",
//                       boxShadow: theme.shadows[6],
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography fontWeight="bold">{skill.skillName}</Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ mt: 0.5 }}
//                     >
//                       Owner: {skill.ownerName}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       Level: {skill.level}
//                     </Typography>
//                     <Chip
//                       label={skill.category}
//                       size="small"
//                       sx={{ mt: 1 }}
//                       color="secondary"
//                     />
//                   </Box>

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SwapHorizIcon />}
//                     sx={{ mt: 2 }}
//                     onClick={() => openRequestDialog(skill)}
//                     disabled={myOfferSkills.length === 0}
//                   >
//                     Request Swap
//                   </Button>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Box
//               sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
//             >
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <Button
//                   key={i + 1}
//                   variant={currentPage === i + 1 ? "contained" : "outlined"}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}
//             </Box>
//           )}
//         </>
//       )}

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Request Skill Swap</DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           {requestDialog.skill && (
//             <>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 You want to learn:{" "}
//                 <strong>{requestDialog.skill.skillName}</strong> from{" "}
//                 <strong>{requestDialog.skill.ownerName}</strong>
//               </Typography>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer in exchange"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 helperText="Choose one of your OFFER skills to exchange"
//               >
//                 {myOfferSkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeRequestDialog} disabled={requesting}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting && <CircularProgress size={20} />}
//           >
//             {requesting ? "Sending..." : "Send Request"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


// ---------------------------------------------------------------------


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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [myOfferSkills, setMyOfferSkills] = useState([]); // Skills I can offer
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Snackbar
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Request Dialog
//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();
//         console.log("=== ALL USERS FETCHED ===");
//         console.log("Total users:", users.length);
//         console.log("All users data:", users);

//         // Get current user's OFFER skills (what I can teach/offer to others)
//         const currentUser = users.find((u) => u.email === user?.email);
//         console.log("Current user found:", currentUser);
        
//         if (currentUser) {
//           console.log("Current user skills:", currentUser.skills);
//           const offerSkills = currentUser.skills
//             .filter((s) => s.type === "OFFER")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//             }));
//           setMyOfferSkills(offerSkills);
//           console.log("✅ My OFFER skills:", offerSkills);
//         }

//         // Get other users' OFFER skills (what they can teach me)
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
//                 ownerId: u.id,
//               }))
//           );
//         setSkills(otherOfferSkills);
//         console.log("✅ Other users' OFFER skills:", otherOfferSkills);
//         console.log("========================");
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
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
//         fromUserSkillId: parseInt(selectedMySkill), // My skill ID (what I offer)
//         toUserId: skill.ownerId, // Other user's ID
//         toUserSkillId: skill.id, // Their skill ID (what I want)
//       };

//       console.log("=== SWAP REQUEST DEBUG ===");
//       console.log("Selected my skill ID:", selectedMySkill);
//       console.log("Target skill owner ID:", skill.ownerId);
//       console.log("Target skill ID:", skill.id);
//       console.log("Full request payload:", request);
//       console.log("Full skill object:", skill);
//       console.log("========================");

//       const response = await createMatchRequest(request);
//       console.log("Success Response:", response);

//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("=== ERROR DEBUG ===");
//       console.error("Full error object:", error);
//       console.error("Error response:", error.response);
//       console.error("Error response data:", error.response?.data);
//       console.error("Error status:", error.response?.status);
//       console.error("Error message:", error.message);
//       console.error("==================");
      
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

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Info message if no offer skills */}
//       {myOfferSkills.length === 0 && (
//         <Alert severity="info" sx={{ mb: 2 }}>
//           You need to add OFFER skills in your profile before requesting swaps.
//           Go to your profile and add skills you can teach!
//         </Alert>
//       )}

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Loading State */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Listings */}
//           <Grid container spacing={3}>
//             {displayedSkills.length === 0 && (
//               <Grid item xs={12}>
//                 <Typography color="text.secondary">No skills found.</Typography>
//               </Grid>
//             )}

//             {displayedSkills.map((skill) => (
//               <Grid item xs={12} key={skill.id} display="flex">
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "scale(1.02)",
//                       boxShadow: theme.shadows[6],
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography fontWeight="bold">{skill.skillName}</Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ mt: 0.5 }}
//                     >
//                       Owner: {skill.ownerName}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       Level: {skill.level}
//                     </Typography>
//                     <Chip
//                       label={skill.category}
//                       size="small"
//                       sx={{ mt: 1 }}
//                       color="secondary"
//                     />
//                   </Box>

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SwapHorizIcon />}
//                     sx={{ mt: 2 }}
//                     onClick={() => openRequestDialog(skill)}
//                     disabled={myOfferSkills.length === 0}
//                   >
//                     Request Swap
//                   </Button>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Box
//               sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
//             >
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <Button
//                   key={i + 1}
//                   variant={currentPage === i + 1 ? "contained" : "outlined"}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}
//             </Box>
//           )}
//         </>
//       )}

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Request Skill Swap</DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           {requestDialog.skill && (
//             <>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 You want to learn:{" "}
//                 <strong>{requestDialog.skill.skillName}</strong> from{" "}
//                 <strong>{requestDialog.skill.ownerName}</strong>
//               </Typography>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer in exchange"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 helperText="Choose one of your OFFER skills to exchange"
//               >
//                 {myOfferSkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeRequestDialog} disabled={requesting}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting && <CircularProgress size={20} />}
//           >
//             {requesting ? "Sending..." : "Send Request"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }



// -----------------------------------------------------------------


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
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { useState, useEffect, useContext } from "react";
// import { getAllUsers } from "@services/userService";
// import { createMatchRequest } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// export default function UserBrowse() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [skills, setSkills] = useState([]);
//   const [myOfferSkills, setMyOfferSkills] = useState([]); // Skills I can offer
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Snackbar
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Request Dialog
//   const [requestDialog, setRequestDialog] = useState({
//     open: false,
//     skill: null,
//   });
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [requesting, setRequesting] = useState(false);

//   const categories = ["Python", "JavaScript", "Java"];

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();
//         console.log("=== ALL USERS FETCHED ===");
//         console.log("Total users:", users.length);
//         console.log("All users data:", users);

//         // Get current user's OFFER skills (what I can teach/offer to others)
//         const currentUser = users.find((u) => u.email === user?.email);
//         console.log("Current user found:", currentUser);
        
//         if (currentUser) {
//           console.log("Current user skills:", currentUser.skills);
//           const offerSkills = currentUser.skills
//             .filter((s) => s.type === "OFFER")
//             .map((s) => ({
//               id: s.userSkillId,
//               skillName: s.skillName,
//               level: s.level,
//             }));
//           setMyOfferSkills(offerSkills);
//           console.log("✅ My OFFER skills:", offerSkills);
//         }

//         // Get other users' OFFER skills (what they can teach me)
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
//                 ownerId: u.userId, // ✅ Fixed: using userId instead of id
//               }))
//           );
        
//         console.log("Sample skill with owner:", otherOfferSkills[0]);
//         setSkills(otherOfferSkills);
//         console.log("✅ Other users' OFFER skills:", otherOfferSkills);
//         console.log("========================");
//       } catch (error) {
//         console.error("Failed to fetch skills", error);
//         showSnackbar("Failed to load skills", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchSkills();
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
//         fromUserSkillId: parseInt(selectedMySkill), // My skill ID (what I offer)
//         toUserId: skill.ownerId, // Other user's ID
//         toUserSkillId: skill.id, // Their skill ID (what I want)
//       };

//       console.log("=== SWAP REQUEST DEBUG ===");
//       console.log("Selected my skill ID:", selectedMySkill);
//       console.log("Target skill owner ID:", skill.ownerId);
//       console.log("Target skill ID:", skill.id);
//       console.log("Full request payload:", request);
//       console.log("Full skill object:", skill);
//       console.log("========================");

//       const response = await createMatchRequest(request);
//       console.log("Success Response:", response);

//       if (response.success) {
//         showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
//         closeRequestDialog();
//       } else {
//         showSnackbar(response.message || "Failed to send request", "error");
//       }
//     } catch (error) {
//       console.error("=== ERROR DEBUG ===");
//       console.error("Full error object:", error);
//       console.error("Error response:", error.response);
//       console.error("Error response data:", error.response?.data);
//       console.error("Error status:", error.response?.status);
//       console.error("Error message:", error.message);
//       console.error("==================");
      
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

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Browse Skills
//       </Typography>

//       {/* Info message if no offer skills */}
//       {myOfferSkills.length === 0 && (
//         <Alert severity="info" sx={{ mb: 2 }}>
//           You need to add OFFER skills in your profile before requesting swaps.
//           Go to your profile and add skills you can teach!
//         </Alert>
//       )}

//       {/* Search & Category Filter */}
//       <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
//         <TextField
//           placeholder="Search skills..."
//           size="small"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Chip
//             label="All"
//             clickable
//             color={selectedCategory === "" ? "primary" : "default"}
//             onClick={() => {
//               setSelectedCategory("");
//               setCurrentPage(1);
//             }}
//           />
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(selectedCategory === cat ? "" : cat);
//                 setCurrentPage(1);
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Loading State */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Listings */}
//           <Grid container spacing={3}>
//             {displayedSkills.length === 0 && (
//               <Grid item xs={12}>
//                 <Typography color="text.secondary">No skills found.</Typography>
//               </Grid>
//             )}

//             {displayedSkills.map((skill) => (
//               <Grid item xs={12} key={skill.id} display="flex">
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "scale(1.02)",
//                       boxShadow: theme.shadows[6],
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography fontWeight="bold">{skill.skillName}</Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ mt: 0.5 }}
//                     >
//                       Owner: {skill.ownerName}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       Level: {skill.level}
//                     </Typography>
//                     <Chip
//                       label={skill.category}
//                       size="small"
//                       sx={{ mt: 1 }}
//                       color="secondary"
//                     />
//                   </Box>

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<SwapHorizIcon />}
//                     sx={{ mt: 2 }}
//                     onClick={() => openRequestDialog(skill)}
//                     disabled={myOfferSkills.length === 0}
//                   >
//                     Request Swap
//                   </Button>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Box
//               sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
//             >
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <Button
//                   key={i + 1}
//                   variant={currentPage === i + 1 ? "contained" : "outlined"}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}
//             </Box>
//           )}
//         </>
//       )}

//       {/* Request Swap Dialog */}
//       <Dialog
//         open={requestDialog.open}
//         onClose={closeRequestDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Request Skill Swap</DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           {requestDialog.skill && (
//             <>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 You want to learn:{" "}
//                 <strong>{requestDialog.skill.skillName}</strong> from{" "}
//                 <strong>{requestDialog.skill.ownerName}</strong>
//               </Typography>

//               <TextField
//                 select
//                 fullWidth
//                 label="Select skill you want to offer in exchange"
//                 value={selectedMySkill}
//                 onChange={(e) => setSelectedMySkill(e.target.value)}
//                 helperText="Choose one of your OFFER skills to exchange"
//               >
//                 {myOfferSkills.map((skill) => (
//                   <MenuItem key={skill.id} value={skill.id}>
//                     {skill.skillName} ({skill.level})
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeRequestDialog} disabled={requesting}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleRequestSwap}
//             variant="contained"
//             disabled={requesting || !selectedMySkill}
//             startIcon={requesting && <CircularProgress size={20} />}
//           >
//             {requesting ? "Sending..." : "Send Request"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }



//===================================================




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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect, useContext } from "react";
import { getAllUsers } from "@services/userService";
import { createMatchRequest, getMatchRequests, cancelMatchRequest } from "@services/matchRequestService";
import AuthContext from "@context/AuthContext";

export default function UserBrowse() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  const [skills, setSkills] = useState([]);
  const [myOfferSkills, setMyOfferSkills] = useState([]); // Skills I can offer
  const [myPendingRequests, setMyPendingRequests] = useState([]); // NEW: Track pending requests
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Request Dialog
  const [requestDialog, setRequestDialog] = useState({
    open: false,
    skill: null,
  });
  const [selectedMySkill, setSelectedMySkill] = useState("");
  const [requesting, setRequesting] = useState(false);

  // NEW: Cancel Confirmation Modal
  const [cancelModal, setCancelModal] = useState({
    open: false,
    requestId: null,
    skillName: null,
  });
  const [cancelling, setCancelling] = useState(false);

  const categories = ["Python", "JavaScript", "Java"];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        console.log("=== ALL USERS FETCHED ===");
        console.log("Total users:", users.length);
        console.log("All users data:", users);

        // Get current user's OFFER skills (what I can teach/offer to others)
        const currentUser = users.find((u) => u.email === user?.email);
        console.log("Current user found:", currentUser);
        
        if (currentUser) {
          console.log("Current user skills:", currentUser.skills);
          const offerSkills = currentUser.skills
            .filter((s) => s.type === "OFFER")
            .map((s) => ({
              id: s.userSkillId,
              skillName: s.skillName,
              level: s.level,
            }));
          setMyOfferSkills(offerSkills);
          console.log("✅ My OFFER skills:", offerSkills);
        }

        // Get other users' OFFER skills (what they can teach me)
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
                ownerId: u.userId, // ✅ Fixed: using userId instead of id
              }))
          );
        
        console.log("Sample skill with owner:", otherOfferSkills[0]);
        setSkills(otherOfferSkills);
        console.log("✅ Other users' OFFER skills:", otherOfferSkills);
        console.log("========================");
      } catch (error) {
        console.error("Failed to fetch skills", error);
        showSnackbar("Failed to load skills", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchSkills();
  }, [user]);

  /* NEW: Fetch pending requests to show cancel button */
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await getMatchRequests();
        console.log("Fetching pending requests:", response);
        
        if (response.success && Array.isArray(response.data)) {
          // Filter only outgoing PENDING requests
          const pending = response.data
            .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
            .map((req) => ({
              requestId: req.id,
              toUserSkillId: req.toUserSkillId,
              skillName: req.toUserSkillName,
            }));
          setMyPendingRequests(pending);
          console.log("✅ My pending requests:", pending);
        }
      } catch (error) {
        console.error("Failed to fetch pending requests", error);
      }
    };

    if (user?.id) fetchPendingRequests();
  }, [user]);

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

  /* NEW: Check if skill has pending request */
  const getPendingRequest = (skillId) => {
    return myPendingRequests.find((req) => req.toUserSkillId === skillId);
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

  // UNCHANGED: Original request swap logic
  const handleRequestSwap = async () => {
    if (!selectedMySkill) {
      showSnackbar("Please select a skill you want to offer", "warning");
      return;
    }

    const { skill } = requestDialog;

    try {
      setRequesting(true);

      const request = {
        fromUserSkillId: parseInt(selectedMySkill), // My skill ID (what I offer)
        toUserId: skill.ownerId, // Other user's ID
        toUserSkillId: skill.id, // Their skill ID (what I want)
      };

      console.log("=== SWAP REQUEST DEBUG ===");
      console.log("Selected my skill ID:", selectedMySkill);
      console.log("Target skill owner ID:", skill.ownerId);
      console.log("Target skill ID:", skill.id);
      console.log("Full request payload:", request);
      console.log("Full skill object:", skill);
      console.log("========================");

      const response = await createMatchRequest(request);
      console.log("Success Response:", response);

      if (response.success) {
        showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
        closeRequestDialog();
        
        // NEW: Add to pending requests locally
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
      console.error("=== ERROR DEBUG ===");
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
      console.error("==================");
      
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

  /* NEW: Cancel request functions */
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
      console.log("Cancel Response:", response);

      if (response.success) {
        showSnackbar(`Request for "${cancelModal.skillName}" cancelled!`, "info");
        
        // Remove from local pending requests
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

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Browse Skills
      </Typography>

      {/* Info message if no offer skills */}
      {myOfferSkills.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          You need to add OFFER skills in your profile before requesting swaps.
          Go to your profile and add skills you can teach!
        </Alert>
      )}

      {/* Search & Category Filter */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
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
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="All"
            clickable
            color={selectedCategory === "" ? "primary" : "default"}
            onClick={() => {
              setSelectedCategory("");
              setCurrentPage(1);
            }}
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
            />
          ))}
        </Box>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Listings */}
          <Grid container spacing={3}>
            {displayedSkills.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary">No skills found.</Typography>
              </Grid>
            )}

            {displayedSkills.map((skill) => {
              // NEW: Check if this skill has a pending request
              const pendingRequest = getPendingRequest(skill.id);
              const hasPendingRequest = !!pendingRequest;

              return (
                <Grid item xs={12} key={skill.id} display="flex">
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    <Box>
                      <Typography fontWeight="bold">{skill.skillName}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Owner: {skill.ownerName}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Level: {skill.level}
                      </Typography>
                      <Chip
                        label={skill.category}
                        size="small"
                        sx={{ mt: 1 }}
                        color="secondary"
                      />
                    </Box>

                    {/* NEW: Show Cancel button if pending request exists, otherwise show Request button */}
                    {hasPendingRequest ? (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => openCancelModal(pendingRequest)}
                      >
                        Cancel Request
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SwapHorizIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => openRequestDialog(skill)}
                        disabled={myOfferSkills.length === 0}
                      >
                        Request Swap
                      </Button>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "contained" : "outlined"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </Box>
          )}
        </>
      )}

      {/* Request Swap Dialog - UNCHANGED */}
      <Dialog
        open={requestDialog.open}
        onClose={closeRequestDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Skill Swap</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {requestDialog.skill && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You want to learn:{" "}
                <strong>{requestDialog.skill.skillName}</strong> from{" "}
                <strong>{requestDialog.skill.ownerName}</strong>
              </Typography>

              <TextField
                select
                fullWidth
                label="Select skill you want to offer in exchange"
                value={selectedMySkill}
                onChange={(e) => setSelectedMySkill(e.target.value)}
                helperText="Choose one of your OFFER skills to exchange"
              >
                {myOfferSkills.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.skillName} ({skill.level})
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRequestDialog} disabled={requesting}>
            Cancel
          </Button>
          <Button
            onClick={handleRequestSwap}
            variant="contained"
            disabled={requesting || !selectedMySkill}
            startIcon={requesting && <CircularProgress size={20} />}
          >
            {requesting ? "Sending..." : "Send Request"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* NEW: Cancel Confirmation Modal */}
      <Modal open={cancelModal.open} onClose={closeCancelModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 340,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to cancel the request for "{cancelModal.skillName}"?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}
          >
            <Button
              variant="outlined"
              onClick={closeCancelModal}
              disabled={cancelling}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelRequest}
              disabled={cancelling}
              startIcon={cancelling && <CircularProgress size={20} />}
            >
              {cancelling ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
