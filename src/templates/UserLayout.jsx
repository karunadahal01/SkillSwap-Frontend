// // src/templates/UserLayout.jsx
// import { useState } from 'react';
// import { Box, CssBaseline, Drawer, Toolbar, useTheme } from '@mui/material';
// import { Outlet } from 'react-router-dom';
// import UserTopBar from '@components/user/UserTopBar';
// import UserSidebar from '@components/user/UserSidebar';

// const drawerWidth = 260;

// export default function UserLayout() {
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleDrawer = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       <CssBaseline />

//       {/* TopBar */}
//       <UserTopBar toggleDrawer={toggleDrawer} />

//       {/* Sidebar Drawer */}
//       <Box
//         component="nav"
//         sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
//       >
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={toggleDrawer}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { width: drawerWidth },
//           }}
//         >
//           <UserSidebar />
//         </Drawer>

//         {/* Desktop Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
//           }}
//           open
//         >
//           <UserSidebar />
//         </Drawer>
//       </Box>

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           backgroundColor: theme.palette.background.default,
//           minHeight: '100vh',
//         }}
//       >
//         <Toolbar /> {/* spacing for TopBar */}
//         <Outlet /> {/* render user page content */}
//       </Box>
//     </Box>
//   );
// }


// // src/templates/UserLayout.jsx
// import { useState } from 'react';
// import { Box, CssBaseline, Drawer, Toolbar, useTheme, useMediaQuery } from '@mui/material';
// import { Outlet } from 'react-router-dom';
// import UserTopBar from '@components/user/UserTopBar';
// import UserSidebar from '@components/user/UserSidebar';

// const drawerWidth = 260;

// export default function UserLayout() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // for toolbar height
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleDrawer = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // Toolbar height matches UserTopBar's Toolbar
//   const toolbarHeight = isMobile ? 56 : 64;

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       <CssBaseline />

//       {/* TopBar */}
//       <UserTopBar toggleDrawer={toggleDrawer} />

//       {/* Sidebar Drawer */}
//       <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={toggleDrawer}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { width: drawerWidth },
//           }}
//         >
//           <UserSidebar />
//         </Drawer>

//         {/* Desktop Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
//           }}
//           open
//         >
//           <UserSidebar />
//         </Drawer>
//       </Box>

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           backgroundColor: theme.palette.background.default,
//           minHeight: '100vh',
//           boxSizing: 'border-box',
//           // Add safe area + toolbar height so content is not overlapped
//           paddingTop: `calc(env(safe-area-inset-top) + ${toolbarHeight}px)`,
//           p: 3, // optional padding for content
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }



// // src/templates/UserLayout.jsx
// import { useState } from 'react';
// import { Box, CssBaseline, Drawer, Toolbar, useTheme, useMediaQuery } from '@mui/material';
// import { Outlet } from 'react-router-dom';
// import UserTopBar from '@components/user/UserTopBar';
// import UserSidebar from '@components/user/UserSidebar';
// import {UserBottomNav} from '@components/user/UserBottomNav';

// const drawerWidth = 260;

// export default function UserLayout() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleDrawer = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const toolbarHeight = isMobile ? 56 : 64;
//   const bottomNavHeight = isMobile ? 56 : 0; // bottom nav only visible on mobile

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       <CssBaseline />

//       {/* TopBar */}
//       <UserTopBar toggleDrawer={toggleDrawer} />

//       {/* Sidebar Drawer */}
//       <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={toggleDrawer}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { width: drawerWidth },
//           }}
//         >
//           <UserSidebar />
//         </Drawer>

//         {/* Desktop Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
//           }}
//           open
//         >
//           <UserSidebar />
//         </Drawer>
//       </Box>

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           backgroundColor: theme.palette.background.default,
//           minHeight: '100vh',
//           boxSizing: 'border-box',
//           // Add safe area + toolbar height so content is not overlapped
//           paddingTop: `calc(env(safe-area-inset-top) + ${toolbarHeight}px)`,
//           paddingBottom: `calc(env(safe-area-inset-bottom) + ${bottomNavHeight}px)`, // <-- added
//           p: 3, // optional padding
//         }}
//       >
//         <Outlet />
//       </Box>

//       {/* Bottom Navigation */}
//       {isMobile && <UserBottomNav />}
//     </Box>
//   );
// }


// // src/templates/UserLayout.jsx
// import { useState } from 'react';
// import { Box, CssBaseline, Drawer, Toolbar, useTheme, useMediaQuery } from '@mui/material';
// import { Outlet } from 'react-router-dom';
// import UserTopBar from '@components/user/UserTopBar';
// import UserSidebar from '@components/user/UserSidebar';
// import {UserBottomNav} from '@components/user/UserBottomNav';

// const drawerWidth = 260;

// export default function UserLayout() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mobile detection
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleDrawer = () => setMobileOpen(!mobileOpen);

//   const toolbarHeight = isMobile ? 56 : 64; // TopBar height

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       <CssBaseline />

//       {/* TopBar */}
//       <UserTopBar toggleDrawer={toggleDrawer} />

//       {/* Sidebar only for desktop */}
//       {!isMobile && (
//         <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: 'none', md: 'block' },
//               '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
//             }}
//             open
//           >
//             <UserSidebar />
//           </Drawer>
//         </Box>
//       )}

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           backgroundColor: theme.palette.background.default,
//           minHeight: '100vh',
//           boxSizing: 'border-box',
//           paddingTop: `calc(env(safe-area-inset-top) + ${toolbarHeight}px)`,
//           paddingBottom: isMobile ? '70px' : 0, // space for bottom nav on mobile
//           p: 3,
//         }}
//       >
//         <Outlet />
//       </Box>

//       {/* Bottom navigation only for mobile */}
//       {isMobile && <UserBottomNav />}
//     </Box>
//   );
// }



// // src/templates/UserLayout.jsx
// import { Box, CssBaseline, useTheme, useMediaQuery } from "@mui/material";
// import { Outlet, useLocation } from "react-router-dom";
// import UserTopBar from "@components/user/UserTopBar";
// import UserBottomNav from "@components/user/UserBottomNav";

// export default function UserLayout() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const location = useLocation();

//   // Show bottom nav on allowed pages
//   const showBottomNav =
//     isMobile &&
//     (location.pathname === "/user" ||
//       location.pathname === "/user/browse" ||
//       location.pathname === "/user/listings" ||
//       location.pathname === "/user/swaps" ||
//       location.pathname === "/user/settings" ||
//       location.pathname === "/user/messages"); // nav visible on messages list

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <CssBaseline />

//       {/* Top Bar */}
//       <UserTopBar />

//       {/* Main content */}
//       <Box component="main" sx={{ flexGrow: 1, overflowY: "auto", marginTop: 8 , marginBottom: 8}}>
//         <Outlet />
//       </Box>

//       {/* Bottom Navigation */}
//       {showBottomNav && <UserBottomNav currentPath={location.pathname} />}
//     </Box>
//   );
// }

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
