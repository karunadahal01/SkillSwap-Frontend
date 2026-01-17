// // src/pages/Login.jsx
// import { useState } from 'react';
// import { Box, Paper, TextField, Button, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '@context/AuthContext';
// import Logo from '@assets/skillswap-logo.png';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { loginSchema } from '@utils/validationSchemas';
// import toast from 'react-hot-toast';

// export default function Login() {
//   const { login, loading } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//   });

//   const onSubmit = async (data) => {
//     setError('');
//     try {
//       const res = await login(data);

//       if (res.ok) {
//         toast.success('Login successful!');
//         // 🔹 Redirect based on role
//         if (res.admin) {
//           navigate('/admin', { replace: true });
//         } else {
//           navigate('/user', { replace: true });
//         }
//       } else {
//         const message = res.message || 'Login failed';
//         setError(message);
//         toast.error(message);
//       }
//     } catch {
//       setError('Unexpected error');
//       toast.error('Unexpected error occurred');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         background: 'linear-gradient(to bottom right, #ffffffff, #325cb9ff)',
//       }}
//     >
//       {/* Top logo */}
//       <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
//         <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: 80, mr: 2 }} />
//       </Box>

//       {/* Form */}
//       <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
//         <Paper sx={{ width: 420, maxWidth: '95%', p: 4, borderRadius: 6 }} elevation={6}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
//             Login
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             <TextField
//               label="Email"
//               fullWidth
//               margin="normal"
//               {...register('email')}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               fullWidth
//               margin="normal"
//               {...register('password')}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//             />

//             {error && (
//               <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                 {error}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{ mt: 3, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
//               disabled={loading}
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </Button>

//             {/* Forgot password link */}
//             <Box sx={{ textAlign: 'center', mt: 1 }}>
//               <Link
//                 to="/forgot-password"
//                 style={{
//                   fontSize: '0.875rem',
//                   color: '#1976d2',
//                   textDecoration: 'none',
//                 }}
//               >
//                 Forgot password?
//               </Link>
//             </Box>

//             <Box sx={{ mt: 2, textAlign: 'center' }}>
//               <Typography variant="body2">
//                 Don't have an account?{' '}
//                 <Link to="/register" style={{ color: '#1976d2' }}>
//                   Register
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }




// src/pages/Login.jsx
import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, InputAdornment, IconButton, Fade } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import Logo from '@assets/skillswap-logo.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@utils/validationSchemas';
import toast from 'react-hot-toast';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await login(data);

      if (res.ok) {
        toast.success('Login successful!');
        if (res.admin) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/user', { replace: true });
        }
      } else {
        const message = res.message || 'Login failed';
        setError(message);
        toast.error(message);
      }
    } catch {
      setError('Unexpected error');
      toast.error('Unexpected error occurred');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #ffffffff, #325cb9ff)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 8s ease-in-out infinite reverse',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          margin: 'auto',
          px: 2,
          py: 4,
          position: 'relative',
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
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
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
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to continue your learning journey
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email Address"
                placeholder="Enter your email"
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#667eea' }} />
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
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
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

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: '0.875rem',
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 6px 30px rgba(102, 126, 234, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: '#ccc',
                  },
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    style={{
                      color: '#667eea',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Register Now
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