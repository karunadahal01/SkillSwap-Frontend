// src/config/navItems.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { text: 'Dashboard', path: '/admin', icon: DashboardIcon },
  { text: 'Users', path: '/admin/users', icon: PeopleIcon },
  { text: 'Skills', path: '/admin/skills', icon: SchoolIcon },
  { text: 'Settings', path: '/admin/settings', icon: SettingsIcon },
];

export default navItems;
