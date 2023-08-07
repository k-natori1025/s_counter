import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { API_HOST } from '../constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function EditStore(props) {

  const [storeName, setStoreName] = useState(props.store.store_name)
  const [email, setEmail] = useState(props.store.email)
  const [phoneNumber, setPhoneNumber] = useState(props.store.phone_number)
  const [address, setAddress] = useState(props.store.address)
  const [capacity, setCapacity] = useState(props.store.capacity)
  const [numberOfLockers, setNumberOfLockers] = useState(props.store.number_of_lockers) 
  const [image, setImage] = useState("")
  const [ description, setDescription ] = useState(props.store.description)

  const [preview, setPreview] = useState(props.store.image.url)
  const navigate = useNavigate()

  const goBackToDashboard = () => {
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

    axios.patch(`${API_HOST}/api/v1/stores/${props.store.id}`, data, config,
      { withCredentials: true }
    ).then(resp=> {
        console.log('update response', resp)
        if(resp.data.status === 'updated') {
            navigate('/dashboard')
        }
    }).catch(error=> {
        console.log("update error", error)
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
    formData.append('store[email]', email)
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
      <Container component="main" maxWidth="xs" sx={{mb:10}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00e676' }}>
            <EditOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            店舗情報編集
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
                <p>新しいお店のイメージ画像を選んでください</p>
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
              編集内容を登録する
            </Button>
            <Button 
            style={{ color: "white", backgroundColor: "#f44336", width: "100%", height: "100%" }}
            onClick={goBackToDashboard}
          >
            キャンセル
          </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  </>)
}

export default EditStore
