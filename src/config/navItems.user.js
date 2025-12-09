// src/config/navItems.user.js
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { text: 'Home', path: '/user', icon: HomeIcon },
  { text: 'Browse', path: '/user/browse', icon: SearchIcon },
  { text: 'My Listings', path: '/user/listings', icon: ListAltIcon },
  { text: 'My Swaps', path: '/user/swaps', icon: SwapHorizIcon },
  { text: 'Messages', path: '/user/messages', icon: ChatIcon },
  { text: 'Settings', path: '/user/settings', icon: SettingsIcon },
];

export default navItems;
