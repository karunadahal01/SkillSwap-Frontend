// src/pages/user/UserBrowse.jsx
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect, useContext } from "react";
import { getAllUsers } from "@services/userService";
import { createMatchRequest, getMatchRequests, cancelMatchRequest } from "@services/matchRequestService";
import AuthContext from "@context/AuthContext";

export default function UserBrowse() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  const [skills, setSkills] = useState([]);
  const [myOfferSkills, setMyOfferSkills] = useState([]); // Skills I can offer
  const [myPendingRequests, setMyPendingRequests] = useState([]); // NEW: Track pending requests
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Request Dialog
  const [requestDialog, setRequestDialog] = useState({
    open: false,
    skill: null,
  });
  const [selectedMySkill, setSelectedMySkill] = useState("");
  const [requesting, setRequesting] = useState(false);

  // NEW: Cancel Confirmation Modal
  const [cancelModal, setCancelModal] = useState({
    open: false,
    requestId: null,
    skillName: null,
  });
  const [cancelling, setCancelling] = useState(false);

  const categories = ["C Programming", "JavaScript", "Java", ".NET", "Python"];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        console.log("=== ALL USERS FETCHED ===");
        console.log("Total users:", users.length);
        console.log("All users data:", users);

        // Get current user's OFFER skills (what I can teach/offer to others)
        const currentUser = users.find((u) => u.email === user?.email);
        console.log("Current user found:", currentUser);
        
        if (currentUser) {
          console.log("Current user skills:", currentUser.skills);
          const offerSkills = currentUser.skills
            .filter((s) => s.type === "OFFER")
            .map((s) => ({
              id: s.userSkillId,
              skillName: s.skillName,
              level: s.level,
            }));
          setMyOfferSkills(offerSkills);
          console.log("✅ My OFFER skills:", offerSkills);
        }

        // Get other users' OFFER skills (what they can teach me)
        const otherOfferSkills = users
          .filter((u) => u.email !== user?.email)
          .flatMap((u) =>
            u.skills
              .filter((s) => s.type === "OFFER")
              .map((s) => ({
                id: s.userSkillId,
                skillName: s.skillName,
                level: s.level,
                category: s.skillName,
                ownerName: u.fullName,
                ownerEmail: u.email,
                ownerId: u.userId, // ✅ Fixed: using userId instead of id
              }))
          );
        
        console.log("Sample skill with owner:", otherOfferSkills[0]);
        setSkills(otherOfferSkills);
        console.log("✅ Other users' OFFER skills:", otherOfferSkills);
        console.log("========================");
      } catch (error) {
        console.error("Failed to fetch skills", error);
        showSnackbar("Failed to load skills", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchSkills();
  }, [user]);

  /* NEW: Fetch pending requests to show cancel button */
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await getMatchRequests();
        console.log("Fetching pending requests:", response);
        
        if (response.success && Array.isArray(response.data)) {
          // Filter only outgoing PENDING requests
          const pending = response.data
            .filter((req) => req.fromUserId === user?.id && req.status === "PENDING")
            .map((req) => ({
              requestId: req.id,
              toUserSkillId: req.toUserSkillId,
              skillName: req.toUserSkillName,
            }));
          setMyPendingRequests(pending);
          console.log("✅ My pending requests:", pending);
        }
      } catch (error) {
        console.error("Failed to fetch pending requests", error);
      }
    };

    if (user?.id) fetchPendingRequests();
  }, [user]);

  /* ================= FILTERING ================= */
  const filteredSkills = skills.filter(
    (skill) =>
      skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? skill.category === selectedCategory : true)
  );

  /* ================= PAGINATION ================= */
  const skillsPerPage = 6;
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
  const displayedSkills = filteredSkills.slice(
    (currentPage - 1) * skillsPerPage,
    currentPage * skillsPerPage
  );

  /* ================= UTILITIES ================= */
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  /* NEW: Check if skill has pending request */
  const getPendingRequest = (skillId) => {
    return myPendingRequests.find((req) => req.toUserSkillId === skillId);
  };

  /* ================= ACTIONS ================= */
  const openRequestDialog = (skill) => {
    if (myOfferSkills.length === 0) {
      showSnackbar(
        "You need to add OFFER skills in your profile first to request swaps",
        "warning"
      );
      return;
    }
    setRequestDialog({ open: true, skill });
    setSelectedMySkill("");
  };

  const closeRequestDialog = () => {
    setRequestDialog({ open: false, skill: null });
    setSelectedMySkill("");
  };

  // UNCHANGED: Original request swap logic
  const handleRequestSwap = async () => {
    if (!selectedMySkill) {
      showSnackbar("Please select a skill you want to offer", "warning");
      return;
    }

    const { skill } = requestDialog;

    try {
      setRequesting(true);

      const request = {
        fromUserSkillId: parseInt(selectedMySkill), // My skill ID (what I offer)
        toUserId: skill.ownerId, // Other user's ID
        toUserSkillId: skill.id, // Their skill ID (what I want)
      };

      console.log("=== SWAP REQUEST DEBUG ===");
      console.log("Selected my skill ID:", selectedMySkill);
      console.log("Target skill owner ID:", skill.ownerId);
      console.log("Target skill ID:", skill.id);
      console.log("Full request payload:", request);
      console.log("Full skill object:", skill);
      console.log("========================");

      const response = await createMatchRequest(request);
      console.log("Success Response:", response);

      if (response.success) {
        showSnackbar(`Swap request sent to ${skill.ownerName}!`, "success");
        closeRequestDialog();
        
        // NEW: Add to pending requests locally
        setMyPendingRequests((prev) => [
          ...prev,
          {
            requestId: response.data.id,
            toUserSkillId: skill.id,
            skillName: skill.skillName,
          },
        ]);
      } else {
        showSnackbar(response.message || "Failed to send request", "error");
      }
    } catch (error) {
      console.error("=== ERROR DEBUG ===");
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
      console.error("==================");
      
      showSnackbar(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Failed to send swap request",
        "error"
      );
    } finally {
      setRequesting(false);
    }
  };

  /* NEW: Cancel request functions */
  const openCancelModal = (pendingRequest) => {
    setCancelModal({
      open: true,
      requestId: pendingRequest.requestId,
      skillName: pendingRequest.skillName,
    });
  };

  const closeCancelModal = () => {
    setCancelModal({
      open: false,
      requestId: null,
      skillName: null,
    });
  };

  const handleCancelRequest = async () => {
    try {
      setCancelling(true);
      
      const response = await cancelMatchRequest(cancelModal.requestId);
      console.log("Cancel Response:", response);

      if (response.success) {
        showSnackbar(`Request for "${cancelModal.skillName}" cancelled!`, "info");
        
        // Remove from local pending requests
        setMyPendingRequests((prev) =>
          prev.filter((req) => req.requestId !== cancelModal.requestId)
        );
        
        closeCancelModal();
      } else {
        showSnackbar(response.message || "Failed to cancel request", "error");
      }
    } catch (error) {
      console.error("Failed to cancel request", error);
      showSnackbar(
        error.response?.data?.message || "Failed to cancel request",
        "error"
      );
    } finally {
      setCancelling(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Browse Skills
      </Typography>

      {/* Info message if no offer skills */}
      {myOfferSkills.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          You need to add OFFER skills in your profile before requesting swaps.
          Go to your profile and add skills you can teach!
        </Alert>
      )}

      {/* Search & Category Filter */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search skills..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="All"
            clickable
            color={selectedCategory === "" ? "primary" : "default"}
            onClick={() => {
              setSelectedCategory("");
              setCurrentPage(1);
            }}
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={selectedCategory === cat ? "primary" : "default"}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat ? "" : cat);
                setCurrentPage(1);
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Listings */}
          <Grid container spacing={3}>
            {displayedSkills.length === 0 && (
              <Grid item xs={12}>
                <Typography color="text.secondary">No skills found.</Typography>
              </Grid>
            )}

            {displayedSkills.map((skill) => {
              // NEW: Check if this skill has a pending request
              const pendingRequest = getPendingRequest(skill.id);
              const hasPendingRequest = !!pendingRequest;

              return (
                <Grid item xs={12} key={skill.id} display="flex">
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    <Box>
                      <Typography fontWeight="bold">{skill.skillName}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Owner: {skill.ownerName}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Level: {skill.level}
                      </Typography>
                      <Chip
                        label={skill.category}
                        size="small"
                        sx={{ mt: 1 }}
                        color="secondary"
                      />
                    </Box>

                    {/* NEW: Show Cancel button if pending request exists, otherwise show Request button */}
                    {hasPendingRequest ? (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => openCancelModal(pendingRequest)}
                      >
                        Cancel Request
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SwapHorizIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => openRequestDialog(skill)}
                        disabled={myOfferSkills.length === 0}
                      >
                        Request Swap
                      </Button>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "contained" : "outlined"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </Box>
          )}
        </>
      )}

      {/* Request Swap Dialog - UNCHANGED */}
      <Dialog
        open={requestDialog.open}
        onClose={closeRequestDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Skill Swap</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {requestDialog.skill && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You want to learn:{" "}
                <strong>{requestDialog.skill.skillName}</strong> from{" "}
                <strong>{requestDialog.skill.ownerName}</strong>
              </Typography>

              <TextField
                select
                fullWidth
                label="Select skill you want to offer in exchange"
                value={selectedMySkill}
                onChange={(e) => setSelectedMySkill(e.target.value)}
                helperText="Choose one of your OFFER skills to exchange"
              >
                {myOfferSkills.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.skillName} ({skill.level})
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRequestDialog} disabled={requesting}>
            Cancel
          </Button>
          <Button
            onClick={handleRequestSwap}
            variant="contained"
            disabled={requesting || !selectedMySkill}
            startIcon={requesting && <CircularProgress size={20} />}
          >
            {requesting ? "Sending..." : "Send Request"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* NEW: Cancel Confirmation Modal */}
      <Modal open={cancelModal.open} onClose={closeCancelModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 340,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to cancel the request for "{cancelModal.skillName}"?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}
          >
            <Button
              variant="outlined"
              onClick={closeCancelModal}
              disabled={cancelling}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelRequest}
              disabled={cancelling}
              startIcon={cancelling && <CircularProgress size={20} />}
            >
              {cancelling ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
