import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Container, CardMedia, Typography } from '@mui/material'
import Button from '@mui/material/Button';

function Top() {

  return (
    <div>
      <Box sx={{ 
        backgroundImage: "url('top2.jpeg')", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 750,
        opacity: 0.8
      }}>
        <Container component="section" >
          <Grid container alignItems="center" justifyContent="center" direction="column" >
            <Grid item xs={12}>
              <CardMedia
                component="img"
                image="logo_white.png"
                sx={{width: 350 ,height: 350, margin: "auto"}}
              />
            </Grid>
            <Grid item xs={12} >
              <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 4 }} color="white" textAlign="center">
                サウナーカウンターはサウナ施設の混雑状況を把握するアプリです
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <Typography sx={{ fontSize: 15, mb: 4 }} color="white" textAlign="center" >
                店舗ログインはこちらから<br/>
                <Button variant="contained" sx={{ width: 300}} component={Link} to="/loginforstore">
                  ログイン
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: 15}} color="white" textAlign="center">
                店舗新規登録はこちらから<br/>
                <Button variant="contained" sx={{ width: 300}} component={Link} to="/signupforstore">
                  新規登録
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: 15, mt: 4 }} color="white" textAlign="center">
                サウナ利用者の方はこちらへ<br/>
                <Button variant="contained" sx={{ width: 300}} component={Link} to="/topforcustomers">
                  お客さん用トップページ
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default Top

