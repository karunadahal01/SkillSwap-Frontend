// src/context/AuthContext.jsx
import { useState, createContext, useMemo, useContext } from 'react';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '@services/auth/authService';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('skillSwap_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN
  const login = async ({ email, password }) => {
    setLoading(true);

    const res = await loginUser({ email, password });

    if (!res.ok) {
      setLoading(false);
      return { ok: false, message: res.message };
    }

    const { accessToken, refreshToken } = res.tokens;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const loggedInUser = {
      email,
      role: 'user', // placeholder (will fetch real user later)
    };

    setUser(loggedInUser);
    localStorage.setItem('skillSwap_user', JSON.stringify(loggedInUser));

    setLoading(false);

    return { ok: true, user: loggedInUser, admin: false };
  };

  // 📝 REGISTER
  const register = async ({ username, email, password }) => {
    setLoading(true);

    const res = await registerUser({ username, email, password });

    setLoading(false);

    if (!res.ok) {
      return { ok: false, message: res.message };
    }

    return { ok: true };
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);

    try {
      localStorage.removeItem('skillSwap_user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch {}

    toast.success('Logged out');

    setTimeout(() => {
      window.location.href = '/login';
    }, 800);
  };

  const value = useMemo(
    () => ({ user, login, register, logout, loading }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
