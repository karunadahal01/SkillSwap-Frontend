// src/pages/user/UserHome.jsx
import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 3, sm: 5 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 4,
      }}
    >
      {/* Hero Section */}
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          maxWidth: 700,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        Discover • Learn • Share  
        <br />
        <span style={{ color: theme.palette.primary.main }}>
          Skills That Matter
        </span>
      </Typography>

      <Typography
        variant="h6"
        sx={{
          maxWidth: 650,
          opacity: 0.8,
          fontSize: { xs: "1rem", sm: "1.2rem" },
        }}
      >
        SkillSwap helps you exchange knowledge with people around the world.  
        Learn anything. Teach anything. Grow together.
      </Typography>

      {/* Buttons */}
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{ mt: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/user/browse")}
          sx={{ px: 4 }}
        >
          Browse Skills
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/user/listings")}
          sx={{ px: 4 }}
        >
          Add Your Listing
        </Button>
      </Stack>

      {/* Decorative Illustration */}
      <Box
        component="img"
        src="https://cdn.undraw.co/illustration/teamwork_zplp.svg"
        alt="Skills illustration"
        sx={{
          width: "100%",
          maxWidth: 450,
          mt: 4,
          opacity: 0.9,
          filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
        }}
      />
    </Box>
  );
}
