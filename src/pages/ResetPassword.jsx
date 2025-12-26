import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/skillswap-logo.png";
import toast from "react-hot-toast";
import { verifyResetCode } from "@services/auth/authService";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !code || !newPassword) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyResetCode({ email, code, newPassword });
      if (res.ok) {
        toast.success(res.message || "Password reset successfully!");
        navigate("/login");
      } else {
        setError(res.message || "Password reset failed");
        toast.error(res.message || "Password reset failed");
      }
    } catch (err) {
      setError("Unexpected error occurred");
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom right, #ffffffff, #325cb9ff)" }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: 80, mr: 2 }} />
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Paper sx={{ width: 420, maxWidth: "95%", p: 4, borderRadius: 6 }} elevation={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}>
            Reset Password
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Enter the code you received and set your new password.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && !email}
              helperText={!!error && !email ? "Email is required" : ""}
            />

            <TextField
              label="Reset Code"
              type="text"
              fullWidth
              margin="normal"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={!!error && !code}
              helperText={!!error && !code ? "Reset code is required" : ""}
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!error && !newPassword}
              helperText={!!error && !newPassword ? "New password is required" : ""}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                Remember your password? <Link to="/login" style={{ color: "#1976d2" }}>Login</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
