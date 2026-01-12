// src/pages/user/UserSettings.jsx
import { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Avatar,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useThemeMode } from "@context/ThemeModeContext";
import AuthContext from "@context/AuthContext";
import * as profileService from "@services/profileService";
import toast from "react-hot-toast";

export default function Settings() {
  const { mode, toggleColorMode } = useThemeMode();
  const { user, logout, setUser } = useContext(AuthContext); // ✅ include setUser

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        const data = res.data.data;
        setForm({
          fullName: data.fullName || "",
          username: data.username || "",
          email: data.email || "",
          bio: data.bio || "",
        });
        setAvatarUrl(data.avatarUrl || null);
        setPreview(data.avatarUrl || null);

        // Update AuthContext immediately on mount
        if (setUser && user) {
          setUser({ ...user, avatarUrl: data.avatarUrl || null });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle avatar upload
  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(file);
    setPreview(URL.createObjectURL(file)); // show preview immediately

    try {
      // Upload file to backend, get actual URL
      const uploadedUrl = await profileService.uploadAvatar(file);
      setAvatarUrl(uploadedUrl); // save for profile update

      // ✅ Update AuthContext instantly so AvatarMenu reflects new avatar
      if (setUser && user) {
        setUser({ ...user, avatarUrl: uploadedUrl });
      }
    } catch (err) {
      console.error("Failed to upload avatar:", err);
      toast.error("Avatar upload failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await profileService.updateProfile({
        fullName: form.fullName,
        bio: form.bio,
        avatarUrl, // send updated avatar URL
      });
      toast.success("Profile updated successfully!");
      setSaveDialog(false);

      // ✅ Also update AuthContext just in case
      if (setUser && user) {
        setUser({ ...user, avatarUrl });
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Profile update failed.");
    }
  };

  const handleDelete = () => {
    toast.success("Account deleted (dummy). Backend implementation required.");
    setDeleteDialog(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1000px", margin: "auto", marginTop: 4 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        User Settings
      </Typography>

      {/* PROFILE SETTINGS CARD */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Profile Information</Typography>
          <Divider sx={{ my: 2 }} />

          {/* Avatar */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar src={preview} sx={{ width: 90, height: 90, margin: "auto", mb: 1 }} />
            <Button variant="contained" component="label">
              Upload Picture
              <input hidden type="file" accept="image/*" onChange={handleProfilePic} />
            </Button>
          </Box>

          {/* User info */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* PASSWORD SETTINGS */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Change Password</Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="current"
                label="Current Password"
                type="password"
                value={passwordData.current}
                onChange={handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* APPEARANCE SETTINGS */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Appearance</Typography>
          <Divider sx={{ my: 2 }} />
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleColorMode} />}
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
        <Button variant="contained" onClick={() => setSaveDialog(true)}>Save Changes</Button>
        <Button variant="outlined" color="error" onClick={() => setDeleteDialog(true)}>Delete Account</Button>
        <Button variant="outlined" color="secondary" onClick={logout}>Logout</Button>
      </Box>

      {/* SAVE CONFIRMATION DIALOG */}
      <Dialog open={saveDialog} onClose={() => setSaveDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you really want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography color="error">This action is permanent. Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
