// src/pages/user/UserSwaps.jsx
import React, { useMemo, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { format } from "date-fns";

/**
 * Dummy swap data shape:
 * {
 *   id,
 *   direction: 'incoming' | 'outgoing',
 *   counterpart: 'Alice',
 *   mySkill: 'Guitar',
 *   theirSkill: 'Painting',
 *   scheduledAt: ISOString,
 *   status: 'Requested'|'Accepted'|'Pending'|'Cancelled'|'Completed'
 * }
 */

const initialSwaps = [
  { id: 1, direction: "incoming", counterpart: "Alice", mySkill: "Painting", theirSkill: "Guitar", scheduledAt: new Date(2025, 9, 10, 18, 0).toISOString(), status: "Requested" },
  { id: 2, direction: "outgoing", counterpart: "Bob", mySkill: "React", theirSkill: "Photography", scheduledAt: new Date(2025, 9, 9, 16, 0).toISOString(), status: "Accepted" },
  { id: 3, direction: "incoming", counterpart: "Sara", mySkill: "Cooking", theirSkill: "Yoga", scheduledAt: new Date(2025, 9, 7, 10, 30).toISOString(), status: "Completed" },
  { id: 4, direction: "outgoing", counterpart: "Liam", mySkill: "Java", theirSkill: "Photography", scheduledAt: new Date(2025, 9, 11, 14, 0).toISOString(), status: "Pending" },
  { id: 5, direction: "incoming", counterpart: "Emma", mySkill: "Python", theirSkill: "Guitar", scheduledAt: new Date(2025, 9, 12, 9, 0).toISOString(), status: "Requested" },
  { id: 6, direction: "outgoing", counterpart: "Mark", mySkill: "CSS", theirSkill: "Cooking", scheduledAt: new Date(2025, 9, 13, 11, 0).toISOString(), status: "Cancelled" },
];

const STATUS_COLORS = {
  Requested: "warning",
  Accepted: "success",
  Pending: "info",
  Cancelled: "error",
  Completed: "default",
};

export default function UserSwaps() {
  const theme = useTheme();

  const [swaps, setSwaps] = useState(initialSwaps);
  const [tab, setTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 6;

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, action: null, swap: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const filtered = useMemo(() => {
    let list = swaps.slice();
    if (tab === "incoming") list = list.filter((s) => s.direction === "incoming");
    if (tab === "outgoing") list = list.filter((s) => s.direction === "outgoing");
    if (statusFilter !== "All") list = list.filter((s) => s.status === statusFilter);
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

  const openDetails = (swap) => {
    setSelectedSwap(swap);
    setDetailModalOpen(true);
  };

  const pushSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAccept = (swap) => {
    setSwaps((prev) => prev.map((s) => (s.id === swap.id ? { ...s, status: "Accepted" } : s)));
    pushSnackbar(`Accepted swap with ${swap.counterpart}`);
  };
  const handleReject = (swap) => {
    setSwaps((prev) => prev.map((s) => (s.id === swap.id ? { ...s, status: "Cancelled" } : s)));
    pushSnackbar(`Rejected swap with ${swap.counterpart}`, "info");
  };
  const handleCancel = (swap) => {
    setSwaps((prev) => prev.map((s) => (s.id === swap.id ? { ...s, status: "Cancelled" } : s)));
    pushSnackbar(`Cancelled swap with ${swap.counterpart}`, "warning");
  };
  const handleComplete = (swap) => {
    setSwaps((prev) => prev.map((s) => (s.id === swap.id ? { ...s, status: "Completed" } : s)));
    pushSnackbar(`Marked swap with ${swap.counterpart} as completed`);
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
    if (action === "complete") handleComplete(swap);
    setConfirmModal({ open: false, action: null, swap: null });
  };

  const requestLabel = (s) => (s.direction === "incoming" ? "Requested you" : "You requested");

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, marginTop:8}}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        My Swaps
      </Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2, flexWrap: "wrap" }}>
        <Tabs
          value={tab}
          onChange={(e, v) => {
            setTab(v);
            setPage(1);
          }}
          sx={{ minHeight: 40 }}
        >
          <Tab value="all" label="All" />
          <Tab value="incoming" label="Incoming" />
          <Tab value="outgoing" label="Outgoing" />
        </Tabs>

        <TextField
          size="small"
          placeholder="Search by name or skill..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 300 } }}
        />

        <TextField
          select
          size="small"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          sx={{ width: { xs: "100%", sm: 180 } }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Requested">Requested</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>
      </Box>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No swaps found</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Use the browse page to find skills and request swaps.
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
            {visible.map((s) => (
              <Grid item xs={12} key={s.id} display="flex">
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: { xs: 240, sm: 200 },
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 0.5, flexWrap: "wrap" }}>
                      <SwapHorizIcon sx={{ color: theme.palette.primary.main }} />
                      <Typography variant="subtitle1" fontWeight="600" noWrap>
                        {s.counterpart}
                      </Typography>
                      <Chip label={s.status} color={STATUS_COLORS[s.status] || "default"} size="small" sx={{ ml: 1 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        • {requestLabel(s)}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {s.mySkill} ↔ {s.theirSkill}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {format(new Date(s.scheduledAt), "EEE, MMM d, yyyy • hh:mm a")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2, flexWrap: "wrap" }}>
                    <Button size="small" variant="outlined" onClick={() => openDetails(s)}>
                      Details
                    </Button>
                    {s.direction === "incoming" && s.status === "Requested" && (
                      <>
                        <Button size="small" variant="contained" color="success" startIcon={<CheckIcon />} onClick={() => requestConfirm("accept", s)}>
                          Accept
                        </Button>
                        <Button size="small" variant="outlined" color="error" startIcon={<CloseIcon />} onClick={() => requestConfirm("reject", s)}>
                          Reject
                        </Button>
                      </>
                    )}
                    {s.direction === "outgoing" && (s.status === "Requested" || s.status === "Pending") && (
                      <Button size="small" variant="outlined" color="error" startIcon={<CancelIcon />} onClick={() => requestConfirm("cancel", s)}>
                        Cancel
                      </Button>
                    )}
                    {s.status === "Accepted" && (
                      <Button size="small" variant="contained" color="primary" onClick={() => requestConfirm("complete", s)}>
                        Mark Completed
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" />
          </Box>
        </>
      )}

      {/* Details Modal */}
      <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 420, maxWidth: "95%", bgcolor: "background.paper", borderRadius: 2, p: 3, boxShadow: 24 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Swap Details
          </Typography>
          {selectedSwap && (
            <>
              <Typography variant="subtitle1" fontWeight={600}>
                {selectedSwap.counterpart}
                <Chip label={selectedSwap.status} color={STATUS_COLORS[selectedSwap.status] || "default"} size="small" sx={{ ml: 1 }} />
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">Your skill: <strong>{selectedSwap.mySkill}</strong></Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Their skill: <strong>{selectedSwap.theirSkill}</strong></Typography>
              <Typography variant="body2" color="text.secondary">Scheduled: {format(new Date(selectedSwap.scheduledAt), "PPP • p")}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>Notes: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</Typography>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={() => setDetailModalOpen(false)}>Close</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Confirm Modal */}
      <Modal open={confirmModal.open} onClose={() => setConfirmModal({ open: false, action: null, swap: null })}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 340, bgcolor: "background.paper", borderRadius: 2, p: 3, boxShadow: 24, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            {confirmModal.action === "accept" && `Accept swap with ${confirmModal.swap?.counterpart}?`}
            {confirmModal.action === "reject" && `Reject swap from ${confirmModal.swap?.counterpart}?`}
            {confirmModal.action === "cancel" && `Cancel swap with ${confirmModal.swap?.counterpart}?`}
            {confirmModal.action === "complete" && `Mark swap with ${confirmModal.swap?.counterpart} as completed?`}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
            <Button variant="outlined" onClick={() => setConfirmModal({ open: false, action: null, swap: null })}>
              No
            </Button>
            <Button variant="contained" color="primary" onClick={performConfirmed}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
