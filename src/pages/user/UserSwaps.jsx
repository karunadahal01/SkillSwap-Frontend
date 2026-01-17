// // src/pages/user/UserSwaps.jsx
// import React, { useMemo, useState, useEffect, useContext } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Chip,
//   useTheme,
//   Tabs,
//   Tab,
//   TextField,
//   InputAdornment,
//   Modal,
//   Divider,
//   MenuItem,
//   Snackbar,
//   Alert,
//   Pagination,
//   CircularProgress,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { format } from "date-fns";
// import {
//   getMatchRequests,
//   respondToMatchRequest,
//   cancelMatchRequest,
//   requestCompletion,
//   confirmCompletion,
// } from "@services/matchRequestService";
// import AuthContext from "@context/AuthContext";

// /**
//  * Map backend status to frontend status
//  * Backend: PENDING, ACCEPTED, DECLINED, CANCELLED, COMPLETION_REQUESTED, COMPLETED
//  * Frontend: Requested, Accepted, Cancelled, Completion Pending, Completed
//  */
// const mapStatus = (backendStatus) => {
//   const statusMap = {
//     PENDING: "Requested",
//     ACCEPTED: "Accepted",
//     DECLINED: "Cancelled",
//     CANCELLED: "Cancelled",
//     COMPLETION_REQUESTED: "Completion Pending",
//     COMPLETED: "Completed",
//   };
//   return statusMap[backendStatus] || backendStatus;
// };

// const STATUS_COLORS = {
//   Requested: "warning",
//   Accepted: "success",
//   "Completion Pending": "info",
//   Cancelled: "error",
//   Completed: "default",
// };

// export default function UserSwaps() {
//   const theme = useTheme();
//   const { user } = useContext(AuthContext);

//   const [swaps, setSwaps] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [tab, setTab] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 6;

//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [selectedSwap, setSelectedSwap] = useState(null);

//   const [confirmModal, setConfirmModal] = useState({
//     open: false,
//     action: null,
//     swap: null,
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     fetchSwaps();
//   }, []);

//   const fetchSwaps = async () => {
//     try {
//       setLoading(true);
//       const response = await getMatchRequests();
//       console.log("=== FETCH SWAPS DEBUG ===");
//       console.log("API Response:", response);
//       console.log("Current user from AuthContext:", user);
//       console.log("Current user ID:", user?.id);

//       if (response.success && Array.isArray(response.data)) {
//         // Transform backend data to match frontend structure
//         const transformedSwaps = response.data.map((req) => {
//           console.log("Processing request:", req);
//           console.log("fromUserId:", req.fromUserId, "vs currentUserId:", user?.id);
          
//           // Determine direction: if I sent it (fromUserId = me), it's outgoing
//           const currentUserId = user?.id;
//           const direction = req.fromUserId === currentUserId ? "outgoing" : "incoming";
          
//           console.log("Determined direction:", direction);
          
//           return {
//             id: req.id,
//             direction: direction,
//             counterpart: direction === "outgoing" ? req.toUserName : req.fromUserName,
//             counterpartId: direction === "outgoing" ? req.toUserId : req.fromUserId,
//             mySkill: direction === "outgoing" ? req.fromUserSkillName : req.toUserSkillName,
//             theirSkill: direction === "outgoing" ? req.toUserSkillName : req.fromUserSkillName,
//             scheduledAt: new Date().toISOString(), // Backend doesn't provide timestamp
//             status: mapStatus(req.status),
//             message: req.message || null,
//             rawStatus: req.status,
//             completionRequestedById: req.completionRequestedById || null, // NEW: Track who requested completion
//           };
//         });
        
//         console.log("Transformed swaps:", transformedSwaps);
//         console.log("========================");
//         setSwaps(transformedSwaps);
//       } else {
//         setSwaps([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch swaps", error);
//       pushSnackbar("Failed to load swap requests", "error");
//       setSwaps([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const filtered = useMemo(() => {
//     let list = swaps.slice();

//     if (tab === "incoming")
//       list = list.filter((s) => s.direction === "incoming");
//     if (tab === "outgoing")
//       list = list.filter((s) => s.direction === "outgoing");
//     if (statusFilter !== "All")
//       list = list.filter((s) => s.status === statusFilter);

//     if (search.trim()) {
//       const q = search.trim().toLowerCase();
//       list = list.filter(
//         (s) =>
//           s.counterpart.toLowerCase().includes(q) ||
//           s.mySkill.toLowerCase().includes(q) ||
//           s.theirSkill.toLowerCase().includes(q)
//       );
//     }

//     list.sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));
//     return list;
//   }, [swaps, tab, statusFilter, search]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const visible = filtered.slice((page - 1) * perPage, page * perPage);

//   /* ================= ACTIONS ================= */
//   const openDetails = (swap) => {
//     setSelectedSwap(swap);
//     setDetailModalOpen(true);
//   };

//   const pushSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleAccept = async (swap) => {
//     try {
//       const response = await respondToMatchRequest(swap.id, "ACCEPT");
//       console.log("Accept response:", response);
      
//       if (response.success) {
//         // Update local state
//         setSwaps((prev) =>
//           prev.map((s) =>
//             s.id === swap.id
//               ? { ...s, status: "Accepted", rawStatus: "ACCEPTED" }
//               : s
//           )
//         );
//         pushSnackbar(`Accepted swap with ${swap.counterpart}`);
//       } else {
//         pushSnackbar(response.message || "Failed to accept swap", "error");
//       }
//     } catch (error) {
//       console.error("Failed to accept swap", error);
//       pushSnackbar(
//         error.response?.data?.message || "Failed to accept swap",
//         "error"
//       );
//     }
//   };

//   const handleReject = async (swap) => {
//     try {
//       const response = await respondToMatchRequest(swap.id, "DECLINE");
//       console.log("Reject response:", response);
      
//       if (response.success) {
//         setSwaps((prev) =>
//           prev.map((s) =>
//             s.id === swap.id
//               ? { ...s, status: "Cancelled", rawStatus: "DECLINED" }
//               : s
//           )
//         );
//         pushSnackbar(`Rejected swap with ${swap.counterpart}`, "info");
//       } else {
//         pushSnackbar(response.message || "Failed to reject swap", "error");
//       }
//     } catch (error) {
//       console.error("Failed to reject swap", error);
//       pushSnackbar(
//         error.response?.data?.message || "Failed to reject swap",
//         "error"
//       );
//     }
//   };

//   const handleCancel = async (swap) => {
//     try {
//       const response = await cancelMatchRequest(swap.id);
//       console.log("Cancel response:", response);
      
//       if (response.success) {
//         setSwaps((prev) =>
//           prev.map((s) =>
//             s.id === swap.id
//               ? { ...s, status: "Cancelled", rawStatus: "CANCELLED" }
//               : s
//           )
//         );
//         pushSnackbar(`Cancelled swap with ${swap.counterpart}`, "warning");
//       } else {
//         pushSnackbar(response.message || "Failed to cancel swap", "error");
//       }
//     } catch (error) {
//       console.error("Failed to cancel swap", error);
//       pushSnackbar(
//         error.response?.data?.message || "Failed to cancel swap",
//         "error"
//       );
//     }
//   };

//   const handleRequestCompletion = async (swap) => {
//     try {
//       const response = await requestCompletion(swap.id);
//       console.log("Request completion response:", response);
      
//       if (response.success) {
//         setSwaps((prev) =>
//           prev.map((s) =>
//             s.id === swap.id
//               ? { 
//                   ...s, 
//                   status: "Completion Pending", 
//                   rawStatus: "COMPLETION_REQUESTED",
//                   completionRequestedById: user?.id // Store who requested
//                 }
//               : s
//           )
//         );
//         pushSnackbar(`Completion request sent to ${swap.counterpart}`, "success");
//       } else {
//         pushSnackbar(response.message || "Failed to request completion", "error");
//       }
//     } catch (error) {
//       console.error("Failed to request completion", error);
//       pushSnackbar(
//         error.response?.data?.message || "Failed to request completion",
//         "error"
//       );
//     }
//   };

//   const handleConfirmCompletion = async (swap) => {
//     try {
//       const response = await confirmCompletion(swap.id);
//       console.log("Confirm completion response:", response);
      
//       if (response.success) {
//         setSwaps((prev) =>
//           prev.map((s) =>
//             s.id === swap.id
//               ? { ...s, status: "Completed", rawStatus: "COMPLETED" }
//               : s
//           )
//         );
//         pushSnackbar(`Swap marked as completed!`, "success");
//       } else {
//         pushSnackbar(response.message || "Failed to confirm completion", "error");
//       }
//     } catch (error) {
//       console.error("Failed to confirm completion", error);
//       pushSnackbar(
//         error.response?.data?.message || "Failed to confirm completion",
//         "error"
//       );
//     }
//   };

//   const requestConfirm = (action, swap) => {
//     setConfirmModal({ open: true, action, swap });
//   };

//   const performConfirmed = () => {
//     const { action, swap } = confirmModal;
//     if (!action || !swap) return;

//     if (action === "accept") handleAccept(swap);
//     if (action === "reject") handleReject(swap);
//     if (action === "cancel") handleCancel(swap);
//     if (action === "requestCompletion") handleRequestCompletion(swap);
//     if (action === "confirmCompletion") handleConfirmCompletion(swap);

//     setConfirmModal({ open: false, action: null, swap: null });
//   };

//   const requestLabel = (s) =>
//     s.direction === "incoming" ? "Requested you" : "You requested";

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, marginTop: 4 }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         My Swaps
//       </Typography>

//       {/* Controls */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           alignItems: "center",
//           mb: 2,
//           flexWrap: "wrap",
//         }}
//       >
//         <Tabs
//           value={tab}
//           onChange={(e, v) => {
//             setTab(v);
//             setPage(1);
//           }}
//           sx={{ minHeight: 40 }}
//         >
//           <Tab value="all" label="All" />
//           <Tab value="incoming" label="Incoming" />
//           <Tab value="outgoing" label="Outgoing" />
//         </Tabs>

//         <TextField
//           size="small"
//           placeholder="Search by name or skill..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: { xs: "100%", sm: 300 } }}
//         />

//         <TextField
//           select
//           size="small"
//           value={statusFilter}
//           onChange={(e) => {
//             setStatusFilter(e.target.value);
//             setPage(1);
//           }}
//           sx={{ width: { xs: "100%", sm: 180 } }}
//         >
//           <MenuItem value="All">All Statuses</MenuItem>
//           <MenuItem value="Requested">Requested</MenuItem>
//           <MenuItem value="Accepted">Accepted</MenuItem>
//           <MenuItem value="Completion Pending">Completion Pending</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//         </TextField>
//       </Box>

//       {/* Loading State */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : filtered.length === 0 ? (
//         /* Empty State */
//         <Paper sx={{ p: 4, textAlign: "center" }}>
//           <Typography variant="h6">No swaps found</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             Use the browse page to find skills and request swaps.
//           </Typography>
//         </Paper>
//       ) : (
//         <>
//           {/* Listings */}
//           <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
//             {visible.map((s) => (
//               <Grid item xs={12} key={s.id} display="flex">
//                 <Paper
//                   elevation={3}
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     width: "100%",
//                     boxSizing: "border-box",
//                     minHeight: { xs: 240, sm: 200 },
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "scale(1.03)",
//                       boxShadow: theme.shadows[6],
//                     },
//                   }}
//                 >
//                   <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         gap: 1,
//                         alignItems: "center",
//                         mb: 0.5,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       <SwapHorizIcon
//                         sx={{ color: theme.palette.primary.main }}
//                       />
//                       <Typography variant="subtitle1" fontWeight="600" noWrap>
//                         {s.counterpart}
//                       </Typography>
//                       <Chip
//                         label={s.status}
//                         color={STATUS_COLORS[s.status] || "default"}
//                         size="small"
//                         sx={{ ml: 1 }}
//                       />
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ ml: 1 }}
//                       >
//                         • {requestLabel(s)}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2">
//                       {s.mySkill} ↔ {s.theirSkill}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ mt: 0.5 }}
//                     >
//                       {format(
//                         new Date(s.scheduledAt),
//                         "EEE, MMM d, yyyy • hh:mm a"
//                       )}
//                     </Typography>
//                   </Box>

//                   <Box
//                     sx={{
//                       display: "flex",
//                       gap: 1,
//                       alignItems: "center",
//                       mt: 2,
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => openDetails(s)}
//                     >
//                       Details
//                     </Button>

//                     {/* Incoming & Requested: Accept/Reject */}
//                     {s.direction === "incoming" && s.status === "Requested" && (
//                       <>
//                         <Button
//                           size="small"
//                           variant="contained"
//                           color="success"
//                           startIcon={<CheckIcon />}
//                           onClick={() => requestConfirm("accept", s)}
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           color="error"
//                           startIcon={<CloseIcon />}
//                           onClick={() => requestConfirm("reject", s)}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     )}

//                     {/* Outgoing & Requested: Cancel (ONLY for PENDING status) */}
//                     {s.direction === "outgoing" && s.status === "Requested" && (
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         startIcon={<CancelIcon />}
//                         onClick={() => requestConfirm("cancel", s)}
//                       >
//                         Cancel
//                       </Button>
//                     )}

//                     {/* Accepted: Both users can request completion */}
//                     {s.status === "Accepted" && (
//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="primary"
//                         onClick={() => requestConfirm("requestCompletion", s)}
//                       >
//                         Mark as Complete
//                       </Button>
//                     )}

//                     {/* Completion Pending: Show different UI based on who requested */}
//                     {s.status === "Completion Pending" && (
//                       <>
//                         {s.completionRequestedById === user?.id ? (
//                           // I requested completion - show waiting message
//                           <Chip
//                             label="Waiting for partner to confirm completion"
//                             color="info"
//                             variant="outlined"
//                           />
//                         ) : (
//                           // They requested completion - show confirm button
//                           <Button
//                             size="small"
//                             variant="contained"
//                             color="success"
//                             onClick={() => requestConfirm("confirmCompletion", s)}
//                           >
//                             Confirm Completion
//                           </Button>
//                         )}
//                       </>
//                     )}

//                     {/* Completed: Show success message */}
//                     {s.status === "Completed" && (
//                       <Chip
//                         label="Swap Completed Successfully!"
//                         color="success"
//                         variant="filled"
//                       />
//                     )}
//                   </Box>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={(_, v) => setPage(v)}
//               color="primary"
//             />
//           </Box>
//         </>
//       )}

//       {/* Details Modal */}
//       <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 420,
//             maxWidth: "95%",
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Swap Details
//           </Typography>
//           {selectedSwap && (
//             <>
//               <Typography variant="subtitle1" fontWeight={600}>
//                 {selectedSwap.counterpart}
//                 <Chip
//                   label={selectedSwap.status}
//                   color={STATUS_COLORS[selectedSwap.status] || "default"}
//                   size="small"
//                   sx={{ ml: 1 }}
//                 />
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="body2">
//                 Your skill: <strong>{selectedSwap.mySkill}</strong>
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Their skill: <strong>{selectedSwap.theirSkill}</strong>
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Created:{" "}
//                 {format(new Date(selectedSwap.scheduledAt), "PPP • p")}
//               </Typography>
//               {selectedSwap.message && (
//                 <Typography variant="body2" sx={{ mt: 2 }}>
//                   Message: {selectedSwap.message}
//                 </Typography>
//               )}
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 1,
//                   justifyContent: "flex-end",
//                   mt: 2,
//                 }}
//               >
//                 <Button onClick={() => setDetailModalOpen(false)}>
//                   Close
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Confirm Modal */}
//       <Modal
//         open={confirmModal.open}
//         onClose={() =>
//           setConfirmModal({ open: false, action: null, swap: null })
//         }
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 340,
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {confirmModal.action === "accept" &&
//               `Accept swap with ${confirmModal.swap?.counterpart}?`}
//             {confirmModal.action === "reject" &&
//               `Reject swap from ${confirmModal.swap?.counterpart}?`}
//             {confirmModal.action === "cancel" &&
//               `Cancel swap with ${confirmModal.swap?.counterpart}?`}
//             {confirmModal.action === "requestCompletion" &&
//               `Mark swap with ${confirmModal.swap?.counterpart} as complete?`}
//             {confirmModal.action === "confirmCompletion" &&
//               `Confirm that swap with ${confirmModal.swap?.counterpart} is complete?`}
//           </Typography>
//           <Box
//             sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}
//           >
//             <Button
//               variant="outlined"
//               onClick={() =>
//                 setConfirmModal({ open: false, action: null, swap: null })
//               }
//             >
//               No
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={performConfirmed}
//             >
//               Yes
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }




// src/pages/user/UserSwaps.jsx
import React, { useMemo, useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  useTheme,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Modal,
  Divider,
  MenuItem,
  Snackbar,
  Alert,
  Pagination,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import {
  Search,
  SwapHoriz,
  Check,
  Close,
  Cancel,
  Visibility,
  CheckCircle,
  HourglassEmpty,
  Block,
  CallReceived,
  CallMade,
} from "@mui/icons-material";
import { format } from "date-fns";
import {
  getMatchRequests,
  respondToMatchRequest,
  cancelMatchRequest,
  requestCompletion,
  confirmCompletion,
} from "@services/matchRequestService";
import AuthContext from "@context/AuthContext";

const mapStatus = (backendStatus) => {
  const statusMap = {
    PENDING: "Requested",
    ACCEPTED: "Accepted",
    DECLINED: "Cancelled",
    CANCELLED: "Cancelled",
    COMPLETION_REQUESTED: "Completion Pending",
    COMPLETED: "Completed",
  };
  return statusMap[backendStatus] || backendStatus;
};

const STATUS_COLORS = {
  Requested: "warning",
  Accepted: "success",
  "Completion Pending": "info",
  Cancelled: "error",
  Completed: "default",
};

const STATUS_ICONS = {
  Requested: <HourglassEmpty fontSize="small" />,
  Accepted: <CheckCircle fontSize="small" />,
  "Completion Pending": <HourglassEmpty fontSize="small" />,
  Cancelled: <Block fontSize="small" />,
  Completed: <CheckCircle fontSize="small" />,
};

export default function UserSwaps() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const isDark = theme.palette.mode === 'dark';

  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    action: null,
    swap: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchSwaps();
  }, []);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const response = await getMatchRequests();

      if (response.success && Array.isArray(response.data)) {
        const transformedSwaps = response.data.map((req) => {
          const currentUserId = user?.id;
          const direction = req.fromUserId === currentUserId ? "outgoing" : "incoming";
          
          return {
            id: req.id,
            direction: direction,
            counterpart: direction === "outgoing" ? req.toUserName : req.fromUserName,
            counterpartId: direction === "outgoing" ? req.toUserId : req.fromUserId,
            mySkill: direction === "outgoing" ? req.fromUserSkillName : req.toUserSkillName,
            theirSkill: direction === "outgoing" ? req.toUserSkillName : req.fromUserSkillName,
            scheduledAt: new Date().toISOString(),
            status: mapStatus(req.status),
            message: req.message || null,
            rawStatus: req.status,
            completionRequestedById: req.completionRequestedById || null,
          };
        });
        
        setSwaps(transformedSwaps);
      } else {
        setSwaps([]);
      }
    } catch (error) {
      console.error("Failed to fetch swaps", error);
      pushSnackbar("Failed to load swap requests", "error");
      setSwaps([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTERING & SORTING ================= */
  const filtered = useMemo(() => {
    let list = swaps.slice();

    if (tab === "incoming")
      list = list.filter((s) => s.direction === "incoming");
    if (tab === "outgoing")
      list = list.filter((s) => s.direction === "outgoing");
    if (statusFilter !== "All")
      list = list.filter((s) => s.status === statusFilter);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.counterpart.toLowerCase().includes(q) ||
          s.mySkill.toLowerCase().includes(q) ||
          s.theirSkill.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));
    return list;
  }, [swaps, tab, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= ACTIONS ================= */
  const openDetails = (swap) => {
    setSelectedSwap(swap);
    setDetailModalOpen(true);
  };

  const pushSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAccept = async (swap) => {
    try {
      const response = await respondToMatchRequest(swap.id, "ACCEPT");
      
      if (response.success) {
        setSwaps((prev) =>
          prev.map((s) =>
            s.id === swap.id
              ? { ...s, status: "Accepted", rawStatus: "ACCEPTED" }
              : s
          )
        );
        pushSnackbar(`Accepted swap with ${swap.counterpart}`);
      } else {
        pushSnackbar(response.message || "Failed to accept swap", "error");
      }
    } catch (error) {
      console.error("Failed to accept swap", error);
      pushSnackbar(
        error.response?.data?.message || "Failed to accept swap",
        "error"
      );
    }
  };

  const handleReject = async (swap) => {
    try {
      const response = await respondToMatchRequest(swap.id, "DECLINE");
      
      if (response.success) {
        setSwaps((prev) =>
          prev.map((s) =>
            s.id === swap.id
              ? { ...s, status: "Cancelled", rawStatus: "DECLINED" }
              : s
          )
        );
        pushSnackbar(`Rejected swap with ${swap.counterpart}`, "info");
      } else {
        pushSnackbar(response.message || "Failed to reject swap", "error");
      }
    } catch (error) {
      console.error("Failed to reject swap", error);
      pushSnackbar(
        error.response?.data?.message || "Failed to reject swap",
        "error"
      );
    }
  };

  const handleCancel = async (swap) => {
    try {
      const response = await cancelMatchRequest(swap.id);
      
      if (response.success) {
        setSwaps((prev) =>
          prev.map((s) =>
            s.id === swap.id
              ? { ...s, status: "Cancelled", rawStatus: "CANCELLED" }
              : s
          )
        );
        pushSnackbar(`Cancelled swap with ${swap.counterpart}`, "warning");
      } else {
        pushSnackbar(response.message || "Failed to cancel swap", "error");
      }
    } catch (error) {
      console.error("Failed to cancel swap", error);
      pushSnackbar(
        error.response?.data?.message || "Failed to cancel swap",
        "error"
      );
    }
  };

  const handleRequestCompletion = async (swap) => {
    try {
      const response = await requestCompletion(swap.id);
      
      if (response.success) {
        setSwaps((prev) =>
          prev.map((s) =>
            s.id === swap.id
              ? { 
                  ...s, 
                  status: "Completion Pending", 
                  rawStatus: "COMPLETION_REQUESTED",
                  completionRequestedById: user?.id
                }
              : s
          )
        );
        pushSnackbar(`Completion request sent to ${swap.counterpart}`, "success");
      } else {
        pushSnackbar(response.message || "Failed to request completion", "error");
      }
    } catch (error) {
      console.error("Failed to request completion", error);
      pushSnackbar(
        error.response?.data?.message || "Failed to request completion",
        "error"
      );
    }
  };

  const handleConfirmCompletion = async (swap) => {
    try {
      const response = await confirmCompletion(swap.id);
      
      if (response.success) {
        setSwaps((prev) =>
          prev.map((s) =>
            s.id === swap.id
              ? { ...s, status: "Completed", rawStatus: "COMPLETED" }
              : s
          )
        );
        pushSnackbar(`Swap marked as completed!`, "success");
      } else {
        pushSnackbar(response.message || "Failed to confirm completion", "error");
      }
    } catch (error) {
      console.error("Failed to confirm completion", error);
      pushSnackbar(
        error.response?.data?.message || "Failed to confirm completion",
        "error"
      );
    }
  };

  const requestConfirm = (action, swap) => {
    setConfirmModal({ open: true, action, swap });
  };

  const performConfirmed = () => {
    const { action, swap } = confirmModal;
    if (!action || !swap) return;

    if (action === "accept") handleAccept(swap);
    if (action === "reject") handleReject(swap);
    if (action === "cancel") handleCancel(swap);
    if (action === "requestCompletion") handleRequestCompletion(swap);
    if (action === "confirmCompletion") handleConfirmCompletion(swap);

    setConfirmModal({ open: false, action: null, swap: null });
  };

  const requestLabel = (s) =>
    s.direction === "incoming" ? "Requested you" : "You requested";

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        py: 6,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: isDark
              ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SwapHoriz sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight={700}>
              My Swaps
            </Typography>
            {swaps.length > 0 && (
              <Chip
                label={swaps.length}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Paper>

        {/* Controls */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: isDark ? '#1e1e2e' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <Stack spacing={2}>
            {/* Tabs */}
            <Tabs
              value={tab}
              onChange={(e, v) => {
                setTab(v);
                setPage(1);
              }}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                },
              }}
            >
              <Tab
                value="all"
                label="All Swaps"
                icon={<SwapHoriz fontSize="small" />}
                iconPosition="start"
              />
              <Tab
                value="incoming"
                label="Incoming"
                icon={<CallReceived fontSize="small" />}
                iconPosition="start"
              />
              <Tab
                value="outgoing"
                label="Outgoing"
                icon={<CallMade fontSize="small" />}
                iconPosition="start"
              />
            </Tabs>

            {/* Filters */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search by name or skill..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                select
                size="small"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                sx={{
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Requested">Requested</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Completion Pending">Completion Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </Paper>

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : filtered.length === 0 ? (
          /* Empty State */
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              background: isDark ? '#1e1e2e' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <SwapHoriz sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              No swaps found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the browse page to find skills and request swaps.
            </Typography>
          </Paper>
        ) : (
          <>
            {/* Listings */}
            <Grid container spacing={3}>
              {visible.map((s) => (
                <Grid item xs={12} key={s.id}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      background: isDark ? '#1e1e2e' : '#ffffff',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark
                          ? '0 12px 24px rgba(0,0,0,0.4)'
                          : '0 12px 24px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header */}
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={2}
                        sx={{ mb: 2 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <SwapHoriz sx={{ color: 'white' }} />
                          </Box>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              {s.counterpart}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {requestLabel(s)}
                            </Typography>
                          </Box>
                        </Stack>

                        <Chip
                          icon={STATUS_ICONS[s.status]}
                          label={s.status}
                          color={STATUS_COLORS[s.status] || 'default'}
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>

                      {/* Skills Exchange */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          background: isDark
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.02)',
                        }}
                      >
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          alignItems="center"
                          spacing={2}
                          justifyContent="center"
                        >
                          <Chip
                            label={s.mySkill}
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                          <SwapHoriz color="primary" />
                          <Chip
                            label={s.theirSkill}
                            color="secondary"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </Stack>
                      </Paper>

                      {/* Date */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {format(new Date(s.scheduledAt), "EEE, MMM d, yyyy • hh:mm a")}
                      </Typography>

                      {/* Actions */}
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => openDetails(s)}
                          sx={{ borderRadius: 2 }}
                        >
                          Details
                        </Button>

                        {/* Incoming & Requested: Accept/Reject */}
                        {s.direction === "incoming" && s.status === "Requested" && (
                          <>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<Check />}
                              onClick={() => requestConfirm("accept", s)}
                              sx={{ borderRadius: 2 }}
                            >
                              Accept
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<Close />}
                              onClick={() => requestConfirm("reject", s)}
                              sx={{ borderRadius: 2 }}
                            >
                              Reject
                            </Button>
                          </>
                        )}

                        {/* Outgoing & Requested: Cancel */}
                        {s.direction === "outgoing" && s.status === "Requested" && (
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() => requestConfirm("cancel", s)}
                            sx={{ borderRadius: 2 }}
                          >
                            Cancel
                          </Button>
                        )}

                        {/* Accepted: Request completion */}
                        {s.status === "Accepted" && (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<CheckCircle />}
                            onClick={() => requestConfirm("requestCompletion", s)}
                            sx={{ borderRadius: 2 }}
                          >
                            Mark as Complete
                          </Button>
                        )}

                        {/* Completion Pending */}
                        {s.status === "Completion Pending" && (
                          <>
                            {s.completionRequestedById === user?.id ? (
                              <Chip
                                label="Waiting for partner confirmation"
                                color="info"
                                variant="outlined"
                                icon={<HourglassEmpty />}
                              />
                            ) : (
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => requestConfirm("confirmCompletion", s)}
                                sx={{ borderRadius: 2 }}
                              >
                                Confirm Completion
                              </Button>
                            )}
                          </>
                        )}

                        {/* Completed */}
                        {s.status === "Completed" && (
                          <Chip
                            label="Swap Completed Successfully!"
                            color="success"
                            icon={<CheckCircle />}
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, v) => setPage(v)}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2,
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Details Modal */}
      <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            maxWidth: '95%',
            bgcolor: isDark ? '#1e1e2e' : 'background.paper',
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Swap Details
          </Typography>
          {selectedSwap && (
            <>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Partner
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedSwap.counterpart}
                    </Typography>
                    <Chip
                      label={selectedSwap.status}
                      color={STATUS_COLORS[selectedSwap.status] || 'default'}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Your Skill
                  </Typography>
                  <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                    {selectedSwap.mySkill}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Their Skill
                  </Typography>
                  <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                    {selectedSwap.theirSkill}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {format(new Date(selectedSwap.scheduledAt), 'PPP • p')}
                  </Typography>
                </Box>

                {selectedSwap.message && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Message
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedSwap.message}
                    </Typography>
                  </Box>
                )}
              </Stack>

              <Button
                fullWidth
                variant="contained"
                onClick={() => setDetailModalOpen(false)}
                sx={{ mt: 3, borderRadius: 2, py: 1.2 }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Confirm Modal */}
      <Modal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, action: null, swap: null })}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxWidth: '95%',
            bgcolor: isDark ? '#1e1e2e' : 'background.paper',
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            {confirmModal.action === 'accept' &&
              `Accept swap with ${confirmModal.swap?.counterpart}?`}
            {confirmModal.action === 'reject' &&
              `Reject swap from ${confirmModal.swap?.counterpart}?`}
            {confirmModal.action === 'cancel' &&
              `Cancel swap with ${confirmModal.swap?.counterpart}?`}
            {confirmModal.action === 'requestCompletion' &&
              `Mark swap with ${confirmModal.swap?.counterpart} as complete?`}
            {confirmModal.action === 'confirmCompletion' &&
              `Confirm that swap with ${confirmModal.swap?.counterpart} is complete?`}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => setConfirmModal({ open: false, action: null, swap: null })}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={performConfirmed}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Confirm
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}