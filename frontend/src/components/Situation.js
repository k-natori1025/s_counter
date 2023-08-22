import React from 'react'
import { Container, Grid, Card, Typography } from '@mui/material'
import ShowTime from './ShowTime'
import { useState, useEffect } from 'react'
import { API_HOST } from '../constants'
import axios from 'axios'
import { addMinutes, format } from 'date-fns'

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

  const rate = customers.length/props.store.capacity

  // 退出時間を計算
  const calcExitTime = (created_at, usage_time) => {
    const date = new Date(created_at);
    // 入室時間に利用時間を足す
    const result = addMinutes(date, usage_time)
    return result
  }
  
  const [time, setTime] = useState(new Date())

  // n分後を計算
  // const addMinutes = (d, n) => {
  //   d.setMinutes(d.getMinutes() + n)
  // }
  // 現時刻から30分後を計算
  useEffect(() => {
    setInterval(() => {
      let d = new Date();
      const result = addMinutes(d, 30)
      setTime(result);
    });
  },[])

  // 現時刻から30分以内に退出する客の計算
  const exitingCustomers = customers.filter(function(customer) {
    const exitingTime = calcExitTime(customer.created_at, customer.usage_time);
    return exitingTime <= time ;
  })

  return (<>
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
                  <Typography fontSize={40} fontWeight="bold">{customers.length}人/{props.store.capacity}人</Typography>
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
      <Grid container spacing={4}>
          <Grid item  xs={12} sm={6} sx={{mt: 2}}>
            <Card
              style={{ backgroundColor: "rgba(235,230,230,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px", display: "flex", justifyContent: "center", width: "100%" }}>
              <Grid container>
                <Grid item xs={12} textAlign="center" sx={{pt: 2, height: "30%"}} fontSize={20}>
                  30分以内に退出する客数
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{ height: "30%"}} fontSize={15}>
                  30分後の時間:{format(time, 'H:mm')}
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{ height: "50%"}}>
                  <Typography fontSize={40} fontWeight="bold">{exitingCustomers.length}人</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item  xs={12} sm={6} sx={{mt: 2}}>
            <Card
              style={{ backgroundColor: "rgba(235,230,230,0.7)" }} 
              sx={{ height: 250, borderRadius: "15px", display: "flex", justifyContent: "center", width: "100%" }}>
              <Grid container>
                <Grid item xs={12} textAlign="center" sx={{ height: "50%", pt: 2 }}>
                  <Typography fontSize={30} fontWeight="bold">【混雑状況の基準】</Typography>
                  <Typography fontSize={15} sx={{pt: 2}}>サ室の収容人数に対するお客さんの数が30%以下→空いている</Typography>
                  <Typography fontSize={15} sx={{pt: 2}}>サ室の収容人数に対するお客さんの数が50%以下→普通</Typography>
                  <Typography fontSize={15} sx={{pt: 2}}>サ室の収容人数に対するお客さんの数が80%以下→やや混んでいる</Typography>
                  <Typography fontSize={15} sx={{pt: 2}}>サ室の収容人数に対するお客さんの数が80%以上→混んでいる</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
    </Container>
  </>)
}

export default Situation
