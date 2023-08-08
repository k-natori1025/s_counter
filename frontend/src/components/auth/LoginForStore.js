import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { API_HOST } from '../../constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CustomizedSnackbars from '../message/CustomizedSnackbars';
import { useSnackbar } from '../../hooks/useSnackbar';

const defaultTheme = createTheme();

export default function LoginForStore(props) {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "ログインに成功しました"
  })

  const handleClose = (event, reason) => {
    if(reason==='clickaway'){
      return;
    }
    setStatus({...status, open: false})
  }

  const { addSnack } = useSnackbar();

  const navigate = useNavigate()

  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data)
    navigate("/dashboard")
  }
 
  const handleSubmit = (event) => {
    console.log("イベント発火")
    event.preventDefault()
    addSnack({ type: "success", message: "Snackbar" });
    
    axios.post(`${API_HOST}/api/v1/login`, 
      {
        store: {
            phone_number: phoneNumber, 
            password: password
        }
      },
      { withCredentials: true }
    ).then(resp=> {
        console.log('login response', resp)
        if(resp.data.logged_in) {
            handleSuccessfulAuthentication(resp.data)
            // ログイン成功メッセージの表示
            addSnack({ type: "success", message: "成功しました" });
        }
    }).catch(error=> {
        console.log("registration error", error)
        // ログイン失敗メッセージの表示
        
    })
    event.preventDefault()
  }
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* フラッシュメッセージ */}
        <CustomizedSnackbars
          open={status.open}
          handleClose={handleClose}
          type={status.type}
          message={status.message}
        />
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
            店舗用Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="email"
              autoComplete="off"
              autoFocus
              value={phoneNumber}
              onChange={event => setPhoneNumber(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)} 
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signupforstore" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}