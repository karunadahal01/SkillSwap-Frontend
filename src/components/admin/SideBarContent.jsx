// src/templates/SideBarContent.jsx
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Toolbar,
  useTheme,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import navItems from '@config/navItems.data';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@context/AuthContext'; // auth context

export default function SideBarContent() {
  const location = useLocation(); // current route
  const navigate = useNavigate(); // router navigation
  const theme = useTheme(); // MUI theme
  const { logout } = useAuth(); // logout function

  const isLight = theme.palette.mode === 'light'; // theme mode

  const handleLogout = () => {
    logout(); // clear session
    navigate('/login'); // redirect login
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: isLight ? '#f4f6f8' : '#121212', // sidebar bg
        transition: 'background-color 0.3s ease, color 0.3s ease', // smooth theme change
      }}
    >
      {/* Header */}
      <Toolbar>
        <Box sx={{ fontWeight: 'bold', fontSize: 18, color: theme.palette.primary.main }}>
          SkillSwap {/* app name */}
        </Box>
      </Toolbar>
      <Divider /> {/* header divider */}

      {/* Navigation items */}
      <List>
        {navItems.map(({ text, path, icon: Icon }) => {
          const isActive = location.pathname === path; // active route
          return (
            <ListItem key={text} disablePadding> {/* menu item */}
              <ListItemButton
                component={Link}
                to={path} // navigation link
                selected={isActive} // highlight active
                sx={{
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  backgroundColor: isActive
                    ? (isLight ? '#e8f0fe' : '#1e2a3a')
                    : 'transparent',
                  '&:hover': { // hover effect
                    backgroundColor: isLight ? '#e3f2fd' : '#263238',
                    color: theme.palette.primary.main,
                  },
                  borderRadius: 1,
                  mx: 1,
                  my: 0.3,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    minWidth: 40,
                  }}
                >
                  <Icon /> {/* menu icon */}
                </ListItemIcon>
                <ListItemText primary={text} /> {/* menu text */}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} /> {/* spacer to push logout down */}
      <Divider /> {/* bottom divider */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />} // logout icon
          onClick={handleLogout} // logout action
        >
          Logout {/* logout text */}
        </Button>
      </Box>
    </Box>
  );
}
