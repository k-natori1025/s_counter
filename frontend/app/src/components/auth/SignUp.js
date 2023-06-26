import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp(props) {
 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const navigate = useNavigate()

  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data)
    navigate("/dashboard")
  }

  const handleSubmit = (event) => {
    console.log("イベント発火")
    event.preventDefault()
    // `${process.env.REACT_APP_API_SERVE}/registrations`
    axios.post('http://localhost:3001/api/v1/registrations', 
      {
        user: {
            name: name,
            email: email, 
            password: password, 
            password_confirmation: passwordConfirmation
        }
      },
      { withCredentials: true }
    ).then(resp=> {
        console.log('registration response', resp)
        if(resp.data.status === 'created') {
            handleSuccessfulAuthentication(resp.data)
        }
    }).catch(error=> {
        console.log("registration error", error)
    })
    event.preventDefault()
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="Name"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </Grid>
                
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="PasswordConfirmation"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  value={passwordConfirmation}
                  onChange={event => setPasswordConfirmation(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
