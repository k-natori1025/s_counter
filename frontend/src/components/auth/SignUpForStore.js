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
import { useState, useEffect } from 'react'
import { API_HOST } from '../../constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/useSnackbar';

const defaultTheme = createTheme();

export default function SignUpForStore(props) {
 
  const [storeName, setStoreName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [capacity, setCapacity] = useState("")
  const [numberOfLockers, setNumberOfLockers] = useState("") 
  const [image, setImage] = useState("")
  const [ description, setDescription ] = useState("")

  const [preview, setPreview] = useState("")
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [store, setStore] = useState({})

  const navigate = useNavigate()

  const { addSnack } = useSnackbar();

  // const handleLogin = (data) => {
  //   console.log("ログイン成功")
  //   setStore(data.store)
  //   window.sessionStorage.setItem(['store_id'],[data.store.id]);
  //   console.log(window.sessionStorage.getItem(['store_id']));
  //   console.log(data.store)
  //   setLoggedInStatus(data.store.store_name)
  // }

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
    axios.post(`${API_HOST}/api/v1/stores`, data, config,
      { withCredentials: true }
    ).then(resp=> {
        console.log('registration response', resp)
        if(resp.data.status === 'created') {
          // 登録完了後にログイン処理
          axios.post(`${API_HOST}/api/v1/login`, 
          {
            store: {
                email: email, 
                password: password
            }
          },
          { withCredentials: true }
          ).then(resp=> {
          console.log('login response', resp)
          if(resp.data.logged_in) {
              handleSuccessfulAuthentication(resp.data)
              // ログイン成功メッセージの表示
              addSnack({ type: "success", message: "ログインしました" });
          } else {
            // ログイン失敗メッセージの表示
            addSnack({ type: "error", message: resp.data.errors });
          }
          }).catch(error=> {
            console.log("registration error", error)
          })
        } else {
          addSnack({ type: "error", message: "新規登録に失敗しました" });
        }
    }).catch(error=> {
        console.log("registration error", error)
    })
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
    formData.append('store[email]', email)
    formData.append('store[password]', password)
    formData.append('store[password_confirmation]', passwordConfirmation)
    formData.append('store[phone_number]', phoneNumber)
    formData.append('store[address]', address)   
    formData.append('store[number_of_lockers]', numberOfLockers) 
    formData.append('store[capacity]', capacity)         
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
                店舗名：<br/>
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
                メールアドレス:<br/>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                パスワード:<br/>
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
                パスワード（確認）:<br/>
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
                電話番号:<br/>
                <TextField
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
                住所:<br/>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="off"
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                ロッカーの数:<br/>
                <TextField
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
                サウナ室の収容人数（サ室が複数ある場合は合計）:<br/>
                <TextField
                  required
                  fullWidth
                  name="capacity"
                  label="Capacity"
                  id="capacity"
                  autoComplete="off"
                  value={capacity}
                  onChange={event => setCapacity(event.target.value)}
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
                <Link href="/loginforstore" variant="body2">
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
