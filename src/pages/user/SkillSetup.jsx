// src/pages/user/SkillSetup.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { addUserSkill } from "@services/userSkillService";
import { getAllSkills } from "@services/userSkillService";
import toast from "react-hot-toast";
import Logo from "@assets/skillswap-logo.png";

const QUESTIONS = {
  JavaScript: [
    {
      q: "Which keyword is used to declare a constant?",
      options: ["var", "let", "const", "static"],
      answer: "const",
    },
    {
      q: "What does '===' mean in JavaScript?",
      options: [
        "Assignment",
        "Equal value only",
        "Equal value & type",
        "Comparison operator",
      ],
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

export default function SkillSetup() {
  const navigate = useNavigate();

  const [availableSkills, setAvailableSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch available skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getAllSkills(true); // skipAuth = true for registration flow
        setAvailableSkills(skills);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        toast.error("Failed to load available skills");
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  const handleAnswer = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const allAnswered = () => {
    if (!selectedSkill) return false;
    const skillName = selectedSkill.skillName;
    const questions = QUESTIONS[skillName] || [];
    return questions.every((_, i) => answers[i]);
  };

  const calculateLevel = () => {
    const skillName = selectedSkill.skillName;
    const questions = QUESTIONS[skillName] || [];
    
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
    if (!selectedSkill) {
      setError("Please select a skill.");
      return;
    }

    if (!allAnswered()) {
      setError("All questions must be answered.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      // Get user info from localStorage (set during registration)
      const pendingSetup = localStorage.getItem("pendingSkillSetup");
      if (!pendingSetup) {
        toast.error("Session expired. Please register again.");
        navigate("/register");
        return;
      }

      const { userId } = JSON.parse(pendingSetup);
      
      if (!userId) {
        toast.error("User ID not found. Please login first.");
        navigate("/login");
        return;
      }

      const level = calculateLevel();

      // Add skill to user's profile via API
      const payload = {
        skillId: selectedSkill.skillId,
        level: level,
        type: "OFFER", // Always OFFER for listings
      };

      await addUserSkill(userId, payload);

      toast.success(`Skill added successfully! Level: ${level}`);

      // Clear temp data
      localStorage.removeItem("pendingSkillSetup");

      // Redirect to login
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch (err) {
      console.error("Failed to add skill:", err);
      toast.error(err.response?.data?.message || "Failed to add skill");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkipForNow = () => {
    localStorage.removeItem("pendingSkillSetup");
    toast.info("You can add skills later from your profile");
    navigate("/login", { replace: true });
  };

  if (loadingSkills) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #ffffff, #325cb9)",
      }}
    >
      {/* Top logo */}
      <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Box
          component="img"
          src={Logo}
          alt="SkillSwap Logo"
          sx={{ height: 80, mr: 2 }}
        />
      </Box>

      {/* Centered content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            maxWidth: 760,
            width: "100%",
            p: 4,
            borderRadius: 6,
          }}
          elevation={6}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
            Skill Assessment
          </Typography>

          <Typography color="text.secondary" mb={2}>
            Select one skill and answer all questions to determine your level.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Skill Selection */}
          <Typography variant="h6" fontWeight={600} mb={2}>
            Choose a Skill
          </Typography>

          <Stack spacing={1}>
            {availableSkills.map((skill) => {
              const hasQuestions = QUESTIONS[skill.skillName];
              return (
                <FormControlLabel
                  key={skill.skillId}
                  control={
                    <Checkbox
                      checked={selectedSkill?.skillId === skill.skillId}
                      onChange={() => {
                        setSelectedSkill(skill);
                        setAnswers({});
                        setError("");
                      }}
                      disabled={!hasQuestions}
                    />
                  }
                  label={
                    <Box>
                      <Typography fontWeight={500}>{skill.skillName}</Typography>
                      {skill.category && (
                        <Typography variant="caption" color="text.secondary">
                          {skill.category}
                        </Typography>
                      )}
                      {!hasQuestions && (
                        <Typography variant="caption" color="error" display="block">
                          (Assessment not available)
                        </Typography>
                      )}
                    </Box>
                  }
                />
              );
            })}
          </Stack>

          {/* Questions */}
          {selectedSkill && QUESTIONS[selectedSkill.skillName] && (
            <Box mt={4}>
              <Typography variant="h6" fontWeight={600} color="primary" mb={2}>
                {selectedSkill.skillName} Assessment
              </Typography>

              {QUESTIONS[selectedSkill.skillName].map((q, i) => (
                <Box key={i} mt={3} p={2} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
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
            </Box>
          )}

          {error && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleSkipForNow}
              disabled={submitting}
            >
              Skip for Now
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
              disabled={!selectedSkill || submitting}
              onClick={handleSubmit}
            >
              {submitting ? <CircularProgress size={24} /> : "Submit & Continue"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}