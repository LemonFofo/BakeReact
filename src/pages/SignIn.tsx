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
  Divider,
  useTheme,
} from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import images from '../utils/images';

export const SignIn = () => {
  const theme = useTheme();
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
        bgcolor: 'background.default',
      }}
    >
      {/* Left side - Form */}
      <Box
        sx={{
          flex: 1,
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '600px',
        }}
      >
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <img src={images.logo} alt="Logo" style={{ height: '60px', width: 'auto' }} />
        </Box>
        
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 4, 
            fontWeight: 600,
            color: theme.palette.primary.main
          }}
        >
          Welcome Back
        </Typography>

        <Box component="form" onSubmit={handleSignIn}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.palette.primary.main,
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.palette.primary.main,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                borderRadius: 2,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center', my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Or continue with
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: 'transparent',
                  },
                }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: 'transparent',
                  },
                }}
              >
                Sign in with Apple
              </Button>
            </Stack>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Typography
                  component="span"
                  onClick={() => navigate('/signup')}
                  sx={{
                    color: theme.palette.primary.main,
                    cursor: 'pointer',
                    fontWeight: 500,
                    '&:hover': { 
                      textDecoration: 'underline',
                      color: theme.palette.primary.dark,
                    },
                  }}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Right side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: `url(${images.chef})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully signed in! Redirecting...
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 