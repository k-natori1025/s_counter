import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Container, Box, Button } from '@mui/material';
import { API_HOST } from '../constants';
import axios from 'axios'
import { useState } from 'react';

const usageTimes = [ '60', '90', '120', '180'];

export default function AddCustomer(props) {

  const [ lockerNumber, setLockerNumber ] = useState("")
  const [ usageTime, setUsageTime ] = useState(null)

  const addCustomer = (e) => {
    e.preventDefault()
    console.log("addCustomer")
    axios.post(`${API_HOST}/api/v1/customers`, {
      customer: {
        locker_number: lockerNumber,
        usage_time: usageTime,
        store_id: props.store.id,
      }
    }) 
    .then( resp => {
      console.log('registration response', resp)
      const newCustomer = resp.data.customer
      props.setCustomers([...props.customers, newCustomer])
      setLockerNumber("")
      setUsageTime(null)
      })
    .catch(e => {
      console.log(e)
    })
  }
  

  return (<>
    <Container component="section" maxWidth="lg" sx={{ mt:1, mb:4 }}>
      <Box component="form" onSubmit={addCustomer} >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4} >
            <Box
              sx={{'& > :not(style)': { width: '100%' }} }
              noValidate
              autoComplete="off"
              textAlign="center"
            >
            <TextField id="outlined-basic" label="ロッカー番号" variant="outlined" value={lockerNumber} onChange={(e) => setLockerNumber(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <Autocomplete
              disablePortal
              id="usage_time"
              options={usageTimes}
              // sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Time(minutes)" />}
              value={usageTime}
              onChange={(event, newUsageTime) => setUsageTime(newUsageTime)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button type="submit" variant="contained" sx={{width: "100%", height: "100%" }} >
              サウナーを追加
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>  
  </>);
}
