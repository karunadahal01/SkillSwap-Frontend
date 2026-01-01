// src/pages/user/UserListing.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Stack,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  AssessmentOutlined as AssessmentIcon,
} from "@mui/icons-material";
import { useAuth } from "@context/AuthContext";
import {
  getAllUserSkills,
  removeUserSkill,
  updateUserSkillLevel,
} from "@services/userSkillService";
import AddSkillAssessment from "@components/user/AddSkillAssessment";
import toast from "react-hot-toast";

const SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const LEVEL_COLORS = {
  BEGINNER: "default",
  INTERMEDIATE: "primary",
  ADVANCED: "secondary",
};

const LEVEL_DESCRIPTIONS = {
  BEGINNER: "Just starting out",
  INTERMEDIATE: "Comfortable with basics",
  ADVANCED: "Proficient and experienced",
};

export default function UserListing() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAssessmentDialog, setOpenAssessmentDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editLevel, setEditLevel] = useState("");

  const fetchUserSkills = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await getAllUserSkills(user.id);
      setSkills(res);
    } catch (err) {
      console.error("Failed to fetch user skills:", err);
      toast.error("Failed to load your skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, [user]);

  const handleUpdateLevel = async () => {
    if (!selectedSkill) return;

    try {
      await updateUserSkillLevel(user.id, {
        userSkillId: selectedSkill.userSkillId,
        level: editLevel,
      });
      toast.success("Skill level updated successfully!");
      setOpenEditDialog(false);
      setSelectedSkill(null);
      fetchUserSkills();
    } catch (err) {
      console.error("Failed to update skill level:", err);
      toast.error(err.response?.data?.message || "Failed to update skill level");
    }
  };

  const handleDeleteSkill = async () => {
    if (!selectedSkill) return;

    try {
      await removeUserSkill(user.id, {
        skillId: selectedSkill.skillId,
        type: selectedSkill.type,
      });
      toast.success("Skill removed successfully!");
      setOpenDeleteDialog(false);
      setSelectedSkill(null);
      fetchUserSkills();
    } catch (err) {
      console.error("Failed to remove skill:", err);
      toast.error(err.response?.data?.message || "Failed to remove skill");
    }
  };

  const openEdit = (skill) => {
    setSelectedSkill(skill);
    setEditLevel(skill.level);
    setOpenEditDialog(true);
  };

  const openDelete = (skill) => {
    setSelectedSkill(skill);
    setOpenDeleteDialog(true);
  };

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Please login to view your skills.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  const userSkillIds = skills.map(s => s.skillId);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            My Skill Listings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your offered skills and proficiency levels
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAssessmentDialog(true)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            px: 3,
            py: 1.5,
            boxShadow: 3,
          }}
        >
          Add Skill
        </Button>
      </Box>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
          elevation={0}
        >
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "50%",
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <SchoolIcon sx={{ fontSize: 60 }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
            No skills added yet
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Start building your skill profile by taking an assessment
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AssessmentIcon />}
            onClick={() => setOpenAssessmentDialog(true)}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Take Skill Assessment
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.userSkillId}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                    borderColor: "#1976d2",
                  },
                }}
                elevation={3}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        borderRadius: 2,
                        p: 1.5,
                        mr: 2,
                        boxShadow: 2,
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {skill.skillName}
                      </Typography>
                      <Chip
                        label={skill.level}
                        color={LEVEL_COLORS[skill.level]}
                        size="small"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      />
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {LEVEL_DESCRIPTIONS[skill.level]}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Type: <strong>{skill.type}</strong>
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2, justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => openEdit(skill)}
                    sx={{ color: "#1976d2", fontWeight: 600 }}
                  >
                    Update Level
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => openDelete(skill)}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        backgroundColor: "error.light",
                        color: "white",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Assessment Dialog */}
      <AddSkillAssessment
        open={openAssessmentDialog}
        onClose={() => setOpenAssessmentDialog(false)}
        onSkillAdded={fetchUserSkills}
        excludeSkillIds={userSkillIds}
      />

      {/* Edit Level Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2", pb: 1 }}>
          Update Skill Level
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Skill Name
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {selectedSkill?.skillName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Current Level: <strong>{selectedSkill?.level}</strong>
              </Typography>
            </Box>
            <TextField
              select
              label="New Proficiency Level"
              value={editLevel}
              onChange={(e) => setEditLevel(e.target.value)}
              fullWidth
            >
              {SKILL_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  <Box>
                    <Typography fontWeight={600}>{level}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {LEVEL_DESCRIPTIONS[level]}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEditDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateLevel}
            disabled={editLevel === selectedSkill?.level}
          >
            Update Level
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>
          Remove Skill?
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone.
          </Alert>
          <Typography>
            Are you sure you want to remove <strong>{selectedSkill?.skillName}</strong> from your
            skill listings?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteSkill}>
            Remove Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}