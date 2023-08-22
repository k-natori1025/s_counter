import React from 'react'
import { Container, Grid, CardContent, CardMedia, Typography } from '@mui/material'

function AboutStoreForUser(props) {
  

  return (<>
    { props.store && 
    <Container component="section" maxWidth="lg" >
      <Grid container backgroundColor="white" spacing={2}  sx={{mt: 5, mb: 5, pb: 5, borderRadius: 2}}>
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
      </Grid>
    </Container>
    }
  
  </>)
}

export default AboutStoreForUser
