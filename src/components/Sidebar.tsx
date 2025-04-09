import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';

// Import Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CakeIcon from '@mui/icons-material/Cake';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Orders', icon: <Inventory2Icon />, path: '/orders' },
  { label: 'Bake Schedule', icon: <BakeryDiningIcon />, path: '/schedule' },
  { label: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
  { label: 'Cakes & Templates', icon: <CakeIcon />, path: '/templates' },
  { label: 'Customers', icon: <GroupIcon />, path: '/customers' },
  { label: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
];

const bottomNavItems = [
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { label: 'Sign Out', icon: <LogoutIcon />, path: '/logout' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Logout triggered");
    navigate('/login');
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 1,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.primary.main,
          }}
        >
          <PersonIcon />
        </Avatar>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 500,
            color: theme.palette.primary.contrastText,
          }}
        >
          Bakery Admin
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, pt: 2, px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List sx={{ py: 1 }}>
        {bottomNavItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.label}
              selected={isSelected}
              onClick={item.path === '/logout' ? handleLogout : () => handleNavigation(item.path)}
              sx={{
                mx: 2,
                mb: 0.5,
                borderRadius: 1.5,
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '& .MuiListItemIcon-root': {
                  minWidth: 40,
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar; 