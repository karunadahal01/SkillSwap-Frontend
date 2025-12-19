// src/pages/user/MyListings.jsx
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  useTheme,
  Snackbar,
  Alert,
  Modal,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const mySkills = [
  { id: 1, skill: "Guitar Lessons", category: "Music", description: "Learn acoustic guitar basics. This description can be really long and should wrap properly without stretching the card too much.", status: "Pending" },
  { id: 2, skill: "React", category: "Coding", description: "Learn React Basics", status: "Completed" },
  { id: 3, skill: "Cooking", category: "Culinary", description: "Italian recipes", status: "Pending" },
];

const categories = ["Music", "Art", "Fitness", "Culinary", "Creative", "Coding"];

export default function MyListings() {
  const theme = useTheme();
  const [skills, setSkills] = useState(mySkills);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    skill: "",
    category: categories[0],
    description: "",
    status: "Pending",
  });

  const handleDelete = () => {
    setSkills(skills.filter((s) => s.id !== skillToDelete.id));
    setSnackbarMsg("Listing removed successfully!");
    setSnackbarOpen(true);
    setConfirmModalOpen(false);
    setSkillToDelete(null);
  };

  const handleEditOpen = (skill) => {
    setSelectedSkill(skill);
    setEditModalOpen(true);
  };

  const handleEditSave = () => {
    setSkills(skills.map((s) => (s.id === selectedSkill.id ? selectedSkill : s)));
    setSnackbarMsg("Listing updated successfully!");
    setSnackbarOpen(true);
    setEditModalOpen(false);
  };

  const handleAddSave = () => {
    const newEntry = {
      id: skills.length + 1,
      ...newSkill,
    };
    setSkills([...skills, newEntry]);
    setSnackbarMsg("New listing added!");
    setSnackbarOpen(true);
    setAddModalOpen(false);
    setNewSkill({ skill: "", category: categories[0], description: "", status: "Pending" });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, marginTop:4}}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        My Listings
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }} onClick={() => setAddModalOpen(true)}>
        + Add Listing
      </Button>

      <Grid container spacing={3}>
        {skills.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              No listings found.
            </Typography>
          </Grid>
        )}

        {skills.map((skill) => (
          <Grid item xs={12} key={skill.id} display="flex">
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",       // Full width
                boxSizing: "border-box",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)", boxShadow: theme.shadows[6] },
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {skill.skill}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {skill.description}
                </Typography>
                <Chip label={skill.category} size="small" sx={{ mt: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Status: {skill.status}
                </Typography>
              </Box>

              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditOpen(skill)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setSkillToDelete(skill);
                    setConfirmModalOpen(true);
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modals: Add/Edit/Delete */}
      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Edit Listing
          </Typography>
          {selectedSkill && (
            <>
              <TextField
                label="Skill Name"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                value={selectedSkill.skill}
                onChange={(e) => setSelectedSkill({ ...selectedSkill, skill: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                size="small"
                multiline
                rows={3}
                sx={{ mb: 2 }}
                value={selectedSkill.description}
                onChange={(e) => setSelectedSkill({ ...selectedSkill, description: e.target.value })}
              />
              <TextField
                label="Category"
                select
                fullWidth
                size="small"
                SelectProps={{ native: true }}
                sx={{ mb: 2 }}
                value={selectedSkill.category}
                onChange={(e) => setSelectedSkill({ ...selectedSkill, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </TextField>
              <TextField
                label="Status"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                value={selectedSkill.status}
                onChange={(e) => setSelectedSkill({ ...selectedSkill, status: e.target.value })}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, flexWrap: "wrap" }}>
                <Button variant="outlined" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleEditSave}>
                  Save
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "85%", sm: 350 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to remove this listing?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
            <Button variant="outlined" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Add Listing Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Add Listing
          </Typography>
          <TextField
            label="Skill Name"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            value={newSkill.skill}
            onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            size="small"
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
          />
          <TextField
            label="Category"
            select
            fullWidth
            size="small"
            SelectProps={{ native: true }}
            sx={{ mb: 2 }}
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </TextField>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, flexWrap: "wrap" }}>
            <Button variant="outlined" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddSave}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
