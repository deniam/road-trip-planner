import { useState, useEffect } from 'react';
import { validateEmail, validatePassword } from './validators';

import { TextField, Button, Paper, Box, Fade, CircularProgress, Alert, Container } from '@mui/material';
const LogInForm = ({ navigate }) => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/planner');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      setServerError('Invalid email or password');
      navigate('/login')
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/planner');
    }
    setLoading(false);
  }

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


  return (
    <Container maxWidth="sm" sx={{ display: 'flex', padding: 3, justifyContent: 'center', height: '100vh' }}>
      <Fade in={true} timeout={700}>
        <Paper sx={{ width: { xs: '100%', md: 300 }, height: { xs: '25%', md: 200 }, padding: 3 }}>
          {emailError && (
            <Alert severity="error">{emailError}</Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiInputLabel-root': {
                  textAlign: 'center',
                },
              }}>
            <TextField
              label="Email"
              id='email'
              value={email}
              
              onChange={(e) => handleEmailChange(e.target.value)}
              error={!!emailError}
            />
            <TextField
              label="Password"
              id='password'
              type="password"
              value={password}
              
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={!!passwordError}
            />

            <Button
              type="submit"
              id='submit'
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
              }}
            >
              Submit
            </Button>

            {loading && (
              <CircularProgress sx={{ mt: 2 }} />
            )}
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}

export default LogInForm;