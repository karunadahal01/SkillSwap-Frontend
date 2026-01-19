// // src/pages/user/UserSettings.jsx
// import { useState, useEffect, useContext } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Divider,
//   Avatar,
//   Switch,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import { useThemeMode } from "@context/ThemeModeContext";
// import AuthContext from "@context/AuthContext";
// import * as profileService from "@services/profileService";
// import * as authService from "@services/auth/authService";
// import toast from "react-hot-toast";

// export default function Settings() {
//   const { mode, toggleColorMode } = useThemeMode();
//   const { user, logout, setUser } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     bio: "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     current: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [saveDialog, setSaveDialog] = useState(false);

//   const [preview, setPreview] = useState(null);
//   const [avatarUrl, setAvatarUrl] = useState(null);

//   /* ===================== LOAD PROFILE ===================== */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await profileService.getProfile();
//         const data = res.data.data;

//         setForm({
//           fullName: data.fullName || "",
//           username: data.username || "",
//           email: data.email || "",
//           bio: data.bio || "",
//         });

//         setAvatarUrl(data.avatarUrl || null);
//         setPreview(data.avatarUrl || null);

//         if (setUser && user) {
//           setUser({ ...user, avatarUrl: data.avatarUrl || null });
//         }
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//         toast.error("Failed to load profile");
//       }
//     };

//     fetchProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /* ===================== AVATAR UPLOAD ===================== */
//   const handleProfilePic = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));

//     try {
//       const uploadedUrl = await profileService.uploadAvatar(file);
//       setAvatarUrl(uploadedUrl);

//       if (setUser && user) {
//         setUser({ ...user, avatarUrl: uploadedUrl });
//       }

//       toast.success("Avatar uploaded");
//     } catch {
//       toast.error("Avatar upload failed");
//     }
//   };

//   /* ===================== FORM HANDLERS ===================== */
//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePasswordInputChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ===================== CHANGE PASSWORD ===================== */
//   const handlePasswordSubmit = async () => {
//     const { current, newPassword, confirmPassword } = passwordData;

//     if (!current || !newPassword || !confirmPassword) {
//       toast.error("All password fields are required");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const result = await authService.changePassword({
//       currentPassword: current,
//       newPassword,
//       confirmNewPassword: confirmPassword,
//     });

//     if (!result.ok) {
//       toast.error(result.message);
//       return;
//     }

//     toast.success(result.message || "Password changed successfully");

//     setPasswordData({
//       current: "",
//       newPassword: "",
//       confirmPassword: "",
//     });

//     // 🔐 Security best practice
//     setTimeout(() => logout(), 1500);
//   };

//   /* ===================== SAVE PROFILE ===================== */
//   const handleSave = async () => {
//     try {
//       await profileService.updateProfile({
//         fullName: form.fullName,
//         bio: form.bio,
//         avatarUrl,
//       });

//       toast.success("Profile updated successfully");
//       setSaveDialog(false);
//     } catch {
//       toast.error("Profile update failed");
//     }
//   };

//   /* ===================== UI ===================== */
//   return (
//     <Box sx={{ p: 4, maxWidth: 1000, mx: "auto", mt: 4 }}>
//       <Typography variant="h5" fontWeight={600} mb={3}>
//         User Settings
//       </Typography>

//       {/* PROFILE */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6">Profile Information</Typography>
//           <Divider sx={{ my: 2 }} />

//           <Box textAlign="center" mb={3}>
//             <Avatar src={preview} sx={{ width: 90, height: 90, mx: "auto", mb: 1 }} />
//             <Button variant="contained" component="label">
//               Upload Picture
//               <input hidden type="file" accept="image/*" onChange={handleProfilePic} />
//             </Button>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 name="fullName"
//                 value={form.fullName}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField fullWidth label="Username" value={form.username} InputProps={{ readOnly: true }} />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField fullWidth label="Email" value={form.email} InputProps={{ readOnly: true }} />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Bio"
//                 name="bio"
//                 value={form.bio}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* PASSWORD */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6">Change Password</Typography>
//           <Divider sx={{ my: 2 }} />

//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 type="password"
//                 name="current"
//                 label="Current Password"
//                 value={passwordData.current}
//                 onChange={handlePasswordInputChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="password"
//                 name="newPassword"
//                 label="New Password"
//                 value={passwordData.newPassword}
//                 onChange={handlePasswordInputChange}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 type="password"
//                 name="confirmPassword"
//                 label="Confirm New Password"
//                 value={passwordData.confirmPassword}
//                 onChange={handlePasswordInputChange}
//               />
//             </Grid>
//           </Grid>

//           <Button sx={{ mt: 2 }} variant="contained" onClick={handlePasswordSubmit}>
//             Change Password
//           </Button>
//         </CardContent>
//       </Card>

//       {/* APPEARANCE */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6">Appearance</Typography>
//           <Divider sx={{ my: 2 }} />
//           <FormControlLabel
//             control={<Switch checked={mode === "dark"} onChange={toggleColorMode} />}
//             label="Dark Mode"
//           />
//         </CardContent>
//       </Card>

//       {/* ACTIONS */}
//       <Box display="flex" gap={2}>
//         <Button variant="contained" onClick={() => setSaveDialog(true)}>
//           Save Changes
//         </Button>
//         <Button variant="outlined" color="error" onClick={logout}>
//           Logout
//         </Button>
//       </Box>

//       {/* SAVE CONFIRM */}
//       <Dialog open={saveDialog} onClose={() => setSaveDialog(false)}>
//         <DialogTitle>Confirm</DialogTitle>
//         <DialogContent>
//           <Typography>Save profile changes?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSave}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }







// src/pages/user/UserSettings.jsx - MOBILE RESPONSIVE VERSION
// Key changes: All spacing, typography, and layouts are now responsive across xs, sm, md, lg breakpoints

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
  Paper,
  Stack,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  PhotoCamera,
  Lock,
  Person,
  Email,
  Palette,
  Save,
  Logout,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useThemeMode } from "@context/ThemeModeContext";
import AuthContext from "@context/AuthContext";
import * as profileService from "@services/profileService";
import * as authService from "@services/auth/authService";
import toast from "react-hot-toast";

export default function Settings() {
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

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirmPassword: false,
  });

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
  }, []);

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

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

    setTimeout(() => logout(), 1500);
  };

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: (theme) =>
          mode === "dark"
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
        py: 6,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: (theme) =>
              mode === "dark"
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
              width: { xs: "200px", sm: "250px", md: "300px" },
              height: { xs: "200px", sm: "250px", md: "300px" },
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              transform: "translate(30%, -30%)",
            },
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ position: "relative", zIndex: 1, fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
            Settings
          </Typography>
          <Typography variant="body1" sx={{ mt: { xs: 0.5, sm: 1 }, opacity: 0.9, position: "relative", zIndex: 1, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Manage your account preferences and settings
          </Typography>
        </Paper>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {/* Left Column - Profile */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {/* PROFILE CARD */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  border: (theme) =>
                    mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                  background: (theme) => (mode === "dark" ? "#1e1e2e" : "#ffffff"),
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                      mode === "dark"
                        ? "0 12px 24px rgba(0,0,0,0.4)"
                        : "0 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 3 } }}>
                    <Person sx={{ mr: { xs: 1, sm: 1.5 }, color: "primary.main", fontSize: { xs: 20, sm: 24 } }} />
                    <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                      Profile Information
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

                  {/* Avatar Section */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: { xs: 3, sm: 4 },
                      position: "relative",
                    }}
                  >
                    <Box sx={{ position: "relative", mb: { xs: 1.5, sm: 2 } }}>
                      <Avatar
                        src={preview}
                        sx={{
                          width: { xs: 100, sm: 120 },
                          height: { xs: 100, sm: 120 },
                          border: { xs: "3px solid", sm: "4px solid" },
                          borderColor: "primary.main",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                        }}
                      />
                      <IconButton
                        component="label"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          bgcolor: "primary.main",
                          color: "white",
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          "&:hover": { bgcolor: "primary.dark" },
                          boxShadow: 2,
                        }}
                      >
                        <PhotoCamera fontSize="small" sx={{ fontSize: { xs: 18, sm: 20 } }} />
                        <input hidden type="file" accept="image/*" onChange={handleProfilePic} />
                      </IconButton>
                    </Box>
                    <Chip
                      label={`${form.username}`}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}
                    />
                  </Box>

                  {/* Form Fields */}
                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Username"
                        value={form.username}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: (theme) => (mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"),
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={form.email}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: (theme) => (mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"),
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={() => setSaveDialog(true)}
                      sx={{
                        py: { xs: 1, sm: 1.2 },
                        mt: { xs: 2.5, sm: 3 },
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        textTransform: "none",
                        boxShadow: 3,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                          boxShadow: 6,
                          background: "linear-gradient(135deg, #5568d3 0%, #63408a 100%)",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                </CardContent>
              </Card>

              {/* PASSWORD CARD */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  border: (theme) =>
                    mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                  background: (theme) => (mode === "dark" ? "#1e1e2e" : "#ffffff"),
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                      mode === "dark"
                        ? "0 12px 24px rgba(0,0,0,0.4)"
                        : "0 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 3 } }}>
                    <Lock sx={{ mr: { xs: 1, sm: 1.5 }, color: "primary.main", fontSize: { xs: 20, sm: 24 } }} />
                    <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                      Security
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type={showPasswords.current ? "text" : "password"}
                        name="current"
                        label="Current Password"
                        value={passwordData.current}
                        onChange={handlePasswordInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility("current")}
                                edge="end"
                                size="small"
                              >
                                {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type={showPasswords.newPassword ? "text" : "password"}
                        name="newPassword"
                        label="New Password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility("newPassword")}
                                edge="end"
                                size="small"
                              >
                                {showPasswords.newPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type={showPasswords.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        label="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility("confirmPassword")}
                                edge="end"
                                size="small"
                              >
                                {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    sx={{
                      mt: { xs: 2.5, sm: 3 },
                      borderRadius: 2,
                      py: { xs: 1, sm: 1.2 },
                      fontWeight: 600,
                      fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                      textTransform: "none",
                      boxShadow: 2,
                                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                          boxShadow: 6,
                          background: "linear-gradient(135deg, #5568d3 0%, #63408a 100%)",
                        },
                    }}
                    variant="contained"
                    startIcon={<Lock />}
                    onClick={handlePasswordSubmit}
                  >
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column - Preferences & Actions */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {/* APPEARANCE CARD */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  border: (theme) =>
                    mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                  background: (theme) => (mode === "dark" ? "#1e1e2e" : "#ffffff"),
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                      mode === "dark"
                        ? "0 12px 24px rgba(0,0,0,0.4)"
                        : "0 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 3 } }}>
                    <Palette sx={{ mr: { xs: 1, sm: 1.5 }, color: "primary.main", fontSize: { xs: 20, sm: 24 } }} />
                    <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                      Appearance
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: { xs: 2.5, sm: 3 } }} />

                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: 2,
                      bgcolor: (theme) => (mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"),
                      border: (theme) =>
                        mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={mode === "dark"}
                          onChange={toggleColorMode}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "primary.main",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "primary.main",
                            },
                          }}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight={500} sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
                            Dark Mode
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                            {mode === "dark" ? "Enabled" : "Disabled"}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* ACTIONS CARD */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  border: (theme) =>
                    mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                  background: (theme) => (mode === "dark" ? "#1e1e2e" : "#ffffff"),
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
                  <Typography variant="h6" fontWeight={600} mb={{ xs: 2.5, sm: 3 }} sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}>
                    Actions
                  </Typography>

                  <Divider sx={{ mb: { xs: 2.5, sm: 3 } }} />

                  <Stack spacing={2}>          
                    <Button
                      variant="outlined"
                      fullWidth
                      color="error"
                      startIcon={<Logout />}
                      onClick={logout}
                      sx={{
                        py: { xs: 1.2, sm: 1.5 },
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        textTransform: "none",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          bgcolor: "error.main",
                          color: "white",
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* INFO CARD */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: { xs: 2, md: 3 },
                  background: (theme) =>
                    mode === "dark"
                      ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                      : "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
                  border: (theme) =>
                    mode === "dark" ? "1px solid rgba(102, 126, 234, 0.2)" : "1px solid rgba(102, 126, 234, 0.15)",
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}>
                  <strong>Note:</strong> Username and email cannot be changed. Changing your password will
                  automatically log you out for security purposes.
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* SAVE CONFIRM DIALOG */}
      <Dialog
        open={saveDialog}
        onClose={() => setSaveDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, md: 3 },
            minWidth: { xs: '90%', sm: 400 },
            m: { xs: 2, sm: 3 },
            background: (theme) => (mode === "dark" ? "#1e1e2e" : "#ffffff"),
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
            Confirm Changes
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Are you sure you want to save these profile changes?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2.5, sm: 3 }, pt: 2 }}>
          <Button
            onClick={() => setSaveDialog(false)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              boxShadow: 2,
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}