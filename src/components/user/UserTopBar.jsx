// // src/components/user/UserTopBar.jsx
// import { AppBar, Toolbar, Box, IconButton, useTheme, Typography } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationMenu from "@components/admin/NotificationMenu";
// import AvatarMenu from "@components/admin/AvatarMenu";
// import ThemeToggle from "@components/admin/ThemeToggle";
// import Logo from "@assets/skillswap-logo.png";
// import { useNavigate } from "react-router-dom";

// export default function UserTopBar({ onLogout, toggleDrawer }) {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor:
//           theme.palette.mode === "light"
//             ? theme.palette.primary.main
//             : theme.palette.background.paper,
//         color: theme.palette.mode === "light" ? "#fff" : theme.palette.text.primary,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         transition: "background-color 0.3s ease, color 0.3s ease",
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         paddingTop: 'env(safe-area-inset-top)', // <-- ADD THIS
//       }}
//     >
//       <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: 64 }}>
//         {/* Hamburger for mobile */}
//         <IconButton
//           color="inherit"
//           edge="start"
//           onClick={toggleDrawer}
//           sx={{ mr: 2, display: { md: "none" } }}
//         >
//           <MenuIcon />
//         </IconButton>

//         {/* Logo + Title */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             flexGrow: 1,
//             cursor: "pointer",
//           }}
//           onClick={() => navigate("/user")}
//         >
//           <Box
//             component="img"
//             src={Logo}
//             alt="SkillSwap Logo"
//             sx={{ height: { xs: 40, sm: 52 }, mr: 1.5 }}
//           />
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             sx={{ display: { xs: "none", sm: "block" }, color: "inherit" }}
//           >
//           </Typography>
//         </Box>

//         {/* Right-side actions */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           {/* On mobile, reduce icons spacing */}
//           <NotificationMenu />
//           <AvatarMenu onLogout={onLogout} />
//           <ThemeToggle />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }


// src/components/user/UserTopBar.jsx
import { AppBar, Toolbar, Box, IconButton, useTheme, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationMenu from "@components/admin/NotificationMenu";
import AvatarMenu from "@components/admin/AvatarMenu";
import ThemeToggle from "@components/admin/ThemeToggle";
import Logo from "@assets/skillswap-logo.png";
import { useNavigate } from "react-router-dom";

export default function UserTopBar({ onLogout, toggleDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.primary.main
            : theme.palette.background.paper,
        color: theme.palette.mode === "light" ? "#fff" : theme.palette.text.primary,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease, color 0.3s ease",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        paddingTop: 'env(safe-area-inset-top)', // safe area for notch / status bar
      }}
    >
      <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/user")}
        >
          <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: { xs: 40, sm: 52 }, mr: 1.5 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ display: { xs: "none", sm: "block" }, color: "inherit" }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationMenu />
          <AvatarMenu onLogout={onLogout} />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}