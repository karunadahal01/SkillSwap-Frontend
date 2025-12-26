// import { useState } from "react";
// import { Box, Paper, TextField, Button, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import Logo from "@assets/skillswap-logo.png";
// import toast from "react-hot-toast";
// import { requestPasswordReset } from "@services/auth/authService";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await requestPasswordReset({ email });
//       if (res.ok) {
//         toast.success(res.message || "Password reset link sent!");
//       } else {
//         setError(res.message || "Something went wrong");
//         toast.error(res.message || "Something went wrong");
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
//             Forgot Password
//           </Typography>

//           <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
//             Enter your registered email and we’ll send you a reset link.
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               label="Email"
//               type="email"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!error}
//               helperText={error}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{ mt: 3, backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send Reset Link"}
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



import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import Logo from "@assets/skillswap-logo.png";
import toast from "react-hot-toast";
import { requestPasswordReset } from "@services/auth/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigate

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
        // ✅ store email in localStorage (optional) or pass via state
        localStorage.setItem("resetEmail", email);
        // ✅ navigate to reset-password page
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
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #ffffffff, #325cb9ff)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Box
          component="img"
          src={Logo}
          alt="SkillSwap Logo"
          sx={{ height: 80, mr: 2 }}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper sx={{ width: 420, maxWidth: "95%", p: 4, borderRadius: 6 }} elevation={6}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
          >
            Forgot Password
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Enter your registered email and we’ll send you a reset code.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2">
                Remember your password?{" "}
                <Link to="/login" style={{ color: "#1976d2" }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
