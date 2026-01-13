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
import * as authService from "@services/auth/authService";
import toast from "react-hot-toast";

export default function UserSettings() {
  const { mode, toggleColorMode } = useThemeMode();
  const { user, logout, setUser } = useContext(AuthContext);

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

  const [preview, setPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  /* ===================== LOAD PROFILE ===================== */
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

        if (setUser && user) {
          setUser({ ...user, avatarUrl: data.avatarUrl || null });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ===================== AVATAR UPLOAD ===================== */
  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const uploadedUrl = await profileService.uploadAvatar(file);
      setAvatarUrl(uploadedUrl);

      if (setUser && user) {
        setUser({ ...user, avatarUrl: uploadedUrl });
      }

      toast.success("Avatar uploaded");
    } catch {
      toast.error("Avatar upload failed");
    }
  };

  /* ===================== FORM HANDLERS ===================== */
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  /* ===================== CHANGE PASSWORD ===================== */
  const handlePasswordSubmit = async () => {
    const { current, newPassword, confirmPassword } = passwordData;

    if (!current || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await authService.changePassword({
      currentPassword: current,
      newPassword,
      confirmNewPassword: confirmPassword,
    });

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message || "Password changed successfully");

    setPasswordData({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });

    // 🔐 Security best practice
    setTimeout(() => logout(), 1500);
  };

  /* ===================== SAVE PROFILE ===================== */
  const handleSave = async () => {
    try {
      await profileService.updateProfile({
        fullName: form.fullName,
        bio: form.bio,
        avatarUrl,
      });

      toast.success("Profile updated successfully");
      setSaveDialog(false);
    } catch {
      toast.error("Profile update failed");
    }
  };

  /* ===================== UI ===================== */
  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        User Settings
      </Typography>

      {/* PROFILE */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Profile Information</Typography>
          <Divider sx={{ my: 2 }} />

          <Box textAlign="center" mb={3}>
            <Avatar src={preview} sx={{ width: 90, height: 90, mx: "auto", mb: 1 }} />
            <Button variant="contained" component="label">
              Upload Picture
              <input hidden type="file" accept="image/*" onChange={handleProfilePic} />
            </Button>
          </Box>

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
              <TextField fullWidth label="Username" value={form.username} InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Email" value={form.email} InputProps={{ readOnly: true }} />
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

      {/* PASSWORD */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Change Password</Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                name="current"
                label="Current Password"
                value={passwordData.current}
                onChange={handlePasswordInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="password"
                name="newPassword"
                label="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
              />
            </Grid>
          </Grid>

          <Button sx={{ mt: 2 }} variant="contained" onClick={handlePasswordSubmit}>
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* APPEARANCE */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Appearance</Typography>
          <Divider sx={{ my: 2 }} />
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleColorMode} />}
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={() => setSaveDialog(true)}>
          Save Changes
        </Button>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* SAVE CONFIRM */}
      <Dialog open={saveDialog} onClose={() => setSaveDialog(false)}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography>Save profile changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
