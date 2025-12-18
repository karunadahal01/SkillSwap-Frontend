// // src/pages/user/UserSettings.jsx
// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Divider,
// } from "@mui/material";

// src/pages/user/UserSettings.jsx
import { useState } from "react";
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

import { useThemeMode } from "../../context/ThemeModeContext"; // Dark mode context

export default function UserSettings() {
  // Theme mode context
  const { mode, toggleColorMode } = useThemeMode();

  // Dummy user data
  const [form, setForm] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Skill sharer & learner.",
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences
  const [notify, setNotify] = useState({
    email: true,
    push: true,
    messages: true,
  });

  // Dialog visibility states
  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Profile Picture Upload
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle profile picture selection
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  // Form change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Password change
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Save settings action
  const handleSave = () => {
    console.log("Saved:", { form, notify, passwordData, profilePic });
    alert("Changes saved! (Dummy – backend coming later)");
    setSaveDialog(false);
  };

  // Delete account action
  const handleDelete = () => {
    alert("Account deleted (dummy). Backend coming later!");
    setDeleteDialog(false);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: "1000px",
        margin: "auto",
        marginTop:8
      }}
    >
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        User Settings
      </Typography>

      {/* PROFILE SETTINGS CARD */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Profile Information
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Profile Picture Upload */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              src={preview}
              sx={{ width: 90, height: 90, margin: "auto", mb: 1 }}
            />
            <Button variant="contained" component="label">
              Upload Picture
              <input hidden type="file" accept="image/*" onChange={handleProfilePic} />
            </Button>
          </Box>

          {/* User Info Form */}
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
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
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
          <Typography variant="h6" fontWeight={600}>
            Change Password
          </Typography>

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
          <Typography variant="h6" fontWeight={600}>
            Appearance
          </Typography>

          <Divider sx={{ my: 2 }} />

          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleColorMode} />}
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      {/* NOTIFICATION SETTINGS */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Notification Preferences
          </Typography>

          <Divider sx={{ my: 2 }} />

          <FormControlLabel
            control={
              <Switch
                checked={notify.email}
                onChange={(e) =>
                  setNotify({ ...notify, email: e.target.checked })
                }
              />
            }
            label="Email Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={notify.push}
                onChange={(e) =>
                  setNotify({ ...notify, push: e.target.checked })
                }
              />
            }
            label="Push Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={notify.messages}
                onChange={(e) =>
                  setNotify({ ...notify, messages: e.target.checked })
                }
              />
            }
            label="Message Alerts"
          />
        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => setSaveDialog(true)}>
          Save Changes
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => setDeleteDialog(true)}
        >
          Delete Account
        </Button>
      </Box>

      {/* SAVE CONFIRMATION DIALOG */}
      <Dialog open={saveDialog} onClose={() => setSaveDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you really want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography color="error">
            This action is permanent. Are you sure you want to delete your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
