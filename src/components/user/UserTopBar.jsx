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
        height: "env(safe-area-inset-top) + 70px",
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
          paddingTop: "env(safe-area-inset-top)",
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
                width: 150,     // 🔒 fixed logo size
                height: 45,
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
                borderRadius: "20px",
                p: 0,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha("#fff", 0.1)}`,
              }}
            >
              <NotificationMenu />
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "20px",
                p: 0,
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha("#fff", 0.1)}`,
              }}
            >
              <ThemeToggle />
            </Box>
            <Box
              sx={{
                ml: { xs: 0.5 },
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
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
