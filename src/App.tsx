import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline'; // Ensures consistent baseline styles
import { ThemeProvider } from '@mui/material/styles'; // Re-import if needed for global theme
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import OrderToOven from './pages/OrderToOven'; // Assuming this is one of your main pages
import Settings from './pages/Settings';
import { createCustomTheme, type CustomPalette } from './theme/theme';
import { supabase } from './lib/supabaseClient';
// Import other page components as needed
// import Dashboard from './pages/Dashboard'; 

// Assuming muiTheme is defined here or imported if needed globally
// import { muiTheme } from './themeConfig'; // Example import

const drawerWidth = 260; // Needs to match the Sidebar's width

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      return createCustomTheme(JSON.parse(savedTheme));
    }
    // Default theme
    return createCustomTheme({ primary: '#FF6B81', accent: '#FFC3D1' });
  });

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out, cleaning up...');
        // You can add any cleanup here if needed
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleThemeChange = (palette: CustomPalette) => {
    const newTheme = createCustomTheme(palette);
    setTheme(newTheme);
    localStorage.setItem('customTheme', JSON.stringify(palette));
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected layout wrapper */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Box sx={{ display: 'flex' }}>
                    <CssBaseline /> {/* Apply baseline styles */} 
                    <Sidebar />
                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        p: 3,
                        width: '100%',
                        marginLeft: { xs: 0, md: `${drawerWidth}px` },
                        transition: 'margin 0.2s ease-out',
                      }}
                    >
                      <Outlet />
                    </Box>
                  </Box>
                </ProtectedRoute>
              }
            >
              {/* Nested protected routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="OrderToBake" element={<Dashboard />} />
              <Route path="orders" element={<OrderToOven />} />
              <Route path="settings" element={<Settings onThemeChange={handleThemeChange} />} />
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Catch all route - redirect to signin */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
