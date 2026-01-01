// // src/pages/user/MyListings.jsx
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Chip,
//   useTheme,
//   Snackbar,
//   Alert,
//   Modal,
//   TextField,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useState } from "react";

// const mySkills = [
//   { id: 1, skill: "Guitar Lessons", category: "Music", description: "Learn acoustic guitar basics. This description can be really long and should wrap properly without stretching the card too much.", status: "Pending" },
//   { id: 2, skill: "React", category: "Coding", description: "Learn React Basics", status: "Completed" },
//   { id: 3, skill: "Cooking", category: "Culinary", description: "Italian recipes", status: "Pending" },
// ];

// const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding"];

// export default function MyListings() {
//   const theme = useTheme();
//   const [skills, setSkills] = useState(mySkills);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedSkill, setSelectedSkill] = useState(null);

//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [skillToDelete, setSkillToDelete] = useState(null);

//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [newSkill, setNewSkill] = useState({
//     skill: "",
//     category: categories[0],
//     description: "",
//     status: "Pending",
//   });

//   const handleDelete = () => {
//     setSkills(skills.filter((s) => s.id !== skillToDelete.id));
//     setSnackbarMsg("Listing removed successfully!");
//     setSnackbarOpen(true);
//     setConfirmModalOpen(false);
//     setSkillToDelete(null);
//   };

//   const handleEditOpen = (skill) => {
//     setSelectedSkill(skill);
//     setEditModalOpen(true);
//   };

//   const handleEditSave = () => {
//     setSkills(skills.map((s) => (s.id === selectedSkill.id ? selectedSkill : s)));
//     setSnackbarMsg("Listing updated successfully!");
//     setSnackbarOpen(true);
//     setEditModalOpen(false);
//   };

//   const handleAddSave = () => {
//     const newEntry = {
//       id: skills.length + 1,
//       ...newSkill,
//     };
//     setSkills([...skills, newEntry]);
//     setSnackbarMsg("New listing added!");
//     setSnackbarOpen(true);
//     setAddModalOpen(false);
//     setNewSkill({ skill: "", category: categories[0], description: "", status: "Pending" });
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, marginTop:4}}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         My Listings
//       </Typography>

//       <Button variant="contained" sx={{ mb: 3 }} onClick={() => setAddModalOpen(true)}>
//         + Add Listing
//       </Button>

//       <Grid container spacing={3}>
//         {skills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography variant="body2" color="text.secondary">
//               No listings found.
//             </Typography>
//           </Grid>
//         )}

//         {skills.map((skill) => (
//           <Grid item xs={12} key={skill.id} display="flex">
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 width: "100%",       // Full width
//                 boxSizing: "border-box",
//                 transition: "0.3s",
//                 "&:hover": { transform: "scale(1.02)", boxShadow: theme.shadows[6] },
//               }}
//             >
//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {skill.skill}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ mt: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
//                 >
//                   {skill.description}
//                 </Typography>
//                 <Chip label={skill.category} size="small" sx={{ mt: 1 }} />
//                 <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                   Status: {skill.status}
//                 </Typography>
//               </Box>

//               <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditOpen(skill)}>
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => {
//                     setSkillToDelete(skill);
//                     setConfirmModalOpen(true);
//                   }}
//                 >
//                   Remove
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Modals: Add/Edit/Delete */}
//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 400 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Edit Listing
//           </Typography>
//           {selectedSkill && (
//             <>
//               <TextField
//                 label="Skill Name"
//                 fullWidth
//                 size="small"
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.skill}
//                 onChange={(e) => setSelectedSkill({ ...selectedSkill, skill: e.target.value })}
//               />
//               <TextField
//                 label="Description"
//                 fullWidth
//                 size="small"
//                 multiline
//                 rows={3}
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.description}
//                 onChange={(e) => setSelectedSkill({ ...selectedSkill, description: e.target.value })}
//               />
//               <TextField
//                 label="Category"
//                 select
//                 fullWidth
//                 size="small"
//                 SelectProps={{ native: true }}
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.category}
//                 onChange={(e) => setSelectedSkill({ ...selectedSkill, category: e.target.value })}
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Status"
//                 fullWidth
//                 size="small"
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.status}
//                 onChange={(e) => setSelectedSkill({ ...selectedSkill, status: e.target.value })}
//               />
//               <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, flexWrap: "wrap" }}>
//                 <Button variant="outlined" onClick={() => setEditModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={handleEditSave}>
//                   Save
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Confirm Delete Modal */}
//       <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "85%", sm: 350 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Are you sure you want to remove this listing?
//           </Typography>
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
//             <Button variant="outlined" onClick={() => setConfirmModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="contained" color="error" onClick={handleDelete}>
//               Remove
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Add Listing Modal */}
//       <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 400 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Add Listing
//           </Typography>
//           <TextField
//             label="Skill Name"
//             fullWidth
//             size="small"
//             sx={{ mb: 2 }}
//             value={newSkill.skill}
//             onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             size="small"
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//             value={newSkill.description}
//             onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
//           />
//           <TextField
//             label="Category"
//             select
//             fullWidth
//             size="small"
//             SelectProps={{ native: true }}
//             sx={{ mb: 2 }}
//             value={newSkill.category}
//             onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </TextField>
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, flexWrap: "wrap" }}>
//             <Button variant="outlined" onClick={() => setAddModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleAddSave}>
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




// // src/pages/user/UserListing.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Chip,
//   Avatar,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Modal,
//   TextField,
//   useTheme,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { getAllUsers } from "../../services/userService";

// const categories = ["OFFER", "REQUEST"]; // skill type

// export default function UserListing() {
//   const theme = useTheme();
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedSkill, setSelectedSkill] = useState(null);

//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [skillToDelete, setSkillToDelete] = useState(null);

//   // Fetch users and flatten their skills for listing
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const users = await getAllUsers();
//         const listings = [];
//         users.forEach((user) => {
//           user.skills?.forEach((skill) => {
//             listings.push({
//               id: skill.userSkillId,
//               skill: skill.skillName,
//               category: skill.type, // OFFER or REQUEST
//               description: `Offered by ${user.fullName}`,
//               status: skill.level,
//               owner: user.fullName,
//               ownerEmail: user.email,
//               avatarUrl: user.avatarUrl,
//             });
//           });
//         });
//         setSkills(listings);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = () => {
//     setSkills(skills.filter((s) => s.id !== skillToDelete.id));
//     setSnackbarMsg("Listing removed successfully!");
//     setSnackbarOpen(true);
//     setConfirmModalOpen(false);
//     setSkillToDelete(null);
//   };

//   const handleEditOpen = (skill) => {
//     setSelectedSkill(skill);
//     setEditModalOpen(true);
//   };

//   const handleEditSave = () => {
//     setSkills(skills.map((s) => (s.id === selectedSkill.id ? selectedSkill : s)));
//     setSnackbarMsg("Listing updated successfully!");
//     setSnackbarOpen(true);
//     setEditModalOpen(false);
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, marginTop: 4 }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         My Listings
//       </Typography>

//       <Grid container spacing={3}>
//         {skills.length === 0 && (
//           <Grid item xs={12}>
//             <Typography variant="body2" color="text.secondary">
//               No listings found.
//             </Typography>
//           </Grid>
//         )}

//         {skills.map((skill) => (
//           <Grid item xs={12} sm={6} md={4} key={skill.id}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 width: "100%",
//                 boxSizing: "border-box",
//                 transition: "0.3s",
//                 "&:hover": { transform: "scale(1.02)", boxShadow: theme.shadows[6] },
//               }}
//             >
//               <Box display="flex" alignItems="center" mb={1}>
//                 <Avatar src={skill.avatarUrl} alt={skill.owner} sx={{ mr: 2 }} />
//                 <Typography variant="h6">{skill.skill}</Typography>
//               </Box>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 {skill.description}
//               </Typography>
//               <Chip label={skill.category} size="small" sx={{ mb: 1 }} />
//               <Typography variant="body2" color="text.secondary">
//                 Level: {skill.status}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 By: {skill.owner} ({skill.ownerEmail})
//               </Typography>

//               <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Button
//                   variant="outlined"
//                   startIcon={<EditIcon />}
//                   onClick={() => handleEditOpen(skill)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => {
//                     setSkillToDelete(skill);
//                     setConfirmModalOpen(true);
//                   }}
//                 >
//                   Remove
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 400 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Edit Listing
//           </Typography>
//           {selectedSkill && (
//             <>
//               <TextField
//                 label="Skill Name"
//                 fullWidth
//                 size="small"
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.skill}
//                 onChange={(e) =>
//                   setSelectedSkill({ ...selectedSkill, skill: e.target.value })
//                 }
//               />
//               <TextField
//                 label="Description"
//                 fullWidth
//                 size="small"
//                 multiline
//                 rows={3}
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.description}
//                 onChange={(e) =>
//                   setSelectedSkill({ ...selectedSkill, description: e.target.value })
//                 }
//               />
//               <TextField
//                 label="Category"
//                 select
//                 fullWidth
//                 size="small"
//                 SelectProps={{ native: true }}
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.category}
//                 onChange={(e) =>
//                   setSelectedSkill({ ...selectedSkill, category: e.target.value })
//                 }
//               >
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Level"
//                 fullWidth
//                 size="small"
//                 sx={{ mb: 2 }}
//                 value={selectedSkill.status}
//                 onChange={(e) =>
//                   setSelectedSkill({ ...selectedSkill, status: e.target.value })
//                 }
//               />
//               <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, flexWrap: "wrap" }}>
//                 <Button variant="outlined" onClick={() => setEditModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={handleEditSave}>
//                   Save
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Confirm Delete Modal */}
//       <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "85%", sm: 350 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Are you sure you want to remove this listing?
//           </Typography>
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
//             <Button variant="outlined" onClick={() => setConfirmModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="contained" color="error" onClick={handleDelete}>
//               Remove
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




// // src/pages/user/UserListing.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import {
//   addSkill,
//   addUserSkill,
//   getAllUserSkills,
// } from "@services/userSkillService";

// const UserListing = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const [userSkills, setUserSkills] = useState([]);
//   const [openSkillDialog, setOpenSkillDialog] = useState(false);
//   const [newSkill, setNewSkill] = useState({
//     skillName: "",
//     category: "",
//     description: "",
//   });
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [level, setLevel] = useState("BEGINNER");

//   // Fetch user skills only if logged in
//   useEffect(() => {
//     if (!userId) return; // skip if no user logged in
//     fetchUserSkills();
//   }, [userId]);

//   const fetchUserSkills = async () => {
//     try {
//       const data = await getAllUserSkills(userId);
//       setUserSkills(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 1️⃣ Skill creation (global)
//   const handleCreateSkill = async () => {
//     try {
//       const createdSkill = await addSkill(newSkill);
//       alert(`Skill created: ${createdSkill.data?.skillName || createdSkill.skillName}`);
//       setNewSkill({ skillName: "", category: "", description: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Error creating skill!");
//     }
//   };

//   // 2️⃣ Assign skill to user
//   const handleAddSkillToUser = async () => {
//     if (!selectedSkill) return alert("Select a skill first!");
//     if (!userId) return alert("User not logged in!");

//     try {
//       await addUserSkill(userId, {
//         skillId: selectedSkill.skillId,
//         level,
//         type: "OFFER",
//       });
//       alert("Skill added to your account!");
//       fetchUserSkills();
//     } catch (err) {
//       console.error(err);
//       alert("Error adding skill to user!");
//     }
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4">User Skills</Typography>

//       {/* Skill Creation */}
//       <Paper sx={{ p: 2, mt: 2 }}>
//         <Typography variant="h6">Create New Skill</Typography>
//         <TextField
//           fullWidth
//           label="Skill Name"
//           value={newSkill.skillName}
//           onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
//           sx={{ mt: 1 }}
//         />
//         <TextField
//           fullWidth
//           label="Category"
//           value={newSkill.category}
//           onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
//           sx={{ mt: 1 }}
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           value={newSkill.description}
//           onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
//           sx={{ mt: 1 }}
//         />
//         <Button sx={{ mt: 2 }} variant="contained" onClick={handleCreateSkill}>
//           Create Skill
//         </Button>
//       </Paper>

//       {/* Assign Skill to User */}
//       <Paper sx={{ p: 2, mt: 2 }}>
//         <Typography variant="h6">Add Skill to Your Account</Typography>

//         <TextField
//           fullWidth
//           label="Skill ID"
//           value={selectedSkill?.skillId || ""}
//           onChange={(e) => setSelectedSkill({ skillId: Number(e.target.value) })}
//           sx={{ mt: 1 }}
//         />

//         <Select value={level} onChange={(e) => setLevel(e.target.value)} sx={{ mt: 2 }}>
//           <MenuItem value="BEGINNER">Beginner</MenuItem>
//           <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
//           <MenuItem value="ADVANCED">Advanced</MenuItem>
//         </Select>

//         <Button sx={{ mt: 2 }} variant="contained" onClick={handleAddSkillToUser}>
//           Add Skill
//         </Button>
//       </Paper>

//       {/* User Skills Table */}
//       {userId && (
//         <Paper sx={{ mt: 3, p: 2 }}>
//           <Typography variant="h6">My Skills</Typography>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Skill Name</TableCell>
//                 <TableCell>Level</TableCell>
//                 <TableCell>Type</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {userSkills.map((skill) => (
//                 <TableRow key={skill.userSkillId}>
//                   <TableCell>{skill.skillName}</TableCell>
//                   <TableCell>{skill.level}</TableCell>
//                   <TableCell>{skill.type}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default UserListing;


// // src/pages/user/UserListing.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
// } from "@mui/material";

// import {
//   addSkill,
//   addUserSkill,
//   getAllUserSkills,
//   updateUserSkillLevel,
//   removeUserSkill,
// } from "@services/userSkillService";

// const UserListing = () => {
//   // State
//   const [skills, setSkills] = useState([]); // User's skills
//   const [newSkill, setNewSkill] = useState({ skillName: "", category: "", description: "" });
//   const [selectedSkill, setSelectedSkill] = useState("");
//   const [skillLevel, setSkillLevel] = useState("BEGINNER");

//   const user = JSON.parse(localStorage.getItem("skillSwap_user"));
//   const userId = user?.id;

//   // Fetch user skills
//   const fetchSkills = async () => {
//     if (!userId) return;
//     try {
//       const data = await getAllUserSkills(userId);
//       setSkills(data);
//     } catch (err) {
//       console.error("Error fetching user skills:", err.message);
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchSkills();
//   }, [userId]);

//   // Create new skill
//   const handleCreateSkill = async () => {
//     if (!newSkill.skillName || !newSkill.category) {
//       return alert("Skill name and category are required!");
//     }
//     try {
//       const created = await addSkill(newSkill);
//       alert("Skill created successfully!");
//       setSelectedSkill(created.skillId); // auto select for adding to user
//       setNewSkill({ skillName: "", category: "", description: "" });
//     } catch (err) {
//       console.error("Error creating skill:", err.message);
//       alert(err.message);
//     }
//   };

//   // Add skill to user
//   const handleAddSkillToUser = async () => {
//     if (!selectedSkill) return alert("Please select a skill!");
//     try {
//       await addUserSkill(userId, { skillId: selectedSkill, level: skillLevel, type: "OFFER" });
//       alert("Skill added to your account!");
//       fetchSkills();
//       setSelectedSkill(""); // reset selection
//     } catch (err) {
//       console.error("Error adding skill to user:", err.message);
//       alert(err.message);
//     }
//   };

//   // Update skill level
//   const handleUpdateSkillLevel = async (userSkillId, newLevel) => {
//     try {
//       await updateUserSkillLevel(userId, { userSkillId, level: newLevel });
//       alert("Skill level updated!");
//       fetchSkills();
//     } catch (err) {
//       console.error("Error updating skill level:", err.message);
//       alert(err.message);
//     }
//   };

//   // Remove skill from user
//   const handleRemoveSkill = async (userSkillId) => {
//     if (!window.confirm("Are you sure you want to remove this skill?")) return;
//     try {
//       await removeUserSkill(userId, { skillId: userSkillId, type: "OFFER" });
//       alert("Skill removed from your account!");
//       fetchSkills();
//     } catch (err) {
//       console.error("Error removing skill:", err.message);
//       alert(err.message);
//     }
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Manage Your Skills
//       </Typography>

//       {/* ===== Create New Skill ===== */}
//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6">Create New Skill</Typography>
//         <Grid container spacing={2} mt={1}>
//           <Grid item xs={12} md={3}>
//             <TextField
//               label="Skill Name"
//               fullWidth
//               value={newSkill.skillName}
//               onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               label="Category"
//               fullWidth
//               value={newSkill.category}
//               onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Description"
//               fullWidth
//               value={newSkill.description}
//               onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
//             />
//           </Grid>
//           <Grid item xs={12} md={2}>
//             <Button variant="contained" color="primary" fullWidth onClick={handleCreateSkill}>
//               Create Skill
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ===== Add Skill to User ===== */}
//       <Paper elevation={10} sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6">Add Skill to Your Account</Typography>
//         <Grid container spacing={2} mt={1}>
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Select Skill</InputLabel>
//               <Select
//                 value={selectedSkill}
//                 label="Select Skill"
//                 onChange={(e) => setSelectedSkill(e.target.value)}
//                 sx={{width: 200}}
//               >
//                 {skills.map((skill) => (
//                   <MenuItem key={skill.skillId} value={skill.skillId}>
//                     {skill.skillName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Level</InputLabel>
//               <Select value={skillLevel} label="Level" onChange={(e) => setSkillLevel(e.target.value)}>
//                 <MenuItem value="BEGINNER">BEGINNER</MenuItem>
//                 <MenuItem value="INTERMEDIATE">INTERMEDIATE</MenuItem>
//                 <MenuItem value="ADVANCED">ADVANCED</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Button variant="contained" color="success" fullWidth onClick={handleAddSkillToUser}>
//               Add Skill
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ===== Display User Skills ===== */}
//       <Box>
//         <Typography variant="h6">Your Skills</Typography>
//         <Grid container spacing={2} mt={1}>
//           {skills.map((skill) => (
//             <Grid item xs={12} md={4} key={skill.userSkillId}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="subtitle1">{skill.skillName}</Typography>
//                   <Typography variant="body2">Level: {skill.level}</Typography>
//                   <Typography variant="body2">Type: {skill.type}</Typography>
//                 </CardContent>
//                 <CardActions>
//                   <FormControl fullWidth size="small">
//                     <Select
//                       value={skill.level}
//                       onChange={(e) => handleUpdateSkillLevel(skill.userSkillId, e.target.value)}
//                     >
//                       <MenuItem value="BEGINNER">BEGINNER</MenuItem>
//                       <MenuItem value="INTERMEDIATE">INTERMEDIATE</MenuItem>
//                       <MenuItem value="ADVANCED">ADVANCED</MenuItem>
//                     </Select>
//                   </FormControl>
//                   <Button
//                     size="small"
//                     color="error"
//                     onClick={() => handleRemoveSkill(skill.userSkillId)}
//                   >
//                     Remove
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default UserListing;


// // src/pages/user/UserListing.jsx
// import { useEffect, useState } from "react";
// import { Box, Typography, Paper, Stack, Chip, CircularProgress } from "@mui/material";
// import { useAuth } from "@context/AuthContext";
// import { getAllUserSkills } from "@services/userSkillService";

// export default function UserListing() {
//   const { user } = useAuth();
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchSkills = async () => {
//       try {
//         const res = await getAllUserSkills(user.id);
//         setSkills(res);
//       } catch (err) {
//         console.error("Failed to fetch user skills:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSkills();
//   }, [user]);

//   if (!user) return <Typography mt={4} align="center">Please login to view your skills.</Typography>;

//   if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>My Skills</Typography>
//       {skills.length === 0 ? (
//         <Typography>No skills added yet.</Typography>
//       ) : (
//         <Stack direction="row" spacing={2} flexWrap="wrap">
//           {skills.map(skill => (
//             <Paper key={skill.skillId} sx={{ p: 1.5, minWidth: 120 }}>
//               <Typography fontWeight={600}>{skill.skillName}</Typography>
//               <Chip label={skill.level} color="primary" size="small" sx={{ mt: 1 }} />
//               <Typography variant="caption" display="block">{skill.type}</Typography>
//             </Paper>
//           ))}
//         </Stack>
//       )}
//     </Box>
//   );
// }



// // src/pages/user/UserListing.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Chip,
//   CircularProgress,
//   Alert,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   useTheme,
//   Modal,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@context/AuthContext";
// import { updateSkill } from "@services/skillService";
// import {
//   getAllUserSkills,
//   removeUserSkill,
//   updateUserSkillLevel,
// } from "@services/userSkillService";
// import AddIcon from "@mui/icons-material/Add";
// import SchoolIcon from "@mui/icons-material/School";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";

// const skillLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];
// const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding", "Language", "Other"];

// export default function UserListing() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Modal states
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Edit form state
//   const [editForm, setEditForm] = useState({
//     skillName: "",
//     category: "",
//     description: "",
//     level: "",
//   });

//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     fetchSkills();
//   }, [user]);

//   const fetchSkills = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllUserSkills(user.id);
//       setSkills(res || []);
//       setError("");
//     } catch (err) {
//       console.error("Failed to fetch user skills:", err);
//       setError("Failed to load your skills. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get chip color based on skill level
//   const getLevelColor = (level) => {
//     const colors = {
//       BEGINNER: "default",
//       INTERMEDIATE: "primary",
//       ADVANCED: "secondary",
//       EXPERT: "error",
//     };
//     return colors[level] || "default";
//   };

//   // Open edit modal
//   const handleEditClick = (skill) => {
//     setSelectedSkill(skill);
//     setEditForm({
//       skillName: skill.skillName || "",
//       category: skill.category || categories[0],
//       description: skill.description || "",
//       level: skill.level || skillLevels[0],
//     });
//     setEditModalOpen(true);
//   };

//   // Handle edit save
//   const handleEditSave = async () => {
//     if (!selectedSkill) return;

//     try {
//       setIsSubmitting(true);

//       // Update skill details (name, category, description)
//       await updateSkill({
//         skillId: selectedSkill.skillId,
//         skillName: editForm.skillName.trim(),
//         category: editForm.category,
//         description: editForm.description.trim(),
//       });

//       // Update user skill level
//       await updateUserSkillLevel(user.id, {
//         userSkillId: selectedSkill.userSkillId,
//         level: editForm.level,
//       });

//       // Refresh skills list
//       await fetchSkills();
//       setEditModalOpen(false);
//       setSelectedSkill(null);
//     } catch (err) {
//       console.error("Error updating skill:", err);
//       const errorMessage = err.response?.data?.message || "Failed to update skill";
//       alert(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Open delete modal
//   const handleDeleteClick = (skill) => {
//     setSelectedSkill(skill);
//     setDeleteModalOpen(true);
//   };

//   // Handle delete
//   const handleDelete = async () => {
//     if (!selectedSkill) return;

//     try {
//       setIsSubmitting(true);

//       await removeUserSkill(user.id, {
//         skillId: selectedSkill.skillId,
//         type: selectedSkill.type,
//       });

//       // Refresh skills list
//       await fetchSkills();
//       setDeleteModalOpen(false);
//       setSelectedSkill(null);
//     } catch (err) {
//       console.error("Error removing skill:", err);
//       const errorMessage = err.response?.data?.message || "Failed to remove skill";
//       alert(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!user) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "60vh",
//         }}
//       >
//         <Alert severity="warning">Please login to view your skills.</Alert>
//       </Box>
//     );
//   }

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "60vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, marginTop: 4 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           My Skill Listings
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => navigate("/user/skill-setup")}
//           size="large"
//         >
//           Add Skill
//         </Button>
//       </Box>

//       {/* Error Alert */}
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Skills Grid */}
//       {skills.length === 0 ? (
//         <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
//           <SchoolIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
//           <Typography variant="h6" gutterBottom>
//             No skills added yet
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//             Add your first skill by taking a skill assessment
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => navigate("/user/skill-setup")}
//           >
//             Add Your First Skill
//           </Button>
//         </Paper>
//       ) : (
//         <Grid container spacing={3}>
//           {skills.map((skill) => (
//             <Grid item xs={12} sm={6} md={4} key={skill.userSkillId}>
//               <Card
//                 elevation={3}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: theme.shadows[8],
//                   },
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   {/* Skill Name and Type */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "start",
//                       mb: 2,
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="bold">
//                       {skill.skillName}
//                     </Typography>
//                     <Chip label="OFFER" size="small" color="success" />
//                   </Box>

//                   {/* Description */}
//                   {skill.description && (
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         mb: 2,
//                         display: "-webkit-box",
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {skill.description}
//                     </Typography>
//                   )}

//                   {/* Category and Level */}
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                     {skill.category && (
//                       <Chip
//                         label={skill.category}
//                         size="small"
//                         variant="outlined"
//                       />
//                     )}
//                     <Chip
//                       label={skill.level}
//                       size="small"
//                       color={getLevelColor(skill.level)}
//                     />
//                   </Box>
//                 </CardContent>

//                 {/* Action Buttons */}
//                 <CardActions sx={{ p: 2, pt: 0 }}>
//                   <Button
//                     size="small"
//                     startIcon={<EditIcon />}
//                     onClick={() => handleEditClick(skill)}
//                     variant="outlined"
//                     fullWidth
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="small"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDeleteClick(skill)}
//                     variant="outlined"
//                     color="error"
//                     fullWidth
//                   >
//                     Remove
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Info Box */}
//       {skills.length > 0 && (
//         <Alert severity="info" sx={{ mt: 3 }}>
//           <Typography variant="body2">
//             <strong>Tip:</strong> Your skills are visible to other users in the
//             Browse section. They can send you swap requests to learn from you!
//           </Typography>
//         </Alert>
//       )}

//       {/* Edit Modal */}
//       <Modal
//         open={editModalOpen}
//         onClose={() => !isSubmitting && setEditModalOpen(false)}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 500 },
//             maxHeight: "90vh",
//             overflow: "auto",
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               Edit Skill
//             </Typography>
//             <IconButton
//               onClick={() => setEditModalOpen(false)}
//               disabled={isSubmitting}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <TextField
//             label="Skill Name *"
//             fullWidth
//             size="small"
//             sx={{ mb: 2 }}
//             value={editForm.skillName}
//             onChange={(e) =>
//               setEditForm({ ...editForm, skillName: e.target.value })
//             }
//             disabled={isSubmitting}
//           />

//           <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={editForm.category}
//               label="Category"
//               onChange={(e) =>
//                 setEditForm({ ...editForm, category: e.target.value })
//               }
//               disabled={isSubmitting}
//             >
//               {categories.map((cat) => (
//                 <MenuItem key={cat} value={cat}>
//                   {cat}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Description"
//             fullWidth
//             size="small"
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//             value={editForm.description}
//             onChange={(e) =>
//               setEditForm({ ...editForm, description: e.target.value })
//             }
//             disabled={isSubmitting}
//           />

//           <FormControl fullWidth size="small" sx={{ mb: 3 }}>
//             <InputLabel>Your Skill Level *</InputLabel>
//             <Select
//               value={editForm.level}
//               label="Your Skill Level *"
//               onChange={(e) =>
//                 setEditForm({ ...editForm, level: e.target.value })
//               }
//               disabled={isSubmitting}
//             >
//               {skillLevels.map((level) => (
//                 <MenuItem key={level} value={level}>
//                   {level}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//             <Button
//               variant="outlined"
//               onClick={() => setEditModalOpen(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleEditSave}
//               disabled={isSubmitting}
//               startIcon={isSubmitting && <CircularProgress size={16} />}
//             >
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         open={deleteModalOpen}
//         onClose={() => !isSubmitting && setDeleteModalOpen(false)}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "85%", sm: 400 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Remove Skill?
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//             Are you sure you want to remove "{selectedSkill?.skillName}" from
//             your listings? This action cannot be undone.
//           </Typography>
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//             <Button
//               variant="outlined"
//               onClick={() => setDeleteModalOpen(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleDelete}
//               disabled={isSubmitting}
//               startIcon={isSubmitting && <CircularProgress size={16} color="inherit" />}
//             >
//               {isSubmitting ? "Removing..." : "Remove"}
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }


// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Stack,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useAuth } from "@context/AuthContext";
// import {
//   getAllUserSkills,
//   updateUserSkillLevel,
//   removeUserSkill,
// } from "@services/userSkillService";

// const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

// export default function UserListing() {
//   const { user } = useAuth();

//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [level, setLevel] = useState("");

//   // 🔹 Fetch user skills
//   const fetchSkills = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllUserSkills(user.id);

//       // ONLY OFFER SKILLS (backend-friendly)
//       const offers = res.filter((s) => s.type === "OFFER");
//       setSkills(offers);
//     } catch (err) {
//       console.error("Failed to fetch skills", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchSkills();
//   }, [user]);

//   // 🔹 Open edit dialog
//   const handleEditOpen = (skill) => {
//     setSelectedSkill(skill);
//     setLevel(skill.level);
//     setEditOpen(true);
//   };

//   // 🔹 Save updated level
//   const handleEditSave = async () => {
//     if (!selectedSkill) return;

//     try {
//       await updateUserSkillLevel(user.id, {
//         userSkillId: selectedSkill.userSkillId,
//         level,
//       });

//       setEditOpen(false);
//       setSelectedSkill(null);
//       fetchSkills();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update level");
//     }
//   };

//   // 🔹 Delete skill
//   const handleDelete = async (skill) => {
//     if (!window.confirm("Remove this skill from your listings?")) return;

//     try {
//       await removeUserSkill(user.id, {
//         skillId: skill.skillId,
//         type: skill.type,
//       });

//       fetchSkills();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to remove skill");
//     }
//   };

//   if (!user) return null;

//   if (loading) {
//     return (
//       <Box mt={6} display="flex" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         My Skill Listings
//       </Typography>

//       {skills.length === 0 && (
//         <Typography color="text.secondary">
//           You haven’t added any skills yet.
//         </Typography>
//       )}

//       <Stack direction="row" flexWrap="wrap" gap={3}>
//         {skills.map((skill) => (
//           <Card key={skill.userSkillId} sx={{ width: 260 }}>
//             <CardContent>
//               <Typography fontWeight={700}>
//                 {skill.skillName}
//               </Typography>

//               <Chip
//                 label={skill.level}
//                 color="primary"
//                 size="small"
//                 sx={{ mt: 1 }}
//               />

//               <Stack direction="row" justifyContent="flex-end" mt={2}>
//                 <IconButton onClick={() => handleEditOpen(skill)}>
//                   <EditIcon />
//                 </IconButton>

//                 <IconButton onClick={() => handleDelete(skill)}>
//                   <DeleteIcon color="error" />
//                 </IconButton>
//               </Stack>
//             </CardContent>
//           </Card>
//         ))}
//       </Stack>

//       {/* 🔹 Edit Level Dialog */}
//       <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
//         <DialogTitle>Update Skill Level</DialogTitle>

//         <DialogContent>
//           <FormControl fullWidth size="small" sx={{ mt: 2 }}>
//             <InputLabel>Skill Level</InputLabel>
//             <Select
//               value={level}
//               label="Skill Level"
//               onChange={(e) => setLevel(e.target.value)}
//             >
//               {LEVELS.map((lvl) => (
//                 <MenuItem key={lvl} value={lvl}>
//                   {lvl}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setEditOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  AssessmentOutlined as AssessmentIcon,
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
  BEGINNER: "default",
  INTERMEDIATE: "primary",
  ADVANCED: "secondary",
};

const LEVEL_DESCRIPTIONS = {
  BEGINNER: "Just starting out",
  INTERMEDIATE: "Comfortable with basics",
  ADVANCED: "Proficient and experienced",
};

export default function UserListing() {
  const { user } = useAuth();
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
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Please login to view your skills.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  const userSkillIds = skills.map(s => s.skillId);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            My Skill Listings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your offered skills and proficiency levels
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAssessmentDialog(true)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            px: 3,
            py: 1.5,
            boxShadow: 3,
          }}
        >
          Add Skill
        </Button>
      </Box>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
          elevation={0}
        >
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "50%",
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <SchoolIcon sx={{ fontSize: 60 }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
            No skills added yet
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Start building your skill profile by taking an assessment
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AssessmentIcon />}
            onClick={() => setOpenAssessmentDialog(true)}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Take Skill Assessment
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.userSkillId}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                    borderColor: "#1976d2",
                  },
                }}
                elevation={3}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        borderRadius: 2,
                        p: 1.5,
                        mr: 2,
                        boxShadow: 2,
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {skill.skillName}
                      </Typography>
                      <Chip
                        label={skill.level}
                        color={LEVEL_COLORS[skill.level]}
                        size="small"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      />
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {LEVEL_DESCRIPTIONS[skill.level]}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Type: <strong>{skill.type}</strong>
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2, justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => openEdit(skill)}
                    sx={{ color: "#1976d2", fontWeight: 600 }}
                  >
                    Update Level
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => openDelete(skill)}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        backgroundColor: "error.light",
                        color: "white",
                      },
                    }}
                  >
                    <DeleteIcon />
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
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2", pb: 1 }}>
          Update Skill Level
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Skill Name
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {selectedSkill?.skillName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Current Level: <strong>{selectedSkill?.level}</strong>
              </Typography>
            </Box>
            <TextField
              select
              label="New Proficiency Level"
              value={editLevel}
              onChange={(e) => setEditLevel(e.target.value)}
              fullWidth
            >
              {SKILL_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  <Box>
                    <Typography fontWeight={600}>{level}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {LEVEL_DESCRIPTIONS[level]}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEditDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateLevel}
            disabled={editLevel === selectedSkill?.level}
          >
            Update Level
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>
          Remove Skill?
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone.
          </Alert>
          <Typography>
            Are you sure you want to remove <strong>{selectedSkill?.skillName}</strong> from your
            skill listings?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteSkill}>
            Remove Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}