// // src/pages/user/SkillSetup.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Divider,
//   Stack,
//   Alert,
// } from "@mui/material";
// import Logo from "@assets/skillswap-logo.png";

// const SKILLS = ["JavaScript", "Python", "Java"];

// const QUESTIONS = {
//   JavaScript: [
//     {
//       q: "Which keyword is used to declare a constant?",
//       options: ["var", "let", "const", "static"],
//       answer: "const",
//     },
//     {
//       q: "What does '===' mean in JavaScript?",
//       options: [
//         "Assignment",
//         "Equal value only",
//         "Equal value & type",
//         "Comparison operator",
//       ],
//       answer: "Equal value & type",
//     },
//     {
//       q: "Which method converts JSON to an object?",
//       options: ["JSON.stringify()", "JSON.parse()", "parseJSON()", "toObject()"],
//       answer: "JSON.parse()",
//     },
//   ],
//   Python: [
//     {
//       q: "Which data type is immutable?",
//       options: ["List", "Set", "Tuple", "Dictionary"],
//       answer: "Tuple",
//     },
//     {
//       q: "What keyword is used to define a function?",
//       options: ["func", "define", "def", "lambda"],
//       answer: "def",
//     },
//     {
//       q: "Which symbol is used for comments?",
//       options: ["//", "#", "/* */", "--"],
//       answer: "#",
//     },
//   ],
//   Java: [
//     {
//       q: "Which keyword is used for inheritance?",
//       options: ["inherits", "extends", "implements", "super"],
//       answer: "extends",
//     },
//     {
//       q: "Which method is the entry point of a Java program?",
//       options: ["start()", "run()", "main()", "init()"],
//       answer: "main()",
//     },
//     {
//       q: "Which memory area stores objects?",
//       options: ["Stack", "Register", "Heap", "Method Area"],
//       answer: "Heap",
//     },
//   ],
// };

// export default function SkillSetup() {
//   const navigate = useNavigate();

//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const toggleSkill = (skill) => {
//     setSelectedSkills((prev) =>
//       prev.includes(skill)
//         ? prev.filter((s) => s !== skill)
//         : [...prev, skill]
//     );
//     setResult(null);
//   };

//   const handleAnswer = (skill, qIndex, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [`${skill}-${qIndex}`]: value,
//     }));
//   };

//   const allAnswered = () => {
//     return selectedSkills.every((skill) =>
//       QUESTIONS[skill].every((_, i) => answers[`${skill}-${i}`])
//     );
//   };

//   const calculateLevel = () => {
//     let correct = 0;
//     let total = 0;

//     selectedSkills.forEach((skill) => {
//       QUESTIONS[skill].forEach((q, i) => {
//         total++;
//         if (answers[`${skill}-${i}`] === q.answer) correct++;
//       });
//     });

//     const percent = (correct / total) * 100;

//     if (percent < 40) return "Beginner";
//     if (percent < 65) return "Intermediate";
//     if (percent < 85) return "Advanced";
//     return "Expert";
//   };

//   const handleSubmit = () => {
//     if (selectedSkills.length === 0) {
//       setError("Please select at least one skill.");
//       return;
//     }

//     if (!allAnswered()) {
//       setError("All questions must be answered. This step is mandatory.");
//       return;
//     }

//     setError("");
//     const level = calculateLevel();
//     setResult(level);

//     // 🔹 store skill result (optional, useful later)
//     localStorage.setItem(
//       "skillAssessment",
//       JSON.stringify({ skills: selectedSkills, level })
//     );

//     // 🔹 redirect to login after short delay
//     setTimeout(() => {
//       navigate("/login", { replace: true });
//     }, 2000);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         background: "linear-gradient(to bottom right, #ffffff, #325cb9)",
//       }}
//     >
//       {/* Top logo */}
//       <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
//         <Box
//           component="img"
//           src={Logo}
//           alt="SkillSwap Logo"
//           sx={{ height: 80, mr: 2 }}
//         />
//       </Box>

//       {/* Centered content */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           p: 2,
//         }}
//       >
//         <Paper
//           sx={{
//             maxWidth: 760,
//             width: "100%",
//             p: 4,
//             borderRadius: 6,
//           }}
//           elevation={6}
//         >
//           <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
//             Skill Assessment
//           </Typography>

//           <Typography color="text.secondary" mb={2}>
//             Select your programming skills and answer all questions to determine
//             your level. This step is mandatory.
//           </Typography>

//           <Divider sx={{ mb: 3 }} />

//           {/* Skill Selection */}
//           <Typography variant="h6" fontWeight={600}>
//             Choose Skills
//           </Typography>

//           <Stack direction="row" spacing={2} mt={1}>
//             {SKILLS.map((skill) => (
//               <FormControlLabel
//                 key={skill}
//                 control={
//                   <Checkbox
//                     checked={selectedSkills.includes(skill)}
//                     onChange={() => toggleSkill(skill)}
//                   />
//                 }
//                 label={skill}
//               />
//             ))}
//           </Stack>

//           {/* Questions */}
//           {selectedSkills.map((skill) => (
//             <Box key={skill} mt={4}>
//               <Typography variant="h6" fontWeight={600}>
//                 {skill}
//               </Typography>

//               {QUESTIONS[skill].map((q, i) => (
//                 <Box key={i} mt={2}>
//                   <Typography fontWeight={500}>
//                     {`${i + 1}. ${q.q}`}
//                   </Typography>
//                   <RadioGroup
//                     value={answers[`${skill}-${i}`] || ""}
//                     onChange={(e) =>
//                       handleAnswer(skill, i, e.target.value)
//                     }
//                   >
//                     {q.options.map((opt) => (
//                       <FormControlLabel
//                         key={opt}
//                         value={opt}
//                         control={<Radio />}
//                         label={opt}
//                       />
//                     ))}
//                   </RadioGroup>
//                 </Box>
//               ))}
//             </Box>
//           ))}

//           {error && (
//             <Alert severity="warning" sx={{ mt: 3 }}>
//               {error}
//             </Alert>
//           )}

//           {result && (
//             <Alert severity="success" sx={{ mt: 3 }}>
//               Your calculated skill level: <strong>{result}</strong>
//               <br />
//               Redirecting to login…
//             </Alert>
//           )}

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 4,
//               backgroundColor: "#1976d2",
//               "&:hover": { backgroundColor: "#1565c0" },
//             }}
//             disabled={selectedSkills.length === 0}
//             onClick={handleSubmit}
//           >
//             Submit & Continue
//           </Button>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }



// // src/pages/user/SkillSetup.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Divider,
//   Alert,
//   CircularProgress,
//   Autocomplete,
//   TextField,
//   Chip,
// } from "@mui/material";
// import Logo from "@assets/skillswap-logo.png";
// import { useAuth } from "@context/AuthContext";
// import { getAllSkills, addUserSkill } from "@services/userSkillService";

// // Quiz questions for different skills
// const QUESTIONS = {
//   JavaScript: [
//     {
//       q: "Which keyword is used to declare a constant?",
//       options: ["var", "let", "const", "static"],
//       answer: "const",
//     },
//     {
//       q: "What does '===' mean in JavaScript?",
//       options: [
//         "Assignment",
//         "Equal value only",
//         "Equal value & type",
//         "Comparison operator",
//       ],
//       answer: "Equal value & type",
//     },
//     {
//       q: "Which method converts JSON to an object?",
//       options: ["JSON.stringify()", "JSON.parse()", "parseJSON()", "toObject()"],
//       answer: "JSON.parse()",
//     },
//   ],
//   Python: [
//     {
//       q: "Which data type is immutable?",
//       options: ["List", "Set", "Tuple", "Dictionary"],
//       answer: "Tuple",
//     },
//     {
//       q: "What keyword is used to define a function?",
//       options: ["func", "define", "def", "lambda"],
//       answer: "def",
//     },
//     {
//       q: "Which symbol is used for comments?",
//       options: ["//", "#", "/* */", "--"],
//       answer: "#",
//     },
//   ],
//   Java: [
//     {
//       q: "Which keyword is used for inheritance?",
//       options: ["inherits", "extends", "implements", "super"],
//       answer: "extends",
//     },
//     {
//       q: "Which method is the entry point of a Java program?",
//       options: ["start()", "run()", "main()", "init()"],
//       answer: "main()",
//     },
//     {
//       q: "Which memory area stores objects?",
//       options: ["Stack", "Register", "Heap", "Method Area"],
//       answer: "Heap",
//     },
//   ],
//   React: [
//     {
//       q: "What is a React Hook?",
//       options: ["A tool", "A function", "A component", "A library"],
//       answer: "A function",
//     },
//     {
//       q: "Which hook manages state?",
//       options: ["useEffect", "useState", "useContext", "useMemo"],
//       answer: "useState",
//     },
//     {
//       q: "What does JSX stand for?",
//       options: ["JavaScript XML", "Java Syntax", "JavaScript Extension", "None"],
//       answer: "JavaScript XML",
//     },
//   ],
//   Guitar: [
//     {
//       q: "How many strings does a standard guitar have?",
//       options: ["4", "5", "6", "7"],
//       answer: "6",
//     },
//     {
//       q: "What is a chord?",
//       options: ["Single note", "Multiple notes together", "A rhythm", "A scale"],
//       answer: "Multiple notes together",
//     },
//     {
//       q: "What is the first string called?",
//       options: ["E", "A", "D", "G"],
//       answer: "E",
//     },
//   ],
//   Cooking: [
//     {
//       q: "At what temperature does water boil?",
//       options: ["90°C", "100°C", "110°C", "120°C"],
//       answer: "100°C",
//     },
//     {
//       q: "What is sautéing?",
//       options: ["Boiling", "Quick frying", "Baking", "Grilling"],
//       answer: "Quick frying",
//     },
//     {
//       q: "Which knife is used for chopping vegetables?",
//       options: ["Paring knife", "Chef's knife", "Bread knife", "Boning knife"],
//       answer: "Chef's knife",
//     },
//   ],
// };

// export default function SkillSetup() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [availableSkills, setAvailableSkills] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch available skills from backend
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const skills = await getAllSkills(false);
//         setAvailableSkills(skills || []);
//       } catch (err) {
//         console.error("Failed to fetch skills:", err);
//         setError("Failed to fetch available skills. Please refresh the page.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchSkills();
//     }
//   }, [user]);

//   const handleAnswer = (qIndex, value) => {
//     setAnswers((prev) => ({ ...prev, [qIndex]: value }));
//   };

//   const allAnswered = () => {
//     if (!selectedSkill) return false;
//     const questions = QUESTIONS[selectedSkill.skillName];
//     if (!questions) return true;
//     return questions.every((_, i) => answers[i]);
//   };

//   const calculateLevel = () => {
//     if (!selectedSkill) return "BEGINNER";

//     const questions = QUESTIONS[selectedSkill.skillName];
//     if (!questions) return "BEGINNER";

//     let correct = 0;
//     let total = questions.length;

//     questions.forEach((q, i) => {
//       if (answers[i] === q.answer) correct++;
//     });

//     const percent = (correct / total) * 100;
//     console.log(`📊 Quiz score: ${correct}/${total} (${percent.toFixed(1)}%)`);

//     if (percent < 40) return "BEGINNER";
//     if (percent < 65) return "INTERMEDIATE";
//     if (percent < 85) return "ADVANCED";
//     return "EXPERT";
//   };

//   const handleSubmit = async () => {
//     if (!user) {
//       setError("User not logged in. Please refresh and try again.");
//       return;
//     }

//     if (!selectedSkill) {
//       setError("Please select a skill.");
//       return;
//     }

//     const questions = QUESTIONS[selectedSkill.skillName];
//     if (questions && !allAnswered()) {
//       setError("Please answer all questions.");
//       return;
//     }

//     setError("");
//     setSubmitting(true);

//     try {
//       const level = calculateLevel();
//       setResult(level);

//       console.log(`📤 Adding skill: ${selectedSkill.skillName} (ID: ${selectedSkill.skillId}) for user ${user.id}`);
//       console.log(`📊 Calculated level: ${level}`);

//       // Add skill to user profile as OFFER
//       await addUserSkill(user.id, {
//         skillId: selectedSkill.skillId,
//         level: level,
//         type: "OFFER",
//       });

//       console.log("✅ Skill added successfully!");

//       // Redirect to listings page after 2 seconds
//       setTimeout(() => {
//         navigate("/user/listings", { replace: true });
//       }, 2000);
//     } catch (err) {
//       console.error("❌ Failed to add skill:", err);
//       const errorMsg =
//         err.response?.data?.message || "Failed to add skill. Please try again.";
//       setError(errorMsg);
//       setResult(null);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!user) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <Alert severity="warning">
//           <Typography>Please login to continue.</Typography>
//           <Button onClick={() => navigate("/login")} sx={{ mt: 2 }}>
//             Go to Login
//           </Button>
//         </Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         background: "linear-gradient(to bottom right, #fff, #325cb9)",
//       }}
//     >
//       {/* Header with Logo */}
//       <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
//         <Box
//           component="img"
//           src={Logo}
//           alt="SkillSwap Logo"
//           sx={{ height: 80, mr: 2 }}
//         />
//       </Box>

//       {/* Main Content */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           p: 2,
//         }}
//       >
//         <Paper sx={{ maxWidth: 760, width: "100%", p: 4, borderRadius: 6 }} elevation={6}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
//             Skill Assessment
//           </Typography>
//           <Typography color="text.secondary" mb={2}>
//             Select a skill you want to offer and take a quick assessment to
//             determine your level.
//           </Typography>
//           <Divider sx={{ mb: 3 }} />

//           {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <>
//               {/* Skill Selection with Autocomplete */}
//               <Typography variant="h6" fontWeight={600} mb={2}>
//                 Choose a Skill
//               </Typography>

//               {availableSkills.length === 0 ? (
//                 <Alert severity="warning" sx={{ mb: 3 }}>
//                   No skills available. Please contact administrator.
//                 </Alert>
//               ) : (
//                 <Autocomplete
//                   options={availableSkills}
//                   getOptionLabel={(option) =>
//                     `${option.skillName} - ${option.category}`
//                   }
//                   value={selectedSkill}
//                   onChange={(e, newValue) => {
//                     setSelectedSkill(newValue);
//                     setAnswers({});
//                     setResult(null);
//                     setError("");
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Search and select a skill"
//                       placeholder="Type to search..."
//                     />
//                   )}
//                   renderOption={(props, option) => (
//                     <li {...props}>
//                       <Box>
//                         <Typography variant="body2" fontWeight="bold">
//                           {option.skillName}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {option.category}
//                           {option.description && ` • ${option.description}`}
//                         </Typography>
//                       </Box>
//                     </li>
//                   )}
//                   disabled={submitting}
//                   sx={{ mb: 3 }}
//                 />
//               )}

//               {/* Selected Skill Info */}
//               {selectedSkill && (
//                 <Box sx={{ mb: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {selectedSkill.skillName}
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                     <Chip label={selectedSkill.category} size="small" />
//                     <Chip label="OFFER" size="small" color="success" />
//                   </Box>
//                   {selectedSkill.description && (
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       {selectedSkill.description}
//                     </Typography>
//                   )}
//                 </Box>
//               )}

//               {/* Quiz Questions */}
//               {selectedSkill && QUESTIONS[selectedSkill.skillName] && (
//                 <Box mt={4}>
//                   <Typography variant="h6" fontWeight={600} color="primary" mb={2}>
//                     Assessment Questions
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" mb={2}>
//                     Answer these questions to determine your skill level
//                   </Typography>

//                   {QUESTIONS[selectedSkill.skillName].map((q, i) => (
//                     <Box
//                       key={i}
//                       mt={2}
//                       p={2}
//                       sx={{ bgcolor: "action.hover", borderRadius: 1 }}
//                     >
//                       <Typography fontWeight={500} mb={1}>
//                         {`${i + 1}. ${q.q}`}
//                       </Typography>
//                       <RadioGroup
//                         value={answers[i] || ""}
//                         onChange={(e) => handleAnswer(i, e.target.value)}
//                       >
//                         {q.options.map((opt) => (
//                           <FormControlLabel
//                             key={opt}
//                             value={opt}
//                             control={<Radio disabled={submitting} />}
//                             label={opt}
//                           />
//                         ))}
//                       </RadioGroup>
//                     </Box>
//                   ))}
//                 </Box>
//               )}

//               {/* Error Alert */}
//               {error && (
//                 <Alert severity="error" sx={{ mt: 3 }}>
//                   {error}
//                 </Alert>
//               )}

//               {/* Success Alert */}
//               {result && (
//                 <Alert severity="success" sx={{ mt: 3 }}>
//                   Great! Your skill level: <strong>{result}</strong>
//                   <br />
//                   Redirecting to your listings...
//                 </Alert>
//               )}

//               {/* Action Buttons */}
//               <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   onClick={() => navigate("/user/listings")}
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{
//                     backgroundColor: "#1976d2",
//                     "&:hover": { backgroundColor: "#1565c0" },
//                   }}
//                   disabled={!selectedSkill || submitting}
//                   onClick={handleSubmit}
//                   startIcon={
//                     submitting && <CircularProgress size={20} color="inherit" />
//                   }
//                 >
//                   {submitting ? "Adding..." : "Submit & Add to Listings"}
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Paper>
//       </Box>
//     </Box>
//   );
// }



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