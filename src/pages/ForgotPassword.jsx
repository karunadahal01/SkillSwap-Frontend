// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, InputAdornment, Fade } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/skillswap-logo.png";
import toast from "react-hot-toast";
import { requestPasswordReset } from "@services/auth/authService";
import { Email } from "@mui/icons-material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await requestPasswordReset({ email });
      if (res.ok) {
        toast.success(res.message || "Password reset code sent!");
        localStorage.setItem("resetEmail", email);
        navigate("/reset-password");
      } else {
        setError(res.message || "Something went wrong");
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      setError("Unexpected error occurred");
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #ffffffff, #325cb9ff)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-35%",
          left: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "drift 8s ease-in-out infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-30%",
          right: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          animation: "drift 10s ease-in-out infinite reverse",
        },
        "@keyframes drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, -30px)" },
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          margin: "auto",
          px: 2,
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Fade in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: theme => theme.palette.background.auth,
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Logo Section */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 200,
                  height: 50,
                  margin: '0 auto',
                  mb: 5,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={Logo}
                  alt="SkillSwap Logo"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Forgot Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your registered email and we'll send you a reset code
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#667eea" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 6px 30px rgba(102, 126, 234, 0.6)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: "#ccc",
                    color: "#666",
                  },
                }}
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#667eea",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
}