import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log('📝 Attempting sign up with email:', email);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        console.error('❌ Sign up error:', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ Sign up successful for user:', data.user.email);
        console.log('👤 User name:', name);
        console.log('📧 Email confirmation status:', data.user.confirmed_at ? 'Confirmed' : 'Pending');
        
        if (data.user.confirmed_at) {
          console.log('🔄 User already confirmed, redirecting to signin...');
        } else {
          console.log('📨 Confirmation email sent, user should check their inbox');
        }

        setSuccess(true);
        // Redirect after successful signup with credentials
        setTimeout(() => {
          console.log('⏱️ Redirect timeout completed, navigating to signin with credentials');
          navigate('/signin', { 
            state: { 
              email, 
              password,
              name,
              message: 'Account created successfully! Please sign in.'
            } 
          });
        }, 2000);
      } else {
        console.warn('⚠️ Sign up response contained no user data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign up';
      console.error('❌ Sign up error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('🔄 Sign up attempt completed');
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
        onSubmit={handleSignUp}
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
            Sign Up
          </Typography>

          <TextField
            required
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!error}
          />

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
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>

          <Button
            variant="text"
            onClick={() => navigate('/signin')}
          >
            Already have an account? Sign In
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully signed up! Redirecting to sign in...
        </Alert>
      </Snackbar>
    </Box>
  );
}; 