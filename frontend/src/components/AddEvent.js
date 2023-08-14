import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { API_HOST } from '../constants';
import { useState } from 'react';
import { Grid, Button, Container } from '@mui/material';
import { useSnackbar } from '../hooks/useSnackbar';

export default function AddEvent(props) {
  const [ eventName, setEventName ] = useState("")
  const [ time, setTime ] = useState("")
  const [ person, setPerson ] = useState("")
  const [ heat, setHeat ] = useState("")

  const { addSnack } = useSnackbar()

  const addEvent = (e) => {
    e.preventDefault()
    axios.post(`${API_HOST}/api/v1/events`, {
      event: {
        event_name: eventName,
        time: time,
        person: person,
        heat: heat,
        store_id: props.store.id
      }
    })
    .then( resp => {
      console.log('registration response', resp)
      const newEvent = resp.data.event
      props.setEvents([...props.events, newEvent])
      setEventName("")
      setTime("")
      setPerson("")
      setHeat("")
      addSnack({ type: "success", message: "イベントを追加しました" });
      })
    .catch(e => {
      console.log(e)
    })
  }

  return (<>
    <Container component="section" maxWidth="lg" sx={{ mt:1, mb:4 }}>
      <Box  component="form" 
            onSubmit={addEvent} 
            sx={ {display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Grid container spacing={1} >
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{'& > :not(style)': { m: 1 }} }
              noValidate
              autoComplete="off"
              textAlign="center"
            >
            <TextField id="outlined-basic" label="開始時間" variant="outlined" value={time} onChange={ e => setTime(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12}sm={6} md={3} >
            <Box
              // component="form"
              sx={{'& > :not(style)': { m: 1 }}}
              noValidate
              autoComplete="off"
              textAlign="center"
            >
            <TextField id="outlined-basic" label="イベント名" variant="outlined" value={eventName} onChange={ e => setEventName(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <Box
              // component="form"
              sx={{'& > :not(style)': { m: 1 }}}
              noValidate
              autoComplete="off"
              textAlign="center"
            >
            <TextField id="outlined-basic" label="担当者" variant="outlined" value={person} onChange={ e => setPerson(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <Box
              // component="form"
              sx={{'& > :not(style)': { m: 1 }}}
              noValidate
              autoComplete="off"
              textAlign="center"
            >
            <TextField id="outlined-basic" label="熱さ" variant="outlined" value={heat} onChange={ e => setHeat(e.target.value)} />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" sx={{width: "50%", height: "100%" }} >
              イベントを追加
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>  
  </>);
}
