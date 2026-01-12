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
  useTheme,
  Divider,
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import {
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "@/services/admin/adminUserService";

export default function Users() {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // 🔹 Fetch users on load
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
    } finally {
      setLoading(false);
    }
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
      await updateUserById(editData.id, editData);
      setUsers((prev) =>
        prev.map((u) => (u.id === editData.id ? editData : u))
      );
      setSelectedUser(editData);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserById(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setConfirmDelete(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
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

      {/* Search */}
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          mb: 2,
          borderRadius: 3,
          maxWidth: 420,
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
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        {loading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#252525" : "#f1f1f1",
                }}
              >
                <TableCell><strong>Profile</strong></TableCell>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>View</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.length ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Avatar
                      src={user.avatarUrl || undefined}
                      sx={{
                        bgcolor: user.avatarUrl ? 'transparent' : theme.palette.primary.main,
                        color: '#fff',
                      }}
                    >
                      {!user.avatarUrl && (user.username?.charAt(0).toUpperCase() || 'U')}
                    </Avatar>

                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => setSelectedUser(user)}>
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
        )}
      </Paper>

      {/* User Dialog */}
      <Dialog open={Boolean(selectedUser)} onClose={handleClose} maxWidth="xs" fullWidth>
        {selectedUser && (
          <>
            <DialogTitle>
              User Details
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              {!editMode ? (
                <>
                  <Typography><b>Username:</b> {selectedUser.username}</Typography>
                  <Typography><b>Email:</b> {selectedUser.email}</Typography>
                  <Typography><b>Role:</b> {selectedUser.role}</Typography>

                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button startIcon={<EditIcon />} onClick={handleEditClick}>
                      Edit
                    </Button>
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
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
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={editData.role}
                      label="Role"
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                    >
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </FormControl>

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save
                    </Button>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
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
          <Typography>Are you sure you want to delete this user?</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button color="error" variant="contained" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

