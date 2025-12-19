// src/components/user/UserBottomNav.jsx
import React, { useEffect, useRef } from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useTheme } from "@mui/material";
import navItems from "@config/navItems.user";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserBottomNav({ bottomNavHeightRef }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  // Sync selected nav item with current route
  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.path === location.pathname);
    if (currentIndex >= 0) setValue(currentIndex);
  }, [location.pathname]);

  return (
    <Paper
      ref={bottomNavHeightRef}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(navItems[newValue].path);
        }}
        sx={{
          height: 60,
          "& .Mui-selected": {
            color: theme.palette.primary.main,
          },
        }}
      >
        {navItems.map(({ text, icon: Icon }) => (
          <BottomNavigationAction
            key={text}
            label={text}
            icon={<Icon />}
            sx={{ minWidth: 0 }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}