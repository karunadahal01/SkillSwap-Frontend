// // src/components/user/AddSkillAssessment.jsx
// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Box,
//   Alert,
//   CircularProgress,
//   MenuItem,
//   TextField,
//   Stack,
//   Divider,
//   Paper,
//   useTheme,
//   LinearProgress,
//   Chip,
// } from "@mui/material";
// import {
//   CheckCircle,
//   School,
//   EmojiEvents,
//   NavigateBefore,
//   Send,
// } from "@mui/icons-material";
// import { getAllSkills, addUserSkill } from "@services/userSkillService";
// import { useAuth } from "@context/AuthContext";
// import toast from "react-hot-toast";

// // predefined questions for skills
// const QUESTIONS = {
//   JavaScript: [
//     {
//       q: "Which keyword is used to declare a constant?",
//       options: ["var", "let", "const", "static"],
//       answer: "const",
//     },
//     {
//       q: "What does '===' mean in JavaScript?",
//       options: ["Assignment", "Equal value only", "Equal value & type", "Comparison operator"],
//       answer: "Equal value & type",
//     },
//     {
//       q: "Which method converts JSON to an object?",
//       options: ["JSON.stringify()", "JSON.parse()", "parseJSON()", "toObject()"],
//       answer: "JSON.parse()",
//     },
//     {
//       q: "Which function is used to delay execution?",
//       options: ["delay()", "wait()", "setTimeout()", "setInterval()"],
//       answer: "setTimeout()",
//     },
//     {
//       q: "Which of these is NOT a JavaScript data type?",
//       options: ["Undefined", "Boolean", "Float", "Symbol"],
//       answer: "Float",
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
//     {
//       q: "Which keyword is used to handle exceptions?",
//       options: ["try", "catch", "error", "handle"],
//       answer: "try",
//     },
//     {
//       q: "Which function is used to get user input?",
//       options: ["input()", "scan()", "read()", "get()"],
//       answer: "input()",
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
//     {
//       q: "Which keyword is used to create an object?",
//       options: ["class", "new", "object", "this"],
//       answer: "new",
//     },
//     {
//       q: "Which access modifier makes a member accessible everywhere?",
//       options: ["private", "protected", "default", "public"],
//       answer: "public",
//     },
//   ],

//   "C Programming": [
//     {
//       q: "Which function is the entry point of a C program?",
//       options: ["start()", "main()", "init()", "run()"],
//       answer: "main()",
//     },
//     {
//       q: "Which symbol is used to include header files?",
//       options: ["@", "#", "$", "&"],
//       answer: "#",
//     },
//     {
//       q: "Which data type is used to store a character?",
//       options: ["int", "char", "string", "float"],
//       answer: "char",
//     },
//     {
//       q: "Which operator is used to access value via pointer?",
//       options: ["&", "*", "->", "%"],
//       answer: "*",
//     },
//     {
//       q: "Which loop is guaranteed to execute at least once?",
//       options: ["for", "while", "do-while", "foreach"],
//       answer: "do-while",
//     },
//   ],

//   ".NET": [
//     {
//       q: "Which language is primarily used with .NET?",
//       options: ["Java", "Python", "C#", "PHP"],
//       answer: "C#",
//     },
//     {
//       q: "What is the base class of all .NET classes?",
//       options: ["System", "BaseObject", "Object", "System.Object"],
//       answer: "System.Object",
//     },
//     {
//       q: "Which keyword is used for exception handling?",
//       options: ["try", "catch", "handle", "error"],
//       answer: "try",
//     },
//     {
//       q: "Which framework is used to build web apps in .NET?",
//       options: ["Spring", "Django", "ASP.NET", "Laravel"],
//       answer: "ASP.NET",
//     },
//     {
//       q: "Which file extension is used for C# source files?",
//       options: [".java", ".cs", ".net", ".csharp"],
//       answer: ".cs",
//     },
//   ],
// };

// export default function AddSkillAssessment({ open, onClose, onSkillAdded, excludeSkillIds = [] }) {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';
  
//   const [availableSkills, setAvailableSkills] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [step, setStep] = useState(1);

//   useEffect(() => {
//     if (open) {
//       fetchSkills();
//     }
//   }, [open]);

//   const fetchSkills = async () => {
//     try {
//       const skills = await getAllSkills();
//       const filtered = skills.filter(s => !excludeSkillIds.includes(s.skillId));
//       setAvailableSkills(filtered);
//     } catch (err) {
//       console.error("Failed to fetch skills:", err);
//       toast.error("Failed to load available skills");
//     }
//   };

//   const handleSkillSelect = (skill) => {
//     setSelectedSkill(skill);
//     setAnswers({});
//     setError("");
    
//     if (QUESTIONS[skill.skillName]) {
//       setStep(2);
//     } else {
//       setError("Assessment not available for this skill. Please contact admin.");
//     }
//   };

//   const handleAnswer = (qIndex, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [qIndex]: value,
//     }));
//   };

//   const allAnswered = () => {
//     if (!selectedSkill) return false;
//     const questions = QUESTIONS[selectedSkill.skillName] || [];
//     return questions.every((_, i) => answers[i]);
//   };

//   const calculateLevel = () => {
//     const questions = QUESTIONS[selectedSkill.skillName] || []; 
//     let correct = 0;
    
//     questions.forEach((q, i) => {
//       if (answers[i] === q.answer) correct++;
//     });

//     const percent = (correct / questions.length) * 100;

//     if (percent < 40) return "BEGINNER";
//     if (percent < 70) return "INTERMEDIATE";
//     return "ADVANCED";
//   };

//   const handleSubmit = async () => {
//     if (!allAnswered()) {
//       setError("Please answer all questions.");
//       return;
//     }

//     setError("");
//     setSubmitting(true);

//     try {
//       const level = calculateLevel();

//       await addUserSkill(user.id, {
//         skillId: selectedSkill.skillId,
//         level: level,
//         type: "OFFER",
//       });

//       toast.success(`${selectedSkill.skillName} added! Level: ${level}`);
//       handleClose();
//       if (onSkillAdded) onSkillAdded();
//     } catch (err) {
//       console.error("Failed to add skill:", err);
//       toast.error(err.response?.data?.message || "Failed to add skill");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     setSelectedSkill(null);
//     setAnswers({});
//     setError("");
//     setStep(1);
//     onClose();
//   };

//   const handleBack = () => {
//     setStep(1);
//     setSelectedSkill(null);
//     setAnswers({});
//     setError("");
//   };

//   const questions = QUESTIONS[selectedSkill?.skillName] || [];
//   const progress = (Object.keys(answers).length / questions.length) * 100;

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           background: isDark ? '#1e1e2e' : '#ffffff',
//           maxHeight: '90vh',
//         },
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: 3,
//           background: isDark
//             ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
//             : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           position: 'relative',
//           overflow: 'hidden',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             width: '200px',
//             height: '200px',
//             background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
//             borderRadius: '50%',
//             transform: 'translate(30%, -30%)',
//           },
//         }}
//       >
//         <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
//           <Box
//             sx={{
//               width: 48,
//               height: 48,
//               borderRadius: 2,
//               background: 'rgba(255,255,255,0.2)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             {step === 1 ? <School fontSize="large" /> : <EmojiEvents fontSize="large" />}
//           </Box>
//           <Box>
//             <Typography variant="h5" fontWeight={700}>
//               {step === 1 ? "Select Skill for Assessment" : `${selectedSkill?.skillName} Assessment`}
//             </Typography>
//             <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
//               {step === 1 ? "Choose a skill to begin" : `Question ${Object.keys(answers).length} of ${questions.length}`}
//             </Typography>
//           </Box>
//         </Stack>

//         {/* Progress Bar */}
//         {step === 2 && (
//           <Box sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: 6,
//                 borderRadius: 3,
//                 backgroundColor: 'rgba(255,255,255,0.2)',
//                 '& .MuiLinearProgress-bar': {
//                   backgroundColor: 'white',
//                   borderRadius: 3,
//                 },
//               }}
//             />
//           </Box>
//         )}
//       </Box>

//       <DialogContent sx={{ p: 3 }}>
//         {step === 1 ? (
//           <Box>
//             {availableSkills.length === 0 ? (
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 4,
//                   textAlign: 'center',
//                   borderRadius: 2,
//                   background: isDark
//                     ? 'rgba(102, 126, 234, 0.1)'
//                     : 'rgba(102, 126, 234, 0.08)',
//                   border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
//                 }}
//               >
//                 <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                   All Skills Added!
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   You've added all available skills to your profile.
//                 </Typography>
//               </Paper>
//             ) : (
//               <Stack spacing={3}>
//                 <Alert
//                   severity="info"
//                   sx={{
//                     borderRadius: 2,
//                     '& .MuiAlert-icon': {
//                       fontSize: 28,
//                     },
//                   }}
//                 >
//                   <Typography variant="body2" fontWeight={500}>
//                     Take an assessment to determine your proficiency level and add the skill to your profile.
//                   </Typography>
//                 </Alert>

//                 <TextField
//                   select
//                   label="Select Skill"
//                   fullWidth
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 2,
//                     },
//                   }}
//                 >
//                   {availableSkills.map((skill) => (
//                     <MenuItem
//                       key={skill.skillId}
//                       value={skill.skillId}
//                       onClick={() => handleSkillSelect(skill)}
//                       sx={{
//                         py: 1.5,
//                         '&:hover': {
//                           bgcolor: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
//                         },
//                       }}
//                     >
//                       <Stack direction="row" justifyContent="space-between" width="100%">
//                         <Box>
//                           <Typography fontWeight={600}>{skill.skillName}</Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {skill.category}
//                           </Typography>
//                         </Box>
//                         {!QUESTIONS[skill.skillName] && (
//                           <Chip
//                             label="No assessment"
//                             size="small"
//                             color="warning"
//                             sx={{ fontSize: '0.7rem' }}
//                           />
//                         )}
//                       </Stack>
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Stack>
//             )}
//           </Box>
//         ) : (
//           <Box>
//             <Stack spacing={3}>
//               {questions.map((q, i) => (
//                 <Paper
//                   key={i}
//                   elevation={0}
//                   sx={{
//                     p: 3,
//                     borderRadius: 2,
//                     border: `2px solid ${
//                       answers[i]
//                         ? theme.palette.primary.main
//                         : isDark
//                         ? 'rgba(255,255,255,0.1)'
//                         : 'rgba(0,0,0,0.08)'
//                     }`,
//                     background: isDark
//                       ? answers[i]
//                         ? 'rgba(102, 126, 234, 0.1)'
//                         : '#16213e'
//                       : answers[i]
//                       ? 'rgba(102, 126, 234, 0.05)'
//                       : '#f8f9fa',
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   <Stack direction="row" spacing={2} alignItems="flex-start">
//                     <Box
//                       sx={{
//                         width: 32,
//                         height: 32,
//                         borderRadius: '50%',
//                         background: answers[i]
//                           ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//                           : isDark
//                           ? 'rgba(255,255,255,0.1)'
//                           : 'rgba(0,0,0,0.1)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: answers[i] ? 'white' : 'text.secondary',
//                         fontWeight: 700,
//                         fontSize: '0.9rem',
//                         flexShrink: 0,
//                       }}
//                     >
//                       {i + 1}
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography fontWeight={600} sx={{ mb: 2 }}>
//                         {q.q}
//                       </Typography>
//                       <RadioGroup
//                         value={answers[i] || ""}
//                         onChange={(e) => handleAnswer(i, e.target.value)}
//                       >
//                         {q.options.map((opt) => (
//                           <FormControlLabel
//                             key={opt}
//                             value={opt}
//                             control={
//                               <Radio
//                                 sx={{
//                                   '&.Mui-checked': {
//                                     color: 'primary.main',
//                                   },
//                                 }}
//                               />
//                             }
//                             label={opt}
//                             sx={{
//                               ml: 0,
//                               mb: 0.5,
//                               p: 1.5,
//                               borderRadius: 1.5,
//                               transition: 'all 0.2s ease',
//                               '&:hover': {
//                                 bgcolor: isDark
//                                   ? 'rgba(255,255,255,0.05)'
//                                   : 'rgba(0,0,0,0.02)',
//                               },
//                               ...(answers[i] === opt && {
//                                 bgcolor: isDark
//                                   ? 'rgba(102, 126, 234, 0.15)'
//                                   : 'rgba(102, 126, 234, 0.08)',
//                               }),
//                             }}
//                           />
//                         ))}
//                       </RadioGroup>
//                     </Box>
//                   </Stack>
//                 </Paper>
//               ))}
//             </Stack>

//             {error && (
//               <Alert severity="warning" sx={{ mt: 3, borderRadius: 2 }}>
//                 {error}
//               </Alert>
//             )}
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
//         {step === 2 && (
//           <Button
//             onClick={handleBack}
//             disabled={submitting}
//             startIcon={<NavigateBefore />}
//             sx={{
//               borderRadius: 2,
//               fontWeight: 600,
//               textTransform: 'none',
//             }}
//           >
//             Back
//           </Button>
//         )}
//         <Box sx={{ flex: 1 }} />
//         <Button
//           onClick={handleClose}
//           disabled={submitting}
//           sx={{
//             borderRadius: 2,
//             fontWeight: 600,
//             textTransform: 'none',
//           }}
//         >
//           Cancel
//         </Button>
//         {step === 2 && (
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={!allAnswered() || submitting}
//             startIcon={submitting ? <CircularProgress size={20} /> : <Send />}
//             sx={{
//               borderRadius: 2,
//               fontWeight: 600,
//               textTransform: 'none',
//               px: 3,
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
//               },
//             }}
//           >
//             {submitting ? 'Submitting...' : 'Submit Assessment'}
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }






// src/components/user/AddSkillAssessment.jsx
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
  Paper,
  useTheme,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  CheckCircle,
  School,
  EmojiEvents,
  NavigateBefore,
  Send,
} from "@mui/icons-material";
import { getAllSkills, addUserSkill } from "@services/userSkillService";
import { useAuth } from "@context/AuthContext";
import toast from "react-hot-toast";

// predefined questions for skills
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
    {
      q: "Which function is used to delay execution?",
      options: ["delay()", "wait()", "setTimeout()", "setInterval()"],
      answer: "setTimeout()",
    },
    {
      q: "Which of these is NOT a JavaScript data type?",
      options: ["Undefined", "Boolean", "Float", "Symbol"],
      answer: "Float",
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
    {
      q: "Which keyword is used to handle exceptions?",
      options: ["try", "catch", "error", "handle"],
      answer: "try",
    },
    {
      q: "Which function is used to get user input?",
      options: ["input()", "scan()", "read()", "get()"],
      answer: "input()",
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
    {
      q: "Which keyword is used to create an object?",
      options: ["class", "new", "object", "this"],
      answer: "new",
    },
    {
      q: "Which access modifier makes a member accessible everywhere?",
      options: ["private", "protected", "default", "public"],
      answer: "public",
    },
  ],

  "C Programming": [
    {
      q: "Which function is the entry point of a C program?",
      options: ["start()", "main()", "init()", "run()"],
      answer: "main()",
    },
    {
      q: "Which symbol is used to include header files?",
      options: ["@", "#", "$", "&"],
      answer: "#",
    },
    {
      q: "Which data type is used to store a character?",
      options: ["int", "char", "string", "float"],
      answer: "char",
    },
    {
      q: "Which operator is used to access value via pointer?",
      options: ["&", "*", "->", "%"],
      answer: "*",
    },
    {
      q: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "foreach"],
      answer: "do-while",
    },
  ],

  ".NET": [
    {
      q: "Which language is primarily used with .NET?",
      options: ["Java", "Python", "C#", "PHP"],
      answer: "C#",
    },
    {
      q: "What is the base class of all .NET classes?",
      options: ["System", "BaseObject", "Object", "System.Object"],
      answer: "System.Object",
    },
    {
      q: "Which keyword is used for exception handling?",
      options: ["try", "catch", "handle", "error"],
      answer: "try",
    },
    {
      q: "Which framework is used to build web apps in .NET?",
      options: ["Spring", "Django", "ASP.NET", "Laravel"],
      answer: "ASP.NET",
    },
    {
      q: "Which file extension is used for C# source files?",
      options: [".java", ".cs", ".net", ".csharp"],
      answer: ".cs",
    },
  ],
};

export default function AddSkillAssessment({ open, onClose, onSkillAdded, excludeSkillIds = [] }) {
  const { user } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

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
    return "ADVANCED";
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

  const questions = QUESTIONS[selectedSkill?.skillName] || [];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 2, md: 3 },
          background: isDark ? '#1e1e2e' : '#ffffff',
          maxHeight: '90vh',
          m: { xs: 2, sm: 3 },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 5 },
          background: isDark
            ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '150px', sm: '200px' },
            height: { xs: '150px', sm: '200px' },
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }} sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: { xs: 44, sm: 48 },
              height: { xs: 44, sm: 48 },
              borderRadius: 2,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {step === 1 ? <School fontSize="large" sx={{ fontSize: { xs: 28, sm: 32 } }} /> : <EmojiEvents fontSize="large" sx={{ fontSize: { xs: 28, sm: 32 } }} />}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5" fontWeight={700} noWrap sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
              {step === 1 ? "Select Skill for Assessment" : `${selectedSkill?.skillName} Assessment`}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: { xs: 0.25, sm: 0.5 }, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              {step === 1 ? "Choose a skill to begin" : `Question ${Object.keys(answers).length} of ${questions.length}`}
            </Typography>
          </Box>
        </Stack>

        {/* Progress Bar */}
        {step === 2 && (
          <Box sx={{ mt: { xs: 1.5, sm: 2 }, position: 'relative', zIndex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: { xs: 5, sm: 6 },
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white',
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}
      </Box>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        {step === 1 ? (
          <Box>
            {availableSkills.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, sm: 4 },
                  textAlign: 'center',
                  borderRadius: 2,
                  background: isDark
                    ? 'rgba(102, 126, 234, 0.1)'
                    : 'rgba(102, 126, 234, 0.08)',
                  border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
                }}
              >
                <CheckCircle sx={{ fontSize: { xs: 40, sm: 48 }, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}>
                  All Skills Added!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                  You've added all available skills to your profile.
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={{ xs: 2.5, sm: 3 }}>
                <Alert
                  severity="info"
                  sx={{
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: { xs: 24, sm: 28 },
                    },
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  }}
                >
                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                    Take an assessment to determine your proficiency level and add the skill to your profile.
                  </Typography>
                </Alert>

                <TextField
                  select
                  label="Select Skill"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    },
                  }}
                >
                  {availableSkills.map((skill) => (
                    <MenuItem
                      key={skill.skillId}
                      value={skill.skillId}
                      onClick={() => handleSkillSelect(skill)}
                      sx={{
                        py: { xs: 1.2, sm: 1.5 },
                        '&:hover': {
                          bgcolor: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.05)',
                        },
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                        <Box>
                          <Typography fontWeight={600} sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>{skill.skillName}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                            {skill.category}
                          </Typography>
                        </Box>
                        {!QUESTIONS[skill.skillName] && (
                          <Chip
                            label="No assessment"
                            size="small"
                            color="warning"
                            sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" } }}
                          />
                        )}
                      </Stack>
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}
          </Box>
        ) : (
          <Box>
            <Stack spacing={{ xs: 2.5, sm: 3 }}>
              {questions.map((q, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 2,
                    border: `2px solid ${
                      answers[i]
                        ? theme.palette.primary.main
                        : isDark
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(0,0,0,0.08)'
                    }`,
                    background: isDark
                      ? answers[i]
                        ? 'rgba(102, 126, 234, 0.1)'
                        : '#16213e'
                      : answers[i]
                      ? 'rgba(102, 126, 234, 0.05)'
                      : '#f8f9fa',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="flex-start">
                    <Box
                      sx={{
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        borderRadius: '50%',
                        background: answers[i]
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : isDark
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: answers[i] ? 'white' : 'text.secondary',
                        fontWeight: 700,
                        fontSize: { xs: "0.8125rem", sm: "0.9rem" },
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={600} sx={{ mb: { xs: 1.5, sm: 2 }, fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
                        {q.q}
                      </Typography>
                      <RadioGroup
                        value={answers[i] || ""}
                        onChange={(e) => handleAnswer(i, e.target.value)}
                      >
                        {q.options.map((opt) => (
                          <FormControlLabel
                            key={opt}
                            value={opt}
                            control={
                              <Radio
                                size="small"
                                sx={{
                                  '&.Mui-checked': {
                                    color: 'primary.main',
                                  },
                                }}
                              />
                            }
                            label={<Typography sx={{ fontSize: { xs: "0.875rem", sm: "0.9375rem" } }}>{opt}</Typography>}
                            sx={{
                              ml: 0,
                              mb: 0.5,
                              p: { xs: 1.2, sm: 1.5 },
                              borderRadius: 1.5,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: isDark
                                  ? 'rgba(255,255,255,0.05)'
                                  : 'rgba(0,0,0,0.02)',
                              },
                              ...(answers[i] === opt && {
                                bgcolor: isDark
                                  ? 'rgba(102, 126, 234, 0.15)'
                                  : 'rgba(102, 126, 234, 0.08)',
                              }),
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            {error && (
              <Alert severity="warning" sx={{ mt: { xs: 2.5, sm: 3 }, borderRadius: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                {error}
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2.5, sm: 3 }, pt: 2, gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
        {step === 2 && (
          <Button
            onClick={handleBack}
            disabled={submitting}
            startIcon={<NavigateBefore />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              px: { xs: 2, sm: 2.5 },
            }}
          >
            Back
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        <Button
          onClick={handleClose}
          disabled={submitting}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: "0.8125rem", sm: "0.875rem" },
            px: { xs: 2, sm: 2.5 },
          }}
        >
          Cancel
        </Button>
        {step === 2 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!allAnswered() || submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <Send />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              px: { xs: 2.5, sm: 3 },
              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
              },
            }}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}