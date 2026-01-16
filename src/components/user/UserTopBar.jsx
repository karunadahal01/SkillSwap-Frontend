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
//         paddingTop: 'env(safe-area-inset-top)', // safe area for notch / status bar
//       }}
//     >
//       <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
//         <Box
//           sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "pointer" }}
//           onClick={() => navigate("/user")}
//         >
//           <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: { xs: 40, sm: 52 }, mr: 1.5 }} />
//           <Typography variant="h6" fontWeight="bold" sx={{ display: { xs: "none", sm: "block" }, color: "inherit" }} />
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <NotificationMenu />
//           <AvatarMenu onLogout={onLogout} />
//           <ThemeToggle />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }


// // src/components/user/UserTopBar.jsx
// import { AppBar, Toolbar, Box, useTheme, Typography } from "@mui/material";
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
//         paddingTop: 'env(safe-area-inset-top)',
//       }}
//     >
//       <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
//         <Box
//           sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor: "pointer" }}
//           onClick={() => navigate("/user")}
//         >
//           <Box component="img" src={Logo} alt="SkillSwap Logo" sx={{ height: { xs: 40, sm: 52 }, mr: 1.5 }} />
//           <Typography variant="h6" fontWeight="bold" sx={{ display: { xs: "none", sm: "block" }, color: "inherit" }} />
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <NotificationMenu />
//           <ThemeToggle />
//           <AvatarMenu onLogout={onLogout} /> {/* Profile avatar shows image */}
          
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }




  // // src/components/user/UserTopBar.jsx
  // import { AppBar, Toolbar, Box, useTheme, Typography } from "@mui/material";
  // import NotificationMenu from "@components/admin/NotificationMenu";
  // import AvatarMenu from "@components/admin/AvatarMenu";
  // import ThemeToggle from "@components/admin/ThemeToggle";
  // import Logo from "@assets/skillswap-logo.png";
  // import { useNavigate } from "react-router-dom";

  // export default function UserTopBar() {
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
  //         color:
  //           theme.palette.mode === "light"
  //             ? "#fff"
  //             : theme.palette.text.primary,
  //         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  //         transition: "background-color 0.3s ease, color 0.3s ease",
  //         zIndex: (theme) => theme.zIndex.drawer + 1,
  //         paddingTop: "env(safe-area-inset-top)",
  //       }}
  //     >
  //       <Toolbar
  //         sx={{
  //           px: { xs: 1.5, sm: 3 },
  //           minHeight: { xs: 56, sm: 64 },
  //         }}
  //       >
  //         {/* Logo + Navigation */}
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
  //           />
  //         </Box>

  //         {/* Right Actions */}
  //         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  //           <NotificationMenu />
  //           <ThemeToggle />
  //           <AvatarMenu /> {/* 🔥 Avatar updates instantly */}
            
  //         </Box>
  //       </Toolbar>
  //     </AppBar>
  //   );
  // }




//   // src/components/user/UserTopBar.jsx
// import { AppBar, Toolbar, Box, useTheme, Typography, IconButton, alpha } from "@mui/material";
// import NotificationMenu from "@components/admin/NotificationMenu";
// import AvatarMenu from "@components/admin/AvatarMenu";
// import ThemeToggle from "@components/admin/ThemeToggle";
// import Logo from "@assets/skillswap-logo.png";
// import { useNavigate } from "react-router-dom";

// export default function UserTopBar() {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         background:
//           theme.palette.mode === "light"
//             ? "linear-gradient(135deg, #092f64ff 0%, #5c07b1 100%)"
//             : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//         backdropFilter: "blur(10px)",
//         borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//         boxShadow: theme.palette.mode === "light" 
//           ? "0 4px 20px rgba(102, 126, 234, 0.15)"
//           : "0 4px 20px rgba(0, 0, 0, 0.3)",
//         transition: "all 0.3s ease",
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         paddingTop: "env(safe-area-inset-top)",
//       }}
//     >
//       <Toolbar
//         sx={{
//           px: { xs: 2, sm: 1.5 },
//           minHeight: { xs: 64, sm: 70 },
//         }}
//       >
//         {/* Logo Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             flexGrow: 1,
//             cursor: "pointer",
//             transition: "transform 0.2s ease",
//             "&:hover": {
//               transform: "scale(1.02)",
//             },
//           }}
//           onClick={() => navigate("/user")}
//         >
//           <Box
//             sx={{
//               width: "40%",
//               // background:
//               //   theme.palette.mode === "light"
//               //     ? "rgba(255, 255, 255, 0.2)"
//               //     : alpha(theme.palette.primary.main, 0.2),
//               borderRadius: "14px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mr: { xs: 1.5, sm: 2 },
//               // backdropFilter: "blur(10px)",
//               // border: `1px solid ${alpha("#fff", 0.1)}`,
//               // boxShadow:
//               //   theme.palette.mode === "light"
//               //     ? "0 4px 15px rgba(255, 255, 255, 0.2)"
//               //     : "0 4px 15px rgba(0, 0, 0, 0.3)",
//               overflow: "hidden",
//             }}
//           >
//             <Box
//               component="img"
//               src={Logo}
//               alt="SkillSwap Logo"
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>

//           <Typography
//             variant="h6"
//             fontWeight={800}
//             sx={{
//               color:
//                 theme.palette.mode === "light"
//                   ? "white"
//                   : theme.palette.text.primary,
//               letterSpacing: "0.5px",
//               display: { xs: "none", sm: "block" },
//               background:
//                 theme.palette.mode === "dark"
//                   ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
//                   : "transparent",
//               WebkitBackgroundClip:
//                 theme.palette.mode === "dark" ? "text" : "unset",
//               WebkitTextFillColor:
//                 theme.palette.mode === "dark" ? "transparent" : "white",
//             }}
//           >
//           </Typography>
//         </Box>

//         {/* Right Actions */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
//           <Box
//             sx={{
//               background:
//                 theme.palette.mode === "light"
//                   ? "rgba(255, 255, 255, 0.15)"
//                   : alpha(theme.palette.background.default, 0.6),
//               borderRadius: "12px",
//               p: 0.5,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha("#fff", 0.1)}`,
//             }}
//           >
//             <NotificationMenu />
//           </Box>

//           <Box
//             sx={{
//               background:
//                 theme.palette.mode === "light"
//                   ? "rgba(255, 255, 255, 0.15)"
//                   : alpha(theme.palette.background.default, 0.6),
//               borderRadius: "12px",
//               p: 0.5,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha("#fff", 0.1)}`,
//             }}
//           >
//             <ThemeToggle />
//           </Box>

          // <Box
          //   sx={{
          //     ml: { xs: 0.5, sm: 1 },
          //     position: "relative",
          //     "&::before": {
          //       content: '""',
          //       position: "absolute",
          //       inset: -2,
          //       borderRadius: "50%",
          //       padding: "2px",
          //       background:
          //         theme.palette.mode === "light"
          //           ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)"
          //           : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          //       WebkitMask:
          //         "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          //       WebkitMaskComposite: "xor",
          //       maskComposite: "exclude",
          //     },
          //   }}
          // >
          //   <AvatarMenu />
          // </Box>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }



// src/components/user/UserTopBar.jsx
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  Typography,
  alpha,
} from "@mui/material";
import NotificationMenu from "@components/admin/NotificationMenu";
import AvatarMenu from "@components/admin/AvatarMenu";
import ThemeToggle from "@components/admin/ThemeToggle";
import Logo from "@assets/skillswap-logo.png";
import { useNavigate } from "react-router-dom";

export default function UserTopBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #092f64ff 0%, #5c07b1 100%)"
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
                theme.palette.background.paper,
                0.95
              )} 100%)`,
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 4px 20px rgba(102, 126, 234, 0.15)"
            : "0 4px 20px rgba(0, 0, 0, 0.3)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      {/* ✅ WIDTH CONSTRAINT WRAPPER (KEY FIX) */}
      <Box
        sx={{
          maxWidth: "1280px",   // 🔒 constant width
          mx: "auto",
          width: "100%",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 2, sm: 2 },
            minHeight: 70, // 🔒 constant height
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              cursor: "pointer",
              "&:hover": { transform: "scale(1.02)" },
              transition: "transform 0.2s ease",
            }}
            onClick={() => navigate("/user")}
          >
            <Box
              sx={{
                width: 160,     // 🔒 fixed logo size
                height: 55,
                borderRadius: "14px",
                overflow: "hidden",
                mr: 2,
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="SkillSwap Logo"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                p: 0.5,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha("#fff", 0.1)}`,
              }}
            >
              <NotificationMenu />
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                p: 0.5,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha("#fff", 0.1)}`,
              }}
            >
              <ThemeToggle />
            </Box>
            <Box
              sx={{
                ml: { xs: 0.5, sm: 1 },
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  padding: "2px",
                  background:
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                },
              }}
            >
              <AvatarMenu />
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
