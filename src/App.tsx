import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline'; // Ensures consistent baseline styles
import { ThemeProvider } from '@mui/material/styles'; // Re-import if needed for global theme

import Sidebar from './components/Sidebar';
import OrderToOven from './pages/OrderToOven'; // Assuming this is one of your main pages
import Dashboard from './pages/Dashboard';
// Import other page components as needed
// import Dashboard from './pages/Dashboard'; 

// Assuming muiTheme is defined here or imported if needed globally
// import { muiTheme } from './themeConfig'; // Example import

const drawerWidth = 260; // Needs to match the Sidebar's width

function App() {
  console.log('App rendered');

  // Basic placeholder theme if not defined elsewhere
  const theme = {}; 

  return (
    // <ThemeProvider theme={muiTheme}> // Uncomment if using a global theme provider
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline /> {/* Apply baseline styles */} 
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3, // Add padding to the main content area
            width: `calc(100% - ${drawerWidth}px)`,
            minHeight: '100vh', // Ensure content area takes full height
            backgroundColor: '#FDFDFD' // Optional: slightly different bg for content
          }}
        >
          {/* Add Toolbar spacer if using AppBar later, otherwise adjust top padding */}
          {/* <Toolbar /> */}
          <Routes>
            {/* Define routes for your pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrderToOven />} />
            {/* Add other routes here */}
            {/* Example:
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<BakeSchedule />} /> 
            <Route path="/calendar" element={<CalendarPage />} />
            ... etc
            */}

            {/* Redirect base path to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
            {/* Optionally add a 404 Not Found route */} 
            {/* <Route path="*" element={<NotFound />} /> */} 

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
    // </ThemeProvider>
  );
}

export default App;
