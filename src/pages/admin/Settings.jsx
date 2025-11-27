// src/pages/admin/Settings.jsx
import { useThemeMode } from '@context/ThemeModeContext';
import { Switch, FormControlLabel, Card, CardContent, Typography } from '@mui/material';

export default function Settings() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto shadow-lg rounded-2xl">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Appearance Settings
          </Typography>
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
        </CardContent>
      </Card>
    </div>
  );
}
