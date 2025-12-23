// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@components/ProtectedRoute';

// ---------------- Admin ----------------
import AdminLayout from './templates/AdminLayout';
import AdminDashboard from '@pages/admin/AdminDashboard';
import Users from '@pages/admin/Users';
import Skills from '@pages/admin/Skills';
import Swaps from '@pages/admin/Swaps';
import AdminSettings from '@pages/admin/Settings';

// ---------------- User ----------------
import UserLayout from './templates/UserLayout';
import UserHome from '@pages/user/UserHome';
import UserBrowse from '@pages/user/UserBrowse';
import UserListing from '@pages/user/UserListing';
import UserSwaps from '@pages/user/UserSwaps';
import UserMessage from '@pages/user/UserMessage';
import UserMessageList from '@pages/user/UserMessageList';
import UserSettings from '@pages/user/UserSettings';

// ---------------- Auth ----------------
import Login from '@pages/Login';
import Register from '@pages/Register';

// ✅ ADD THIS
import SkillSetup from '@pages/user/SkillSetup';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ✅ Skill setup must be PUBLIC */}
      <Route path="/skill-setup" element={<SkillSetup />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="skills" element={<Skills />} />
        <Route path="swaps" element={<Swaps />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Protected User Routes */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserHome />} />
        <Route path="browse" element={<UserBrowse />} />
        <Route path="listings" element={<UserListing />} />
        <Route path="swaps" element={<UserSwaps />} />
        <Route path="messages/:id" element={<UserMessage />} />
        <Route path="messages" element={<UserMessageList />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
