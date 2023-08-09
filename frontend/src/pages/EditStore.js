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
import { useState, useEffect } from 'react'
import { API_HOST } from '../constants';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function EditStore() {

  const [stores, setStores] = useState([])
  const [store, setStore] = useState({})

  const [storeName, setStoreName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [address, setAddress] = useState()
  const [capacity, setCapacity] = useState()
  const [numberOfLockers, setNumberOfLockers] = useState() 
  const [image, setImage] = useState("")
  const [ description, setDescription ] = useState()

  const [preview, setPreview] = useState()
  const navigate = useNavigate()

  const checkLoginStatus = () => {
    axios.get(`${API_HOST}/api/v1/logged_in`, 
      { withCredentials: true }
    ) 
      .then(resp => {
        if(resp.data.logged_in) {
          console.log("ログイン中の店舗")
          console.log(resp.data)
          setStore(resp.data.store)
          setStoreName(resp.data.store.store_name)
          setEmail(resp.data.store.email)
          setPhoneNumber(resp.data.store.phone_number)
          setAddress(resp.data.store.address)
          setCapacity(resp.data.store.capacity)
          setNumberOfLockers(resp.data.store.number_of_lockers)
          // setImage(resp.data.store.image)
          setDescription(resp.data.store.description)
          setPreview(resp.data.store.image.url)
        } 
    }).catch(error => {
        console.log("ログインエラーです", error)
    })
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/stores`)
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log(newList)
      setStores(newList)
    })
  }, [])

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

    axios.patch(`${API_HOST}/api/v1/stores/${store.id}`, data, config,
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
    // イメージが空であれば送らない         
    image && formData.append('store[image]', image)
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
