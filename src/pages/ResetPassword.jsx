// import { useState } from "react";
// import { Box, Paper, TextField, Button, Typography } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import Logo from "@assets/skillswap-logo.png";
// import toast from "react-hot-toast";
// import { verifyResetCode } from "@services/auth/authService";

// export default function ResetPassword() {
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !code || !newPassword) {
//       setError("All fields are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await verifyResetCode({ email, code, newPassword });
//       if (res.ok) {
//         toast.success(res.message || "Password reset successfully!");
//         navigate("/login");
//       } else {
//         setError(res.message || "Password reset failed");
//         toast.error(res.message || "Password reset failed");
//       }
//     } catch (err) {
//       setError("Unexpected error occurred");
//       toast.error("Unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom right, #ffffffff, #325cb9ff)" }}>
//       <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
//         <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: 80, mr: 2 }} />
//       </Box>

//       <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
//         <Paper sx={{ width: 420, maxWidth: "95%", p: 4, borderRadius: 6 }} elevation={6}>
//           <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}>
//             Reset Password
//           </Typography>

//           <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
//             Enter the code you received and set your new password.
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               label="Email"
//               type="email"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!error && !email}
//               helperText={!!error && !email ? "Email is required" : ""}
//             />

//             <TextField
//               label="Reset Code"
//               type="text"
//               fullWidth
//               margin="normal"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               error={!!error && !code}
//               helperText={!!error && !code ? "Reset code is required" : ""}
//             />

//             <TextField
//               label="New Password"
//               type="password"
//               fullWidth
//               margin="normal"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               error={!!error && !newPassword}
//               helperText={!!error && !newPassword ? "New password is required" : ""}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{ mt: 3, backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
//               disabled={loading}
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </Button>

//             <Box sx={{ textAlign: "center", mt: 2 }}>
//               <Typography variant="body2">
//                 Remember your password? <Link to="/login" style={{ color: "#1976d2" }}>Login</Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }






// src/pages/ResetPassword.jsx
import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, InputAdornment, IconButton, Zoom } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/skillswap-logo.png";
import toast from "react-hot-toast";
import { verifyResetCode } from "@services/auth/authService";
import { Email, VpnKey, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-40%",
          right: "-10%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          animation: "rotate 10s linear infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-25%",
          left: "-15%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "rotate 15s linear infinite reverse",
        },
        "@keyframes rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
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
        <Zoom in={true} timeout={600}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: theme => theme.palette.background.paper,
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
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter the code you received and set your new password
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
                error={!!error && !email}
                helperText={!!error && !email ? "Email is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#4facfe" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#4facfe",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4facfe",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                label="Reset Code"
                type="text"
                placeholder="Enter the reset code"
                fullWidth
                margin="normal"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                error={!!error && !code}
                helperText={!!error && !code ? "Reset code is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey sx={{ color: "#4facfe" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#4facfe",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4facfe",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!error && !newPassword}
                helperText={!!error && !newPassword ? "New password is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#4facfe" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#4facfe",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4facfe",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    boxShadow: "0 6px 30px rgba(79, 172, 254, 0.6)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: "#ccc",
                  },
                }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#4facfe",
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
        </Zoom>
      </Box>
    </Box>
  );
}