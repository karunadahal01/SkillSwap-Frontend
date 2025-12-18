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


// src/templates/UserLayout.jsx
import { useState } from 'react';
import { Box, CssBaseline, Drawer, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import UserTopBar from '@components/user/UserTopBar';
import UserSidebar from '@components/user/UserSidebar';

const drawerWidth = 260;

export default function UserLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // for toolbar height
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  // Toolbar height matches UserTopBar's Toolbar
  const toolbarHeight = isMobile ? 56 : 64;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* TopBar */}
      <UserTopBar toggleDrawer={toggleDrawer} />

      {/* Sidebar Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          <UserSidebar />
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          <UserSidebar />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          boxSizing: 'border-box',
          // Add safe area + toolbar height so content is not overlapped
          paddingTop: `calc(env(safe-area-inset-top) + ${toolbarHeight}px)`,
          p: 3, // optional padding for content
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
