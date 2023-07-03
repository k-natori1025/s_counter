import React from 'react'
import { Container, Grid, Card, Typography, Box, CardMedia } from '@mui/material'
import ShowTime from './ShowTime'
import { useState, useEffect } from 'react'
import { API_HOST } from '../constants'
import axios from 'axios'

function Situation(props) {

  const [ customers, setCustomers ] = useState([])

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/customers`, 
      {params: {store_id: window.sessionStorage.getItem(['store_id']) }}
    )
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log(newList)
      setCustomers(newList)
    })
    .catch( e => {
      console.log(e)
    })
  }, [])

  const rate = customers.length/props.store.number_of_lockers

  return (<>
    ログイン中の店舗のID:{props.store.id}
    <Container component="section" maxWidth="lg" sx={{mt:10, mb:10}} >
      <Grid container spacing={4}>
        { rate >= 0 && rate < 0.3 &&  
          <Grid item  xs={12} sm={6} md={4} >
            <Card
              style={{ color: "#fafafa", backgroundColor:"rgba(12,247,230,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px",  display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={12} textAlign="center" sx={{pt: 5, height: "30%"}} fontSize={20}>
                  混雑状況
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{pt: 2, height: "50%"}} fontSize={40}>
                  空いている
                </Grid>
              </Grid>
            </Card>
          </Grid>
        }
        { rate >= 0.3 && rate < 0.5 &&  
          <Grid item  xs={12} sm={6} md={4} >
            <Card
              style={{ color: "#fafafa", backgroundColor:"rgba(47,247,5,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px",  display: "flex",  justifyContent: "center", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={12} textAlign="center" sx={{pt: 5, height: "30%"}} fontSize={20}>
                  混雑状況
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{pt: 2, height: "50%"}} fontSize={40}>
                  普通
                </Grid>
              </Grid>
            </Card>
          </Grid>
        }
        { rate >= 0.5 && rate < 0.7 &&  
          <Grid item  xs={12} sm={6} md={4} >
            <Card
              style={{ color: "#fafafa", backgroundColor:"rgba(247,229,5,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px",  display: "flex", justifyContent: "center", width: "100%" }}
            >
             <Grid container>
                <Grid item xs={12} textAlign="center" sx={{pt: 5, height: "30%"}} fontSize={20}>
                  混雑状況
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{pt: 2, height: "50%"}} fontSize={40}>
                  やや混み
                </Grid>
              </Grid>
            </Card>
          </Grid>
        }
        { rate >= 0.7 &&  
          <Grid item  xs={12} sm={6} md={4} >
            <Card
              style={{ color: "#fafafa", backgroundColor:"rgba(244,67,54,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px",  display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={12} textAlign="center" sx={{pt: 5, height: "30%"}} fontSize={20}>
                  混雑状況
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{pt: 2, height: "50%"}} fontSize={40}>
                  混んでいる
                </Grid>
              </Grid>
            </Card>
          </Grid>
        }
          <Grid item  xs={12} sm={6} md={4} >
            <Card
              style={{ backgroundColor: "rgba(235,230,230,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px", display: "flex", justifyContent: "center", width: "100%" }}>
              <Grid container>
                <Grid item xs={12} textAlign="center" sx={{pt: 5, height: "30%"}} fontSize={20}>
                  店内のサウナー数
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{ height: "50%", pt: 2 }}>
                  <Typography fontSize={40} fontWeight="bold">{customers.length}人/{props.store.number_of_lockers}人</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item  xs={12} sm={6} md={4} >
            <Card 
              style={{ backgroundColor: "rgba(235,230,230,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px", display: "flex", justifyContent: "center", width: "100%" }}>
              <ShowTime />
            </Card>
          </Grid>
      </Grid>
    </Container>
  </>)
}

export default Situation
