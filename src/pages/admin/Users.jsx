// // src/pages/admin/Users.jsx
// import React, { useState } from 'react';
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
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const initialUsers = [
//   {
//     id: 1,
//     username: 'Alice Smith',
//     email: 'alice@example.com',
//     role: 'User',
//     createdAt: '2025-01-10',
//     updatedAt: '2025-01-18',
//   },
//   {
//     id: 2,
//     username: 'John Doe',
//     email: 'john@example.com',
//     role: 'Admin',
//     createdAt: '2025-01-05',
//     updatedAt: '2025-01-15',
//   },
//   {
//     id: 3,
//     username: 'Emma Johnson',
//     email: 'emma@example.com',
//     role: 'User',
//     createdAt: '2025-01-02',
//     updatedAt: '2025-01-12',
//   },
// ];

// export default function Users() {
//   const theme = useTheme();
//   const [users, setUsers] = useState(initialUsers);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const handleEditClick = () => {
//     setEditMode(true);
//     setEditData({ ...selectedUser });
//   };

//   const handleSave = () => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === editData.id ? editData : u))
//     );
//     setSelectedUser(editData);
//     setEditMode(false);
//   };

//   const handleDelete = () => {
//     setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
//     setConfirmDelete(false);
//     setSelectedUser(null);
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

//       <Paper elevation={3} sx={{ mt: 2, borderRadius: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f1f1f1' }}>
//               <TableCell><strong>Profile</strong></TableCell>
//               <TableCell><strong>Username</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Role</strong></TableCell>
//               <TableCell><strong>View</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id} hover>
//                 <TableCell>
//                   <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
//                     {user.username.charAt(0)}
//                   </Avatar>
//                 </TableCell>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => setSelectedUser(user)}>
//                     <VisibilityIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* User Detail Dialog */}
//       <Dialog open={Boolean(selectedUser)} onClose={handleClose} maxWidth="xs" fullWidth>
//         {selectedUser && (
//           <>
//             <DialogTitle sx={{ fontWeight: 'bold' }}>
//               User Details
//               <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>

//             <DialogContent>
//               <Avatar
//                 sx={{
//                   width: 80,
//                   height: 80,
//                   mx: 'auto',
//                   bgcolor: theme.palette.primary.main,
//                   fontSize: '2rem',
//                 }}
//               >
//                 {selectedUser.username.charAt(0)}
//               </Avatar>

//               <Divider sx={{ my: 3 }} />

//               {!editMode ? (
//                 <>
//                   <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
//                   <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
//                   <Typography><strong>Role:</strong> {selectedUser.role}</Typography>

//                   <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
//                     <Button startIcon={<EditIcon />} variant="contained" onClick={handleEditClick}>
//                       Edit
//                     </Button>
//                     <Button
//                       startIcon={<DeleteIcon />}
//                       color="error"
//                       variant="outlined"
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
//                   <TextField
//                     label="Role"
//                     fullWidth
//                     margin="normal"
//                     value={editData.role}
//                     onChange={(e) =>
//                       setEditData({ ...editData, role: e.target.value })
//                     }
//                   />

//                   <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//                     <Button variant="contained" onClick={handleSave}>
//                       Save
//                     </Button>
//                     <Button variant="outlined" onClick={() => setEditMode(false)}>
//                       Cancel
//                     </Button>
//                   </Stack>
//                 </>
//               )}
//             </DialogContent>
//           </>
//         )}
//       </Dialog>

//       {/* Confirm Delete Dialog */}
//       <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to remove this user?
//           </Typography>

//           <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//             <Button variant="contained" color="error" onClick={handleDelete}>
//               Yes, Delete
//             </Button>
//             <Button variant="outlined" onClick={() => setConfirmDelete(false)}>
//               Cancel
//             </Button>
//           </Stack>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }



// // src/pages/admin/Users.jsx
// import React, { useState } from 'react';
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
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const initialUsers = [
//   {
//     id: 1,
//     username: 'Alice Smith',
//     email: 'alice@example.com',
//     role: 'User',
//     createdAt: '2025-01-10',
//     updatedAt: '2025-01-18',
//   },
//   {
//     id: 2,
//     username: 'John Doe',
//     email: 'john@example.com',
//     role: 'Admin',
//     createdAt: '2025-01-05',
//     updatedAt: '2025-01-15',
//   },
//   {
//     id: 3,
//     username: 'Emma Johnson',
//     email: 'emma@example.com',
//     role: 'User',
//     createdAt: '2025-01-02',
//     updatedAt: '2025-01-12',
//   },
// ];

// export default function Users() {
//   const theme = useTheme();
//   const [users, setUsers] = useState(initialUsers);
//   const [search, setSearch] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const filteredUsers = users.filter((user) =>
//     `${user.username} ${user.email} ${user.role}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleEditClick = () => {
//     setEditMode(true);
//     setEditData({ ...selectedUser });
//   };

//   const handleSave = () => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === editData.id ? editData : u))
//     );
//     setSelectedUser(editData);
//     setEditMode(false);
//   };

//   const handleDelete = () => {
//     setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
//     setConfirmDelete(false);
//     setSelectedUser(null);
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
//       <TextField
//         placeholder="Search by username, email or role"
//         fullWidth
//         sx={{ mb: 2 }}
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <Paper elevation={3} sx={{ borderRadius: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f1f1f1' }}>
//               <TableCell><strong>Profile</strong></TableCell>
//               <TableCell><strong>Username</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Role</strong></TableCell>
//               <TableCell><strong>View</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <TableRow key={user.id} hover>
//                   <TableCell>
//                     <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
//                       {user.username.charAt(0)}
//                     </Avatar>
//                   </TableCell>
//                   <TableCell>{user.username}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>
//                     <IconButton color="primary" onClick={() => setSelectedUser(user)}>
//                       <VisibilityIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* User Detail Dialog */}
//       <Dialog open={Boolean(selectedUser)} onClose={handleClose} maxWidth="xs" fullWidth>
//         {selectedUser && (
//           <>
//             <DialogTitle sx={{ fontWeight: 'bold' }}>
//               User Details
//               <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>

//             <DialogContent>
//               <Avatar
//                 sx={{
//                   width: 80,
//                   height: 80,
//                   mx: 'auto',
//                   bgcolor: theme.palette.primary.main,
//                   fontSize: '2rem',
//                 }}
//               >
//                 {selectedUser.username.charAt(0)}
//               </Avatar>

//               <Divider sx={{ my: 3 }} />

//               {!editMode ? (
//                 <>
//                   <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
//                   <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
//                   <Typography><strong>Role:</strong> {selectedUser.role}</Typography>

//                   <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
//                     <Button startIcon={<EditIcon />} variant="contained" onClick={handleEditClick}>
//                       Edit
//                     </Button>
//                     <Button
//                       startIcon={<DeleteIcon />}
//                       color="error"
//                       variant="outlined"
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
//                   <TextField
//                     label="Role"
//                     fullWidth
//                     margin="normal"
//                     value={editData.role}
//                     onChange={(e) =>
//                       setEditData({ ...editData, role: e.target.value })
//                     }
//                   />

//                   <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//                     <Button variant="contained" onClick={handleSave}>
//                       Save
//                     </Button>
//                     <Button variant="outlined" onClick={() => setEditMode(false)}>
//                       Cancel
//                     </Button>
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
//           <Typography>Are you sure you want to remove this user?</Typography>

//           <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//             <Button variant="contained" color="error" onClick={handleDelete}>
//               Yes, Delete
//             </Button>
//             <Button variant="outlined" onClick={() => setConfirmDelete(false)}>
//               Cancel
//             </Button>
//           </Stack>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }



// src/pages/admin/Users.jsx
import React, { useState } from 'react';
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
  useTheme,
  Divider,
  IconButton,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const initialUsers = [
  {
    id: 1,
    username: 'Alice Smith',
    email: 'alice@example.com',
    role: 'User',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-18',
  },
  {
    id: 2,
    username: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-15',
  },
  {
    id: 3,
    username: 'Emma Johnson',
    email: 'emma@example.com',
    role: 'User',
    createdAt: '2025-01-02',
    updatedAt: '2025-01-12',
  },
];

export default function Users() {
  const theme = useTheme();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEditClick = () => {
    setEditMode(true);
    setEditData({ ...selectedUser });
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editData.id ? editData : u))
    );
    setSelectedUser(editData);
    setEditMode(false);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setConfirmDelete(false);
    setSelectedUser(null);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setEditMode(false);
    setEditData(null);
    setConfirmDelete(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Users Management
      </Typography>

      {/* Search Bar */}
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          mb: 2,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          maxWidth: 420,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search by username, email or role"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f1f1f1' }}>
              <TableCell><strong>Profile</strong></TableCell>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>View</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {user.username.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => setSelectedUser(user)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* User Detail Dialog */}
      <Dialog open={Boolean(selectedUser)} onClose={handleClose} maxWidth="xs" fullWidth>
        {selectedUser && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold' }}>
              User Details
              <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem',
                }}
              >
                {selectedUser.username.charAt(0)}
              </Avatar>

              <Divider sx={{ my: 3 }} />

              {!editMode ? (
                <>
                  <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
                  <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                  <Typography><strong>Role:</strong> {selectedUser.role}</Typography>

                  <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                    <Button startIcon={<EditIcon />} variant="contained" onClick={handleEditClick}>
                      Edit
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      color="error"
                      variant="outlined"
                      onClick={() => setConfirmDelete(true)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                  <TextField
                    label="Role"
                    fullWidth
                    margin="normal"
                    value={editData.role}
                    onChange={(e) =>
                      setEditData({ ...editData, role: e.target.value })
                    }
                  />

                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="outlined" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </Stack>
                </>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Confirm Delete */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this user?</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button variant="outlined" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
