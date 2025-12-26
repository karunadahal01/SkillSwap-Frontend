// // src\context\AuthContext.jsx

// import { useState, createContext, useMemo, useContext } from 'react';
// import toast from 'react-hot-toast';

// const AuthContext = createContext({
//   user: null,
//   login: async () => {},
//   register: async () => {},
//   logout: () => {},
//   loading: false,
// });

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const raw = localStorage.getItem('skillSwap_user');
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   });
//   const [loading, setLoading] = useState(false);

//   //  Simulated login
//   const login = async ({ email, password }) => {
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 600));

//     //  check admin login
//     if (email === "admin@gmail.com" && password === "admin123") {
//       const adminUser = {
//         id: "admin",
//         email,
//         name: "Admin",
//         role: "admin",
//       };

//       setUser(adminUser);

//       try {
//         localStorage.setItem('skillSwap_user', JSON.stringify(adminUser));
//       } catch {}

//       setLoading(false);
//       return {
//         ok: true,
//         user: adminUser,
//         admin: true,
//       };
//     }

//     // normal user login system
//     const fakeUser = {
//       id: Date.now(),
//       email,
//       name: email.split('@')[0] || 'User',
//       role: "user",
//     };

//     setUser(fakeUser);

//     try {
//       localStorage.setItem('skillSwap_user', JSON.stringify(fakeUser));
//     } catch {}

//     setLoading(false);
//     return {
//       ok: true,
//       user: fakeUser,
//       admin: false,
//     };
//   };

//   //  Simulated register
//   const register = async ({ name, email, password }) => {
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 700));

//     const fakeUser = {
//       id: Date.now(),
//       email,
//       name: name || email.split('@')[0],
//       role: "user",
//     };

//     setUser(fakeUser);

//     try {
//       localStorage.setItem('skillSwap_user', JSON.stringify(fakeUser));
//     } catch {}

//     setLoading(false);
//     return { ok: true, user: fakeUser };
//   };

//   //  logout
//   const logout = () => {
//     setUser(null);
//     try {
//       localStorage.removeItem('skillSwap_user');
//       toast.success("Logged Out!")
//     } catch {}
//       setTimeout(() => {
//     window.location.href = '/login';
//   }, 2000); 
//   };

//   const value = useMemo(() => ({ user, login, register, logout, loading }), [user, loading]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export default AuthContext;




// // src/context/AuthContext.jsx
// import { useState, createContext, useMemo, useContext } from 'react';
// import toast from 'react-hot-toast';
// import { loginUser, registerUser } from '@services/auth/authService';

// const AuthContext = createContext({
//   user: null,
//   login: async () => {},
//   register: async () => {},
//   logout: () => {},
//   loading: false,
// });

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const raw = localStorage.getItem('skillSwap_user');
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   });

//   const [loading, setLoading] = useState(false);

//   // 🔐 LOGIN
//   const login = async ({ email, password }) => {
//     setLoading(true);
//     const res = await loginUser({ email, password });

//     if (!res.ok) {
//       setLoading(false);
//       return { ok: false, message: res.message };
//     }

//     const { accessToken, refreshToken } = res.tokens;

//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);

//     const loggedInUser = { email, role: 'user' }; // placeholder for now
//     setUser(loggedInUser);
//     localStorage.setItem('skillSwap_user', JSON.stringify(loggedInUser));

//     setLoading(false);

//     return { ok: true, user: loggedInUser, admin: false };
//   };

//   // 📝 REGISTER
//   const register = async (formData) => {
//     setLoading(true);
//     const res = await registerUser(formData);
//     setLoading(false);

//     if (!res.ok) {
//       return { ok: false, message: res.message };
//     }

//     return { ok: true };
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     setUser(null);
//     try {
//       localStorage.removeItem('skillSwap_user');
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//     } catch {}

//     toast.success('Logged out');
//     setTimeout(() => (window.location.href = '/login'), 800);
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
