// src/pages/Register.jsx
import React from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import Logo from '@assets/skillswap-logo.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@utils/validationSchemas';
import toast from 'react-hot-toast';

export default function Register() {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log('✅ Form submitted with:', data);
    const toastId = toast.loading('Creating account...');
    try {
      const res = await registerUser({
        name: data.username, // map username from schema to name for AuthContext
        email: data.email,
        password: data.password,
      });
      console.log('✅ Response from registerUser:', res);
      if (res && (res.ok || res.user)) {
        toast.success('Account created successfully!', { id: toastId });

        // store temp user id or email (for skill setup)
        localStorage.setItem(
          'pendingSkillSetup',
          JSON.stringify({ email: data.email })
        );

        setTimeout(() => navigate('/skill-setup', { replace: true }), 800);
      }


      // if (res && (res.ok || res.user)) {
      //   toast.success('Account created successfully!', { id: toastId });
      //   setTimeout(() => navigate('/login', { replace: true }), 800);
      // }
       else {
        toast.error(res.message || 'Registration failed.', { id: toastId });
      }
    } catch (err) {
      console.error('❌ onSubmit error:', err);
      toast.error('Unexpected error occurred.', { id: toastId });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #ffffff, #325cb9)',
      }}
    >
      {/* Top logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: 80, mr: 2 }} />
      </Box>

      {/* Centered form */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper sx={{ width: 420, maxWidth: '95%', p: 4, borderRadius: 6 }} elevation={6}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...formRegister('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...formRegister('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...formRegister('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...formRegister('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1976d2' }}>
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
