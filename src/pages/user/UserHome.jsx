// // src/pages/user/UserHome.jsx
// import { Box, Typography, Button, Stack, useTheme, Container, Paper, Grid, Card, CardContent } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   SwapHoriz,
//   TrendingUp,
//   EmojiObjects,
//   Groups,
//   StarBorder,
// } from "@mui/icons-material";

// export default function UserHome() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const isDark = theme.palette.mode === "dark";

//   const features = [
//     {
//       icon: <Search sx={{ fontSize: 40 }} />,
//       title: "Discover Skills",
//       description: "Browse skills from talented people and find what you want to learn",
//     },
//     {
//       icon: <SwapHoriz sx={{ fontSize: 40 }} />,
//       title: "Exchange Knowledge",
//       description: "Learn new skills by teaching others in a collaborative environment",
//     },
//     {
//       icon: <Groups sx={{ fontSize: 40 }} />,
//       title: "Build Connections",
//       description: "Join a community of passionate learners and skilled teachers worldwide",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: isDark
//           ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
//           : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Decorative Background Elements */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "-10%",
//           right: "-5%",
//           width: "500px",
//           height: "500px",
//           background: "radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)",
//           borderRadius: "50%",
//           pointerEvents: "none",
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: "-15%",
//           left: "-10%",
//           width: "600px",
//           height: "600px",
//           background: "radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)",
//           borderRadius: "50%",
//           pointerEvents: "none",
//         }}
//       />

//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//         {/* Hero Section */}
//         <Box
//           sx={{
//             pt: { xs: 8, md: 12 },
//             pb: { xs: 6, md: 8 },
//             textAlign: "center",
//           }}
//         >
//           {/* Badge */}
//           <Box
//             sx={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 1,
//               px: 2.5,
//               py: 1,
//               mb: 3,
//               borderRadius: "50px",
//               background: isDark
//                 ? "rgba(102, 126, 234, 0.2)"
//                 : "rgba(102, 126, 234, 0.1)",
//               border: `1px solid ${isDark ? "rgba(102, 126, 234, 0.3)" : "rgba(102, 126, 234, 0.2)"}`,
//             }}
//           >
//             <StarBorder sx={{ fontSize: 18, color: "primary.main" }} />
//             <Typography variant="body2" fontWeight={600} color="primary">
//               Welcome to SkillSwap
//             </Typography>
//           </Box>

//           {/* Main Heading */}
//           <Typography
//             variant="h1"
//             fontWeight={800}
//             sx={{
//               fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
//               lineHeight: 1.2,
//               mb: 3,
//               background: isDark
//                 ? "linear-gradient(135deg, #ffffff 0%, #d0d0d0 100%)"
//                 : "linear-gradient(135deg, #1a1a2e 0%, #2d3561 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Discover • Learn • Share
//           </Typography>

//           {/* Subtitle */}
//           <Typography
//             variant="h5"
//             sx={{
//               maxWidth: 700,
//               mx: "auto",
//               mb: 2,
//               fontSize: { xs: "1.2rem", sm: "1.5rem" },
//               fontWeight: 600,
//               color: "primary.main",
//             }}
//           >
//             Skills That Matter
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               maxWidth: 650,
//               mx: "auto",
//               mb: 5,
//               opacity: 0.8,
//               fontSize: { xs: "1rem", sm: "1.1rem" },
//               lineHeight: 1.7,
//               color: "text.secondary",
//             }}
//           >
//             SkillSwap connects passionate learners and skilled teachers.
//             Exchange your knowledge, learn new abilities, and grow together in a
//             vibrant community.
//           </Typography>

//           {/* CTA Buttons */}
//           <Stack
//             spacing={2}
//             direction={{ xs: "column", sm: "row" }}
//             justifyContent="center"
//             sx={{ mb: 6 }}
//           >
//             <Button
//               variant="contained"
//               size="large"
//               onClick={() => navigate("/user/browse")}
//               startIcon={<Search />}
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontSize: "1.1rem",
//                 fontWeight: 600,
//                 borderRadius: 3,
//                 textTransform: "none",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
//                 "&:hover": {
//                   boxShadow: "0 12px 28px rgba(102, 126, 234, 0.4)",
//                   transform: "translateY(-2px)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               Browse Skills
//             </Button>

//             <Button
//               variant="outlined"
//               size="large"
//               onClick={() => navigate("/user/listings")}
//               startIcon={<EmojiObjects />}
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontSize: "1.1rem",
//                 fontWeight: 600,
//                 borderRadius: 3,
//                 textTransform: "none",
//                 borderWidth: 2,
//                 borderColor: "primary.main",
//                 color: "primary.main",
//                 "&:hover": {
//                   borderWidth: 2,
//                   bgcolor: "primary.main",
//                   color: "white",
//                   transform: "translateY(-2px)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               Add Your Skills
//             </Button>
//           </Stack>

//           {/* Illustration */}
//           <Box
//             sx={{
//               position: "relative",
//               maxWidth: 550,
//               mx: "auto",
//               mt: 6,
//             }}
//           >
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 4,
//                 background: isDark
//                   ? "rgba(255, 255, 255, 0.05)"
//                   : "rgba(255, 255, 255, 0.8)",
//                 backdropFilter: "blur(10px)",
//                 border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
//               }}
//             >
//               <Box
//                 component="img"
//                 src="https://cdn.undraw.co/illustration/teamwork_zplp.svg"
//                 alt="Skills illustration"
//                 sx={{
//                   width: "100%",
//                   maxWidth: 450,
//                   opacity: 0.9,
//                   filter: isDark ? "brightness(0.9)" : "none",
//                 }}
//               />
//             </Paper>
//           </Box>
//         </Box>

//         {/* Features Section */}
//         <Box sx={{ pb: 8 }}>
//           <Typography
//             variant="h4"
//             fontWeight={700}
//             textAlign="center"
//             sx={{ mb: 6 }}
//           >
//             Why Choose SkillSwap?
//           </Typography>

//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     height: "100%",
//                     borderRadius: 3,
//                     background: isDark ? "#1e1e2e" : "#ffffff",
//                     border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"}`,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       boxShadow: isDark
//                         ? "0 12px 24px rgba(0,0,0,0.4)"
//                         : "0 12px 24px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 4, textAlign: "center" }}>
//                     <Box
//                       sx={{
//                         width: 80,
//                         height: 80,
//                         borderRadius: "50%",
//                         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         mx: "auto",
//                         mb: 3,
//                         color: "white",
//                       }}
//                     >
//                       {feature.icon}
//                     </Box>
//                     <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
//                       {feature.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
//                       {feature.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//         {/* CTA Section */}
//         <Box
//           sx={{
//             textAlign: "center",
//             pb: 8,
//           }}
//         >
//           <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
//             Ready to Start Your Journey?
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
//             Join SkillSwap today and unlock a world of knowledge and opportunities. Your next skill is just a swap away!
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={() => navigate("/user/browse")}
//             startIcon={<TrendingUp />}
//             sx={{
//               px: 5,
//               py: 1.8,
//               fontSize: "1.1rem",
//               fontWeight: 600,
//               borderRadius: 3,
//               textTransform: "none",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
//               "&:hover": {
//                 boxShadow: "0 12px 28px rgba(102, 126, 234, 0.4)",
//                 transform: "translateY(-2px)",
//               },
//               transition: "all 0.3s ease",
//             }}
//           >
//             Get Started Now
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// }




// src/pages/user/UserHome.jsx
import { Box, Typography, Button, Stack, useTheme, Container, Paper, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SwapHoriz,
  TrendingUp,
  EmojiObjects,
  Groups,
  StarBorder,
} from "@mui/icons-material";

export default function UserHome() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const features = [
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: "Discover Skills",
      description: "Browse skills from talented people and find what you want to learn",
    },
    {
      icon: <SwapHoriz sx={{ fontSize: 40 }} />,
      title: "Exchange Knowledge",
      description: "Learn new skills by teaching others in a collaborative environment",
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: "Build Connections",
      description: "Join a community of passionate learners and skilled teachers worldwide",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          background: "radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: { xs: "400px", md: "600px" },
          height: { xs: "400px", md: "600px" },
          background: "radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 6, sm: 8, md: 12 },
            pb: { xs: 4, sm: 6, md: 8 },
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: { xs: 2, sm: 2.5 },
              py: { xs: 0.8, sm: 1 },
              mb: { xs: 2, sm: 3 },
              borderRadius: "50px",
              background: isDark
                ? "rgba(102, 126, 234, 0.2)"
                : "rgba(102, 126, 234, 0.1)",
              border: `1px solid ${isDark ? "rgba(102, 126, 234, 0.3)" : "rgba(102, 126, 234, 0.2)"}`,
            }}
          >
            <StarBorder sx={{ fontSize: { xs: 16, sm: 18 }, color: "primary.main" }} />
            <Typography variant="body2" fontWeight={600} color="primary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
              Welcome to SkillSwap
            </Typography>
          </Box>

          {/* Main Heading */}
          <Typography
            variant="h1"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "2.5rem", lg: "3.5rem" },
              lineHeight: 1.2,
              mb: { xs: 2, sm: 3 },
              background: isDark
                ? "linear-gradient(135deg, #ffffff 0%, #d0d0d0 100%)"
                : "linear-gradient(135deg, #1a1a2e 0%, #2d3561 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              px: { xs: 1, sm: 0 },
            }}
          >
            Discover • Learn • Share
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              fontWeight: 600,
              color: "primary.main",
              px: { xs: 2, sm: 0 },
            }}
          >
            Skills That Matter
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 650,
              mx: "auto",
              mb: { xs: 3, sm: 4, md: 5 },
              opacity: 0.8,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
              color: "text.secondary",
              px: { xs: 2, sm: 1 },
            }}
          >
            SkillSwap connects passionate learners and skilled teachers.
            Exchange your knowledge, learn new abilities, and grow together in a
            vibrant community.
          </Typography>

          {/* CTA Buttons */}
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            sx={{ mb: { xs: 4, sm: 5, md: 6 }, px: { xs: 2, sm: 0 } }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/user/browse")}
              startIcon={<Search />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  boxShadow: "0 12px 28px rgba(102, 126, 234, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Browse Skills
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/user/listings")}
              startIcon={<EmojiObjects />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                borderWidth: 2,
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderWidth: 2,
                  bgcolor: "primary.main",
                  color: "white",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Add Your Skills
            </Button>
          </Stack>

          {/* Illustration */}
          <Box
            sx={{
              position: "relative",
              maxWidth: { xs: 300, sm: 400, md: 550 },
              mx: "auto",
              mt: { xs: 4, sm: 5, md: 6 },
              px: { xs: 2, sm: 0 },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: { xs: 3, md: 4 },
                background: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
              }}
            >
              <Box
                component="img"
                src="https://cdn.undraw.co/illustration/teamwork_zplp.svg"
                alt="Skills illustration"
                sx={{
                  width: "100%",
                  maxWidth: 450,
                  opacity: 0.9,
                  filter: isDark ? "brightness(0.9)" : "none",
                }}
              />
            </Paper>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ pb: { xs: 6, sm: 7, md: 8 }, px: { xs: 1, sm: 0 } }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: { xs: 4, sm: 5, md: 6 }, fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" }, px: { xs: 2, sm: 0 } }}
          >
            Why Choose SkillSwap?
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: { xs: 2, md: 3 },
                    background: isDark ? "#1e1e2e" : "#ffffff",
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: isDark
                        ? "0 12px 24px rgba(0,0,0,0.4)"
                        : "0 12px 24px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: { xs: 64, md: 80 },
                        height: { xs: 64, md: 80 },
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: { xs: 2, md: 3 },
                        color: "white",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: "1rem", md: "1.25rem" } }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: { xs: "0.875rem", md: "0.875rem" } }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: "center",
            pb: { xs: 6, sm: 7, md: 8 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ mb: { xs: 1.5, sm: 2 }, fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" } }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, maxWidth: 600, mx: "auto", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Join SkillSwap today and unlock a world of knowledge and opportunities. Your next skill is just a swap away!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/user/browse")}
            startIcon={<TrendingUp />}
            sx={{
              px: { xs: 4, sm: 5 },
              py: { xs: 1.5, sm: 1.8 },
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              fontWeight: 600,
              borderRadius: 3,
              textTransform: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
              "&:hover": {
                boxShadow: "0 12px 28px rgba(102, 126, 234, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}