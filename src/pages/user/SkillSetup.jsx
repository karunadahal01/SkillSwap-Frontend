// src/pages/user/SkillSetup.jsx
import { useState } from "react";
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
} from "@mui/material";
import Logo from "@assets/skillswap-logo.png";

const SKILLS = ["JavaScript", "Python", "Java"];

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

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
    setResult(null);
  };

  const handleAnswer = (skill, qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${skill}-${qIndex}`]: value,
    }));
  };

  const allAnswered = () => {
    return selectedSkills.every((skill) =>
      QUESTIONS[skill].every((_, i) => answers[`${skill}-${i}`])
    );
  };

  const calculateLevel = () => {
    let correct = 0;
    let total = 0;

    selectedSkills.forEach((skill) => {
      QUESTIONS[skill].forEach((q, i) => {
        total++;
        if (answers[`${skill}-${i}`] === q.answer) correct++;
      });
    });

    const percent = (correct / total) * 100;

    if (percent < 40) return "Beginner";
    if (percent < 65) return "Intermediate";
    if (percent < 85) return "Advanced";
    return "Expert";
  };

  const handleSubmit = () => {
    if (selectedSkills.length === 0) {
      setError("Please select at least one skill.");
      return;
    }

    if (!allAnswered()) {
      setError("All questions must be answered. This step is mandatory.");
      return;
    }

    setError("");
    const level = calculateLevel();
    setResult(level);

    // 🔹 store skill result (optional, useful later)
    localStorage.setItem(
      "skillAssessment",
      JSON.stringify({ skills: selectedSkills, level })
    );

    // 🔹 redirect to login after short delay
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);
  };

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
            Select your programming skills and answer all questions to determine
            your level. This step is mandatory.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Skill Selection */}
          <Typography variant="h6" fontWeight={600}>
            Choose Skills
          </Typography>

          <Stack direction="row" spacing={2} mt={1}>
            {SKILLS.map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                }
                label={skill}
              />
            ))}
          </Stack>

          {/* Questions */}
          {selectedSkills.map((skill) => (
            <Box key={skill} mt={4}>
              <Typography variant="h6" fontWeight={600}>
                {skill}
              </Typography>

              {QUESTIONS[skill].map((q, i) => (
                <Box key={i} mt={2}>
                  <Typography fontWeight={500}>
                    {`${i + 1}. ${q.q}`}
                  </Typography>
                  <RadioGroup
                    value={answers[`${skill}-${i}`] || ""}
                    onChange={(e) =>
                      handleAnswer(skill, i, e.target.value)
                    }
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
          ))}

          {error && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Your calculated skill level: <strong>{result}</strong>
              <br />
              Redirecting to login…
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            disabled={selectedSkills.length === 0}
            onClick={handleSubmit}
          >
            Submit & Continue
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
