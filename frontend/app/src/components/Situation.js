import React from 'react'
import { Container, Grid, Card, } from '@mui/material'
import ShowTime from './ShowTime'

function Situation() {
  return (<>
    <Container component="section" maxWidth="lg" sx={{mt:10}} >
      <Grid container spacing={4}>
          <Grid item  xs={12} sm={6} md={4} >
            <Card style={{ color: "#fafafa", backgroundColor: "#1de9b6" }} sx={{ height: 250 }}>
              混雑状況<br/>
              普通
            </Card>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} >
            <Card sx={{ height: 250 }}>
              〜人中〜人
            </Card>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} >
            <Card sx={{ height: 250 }}>
              <ShowTime />
            </Card>
          </Grid>
      </Grid>
    </Container>
  </>)
}

export default Situation
