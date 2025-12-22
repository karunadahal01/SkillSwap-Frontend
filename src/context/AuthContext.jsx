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

//   // 🟢 Simulated login
//   const login = async ({ email, password }) => {
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 600));

//     const fakeUser = { id: Date.now(), email, name: email.split('@')[0] || 'User' };
//     setUser(fakeUser);

//     try {
//       localStorage.setItem('skillSwap_user', JSON.stringify(fakeUser));
//     } catch {}

//     setLoading(false);
//     return { ok: true, user: fakeUser };
//   };

//   // 🟢 Simulated register
//   const register = async ({ name, email, password }) => {
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 700));

//     const fakeUser = { id: Date.now(), email, name: name || email.split('@')[0] };
//     setUser(fakeUser);

//     try {
//       localStorage.setItem('skillSwap_user', JSON.stringify(fakeUser));
//     } catch {}

//     setLoading(false);
//     return { ok: true, user: fakeUser };
//   };

//   // 🔴 Updated logout function (redirects to login)
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


// src\context\AuthContext.jsx

import { useState, createContext, useMemo, useContext } from 'react';
import toast from 'react-hot-toast';

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

  // 🟢 Simulated login
  const login = async ({ email, password }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    // 🔴 check admin login
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        id: "admin",
        email,
        name: "Admin",
        role: "admin",
      };

      setUser(adminUser);

      try {
        localStorage.setItem('skillSwap_user', JSON.stringify(adminUser));
      } catch {}

      setLoading(false);
      return {
        ok: true,
        user: adminUser,
        admin: true,
      };
    }

    // 🟢 normal user login system
    const fakeUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0] || 'User',
      role: "user",
    };

    setUser(fakeUser);

    try {
      localStorage.setItem('skillSwap_user', JSON.stringify(fakeUser));
    } catch {}

    setLoading(false);
    return {
      ok: true,
      user: fakeUser,
      admin: false,
    };
  };

  // 🟢 Simulated register
  const register = async ({ name, email, password }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const fakeUser = {
      id: Date.now(),
      email,
      name: name || email.split('@')[0],
      role: "user",
    };

    setUser(fakeUser);

    try {
      localStorage.setItem('skillSwap_user', JSON.stringify(fakeUser));
    } catch {}

    setLoading(false);
    return { ok: true, user: fakeUser };
  };

  // 🔴 logout
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('skillSwap_user');
      toast.success("Logged Out!")
    } catch {}
      setTimeout(() => {
    window.location.href = '/login';
  }, 2000); 
  };

  const value = useMemo(() => ({ user, login, register, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
