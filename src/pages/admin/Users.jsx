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
//   Drawer,
//   Divider,
//   useTheme,
// } from '@mui/material';

// // Dummy users
// const usersData = [
//   {
//     id: 1,
//     username: 'Karuna Dahal',
//     email: 'karunadahal503@gmail.com',
//     role: 'User',
//     profile: '',
//     createdAt: '2025-01-10',
//     updatedAt: '2025-01-18',
//   },
//   {
//     id: 2,
//     username: 'John Doe',
//     email: 'john@example.com',
//     role: 'Admin',
//     profile: '',
//     createdAt: '2025-01-05',
//     updatedAt: '2025-01-15',
//   },
//   {
//     id: 3,
//     username: 'Emma Johnson',
//     email: 'emma@example.com',
//     role: 'User',
//     profile: '',
//     createdAt: '2025-01-02',
//     updatedAt: '2025-01-12',
//   },
// ];

// export default function Users() {
//   const theme = useTheme();
//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Users Management
//       </Typography>

//       <Paper
//         elevation={3}
//         sx={{
//           overflow: 'hidden',
//           borderRadius: 2,
//           mt: 2,
//           backgroundColor: theme.palette.background.paper,
//         }}
//       >
//         {/* Table */}
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f1f1f1' }}>
//               <TableCell><strong>Profile</strong></TableCell>
//               <TableCell><strong>Username</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Role</strong></TableCell>
//               <TableCell><strong>Action</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {usersData.map((user) => (
//               <TableRow
//                 key={user.id}
//                 hover
//                 sx={{
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor:
//                       theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.07)' : '#f9f9f9',
//                   },
//                 }}
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <TableCell>
//                   <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
//                     {user.username.charAt(0)}
//                   </Avatar>
//                 </TableCell>

//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>

//                 <TableCell>
//                   <Typography
//                     sx={{
//                       fontSize: '0.85rem',
//                       color: theme.palette.primary.main,
//                       textDecoration: 'underline',
//                     }}
//                   >
//                     View Details
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* Drawer Panel */}
//       <Drawer
//         anchor="right"
//         open={Boolean(selectedUser)}
//         onClose={() => setSelectedUser(null)}
//         PaperProps={{
//           sx: {
//             width: { xs: '100%', sm: 380 },
//             p: 3,
//             backgroundColor: theme.palette.background.default,
//           },
//         }}
//       >
//         {selectedUser && (
//           <>
//             <Typography variant="h6" fontWeight="bold">
//               User Details
//             </Typography>

//             <Box sx={{ textAlign: 'center', mt: 3 }}>
//               <Avatar
//                 sx={{
//                   width: 90,
//                   height: 90,
//                   mx: 'auto',
//                   bgcolor: theme.palette.primary.main,
//                   fontSize: '2rem',
//                 }}
//               >
//                 {selectedUser.username.charAt(0)}
//               </Avatar>

//               <Typography variant="h6" sx={{ mt: 2 }}>
//                 {selectedUser.username}
//               </Typography>

//               <Typography variant="body2" color="text.secondary">
//                 {selectedUser.email}
//               </Typography>
//             </Box>

//             <Divider sx={{ mt: 3, mb: 3 }} />

//             <Typography variant="body1">
//               <strong>Role:</strong> {selectedUser.role}
//             </Typography>

//             <Typography variant="body1" sx={{ mt: 2 }}>
//               <strong>Created At:</strong> {selectedUser.createdAt}
//             </Typography>

//             <Typography variant="body1" sx={{ mt: 2 }}>
//               <strong>Updated At:</strong> {selectedUser.updatedAt}
//             </Typography>
//           </>
//         )}
//       </Drawer>
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const usersData = [
  {
    id: 1,
    username: 'Alice Smith',
    email: 'alice@example.com',
    role: 'User',
    profile: '',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-18',
  },
  {
    id: 2,
    username: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    profile: '',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-15',
  },
  {
    id: 3,
    username: 'Emma Johnson',
    email: 'emma@example.com',
    role: 'User',
    profile: '',
    createdAt: '2025-01-02',
    updatedAt: '2025-01-12',
  },
];

export default function Users() {
  const theme = useTheme();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Users Management
      </Typography>

      <Paper
        elevation={3}
        sx={{
          overflow: 'hidden',
          borderRadius: 2,
          mt: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#252525' : '#f1f1f1' }}>
              <TableCell><strong>Profile</strong></TableCell>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersData.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.07)' : '#f9f9f9',
                  },
                }}
                onClick={() => setSelectedUser(user)}
              >
                <TableCell>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {user.username.charAt(0)}
                  </Avatar>
                </TableCell>

                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: theme.palette.primary.main,
                      textDecoration: 'underline',
                    }}
                  >
                    View Details
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* User Detail Dialog */}
      <Dialog
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {selectedUser && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>
              User Details
              <IconButton
                onClick={() => setSelectedUser(null)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  mx: 'auto',
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem',
                }}
              >
                {selectedUser.username.charAt(0)}
              </Avatar>

              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                {selectedUser.username}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {selectedUser.email}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body1">
                <strong>Role:</strong> {selectedUser.role}
              </Typography>

              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Created At:</strong> {selectedUser.createdAt}
              </Typography>

              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Updated At:</strong> {selectedUser.updatedAt}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
