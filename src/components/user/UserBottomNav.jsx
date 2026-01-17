// src/components/user/UserBottomNav.jsx
import React, { useEffect, useRef } from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useTheme, Box, alpha } from "@mui/material";
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
        background:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.98)"
            : alpha(theme.palette.background.paper, 0.98),
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: "24px 24px 0 0",
        boxShadow:
          theme.palette.mode === "light"
            ? "0 -4px 20px rgba(0, 0, 0, 0.08)"
            : "0 -4px 20px rgba(0, 0, 0, 0.4)",
        pb: "env(safe-area-inset-bottom)",
        transition: "all 0.3s ease",
      }}
      elevation={8}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(navItems[newValue].path);
        }}
        sx={{
          height: 70,
          background: "transparent",
          py: 1,
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            padding: "8px 12px",
            transition: "all 0.3s ease",
            borderRadius: "16px",
            mx: 0.5,
            "&.Mui-selected": {
              color: theme.palette.primary.main,
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.75rem",
                fontWeight: 700,
                mt: 0.5,
              },
            },
            "&:hover": {
              background: alpha(theme.palette.primary.main, 0.05),
            },
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.7rem",
            marginTop: "4px",
            fontWeight: 500,
            transition: "all 0.3s ease",
          },
        }}
      >
        {navItems.map(({ text, icon: Icon }, index) => (
          <BottomNavigationAction
            key={text}
            label={text}
            icon={
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    value === index
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "transparent",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  boxShadow:
                    value === index
                      ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                      : "none",
                  transform: value === index ? "translateY(-4px)" : "translateY(0)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "16px",
                    padding: "2px",
                    background:
                      value === index
                        ? "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)"
                        : "transparent",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: value === index ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  },
                }}
              >
                <Icon
                  sx={{
                    color: value === index ? "white" : theme.palette.text.secondary,
                    fontSize: 24,
                    transition: "all 0.3s ease",
                  }}
                />
              </Box>
            }
          />
        ))}
      </BottomNavigation>

      {/* Active Indicator Line */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: `${(value / navItems.length) * 100}%`,
          width: `${100 / navItems.length}%`,
          height: "3px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "3px 3px 0 0",
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "3px 3px 0 0",
            boxShadow: "0 0 10px rgba(102, 126, 234, 0.6)",
          }}
        />
      </Box>
    </Paper>
  );
}