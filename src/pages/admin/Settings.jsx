// src/pages/admin/Settings.jsx
import { useThemeMode } from '@context/ThemeModeContext';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Settings() {
  const { mode, toggleColorMode } = useThemeMode();

  const [appName, setAppName] = useState("SkillSwap");

  // password fields
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");

  const handlePasswordChange = () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      setError("All fields are required.");
      return;
    }
    if (newPwd.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setError("New passwords do not match.");
      return;
    }

    setError("");
    alert("Password change request submitted!");
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto shadow-lg rounded-2xl">
        <CardContent>

          {/* MAIN SETTINGS TITLE */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Settings
          </Typography>

          <Divider className="mb-4" />

          {/* APPEARANCE SETTINGS */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Appearance
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={toggleColorMode}
                    color="primary"
                  />
                }
                label={`Dark Mode: ${mode === 'dark' ? 'On' : 'Off'}`}
              />
            </AccordionDetails>
          </Accordion>

          {/* APP DETAILS SETTINGS */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Application Info
              </Typography>
            </AccordionSummary>

            <AccordionDetails className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Application Name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />

              <Button variant="contained" color="primary" sx={{margin: 2}}>
                Save Changes
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* CHANGE PASSWORD */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Change Password
              </Typography>
            </AccordionSummary>

            <AccordionDetails className="flex flex-col gap-4">

              <TextField
                fullWidth
                label="Current Password"
                type={showCurrent ? "text" : "password"}
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCurrent(!showCurrent)}>
                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{margin: 2}}
              />

              <TextField
                fullWidth
                label="New Password"
                type={showNew ? "text" : "password"}
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNew(!showNew)}>
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{margin: 2}}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirm ? "text" : "password"}
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{margin: 2}}
              />

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                color="success"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            </AccordionDetails>
          </Accordion>

        </CardContent>
      </Card>
    </div>
  );
}
