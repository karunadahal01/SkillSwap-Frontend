// src/templates/UserLayout.jsx
import { Box, CssBaseline, useTheme, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import UserTopBar from "@components/user/UserTopBar";
import UserBottomNav from "@components/user/UserBottomNav";

export default function UserLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  // hide bottom nav ONLY when in chat screen
  const hideBottomNav = location.pathname.startsWith("/user/messages/");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      <UserTopBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          marginTop: 8,
          marginBottom: hideBottomNav ? 0 : 8,
        }}
      >
        <Outlet />
      </Box>

      {/* show bottom nav unless in chat */}
      {!hideBottomNav && <UserBottomNav currentPath={location.pathname} />}
    </Box>
  );
}
