import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { supabase } from '../lib/supabaseClient';

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get credentials from location state if they exist
  const signUpEmail = (location.state as { email?: string })?.email || '';
  const signUpPassword = (location.state as { password?: string })?.password || '';
  const signUpMessage = (location.state as { message?: string })?.message;

  const [email, setEmail] = useState(signUpEmail);
  const [password, setPassword] = useState(signUpPassword);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Show success message from signup if it exists
  useEffect(() => {
    if (signUpMessage) {
      setSuccess(true);
    }
  }, [signUpMessage]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log('🔐 Attempting sign in with email:', email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Sign in error:', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ Sign in successful for user:', data.user.email);
        setSuccess(true);
        
        // Navigate after a brief delay to show success message
        setTimeout(() => {
            console.log('Navigating to dashboard!!!!!!!!!!!');
          navigate('/dashboard', { replace: true });
        }, 1000);
      } else {
        console.warn('⚠️ Sign in response contained no user data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in';
      console.error('❌ Sign in error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('🔄 Sign in attempt completed');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 1,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign In
          </Typography>

          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
          />

          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Button
            variant="text"
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {signUpMessage || 'Successfully signed in! Redirecting...'}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 