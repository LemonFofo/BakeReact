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
  Checkbox,
  FormControlLabel,
  Divider,
  useTheme,
} from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import images from '../utils/images';

export const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
          Get Started Now
        </Typography>

        <Box component="form" onSubmit={handleSignUp}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

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

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the Terms of Service and Privacy Policy
                </Typography>
              }
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !agreeToTerms}
              sx={{
                borderRadius: 2,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
                '&.Mui-disabled': {
                  bgcolor: theme.palette.action.disabledBackground,
                },
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
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
                Sign up with Google
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
                Sign up with Apple
              </Button>
            </Stack>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Typography
                  component="span"
                  onClick={() => navigate('/signin')}
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
                  Sign In
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
          Account created successfully! Redirecting...
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