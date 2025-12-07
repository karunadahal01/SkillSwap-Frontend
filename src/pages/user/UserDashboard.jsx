// // src/pages/user/UserDashboard.jsx
// import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
// import PeopleIcon from "@mui/icons-material/People";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function UserDashboard() {
//   const theme = useTheme();
//   const isLight = theme.palette.mode === "light";

//   const cardColors = {
//     totalSwaps: isLight ? "#e3f2fd" : "#0d47a1",
//     completedSwaps: isLight ? "#e8f5e9" : "#1b5e20",
//     pendingSwaps: isLight ? "#fff3e0" : "#e65100",
//     activeTrades: isLight ? "#f3e5f5" : "#4a148c",
//   };

//   const stats = [
//     {
//       title: "Total Swaps",
//       value: 34,
//       icon: <SwapHorizIcon sx={{ color: "#1976d2" }} />,
//       color: cardColors.totalSwaps,
//     },
//     {
//       title: "Completed Swaps",
//       value: 20,
//       icon: <TrendingUpIcon sx={{ color: "#43a047" }} />,
//       color: cardColors.completedSwaps,
//     },
//     {
//       title: "Pending Swaps",
//       value: 10,
//       icon: <SwapHorizIcon sx={{ color: "#e65100" }} />,
//       color: cardColors.pendingSwaps,
//     },
//     {
//       title: "Active Trades",
//       value: 4,
//       icon: <PeopleIcon sx={{ color: "#4a148c" }} />,
//       color: cardColors.activeTrades,
//     },
//   ];

//   const recentSwaps = [
//     { id: 1, users: "Alice ↔ Bob", skill: "Guitar for Painting", date: "Oct 10, 2025" },
//     { id: 2, users: "John ↔ Sara", skill: "Cooking for Yoga", date: "Oct 9, 2025" },
//     { id: 3, users: "Liam ↔ Emma", skill: "Photography for Coding", date: "Oct 7, 2025" },
//   ];

//   // ==========================
//   // 📊 Dual-Bar Chart Data
//   // ==========================
//   const weeklySwapChart = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Completed",
//         data: [2, 3, 1, 4, 2, 5, 3],
//         backgroundColor: isLight
//           ? "rgba(67,160,71,0.75)"
//           : "rgba(129,199,132,0.85)",
//         barThickness: 26,
//         borderRadius: 6,
//       },
//       {
//         label: "Pending",
//         data: [1, 2, 2, 1, 3, 2, 2],
//         backgroundColor: isLight
//           ? "rgba(255,160,0,0.75)"
//           : "rgba(255,213,79,0.85)",
//         barThickness: 26,
//         borderRadius: 6,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1, color: theme.palette.text.secondary },
//         grid: { color: theme.palette.divider },
//       },
//       x: {
//         ticks: { color: theme.palette.text.secondary },
//         grid: { display: false },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: theme.palette.text.primary,
//           font: { size: 12 },
//         },
//       },
//     },
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         SkillSwap Dashboard
//       </Typography>

//       {/* Stats Grid */}
//       <Grid container spacing={4} sx={{ mb: 4 }}>
//         {stats.map((item) => (
//           <Grid item xs={12} sm={6} md={3} key={item.title}>
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 backgroundColor: item.color,
//                 color: isLight ? "#000" : "#fff",
//                 transition: "0.3s",
//                 "&:hover": {
//                   transform: "scale(1.03)",
//                   boxShadow: theme.shadows[6],
//                 },
//               }}
//               elevation={3}
//             >
//               <Box>
//                 <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                   {item.title}
//                 </Typography>
//                 <Typography variant="h6" fontWeight="bold">
//                   {item.value}
//                 </Typography>
//               </Box>
//               {item.icon}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ======================== */}
//       {/* 📊 Dual-Bar Chart Section */}
//       {/* ======================== */}
//       <Paper
//         sx={{
//           p: 2,
//           mb: 4,
//           height: 320,
//           backgroundColor: theme.palette.background.paper,
//         }}
//         elevation={3}
//       >
//         <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
//           Weekly Swap Breakdown
//         </Typography>

//         <Box sx={{ height: "240px" }}>
//           <Bar data={weeklySwapChart} options={chartOptions} />
//         </Box>
//       </Paper>

//       {/* Recent Swaps */}
//       <Paper
//         sx={{
//           p: 2,
//           backgroundColor: theme.palette.background.paper,
//         }}
//         elevation={3}
//       >
//         <Typography variant="h6" gutterBottom fontWeight="bold">
//           Recent Swaps
//         </Typography>
//         {recentSwaps.map((swap) => (
//           <Box
//             key={swap.id}
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               py: 1,
//               borderBottom: `1px solid ${theme.palette.divider}`,
//               "&:last-child": { borderBottom: "none" },
//             }}
//           >
//             <Typography>{swap.users}</Typography>
//             <Typography color="text.secondary">{swap.skill}</Typography>
//             <Typography color="text.secondary" variant="body2">
//               {swap.date}
//             </Typography>
//           </Box>
//         ))}
//       </Paper>
//     </Box>
//   );
// }



// src/pages/user/UserDashboard.jsx
import { Box, Grid, Paper, Typography, useTheme, Stack, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  // Keep the same stat colors as original
  const cardColors = {
    totalSwaps: isLight ? "#e3f2fd" : "#0d47a1",
    completedSwaps: isLight ? "#e8f5e9" : "#1b5e20",
    pendingSwaps: isLight ? "#fff3e0" : "#e65100",
    activeTrades: isLight ? "#f3e5f5" : "#4a148c",
  };

  const stats = [
    { title: "Total Swaps", value: 34, icon: <SwapHorizIcon sx={{ color: "#1976d2" }} />, color: cardColors.totalSwaps },
    { title: "Completed Swaps", value: 20, icon: <TrendingUpIcon sx={{ color: "#43a047" }} />, color: cardColors.completedSwaps },
    { title: "Pending Swaps", value: 10, icon: <SwapHorizIcon sx={{ color: "#e65100" }} />, color: cardColors.pendingSwaps },
    { title: "Active Trades", value: 4, icon: <PeopleIcon sx={{ color: "#4a148c" }} />, color: cardColors.activeTrades },
  ];

  const recentSwaps = [
    { id: 1, users: "Alice ↔ Bob", skill: "Guitar for Painting", date: "Oct 10, 2025" },
    { id: 2, users: "John ↔ Sara", skill: "Cooking for Yoga", date: "Oct 9, 2025" },
    { id: 3, users: "Liam ↔ Emma", skill: "Photography for Coding", date: "Oct 7, 2025" },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        SkillSwap Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: item.color,
                color: isLight ? "#000" : "#fff",
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: theme.shadows[6] },
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
              {item.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2, width: "100%" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/user/browse")}>
            Browse Skills
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/user/listings")}>
            Add Listings
          </Button>
        </Stack>
      </Paper>

      {/* Recent Swaps */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: "100%" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Swaps
        </Typography>
        <Stack spacing={2}>
          {recentSwaps.map((swap) => (
            <Paper
              key={swap.id}
              sx={{
                p: 1.5,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                borderRadius: 1,
                "&:hover": { boxShadow: theme.shadows[3], transform: "scale(1.01)", transition: "0.2s" },
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography fontWeight={500}>{swap.users}</Typography>
              <Typography color="text.secondary">{swap.skill}</Typography>
              <Typography color="text.secondary" variant="body2">{swap.date}</Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
