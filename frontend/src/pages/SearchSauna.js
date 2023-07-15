import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Box, Typography, TextField, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material'
import { API_HOST } from '../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchSauna() {

  const [ stores, setStores ] = useState([])
  const [ searchName, setSearchName ] = useState()
  const [ searchResult, setSearchResult ] = useState([])
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchName)
    setSearchResult(
      stores.filter(store => store.store_name.toLowerCase().includes(searchName.toLowerCase()))
    )
  }

  const goToSaunaDetail = id => {
    navigate(`/saunadetail/${id}`)
  }

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/stores`)
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log(newList)
      setStores(newList)
    })
  }, [])

  return (<>
    <Container component="section" maxWidth="lg">
      <Box
        sx={{
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">サウナ施設を検索</Typography>
        <Box component="form" sx={{ mt: 1, width: '30%'}} onSubmit={handleSearch}>
          <Box
              sx={{'& > :not(style)': { width: '100%' }} }
              noValidate
              autoComplete="off"
              textAlign="center"
              value={searchName}
              onChange={ e => setSearchName(e.target.value)}
            >
            <TextField id="outlined-basic" label="施設名を入力" variant="outlined" fullWidth />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
            >
              検索する
            </Button>
        </Box>
      </Box>
    </Container>
    <Container component="section" maxWidth="lg">
      <Grid container spacing={4}>
        { searchResult.map((store, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} >
            <Card sx={{ height: '100%'}}>
              <Grid container sx={{height: '70%', pt: 2, px: 2 }}>
                <Grid item sm={5}>
                  <CardMedia
                    component="img"
                    image={store.image.url}
                    alt={store.store_name}
                    />
                </Grid>
                <Grid item sm={7}>
                  <CardContent>
                    <Typography sx={{ fontSize: '16px'}}>
                      { store.store_name }
                    </Typography>
                    <Typography sx={{ fontSize:'14px', mb: 1.5 }}
                    color="text.secondary">
                      { store.description }
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
              <Grid container sx={{height: '30%'}}>
                <Grid item sm={12} sx={{display: "flex", justifyContent: "center"}}>
                  <CardActions>
                    <Button type="submit" variant="contained" sx={{ mb: 5 }} onClick={() => goToSaunaDetail(store.id)}>
                      混雑状況・イベント情報を確認する
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </>)
}

export default SearchSauna
