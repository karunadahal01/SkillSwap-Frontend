// src/components/AddSkillAssessment.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import { getAllSkills, addUserSkill } from "@services/userSkillService";
import { useAuth } from "@context/AuthContext";
import toast from "react-hot-toast";

const QUESTIONS = {
  JavaScript: [
    {
      q: "Which keyword is used to declare a constant?",
      options: ["var", "let", "const", "static"],
      answer: "const",
    },
    {
      q: "What does '===' mean in JavaScript?",
      options: ["Assignment", "Equal value only", "Equal value & type", "Comparison operator"],
      answer: "Equal value & type",
    },
    {
      q: "Which method converts JSON to an object?",
      options: ["JSON.stringify()", "JSON.parse()", "parseJSON()", "toObject()"],
      answer: "JSON.parse()",
    },
  ],
  Python: [
    {
      q: "Which data type is immutable?",
      options: ["List", "Set", "Tuple", "Dictionary"],
      answer: "Tuple",
    },
    {
      q: "What keyword is used to define a function?",
      options: ["func", "define", "def", "lambda"],
      answer: "def",
    },
    {
      q: "Which symbol is used for comments?",
      options: ["//", "#", "/* */", "--"],
      answer: "#",
    },
  ],
  Java: [
    {
      q: "Which keyword is used for inheritance?",
      options: ["inherits", "extends", "implements", "super"],
      answer: "extends",
    },
    {
      q: "Which method is the entry point of a Java program?",
      options: ["start()", "run()", "main()", "init()"],
      answer: "main()",
    },
    {
      q: "Which memory area stores objects?",
      options: ["Stack", "Register", "Heap", "Method Area"],
      answer: "Heap",
    },
  ],
};

export default function AddSkillAssessment({ open, onClose, onSkillAdded, excludeSkillIds = [] }) {
  const { user } = useAuth();
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 = select skill, 2 = assessment

  useEffect(() => {
    if (open) {
      fetchSkills();
    }
  }, [open]);

  const fetchSkills = async () => {
    try {
      const skills = await getAllSkills();
      const filtered = skills.filter(s => !excludeSkillIds.includes(s.skillId));
      setAvailableSkills(filtered);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
      toast.error("Failed to load available skills");
    }
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setAnswers({});
    setError("");
    
    // Check if this skill has assessment questions
    if (QUESTIONS[skill.skillName]) {
      setStep(2);
    } else {
      setError("Assessment not available for this skill. Please contact admin.");
    }
  };

  const handleAnswer = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const allAnswered = () => {
    if (!selectedSkill) return false;
    const questions = QUESTIONS[selectedSkill.skillName] || [];
    return questions.every((_, i) => answers[i]);
  };

  const calculateLevel = () => {
    const questions = QUESTIONS[selectedSkill.skillName] || [];
    let correct = 0;
    
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    const percent = (correct / questions.length) * 100;

    if (percent < 40) return "BEGINNER";
    if (percent < 70) return "INTERMEDIATE";
    if (percent < 90) return "ADVANCED";
    return "EXPERT";
  };

  const handleSubmit = async () => {
    if (!allAnswered()) {
      setError("Please answer all questions.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const level = calculateLevel();

      await addUserSkill(user.id, {
        skillId: selectedSkill.skillId,
        level: level,
        type: "OFFER",
      });

      toast.success(`${selectedSkill.skillName} added! Level: ${level}`);
      handleClose();
      if (onSkillAdded) onSkillAdded();
    } catch (err) {
      console.error("Failed to add skill:", err);
      toast.error(err.response?.data?.message || "Failed to add skill");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedSkill(null);
    setAnswers({});
    setError("");
    setStep(1);
    onClose();
  };

  const handleBack = () => {
    setStep(1);
    setSelectedSkill(null);
    setAnswers({});
    setError("");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
        {step === 1 ? "Select Skill for Assessment" : `${selectedSkill?.skillName} Assessment`}
      </DialogTitle>
      <DialogContent>
        {step === 1 ? (
          <Box sx={{ mt: 2 }}>
            {availableSkills.length === 0 ? (
              <Alert severity="info">All available skills have been added to your profile.</Alert>
            ) : (
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Choose a skill to take an assessment and determine your proficiency level.
                </Typography>
                <TextField select label="Select Skill" fullWidth>
                  {availableSkills.map((skill) => (
                    <MenuItem
                      key={skill.skillId}
                      value={skill.skillId}
                      onClick={() => handleSkillSelect(skill)}
                    >
                      {skill.skillName} - {skill.category}
                      {!QUESTIONS[skill.skillName] && " (No assessment available)"}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Answer all questions to calculate your skill level.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {QUESTIONS[selectedSkill?.skillName]?.map((q, i) => (
              <Box
                key={i}
                sx={{
                  mb: 3,
                  p: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                }}
              >
                <Typography fontWeight={500} mb={1}>
                  {`Question ${i + 1}: ${q.q}`}
                </Typography>
                <RadioGroup
                  value={answers[i] || ""}
                  onChange={(e) => handleAnswer(i, e.target.value)}
                >
                  {q.options.map((opt) => (
                    <FormControlLabel
                      key={opt}
                      value={opt}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              </Box>
            ))}

            {error && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        {step === 2 && (
          <Button onClick={handleBack} disabled={submitting}>
            Back
          </Button>
        )}
        <Button onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>
        {step === 2 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!allAnswered() || submitting}
          >
            {submitting ? <CircularProgress size={24} /> : "Submit Assessment"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}