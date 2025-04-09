import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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

const drawerWidth = 260;

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
    { label: 'Sign Out', icon: <LogoutIcon />, path: '/logout' }, // Adjust path as needed
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Placeholder function for logout if needed
  const handleLogout = () => {
    console.log("Logout triggered");
    // Add actual logout logic here
    navigate('/login'); // Example redirect after logout
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#FAF8F6', // Light background
            borderRight: 'none', // Remove default border
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px', // Soft shadow
            fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
        <Avatar
          alt="Baker Avatar" 
          src="/placeholder-avatar.png" // Replace with actual path or remove src for default icon
          sx={{ width: 80, height: 80, mb: 1.5, boxShadow: 3 }} 
        />
        <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
          Fer's Bakery
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Administrator
        </Typography>
      </Box>

      <Divider sx={{ mx: 2 }} />

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => {
            const isSelected = location.pathname.startsWith(item.path);
            return (
              <ListItemButton
                key={item.label}
                selected={isSelected}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 2, // Horizontal margin
                  mb: 0.5, // Margin bottom between items
                  borderRadius: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 107, 107, 0.1)', // Use primary color with opacity
                    '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.15)',
                    },
                    '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                    },
                    '& .MuiListItemText-primary': {
                        fontWeight: 'medium', // Make selected text bold
                        color: 'primary.main',
                    },
                  },
                  '& .MuiListItemIcon-root': {
                    minWidth: 40, // Adjust icon spacing
                    color: 'text.secondary', // Default icon color
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Bottom Navigation Items (Settings, Logout) */}
      <List sx={{ py: 1 }}>
        {bottomNavItems.map((item) => {
            const isSelected = location.pathname.startsWith(item.path);
            return (
              <ListItemButton
                key={item.label}
                selected={isSelected}
                onClick={item.path === '/logout' ? handleLogout : () => handleNavigation(item.path)}
                sx={{
                  mx: 2,
                  mb: 0.5,
                  borderRadius: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: item.label === 'Sign Out' ? 'error.main' : 'text.primary',
                    },
                  },
                  '& .MuiListItemIcon-root': {
                    minWidth: 40,
                    color: item.label === 'Sign Out' ? 'error.main' : 'text.secondary',
                  },
                   '& .MuiListItemText-primary': {
                        color: item.label === 'Sign Out' ? 'error.main' : 'inherit',
                    },
                }}
              >
                <ListItemIcon>
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