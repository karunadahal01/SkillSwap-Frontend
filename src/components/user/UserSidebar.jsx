// src/components/user/UserSidebar.jsx
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
import navItems from '@config/navItems.user';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@context/AuthContext';

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { logout } = useAuth();

  const isLight = theme.palette.mode === 'light';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: isLight ? '#ffffffff' : '#121212',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Header
      <Toolbar>
        <Box sx={{ fontWeight: 'bold', fontSize: 18, color: theme.palette.primary.main }}>
          SkillSwap
        </Box>
      </Toolbar>
      <Divider /> */}

      {/* Navigation */}
      <List>
        {navItems.map(({ text, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                selected={isActive}
                sx={{
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  backgroundColor: isActive
                    ? (isLight ? '#e8f0fe' : '#1e2a3a')
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: isLight ? '#e3f2fd' : '#263238',
                    color: theme.palette.primary.main,
                  },
                  borderRadius: 1,
                  mx: 1,
                  my: 0.3,
                  marginTop: "auto"
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    minWidth: 40,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
