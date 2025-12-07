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
  Modal,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useState } from "react";

const dummySkills = [
  { id: 1, skill: "Guitar Lessons", owner: "Alice", category: "Music", description: "Learn acoustic guitar basics." },
  { id: 2, skill: "Painting", owner: "Bob", category: "Art", description: "Watercolor painting for beginners." },
  { id: 3, skill: "Yoga", owner: "Sara", category: "Fitness", description: "Morning yoga sessions at home." },
  { id: 4, skill: "Cooking", owner: "John", category: "Culinary", description: "Italian cooking recipes." },
  { id: 5, skill: "Photography", owner: "Emma", category: "Creative", description: "Digital photography basics." },
  { id: 6, skill: "Java", owner: "Mark", category: "Coding", description: "Learn Java Core." },
  { id: 7, skill: "React", owner: "Joe", category: "Coding", description: "Learn React Basics." },
  { id: 8, skill: "Python", owner: "Lucy", category: "Coding", description: "Learn Python Fundamentals." },
  { id: 9, skill: "Piano", owner: "Tom", category: "Music", description: "Beginner piano lessons." },
  { id: 10, skill: "Sketching", owner: "Nina", category: "Art", description: "Learn sketching techniques." },
];

const ownerProfiles = {
  Alice: { bio: "Music teacher, 5 years experience", skills: ["Guitar", "Piano"] },
  Bob: { bio: "Freelance artist", skills: ["Painting", "Sketching"] },
  Sara: { bio: "Fitness trainer", skills: ["Yoga", "Meditation"] },
  John: { bio: "Chef", skills: ["Cooking", "Baking"] },
  Emma: { bio: "Photographer", skills: ["Photography"] },
  Mark: { bio: "Software engineer", skills: ["Java", "Spring"] },
  Joe: { bio: "Frontend dev", skills: ["React", "CSS"] },
  Lucy: { bio: "Python enthusiast", skills: ["Python", "Data Analysis"] },
  Tom: { bio: "Pianist", skills: ["Piano"] },
  Nina: { bio: "Art lover", skills: ["Sketching", "Painting"] },
};

export default function UserBrowse() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [requestedSwaps, setRequestedSwaps] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding"];

  const filteredSkills = dummySkills.filter(
    (skill) =>
      skill.skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? skill.category === selectedCategory : true)
  );

  // Pagination
  const skillsPerPage = 6;
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
  const displayedSkills = filteredSkills.slice(
    (currentPage - 1) * skillsPerPage,
    currentPage * skillsPerPage
  );

  const handleOwnerClick = (owner) => {
    setSelectedOwner(owner);
    setProfileModalOpen(true);
  };

  const toggleSwapRequest = (skillId, skillName) => {
    if (requestedSwaps.includes(skillId)) {
      setRequestedSwaps((prev) => prev.filter((id) => id !== skillId));
      setSnackbarMsg(`Swap request for "${skillName}" cancelled.`);
    } else {
      setRequestedSwaps((prev) => [...prev, skillId]);
      setSnackbarMsg(`Swap requested for "${skillName}".`);
    }
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Browse Skills
      </Typography>

      {/* Search & Filter */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search skills..."
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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

      {/* Skill Listings */}
      <Grid container spacing={3}>
        {displayedSkills.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              No skills found.
            </Typography>
          </Grid>
        )}

        {displayedSkills.map((skill) => {
          const isRequested = requestedSwaps.includes(skill.id);
          return (
            <Grid item xs={12} key={skill.id} display="flex">
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%", // Full width
                  boxSizing: "border-box",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {skill.skill}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOwnerClick(skill.owner)}
                  >
                    Owner: {skill.owner}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {skill.description}
                  </Typography>
                  <Chip label={skill.category} size="small" sx={{ mt: 1 }} color="secondary" />
                </Box>
                <Button
                  variant={isRequested ? "outlined" : "contained"}
                  color={isRequested ? "error" : "primary"}
                  startIcon={<SwapHorizIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => toggleSwapRequest(skill.id, skill.skill)}
                >
                  {isRequested ? "Cancel Request" : "Request Swap"}
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            gap: 1,
            position: "sticky",
            bottom: 0,
            bgcolor: theme.palette.background.default,
            py: 1.5,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
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

      {/* Owner Profile Modal */}
      <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 350 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {selectedOwner}'s Profile
          </Typography>
          {selectedOwner && ownerProfiles[selectedOwner] && (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Bio: {ownerProfiles[selectedOwner].bio}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Skills: {ownerProfiles[selectedOwner].skills.join(", ")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setProfileModalOpen(false)}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
