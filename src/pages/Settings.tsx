import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ThemePreferences from '../components/ThemePreferences';
import { type CustomPalette } from '../theme/theme';

interface SettingsProps {
  onThemeChange: (palette: CustomPalette) => void;
}

const Settings: React.FC<SettingsProps> = ({ onThemeChange }) => {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Profile Overview */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56 }}>F</Avatar>
          <Box>
            <Typography variant="h6">Fer's Bakery</Typography>
            <Typography variant="body2" color="text.secondary">Administrator</Typography>
            <Typography variant="body2" color="text.secondary">fer@wonderwithwander.com</Typography>
            <Typography variant="body2" color="text.secondary">Optional phone</Typography>
          </Box>
        </Box>
        <Button variant="outlined" disabled sx={{ mt: 2 }}>Edit Account</Button>
      </Paper>

      {/* Theme Picker Section */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Theme Preferences</Typography>
        <ThemePreferences applyTheme={onThemeChange} />
      </Paper>
    </Box>
  );
};

export default Settings; 