import { createTheme, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const themePalettes = [
  { name: 'Classic Pink', primary: '#FF6B81', accent: '#FFC3D1' },
  { name: 'Vanilla Cream', primary: '#F5CBA7', accent: '#E59866' },
  { name: 'Minty Fresh', primary: '#58D68D', accent: '#82E0AA' },
  { name: 'Ocean Blue', primary: '#3498DB', accent: '#85C1E9' },
  { name: 'Lavender Dream', primary: '#9B59B6', accent: '#D7BDE2' },
] as const;

export interface CustomPalette {
  primary: string;
  accent: string;
}

export const createCustomTheme = (palette: CustomPalette): Theme => {
  // Create very light versions of the primary color for backgrounds
  const veryLightPrimary = alpha(palette.primary, 0.05);

  return createTheme({
    palette: {
      primary: {
        main: palette.primary,
        light: palette.accent,
      },
      secondary: {
        main: palette.accent,
      },
      background: {
        default: veryLightPrimary,
        paper: '#FFFFFF',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
          contained: {
            backgroundColor: palette.primary,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: palette.accent,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.primary,
            borderRight: 'none',
            color: '#FFFFFF',
            '& .MuiListItemButton-root': {
              marginBottom: '4px',
              marginLeft: '8px',
              marginRight: '8px',
              borderRadius: 8,
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: palette.accent,
                '&:hover': {
                  backgroundColor: palette.accent,
                },
              },
              '& .MuiListItemIcon-root': {
                color: palette.primary,
              },
              '& .MuiListItemText-primary': {
                color: 'black',
              },
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom: '4px',
            '&.Mui-selected': {
              backgroundColor: palette.accent,
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: palette.accent,
              },
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            color: palette.primary,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: alpha(palette.primary, 0.1),
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h4: {
        fontWeight: 600,
        color: palette.primary,
      },
      h6: {
        fontWeight: 500,
      },
    },
  });
}; 