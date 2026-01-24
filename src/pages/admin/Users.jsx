// // src/pages/admin/Users.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   useTheme,
//   Divider,
//   IconButton,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";

// import {
//   getAllUsers,
//   updateUserById,
//   deleteUserById,
// } from "@/services/admin/adminUserService";

// export default function Users() {
//   const theme = useTheme();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   // 🔹 Fetch users on load
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllUsers();
//       setUsers(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredUsers = users.filter((user) =>
//     `${user.username} ${user.email} ${user.role}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleEditClick = () => {
//     setEditMode(true);
//     setEditData({ ...selectedUser });
//   };

//   const handleSave = async () => {
//     try {
//       await updateUserById(editData.id, editData);
//       setUsers((prev) =>
//         prev.map((u) => (u.id === editData.id ? editData : u))
//       );
//       setSelectedUser(editData);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Failed to update user", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteUserById(selectedUser.id);
//       setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
//       setConfirmDelete(false);
//       setSelectedUser(null);
//     } catch (error) {
//       console.error("Failed to delete user", error);
//     }
//   };

//   const handleClose = () => {
//     setSelectedUser(null);
//     setEditMode(false);
//     setEditData(null);
//     setConfirmDelete(false);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Users Management
//       </Typography>

//       {/* Search */}
//       <Paper
//         elevation={2}
//         sx={{
//           p: 1.5,
//           mb: 2,
//           borderRadius: 3,
//           maxWidth: 420,
//         }}
//       >
//         <TextField
//           fullWidth
//           placeholder="Search by username, email or role"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Paper>

//       <Paper elevation={3} sx={{ borderRadius: 2 }}>
//         {loading ? (
//           <Box sx={{ p: 4, textAlign: "center" }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Table>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   backgroundColor:
//                     theme.palette.mode === "dark" ? "#252525" : "#f1f1f1",
//                 }}
//               >
//                 <TableCell><strong>Profile</strong></TableCell>
//                 <TableCell><strong>Username</strong></TableCell>
//                 <TableCell><strong>Email</strong></TableCell>
//                 <TableCell><strong>Role</strong></TableCell>
//                 <TableCell><strong>View</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredUsers.length ? (
//                 filteredUsers.map((user) => (
//                   <TableRow key={user.id} hover>
//                     <TableCell>
//                       <Avatar
//                       src={user.avatarUrl || undefined}
//                       sx={{
//                         bgcolor: user.avatarUrl ? 'transparent' : theme.palette.primary.main,
//                         color: '#fff',
//                       }}
//                     >
//                       {!user.avatarUrl && (user.username?.charAt(0).toUpperCase() || 'U')}
//                     </Avatar>

//                     </TableCell>
//                     <TableCell>{user.username}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => setSelectedUser(user)}>
//                         <VisibilityIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No users found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         )}
//       </Paper>

//       {/* User Dialog */}
//       <Dialog open={Boolean(selectedUser)} onClose={handleClose} maxWidth="xs" fullWidth>
//         {selectedUser && (
//           <>
//             <DialogTitle>
//               User Details
//               <IconButton
//                 onClick={handleClose}
//                 sx={{ position: "absolute", right: 8, top: 8 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>

//             <DialogContent>
//               {!editMode ? (
//                 <>
//                   <Typography><b>Username:</b> {selectedUser.username}</Typography>
//                   <Typography><b>Email:</b> {selectedUser.email}</Typography>
//                   <Typography><b>Role:</b> {selectedUser.role}</Typography>

//                   <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//                     <Button startIcon={<EditIcon />} onClick={handleEditClick}>
//                       Edit
//                     </Button>
//                     <Button
//                       color="error"
//                       startIcon={<DeleteIcon />}
//                       onClick={() => setConfirmDelete(true)}
//                     >
//                       Delete
//                     </Button>
//                   </Stack>
//                 </>
//               ) : (
//                 <>
//                   <TextField
//                     label="Username"
//                     fullWidth
//                     margin="normal"
//                     value={editData.username}
//                     onChange={(e) =>
//                       setEditData({ ...editData, username: e.target.value })
//                     }
//                   />
//                   <TextField
//                     label="Email"
//                     fullWidth
//                     margin="normal"
//                     value={editData.email}
//                     onChange={(e) =>
//                       setEditData({ ...editData, email: e.target.value })
//                     }
//                   />
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Role</InputLabel>
//                     <Select
//                       value={editData.role}
//                       label="Role"
//                       onChange={(e) =>
//                         setEditData({ ...editData, role: e.target.value })
//                       }
//                     >
//                       <MenuItem value="USER">USER</MenuItem>
//                       <MenuItem value="ADMIN">ADMIN</MenuItem>
//                     </Select>
//                   </FormControl>

//                   <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//                     <Button variant="contained" onClick={handleSave}>
//                       Save
//                     </Button>
//                     <Button onClick={() => setEditMode(false)}>Cancel</Button>
//                   </Stack>
//                 </>
//               )}
//             </DialogContent>
//           </>
//         )}
//       </Dialog>

//       {/* Confirm Delete */}
//       <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this user?</Typography>
//           <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//             <Button color="error" variant="contained" onClick={handleDelete}>
//               Delete
//             </Button>
//             <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
//           </Stack>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }





// // src/pages/admin/Users.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   useTheme,
//   IconButton,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Card,
//   CardContent,
//   Alert,
//   Grid,
//   TableContainer,
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   Visibility as VisibilityIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   People as PeopleIcon,
//   AdminPanelSettings as AdminIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Save as SaveIcon,
//   Warning as WarningIcon,
// } from "@mui/icons-material";

// import {
//   getAllUsers,
//   updateUserById,
//   deleteUserById,
// } from "@/services/admin/adminUserService";
// import toast from "react-hot-toast";

// export default function Users() {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllUsers();
//       setUsers(res.data || []);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredUsers = users.filter((user) =>
//     `${user.username} ${user.email} ${user.role}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleEditClick = () => {
//     setEditMode(true);
//     setEditData({ ...selectedUser });
//   };

//   const handleSave = async () => {
//     try {
//       setUpdating(true);
//       await updateUserById(editData.id, editData);
//       setUsers((prev) =>
//         prev.map((u) => (u.id === editData.id ? editData : u))
//       );
//       setSelectedUser(editData);
//       setEditMode(false);
//       toast.success("User updated successfully!");
//     } catch (error) {
//       console.error("Failed to update user", error);
//       toast.error("Failed to update user");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       await deleteUserById(selectedUser.id);
//       setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
//       setConfirmDelete(false);
//       setSelectedUser(null);
//       toast.success("User deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete user", error);
//       toast.error("Failed to delete user");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleClose = () => {
//     setSelectedUser(null);
//     setEditMode(false);
//     setEditData(null);
//     setConfirmDelete(false);
//   };

//   const getRoleColor = (role) => {
//     return role === "ADMIN" ? "error" : "primary";
//   };

//   const getRoleIcon = (role) => {
//     return role === "ADMIN" ? <AdminIcon /> : <PersonIcon />;
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: isDark
//             ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
//             : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
//         }}
//       >
//         <CircularProgress size={50} />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: isDark
//           ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
//           : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
//         py: 6,
//         px: { xs: 1, sm: 2 },
//       }}
//     >
//       <Box sx={{ maxWidth: 1400, mx: "auto" }}>
//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2.5, sm: 3, md: 4 },
//             mb: { xs: 2, sm: 3, md: 4 },
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark
//               ? "linear-gradient(135deg, #2d3561 0%, #1f2544 100%)"
//               : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             position: "relative",
//             overflow: "hidden",
//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: 0,
//               right: 0,
//               width: { xs: "200px", sm: "300px" },
//               height: { xs: "200px", sm: "300px" },
//               background: "rgba(255,255,255,0.1)",
//               borderRadius: "50%",
//               transform: "translate(30%, -30%)",
//             },
//           }}
//         >
//           <Stack
//             direction="row"
//             alignItems="center"
//             spacing={{ xs: 1, sm: 1.5 }}
//             sx={{ position: "relative", zIndex: 1, mb: { xs: 0.5, sm: 1 } }}
//           >
//             <PeopleIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
//             <Typography
//               variant="h4"
//               fontWeight={700}
//               sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}
//             >
//               Users Management
//             </Typography>
//           </Stack>
//           <Typography
//             variant="body1"
//             sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" }, position: "relative", zIndex: 1 }}
//           >
//             Manage all platform users and their roles
//           </Typography>
//         </Paper>

//         {/* Stats Cards */}
//         <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? "#1e1e2e" : "#ffffff",
//                 border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
//               }}
//             >
//               <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                 <Box
//                   sx={{
//                     width: { xs: 44, sm: 50 },
//                     height: { xs: 44, sm: 50 },
//                     borderRadius: 2,
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <PeopleIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h4"
//                     fontWeight={700}
//                     sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}
//                   >
//                     {filteredUsers.length}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
//                   >
//                     {search ? "Filtered Users" : "Total Users"}
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 2.5, sm: 3 },
//                 borderRadius: { xs: 2, md: 3 },
//                 background: isDark ? "#1e1e2e" : "#ffffff",
//                 border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
//               }}
//             >
//               <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
//                 <Box
//                   sx={{
//                     width: { xs: 44, sm: 50 },
//                     height: { xs: 44, sm: 50 },
//                     borderRadius: 2,
//                     background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <AdminIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="h4"
//                     fontWeight={700}
//                     sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}
//                   >
//                     {users.filter((u) => u.role === "ADMIN").length}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
//                   >
//                     Administrators
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Search Bar */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 3 },
//             mb: { xs: 2, sm: 3, md: 4 },
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark ? "#1e1e2e" : "#ffffff",
//             border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
//           }}
//         >
//           <TextField
//             fullWidth
//             placeholder="Search by username, email or role"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "text.secondary" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 2,
//               },
//             }}
//           />
//         </Paper>

//         {/* Users Table */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, md: 3 },
//             background: isDark ? "#1e1e2e" : "#ffffff",
//             border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
//             overflow: "hidden",
//           }}
//         >
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     backgroundColor: isDark
//                       ? "rgba(255,255,255,0.05)"
//                       : "rgba(0,0,0,0.02)",
//                   }}
//                 >
//                   <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                     Profile
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                     Username
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" }, display: { xs: "none", sm: "table-cell" } }}>
//                     Email
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                     Role
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredUsers.length ? (
//                   filteredUsers.map((user) => (
//                     <TableRow
//                       key={user.id}
//                       hover
//                       sx={{
//                         "&:hover": {
//                           backgroundColor: isDark
//                             ? "rgba(255,255,255,0.03)"
//                             : "rgba(0,0,0,0.02)",
//                         },
//                       }}
//                     >
//                       <TableCell>
//                         <Avatar
//                           src={user.avatarUrl || undefined}
//                           sx={{
//                             bgcolor: user.avatarUrl
//                               ? "transparent"
//                               : theme.palette.primary.main,
//                             color: "#fff",
//                             width: { xs: 36, sm: 40 },
//                             height: { xs: 36, sm: 40 },
//                           }}
//                         >
//                           {!user.avatarUrl &&
//                             (user.username?.charAt(0).toUpperCase() || "U")}
//                         </Avatar>
//                       </TableCell>
//                       <TableCell sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                         {user.username}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, display: { xs: "none", sm: "table-cell" } }}>
//                         {user.email}
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={user.role}
//                           color={getRoleColor(user.role)}
//                           size="small"
//                           icon={getRoleIcon(user.role)}
//                           sx={{ fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <IconButton
//                           onClick={() => setSelectedUser(user)}
//                           size="small"
//                           sx={{
//                             color: theme.palette.primary.main,
//                             border: "2px solid",
//                             borderColor: theme.palette.primary.main,
//                             borderRadius: 2,
//                             "&:hover": {
//                               bgcolor: theme.palette.primary.main,
//                               color: "white",
//                             },
//                           }}
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//                         No users found
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>

//         {/* User Details Dialog */}
//         <Dialog
//           open={Boolean(selectedUser)}
//           onClose={handleClose}
//           maxWidth="sm"
//           fullWidth
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               background: isDark ? "#1e1e2e" : "#ffffff",
//               m: { xs: 2, sm: 3 },
//             },
//           }}
//         >
//           {selectedUser && (
//             <>
//               <DialogTitle sx={{ pb: 1 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                   <Stack direction="row" alignItems="center" spacing={1.5}>
//                     <Avatar
//                       src={selectedUser.avatarUrl || undefined}
//                       sx={{
//                         bgcolor: selectedUser.avatarUrl
//                           ? "transparent"
//                           : theme.palette.primary.main,
//                         color: "#fff",
//                         width: 40,
//                         height: 40,
//                       }}
//                     >
//                       {!selectedUser.avatarUrl &&
//                         (selectedUser.username?.charAt(0).toUpperCase() || "U")}
//                     </Avatar>
//                     <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//                       User Details
//                     </Typography>
//                   </Stack>
//                   <IconButton onClick={handleClose} size="small">
//                     <CloseIcon />
//                   </IconButton>
//                 </Stack>
//               </DialogTitle>

//               <DialogContent>
//                 {!editMode ? (
//                   <Stack spacing={2.5} sx={{ mt: 1 }}>
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 2,
//                         borderRadius: 2,
//                         background: isDark
//                           ? "rgba(255,255,255,0.05)"
//                           : "rgba(0,0,0,0.02)",
//                       }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
//                         <PersonIcon sx={{ color: "text.secondary", fontSize: 20 }} />
//                         <Typography variant="caption" color="text.secondary">
//                           Username
//                         </Typography>
//                       </Stack>
//                       <Typography variant="body1" fontWeight={600}>
//                         {selectedUser.username}
//                       </Typography>
//                     </Paper>

//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 2,
//                         borderRadius: 2,
//                         background: isDark
//                           ? "rgba(255,255,255,0.05)"
//                           : "rgba(0,0,0,0.02)",
//                       }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
//                         <EmailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
//                         <Typography variant="caption" color="text.secondary">
//                           Email
//                         </Typography>
//                       </Stack>
//                       <Typography variant="body1" fontWeight={600}>
//                         {selectedUser.email}
//                       </Typography>
//                     </Paper>

//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 2,
//                         borderRadius: 2,
//                         background: isDark
//                           ? "rgba(255,255,255,0.05)"
//                           : "rgba(0,0,0,0.02)",
//                       }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
//                         {getRoleIcon(selectedUser.role)}
//                         <Typography variant="caption" color="text.secondary">
//                           Role
//                         </Typography>
//                       </Stack>
//                       <Chip
//                         label={selectedUser.role}
//                         color={getRoleColor(selectedUser.role)}
//                         size="small"
//                         icon={getRoleIcon(selectedUser.role)}
//                         sx={{ fontWeight: 600 }}
//                       />
//                     </Paper>
//                   </Stack>
//                 ) : (
//                   <Stack spacing={3} sx={{ mt: 2 }}>
//                     <TextField
//                       label="Username"
//                       fullWidth
//                       value={editData.username}
//                       onChange={(e) =>
//                         setEditData({ ...editData, username: e.target.value })
//                       }
//                       disabled={updating}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     />
//                     <TextField
//                       label="Email"
//                       fullWidth
//                       value={editData.email}
//                       onChange={(e) =>
//                         setEditData({ ...editData, email: e.target.value })
//                       }
//                       disabled={updating}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     />
//                     <FormControl fullWidth>
//                       <InputLabel>Role</InputLabel>
//                       <Select
//                         value={editData.role}
//                         label="Role"
//                         onChange={(e) =>
//                           setEditData({ ...editData, role: e.target.value })
//                         }
//                         disabled={updating}
//                         sx={{
//                           borderRadius: 2,
//                         }}
//                       >
//                         <MenuItem value="USER">
//                           <Stack direction="row" alignItems="center" spacing={1}>
//                             <PersonIcon fontSize="small" />
//                             <span>USER</span>
//                           </Stack>
//                         </MenuItem>
//                         <MenuItem value="ADMIN">
//                           <Stack direction="row" alignItems="center" spacing={1}>
//                             <AdminIcon fontSize="small" />
//                             <span>ADMIN</span>
//                           </Stack>
//                         </MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Stack>
//                 )}
//               </DialogContent>

//               <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
//                 {!editMode ? (
//                   <>
//                     <Button
//                       variant="outlined"
//                       startIcon={<EditIcon />}
//                       onClick={handleEditClick}
//                       sx={{
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                         borderWidth: 2,
//                         "&:hover": {
//                           borderWidth: 2,
//                         },
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       startIcon={<DeleteIcon />}
//                       onClick={() => setConfirmDelete(true)}
//                       sx={{
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                         borderWidth: 2,
//                         "&:hover": {
//                           borderWidth: 2,
//                         },
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       onClick={() => setEditMode(false)}
//                       disabled={updating}
//                       sx={{
//                         borderRadius: 2,
//                         fontWeight: 500,
//                         fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       variant="contained"
//                       onClick={handleSave}
//                       disabled={updating}
//                       startIcon={updating ? <CircularProgress size={16} /> : <SaveIcon />}
//                       sx={{
//                         borderRadius: 2,
//                         fontWeight: 600,
//                         px: { xs: 2, sm: 3 },
//                         fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//                       }}
//                     >
//                       {updating ? "Saving..." : "Save Changes"}
//                     </Button>
//                   </>
//                 )}
//               </DialogActions>
//             </>
//           )}
//         </Dialog>

//         {/* Delete Confirmation Dialog */}
//         <Dialog
//           open={confirmDelete}
//           onClose={() => setConfirmDelete(false)}
//           maxWidth="xs"
//           fullWidth
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               background: isDark ? "#1e1e2e" : "#ffffff",
//               m: { xs: 2, sm: 3 },
//             },
//           }}
//         >
//           <DialogTitle sx={{ pb: 1 }}>
//             <Typography variant="h6" fontWeight={700} color="error" sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
//               Delete User?
//             </Typography>
//           </DialogTitle>
//           <DialogContent>
//             <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
//               This action cannot be undone.
//             </Alert>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
//               Are you sure you want to delete user{" "}
//               <strong>{selectedUser?.username}</strong>?
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
//             <Button
//               onClick={() => setConfirmDelete(false)}
//               disabled={deleting}
//               sx={{
//                 borderRadius: 2,
//                 fontWeight: 500,
//                 fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleDelete}
//               disabled={deleting}
//               startIcon={deleting ? <CircularProgress size={16} /> : <DeleteIcon />}
//               sx={{
//                 borderRadius: 2,
//                 fontWeight: 600,
//                 px: { xs: 2, sm: 3 },
//                 fontSize: { xs: "0.8125rem", sm: "0.875rem" },
//               }}
//             >
//               {deleting ? "Deleting..." : "Delete User"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// }




// src/pages/admin/Users.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  IconButton,
  TextField,
  Button,
  Stack,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Alert,
  Grid,
  TableContainer,
} from "@mui/material";
import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Save as SaveIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import {
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "@/services/admin/adminUserService";
import toast from "react-hot-toast";

export default function Users() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
    toast.success('Users refreshed');
  };

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEditClick = () => {
    setEditMode(true);
    setEditData({ ...selectedUser });
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      await updateUserById(editData.id, editData);
      setUsers((prev) =>
        prev.map((u) => (u.id === editData.id ? editData : u))
      );
      setSelectedUser(editData);
      setEditMode(false);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user", error);
      toast.error("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteUserById(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setConfirmDelete(false);
      setSelectedUser(null);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user", error);
      toast.error("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    setSelectedUser(null);
    setEditMode(false);
    setEditData(null);
    setConfirmDelete(false);
  };

  const getRoleColor = (role) => {
    return role === "ADMIN" ? "error" : "primary";
  };

  const getRoleIcon = (role) => {
    return role === "ADMIN" ? <AdminIcon /> : <PersonIcon />;
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
        py: 6,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark
              ? "linear-gradient(135deg, #2d3561 0%, #1f2544 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: "200px", sm: "300px" },
              height: { xs: "200px", sm: "300px" },
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              transform: "translate(30%, -30%)",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 1, sm: 1.5 }}
                sx={{ mb: { xs: 0.5, sm: 1 } }}
              >
                <PeopleIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}
                >
                  Users Management
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                Manage all platform users and their roles
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

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: { xs: 2, md: 3 },
                background: isDark ? "#1e1e2e" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                <Box
                  sx={{
                    width: { xs: 44, sm: 50 },
                    height: { xs: 44, sm: 50 },
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}
                  >
                    {filteredUsers.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {search ? "Filtered Users" : "Total Users"}
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
                background: isDark ? "#1e1e2e" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                <Box
                  sx={{
                    width: { xs: 44, sm: 50 },
                    height: { xs: 44, sm: 50 },
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AdminIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}
                  >
                    {users.filter((u) => u.role === "ADMIN").length}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Administrators
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark ? "#1e1e2e" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by username, email or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Paper>

        {/* Users Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 2, md: 3 },
            background: isDark ? "#1e1e2e" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    Profile
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    Username
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" }, display: { xs: "none", sm: "table-cell" } }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.length ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: isDark
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.02)",
                        },
                      }}
                    >
                      <TableCell>
                        <Avatar
                          src={user.avatarUrl || undefined}
                          sx={{
                            bgcolor: user.avatarUrl
                              ? "transparent"
                              : theme.palette.primary.main,
                            color: "#fff",
                            width: { xs: 36, sm: 40 },
                            height: { xs: 36, sm: 40 },
                          }}
                        >
                          {!user.avatarUrl &&
                            (user.username?.charAt(0).toUpperCase() || "U")}
                        </Avatar>
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                        {user.username}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, display: { xs: "none", sm: "table-cell" } }}>
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={getRoleColor(user.role)}
                          size="small"
                          icon={getRoleIcon(user.role)}
                          sx={{ fontWeight: 600, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => setSelectedUser(user)}
                          size="small"
                          sx={{
                            color: theme.palette.primary.main,
                            border: "2px solid",
                            borderColor: theme.palette.primary.main,
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: theme.palette.primary.main,
                              color: "white",
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* User Details Dialog */}
        <Dialog
          open={Boolean(selectedUser)}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: isDark ? "#1e1e2e" : "#ffffff",
              m: { xs: 2, sm: 3 },
            },
          }}
        >
          {selectedUser && (
            <>
              <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      src={selectedUser.avatarUrl || undefined}
                      sx={{
                        bgcolor: selectedUser.avatarUrl
                          ? "transparent"
                          : theme.palette.primary.main,
                        color: "#fff",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {!selectedUser.avatarUrl &&
                        (selectedUser.username?.charAt(0).toUpperCase() || "U")}
                    </Avatar>
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
                      User Details
                    </Typography>
                  </Stack>
                  <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </DialogTitle>

              <DialogContent>
                {!editMode ? (
                  <Stack spacing={2.5} sx={{ mt: 1 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                        <PersonIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="caption" color="text.secondary">
                          Username
                        </Typography>
                      </Stack>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedUser.username}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                        <EmailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="caption" color="text.secondary">
                          Email
                        </Typography>
                      </Stack>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedUser.email}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                        {getRoleIcon(selectedUser.role)}
                        <Typography variant="caption" color="text.secondary">
                          Role
                        </Typography>
                      </Stack>
                      <Chip
                        label={selectedUser.role}
                        color={getRoleColor(selectedUser.role)}
                        size="small"
                        icon={getRoleIcon(selectedUser.role)}
                        sx={{ fontWeight: 600 }}
                      />
                    </Paper>
                  </Stack>
                ) : (
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField
                      label="Username"
                      fullWidth
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      disabled={updating}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      disabled={updating}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={editData.role}
                        label="Role"
                        onChange={(e) =>
                          setEditData({ ...editData, role: e.target.value })
                        }
                        disabled={updating}
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="USER">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <PersonIcon fontSize="small" />
                            <span>USER</span>
                          </Stack>
                        </MenuItem>
                        <MenuItem value="ADMIN">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <AdminIcon fontSize="small" />
                            <span>ADMIN</span>
                          </Stack>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                )}
              </DialogContent>

              <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
                {!editMode ? (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEditClick}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => setConfirmDelete(true)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditMode(false)}
                      disabled={updating}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={updating}
                      startIcon={updating ? <CircularProgress size={16} /> : <SaveIcon />}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        px: { xs: 2, sm: 3 },
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                      }}
                    >
                      {updating ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: isDark ? "#1e1e2e" : "#ffffff",
              m: { xs: 2, sm: 3 },
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={700} color="error" sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
              Delete User?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              This action cannot be undone.
            </Alert>
            <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Are you sure you want to delete user{" "}
              <strong>{selectedUser?.username}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
            <Button
              onClick={() => setConfirmDelete(false)}
              disabled={deleting}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleting}
              startIcon={deleting ? <CircularProgress size={16} /> : <DeleteIcon />}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              }}
            >
              {deleting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}