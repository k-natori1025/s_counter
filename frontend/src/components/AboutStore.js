import React from 'react'
import { Container, Grid, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function AboutStore(props) {
  
  const navigate = useNavigate()

  const goToEditStore = () => {
    navigate('/editstore')
  }

  return (<>
    
    <Container component="section" maxWidth="lg" >
      <Grid container backgroundColor="white" spacing={2}  sx={{mt: 5, mb: 5}}>
        <Grid item sm={4} sx={{mt: 5}}>
          <CardMedia
            component="img"
            image={props.store.image.url}
            alt={props.store.store_name}
          />
        </Grid>
        <Grid item sm={8}>
          <CardContent>
            <Typography sx={{ fontSize: '20px', mb: 2 }}>
              店名：{ props.store.store_name }
            </Typography>
            <Typography sx={{ fontSize: '20px', mb: 2}}>
              電話番号：{ props.store.phone_number }
            </Typography>
            <Typography sx={{ fontSize: '20px', mb: 2}}>
              住所：{ props.store.address }
            </Typography>
            <Typography sx={{ fontSize: '20px', mb: 2}}>
              サ室の収容人数：{ props.store.capacity }
            </Typography>
            <Typography sx={{ fontSize:'20px', mb: 2 }} >
              お店について：<br/>
              { props.store.description }
            </Typography>
          </CardContent>
        </Grid>
        <Grid container>
          <Grid item sm={12}>
            <CardActions sx={{display: "flex", justifyContent: "center"}} >
              <Button 
                style={{ color: "white", fontSize: "18px", backgroundColor: "#f44336", width: "40%", height: 50, marginBottom: 20 }}
                onClick={goToEditStore}
              >
                店舗情報を編集する
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>

    </Container>
    
  
  </>)
}

export default AboutStore
