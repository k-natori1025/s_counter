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

export default function SignUpForStore(props) {
 
  const [storeName, setStoreName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  // const [address, setAdress] = useState("")
  const [numberOfLockers, setNumberOfLockers] = useState("") 
  const [image, setImage] = useState("")
  const [ description, setDescription ] = useState("")

  const [preview, setPreview] = useState("")
  const navigate = useNavigate()

  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data)
    navigate("/dashboard")
  }

  const handleSubmit = async (event) => {
    console.log("イベント発火")
    event.preventDefault()
    const data = await createFormData()

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post('http://localhost:3001/api/v1/stores', data, config,
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

  const onFileInputChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setPreview(window.URL.createObjectURL(file))
    const imageName = e.target.files[0].name
    console.log(imageName)
    setImage(file)
  }

  const createFormData = () => {    
    const formData = new FormData()    
    formData.append('store[store_name]', storeName)
    formData.append('store[phone_number]', phoneNumber)
    formData.append('store[password]', password)
    formData.append('store[password_confirmation]', passwordConfirmation)   
    formData.append('store[number_of_lockers]', numberOfLockers)          
    formData.append('store[image]', image)
    formData.append('store[description]', description)
    console.log(formData)
    return formData
  }

  return (<>
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
            店舗情報登録
          </Typography>
          <Box component="form" onSubmit={handleSubmit} encType='multipart/form_data' sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="Name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={storeName}
                  onChange={event => setStoreName(event.target.value)}
                />
              </Grid>
                
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={event => setPhoneNumber(event.target.value)}
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
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  value={passwordConfirmation}
                  onChange={event => setPasswordConfirmation(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="numberofLockers"
                  label="Number of Lockers"
                  id="numberOfLockers"
                  autoComplete="off"
                  value={numberOfLockers}
                  onChange={event => setNumberOfLockers(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <p>お店のイメージ画像を選んでください</p>
                <input type="file" name="file" accept="image/*" onChange={onFileInputChange} /><br/>
                {preview?
                  <img src={preview} alt="preview" style={{width: "150px", height: "100px"}} />
                  : null}
              </Grid>
              <Grid item xs={12}>
                <Box>
                  施設説明: <br/>
                  <TextField
                    multiline
                    fullWidth
                    rows={4}
                    name="description"
                    label="description"
                    value={description}
                    onChange={ event => setDescription(event.target.value)} />
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              お店を登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/loginforstore" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </>);
}
