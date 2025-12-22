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
//         navigate('/user', { replace: true });
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
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import Logo from '@assets/skillswap-logo.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@utils/validationSchemas';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
        // 🔹 Redirect based on role
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
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #ffffffff, #325cb9ff)',
      }}
    >
      {/* Top logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: 80, mr: 2 }} />
      </Box>

      {/* Form */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper sx={{ width: 420, maxWidth: '95%', p: 4, borderRadius: 6 }} elevation={6}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
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
              sx={{ mt: 3, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            {/* Forgot password link */}
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: '0.875rem',
                  color: '#1976d2',
                  textDecoration: 'none',
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#1976d2' }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
