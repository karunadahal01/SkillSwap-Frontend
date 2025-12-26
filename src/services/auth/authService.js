// src/services/auth/authService.js
import api from '@config/axios';

/**
 * Login user
 * @param {{ email: string, password: string }} payload
 */
export async function loginUser(payload) {
  try {
    const res = await api.post('/api/auth/login', payload);

    if (res.data?.success) {
      return {
        ok: true,
        message: res.data.message,
        tokens: res.data.data, // { accessToken, refreshToken }
      };
    }

    return {
      ok: false,
      message: res.data?.message || 'Login failed',
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message ||
        err.message ||
        'Login request failed',
    };
  }
}

/**
 * Register user (JSON ONLY)
 * @param {{ name: string, email: string, password: string }} payload
 */
export async function registerUser(payload) {
  try {
    const res = await api.post('/api/auth/register', payload);

    if (res.data?.success) {
      return {
        ok: true,
        message: res.data.message,
      };
    }

    return {
      ok: false,
      message: res.data?.message || 'Registration failed',
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message ||
        err.message ||
        'Registration request failed',
    };
  }
}

/**
 * Request password reset
 * @param {{ email: string }} payload
 */
export async function requestPasswordReset(payload) {
  try {
    const res = await api.post('/api/auth/request-reset', payload);

    if (res.data?.success) {
      return { ok: true, message: res.data.message };
    }

    return { ok: false, message: res.data?.message || 'Password reset request failed' };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message ||
        err.message ||
        'Password reset request failed',
    };
  }
}

/**
 * Verify code and reset password
 * @param {{ email: string, code: string, newPassword: string }} payload
 */
export async function verifyResetCode(payload) {
  try {
    const res = await api.post('/api/auth/verify-reset', payload);

    if (res.data?.success) {
      return { ok: true, message: res.data.message };
    }

    return { ok: false, message: res.data?.message || 'Password reset failed' };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message ||
        err.message ||
        'Password reset request failed',
    };
  }
}
