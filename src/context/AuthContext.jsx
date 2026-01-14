// // src/context/AuthContext.jsx
// import { useState, createContext, useMemo, useContext } from 'react';
// import toast from 'react-hot-toast';
// import { loginUser, registerUser } from '@services/auth/authService';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext({
//   user: null,
//   login: async () => {},
//   register: async () => {},
//   logout: () => {},
//   loading: false,
// });

// export function AuthProvider({ children }) {
//   // 🔹 Load user from localStorage safely
//   const [user, setUser] = useState(() => {
//     try {
//       const raw = localStorage.getItem('skillSwap_user');
//       console.log('🔥 raw localStorage user:', raw);

//       if (!raw) return null;

//       const parsed = JSON.parse(raw);

//       // Validate shape
//       if (!parsed.id || !parsed.email || !parsed.role) {
//         console.log('⚠️ Invalid user object, clearing localStorage');
//         localStorage.removeItem('skillSwap_user');
//         return null;
//       }

//       console.log('✅ valid user loaded from localStorage:', parsed);
//       return parsed;
//     } catch (err) {
//       console.error('❌ Error parsing localStorage user:', err);
//       localStorage.removeItem('skillSwap_user');
//       return null;
//     }
//   });

//   const [loading, setLoading] = useState(false);

//   // 🔐 LOGIN
//   const login = async ({ email, password }) => {
//     setLoading(true);

//     try {
//       const res = await loginUser({ email, password });

//       if (!res.ok) {
//         setLoading(false);
//         return { ok: false, message: res.message };
//       }

//       const { accessToken, refreshToken } = res.tokens;

//       localStorage.setItem('accessToken', accessToken);
//       localStorage.setItem('refreshToken', refreshToken);

//       // Decode JWT
//       const decoded = jwtDecode(accessToken);
//       console.log('Decoded JWT:', decoded);

//       const loggedInUser = {
//         id: decoded.id || null,
//         email: decoded.sub || decoded.email,
//         role: decoded.role.toLowerCase() || 'user',
//       };

//       // Save to state & localStorage
//       setUser(loggedInUser);
//       localStorage.setItem('skillSwap_user', JSON.stringify(loggedInUser));
//       console.log('🔥 user stored in localStorage after login:', localStorage.getItem('skillSwap_user'));

//       setLoading(false);

//       return { ok: true, user: loggedInUser, admin: loggedInUser.role === 'admin' };
//     } catch (err) {
//       setLoading(false);
//       console.error('❌ login error:', err);
//       return { ok: false, message: 'Login failed due to unexpected error' };
//     }
//   };

//   // 📝 REGISTER
//   const register = async ({ username, email, password }) => {
//     setLoading(true);
//     try {
//       const res = await registerUser({ username, email, password });
//       setLoading(false);

//       if (!res.ok) {
//         return { ok: false, message: res.message };
//       }

//       return { ok: true };
//     } catch (err) {
//       setLoading(false);
//       console.error('❌ register error:', err);
//       return { ok: false, message: 'Registration failed due to unexpected error' };
//     }
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     setUser(null);

//     try {
//       localStorage.removeItem('skillSwap_user');
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//     } catch (err) {
//       console.error('❌ logout error:', err);
//     }

//     toast.success('Logged out');

//     setTimeout(() => {
//       window.location.href = '/login';
//     }, 800);
//   };

//   const value = useMemo(() => ({ user, login, register, logout, loading }), [user, loading]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export default AuthContext;





// src/context/AuthContext.jsx
import { useState, createContext, useMemo, useContext } from 'react';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '@services/auth/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
  user: null,
  token: null, // ✅ Add token
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
});

export function AuthProvider({ children }) {
  // 🔹 Load user from localStorage safely
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('skillSwap_user');
      console.log('🔥 raw localStorage user:', raw);

      if (!raw) return null;

      const parsed = JSON.parse(raw);

      // Validate shape
      if (!parsed.id || !parsed.email || !parsed.role) {
        console.log('⚠️ Invalid user object, clearing localStorage');
        localStorage.removeItem('skillSwap_user');
        return null;
      }

      console.log('✅ valid user loaded from localStorage:', parsed);
      return parsed;
    } catch (err) {
      console.error('❌ Error parsing localStorage user:', err);
      localStorage.removeItem('skillSwap_user');
      return null;
    }
  });

  // ✅ Add token state
  const [token, setToken] = useState(() => {
    return localStorage.getItem('accessToken') || null;
  });

  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN
  const login = async ({ email, password }) => {
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      if (!res.ok) {
        setLoading(false);
        return { ok: false, message: res.message };
      }

      const { accessToken, refreshToken } = res.tokens;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // ✅ Update token state
      setToken(accessToken);

      // Decode JWT
      const decoded = jwtDecode(accessToken);
      console.log('Decoded JWT:', decoded);

      const loggedInUser = {
        id: decoded.id || null,
        email: decoded.sub || decoded.email,
        role: decoded.role.toLowerCase() || 'user',
      };

      // Save to state & localStorage
      setUser(loggedInUser);
      localStorage.setItem('skillSwap_user', JSON.stringify(loggedInUser));
      console.log('🔥 user stored in localStorage after login:', localStorage.getItem('skillSwap_user'));

      setLoading(false);

      return { ok: true, user: loggedInUser, admin: loggedInUser.role === 'admin' };
    } catch (err) {
      setLoading(false);
      console.error('❌ login error:', err);
      return { ok: false, message: 'Login failed due to unexpected error' };
    }
  };

  // 📝 REGISTER
  const register = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const res = await registerUser({ username, email, password });
      setLoading(false);

      if (!res.ok) {
        return { ok: false, message: res.message };
      }

      return { ok: true };
    } catch (err) {
      setLoading(false);
      console.error('❌ register error:', err);
      return { ok: false, message: 'Registration failed due to unexpected error' };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null); // ✅ Clear token

    try {
      localStorage.removeItem('skillSwap_user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err) {
      console.error('❌ logout error:', err);
    }

    toast.success('Logged out');

    setTimeout(() => {
      window.location.href = '/login';
    }, 800);
  };

  // ✅ Include token in context value
  const value = useMemo(() => ({ user, token, login, register, logout, loading }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;