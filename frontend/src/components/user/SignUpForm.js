import React, { useState, useEffect } from 'react';
import { validateEmail, validatePassword } from '../auth/validators';
import { TextField, Button, Paper, Box, Typography, CircularProgress, Container } from '@mui/material';

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Invalid password');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch('/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, username: username }),
      });

      if (response.status === 201) {
        const data = await response.json();
        window.localStorage.setItem('token', data.token);
        navigate('/planner');
      } else {
        navigate('/signup');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while signing up.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    if (email.trim() !== '') {
      if (!validateEmail(email)) {
        setEmailError('Invalid email');
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError(null); 
    }
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordError(null);
    if (!validatePassword(password)) {
      setPasswordError('Invalid password'); 
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', padding: 3, justifyContent: 'center', height: '100vh' }}>
    <Paper sx={{ 
        width: { xs: '100%', md: 300 }, 
        height: { xs: '35%', md: 350 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Sign Up</Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ 
        mt: 1,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'  }}>
      <TextField
        label="Email"
        id='email'
        value={email}
        error={!!emailError}
        helperText={emailError}
        onChange={(e) => handleEmailChange(e.target.value)}
        required
      />

      <TextField
        label="Username"
        id='username'
        value={username}
        onChange={handleUsernameChange}
        fullWidth
        required
      />

      <TextField
        label="Password" 
        id='password'
        type="password"
        value={password}
        error={!!passwordError}
        helperText={passwordError}
        onChange={(e) => handlePasswordChange(e.target.value)} 
        required 
      />

      <TextField
        label="Confirm Password"
        id='confirmpassword'
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required
      />
        <Button type="submit" id='submit' variant="contained" color="primary" sx={{mt: 2 }}>
          Sign Up
        </Button>
        {isLoading && <CircularProgress sx={{ mt: 2 }} />}
      </Box>
    </Paper>
    </Container>
  );
};

export default SignUpForm;