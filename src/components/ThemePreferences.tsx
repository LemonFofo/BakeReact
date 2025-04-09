import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { themePalettes, type CustomPalette } from '../theme/theme';

interface ThemePreferencesProps {
  applyTheme: (palette: CustomPalette) => void;
}

const ThemePreferences: React.FC<ThemePreferencesProps> = ({ applyTheme }) => {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        overflowX: 'auto',
        py: 1,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.15)',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.25)',
          },
        },
      }}
    >
      {themePalettes.map((palette) => (
        <Tooltip key={palette.name} title={palette.name} arrow>
          <Box
            onClick={() => applyTheme(palette)}
            sx={{
              display: 'flex',
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              border: '2px solid',
              borderColor: 'divider',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              },
            }}
          >
            <Box sx={{ width: 32, height: 48, bgcolor: palette.primary }} />
            <Box sx={{ width: 32, height: 48, bgcolor: palette.accent }} />
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default ThemePreferences;
