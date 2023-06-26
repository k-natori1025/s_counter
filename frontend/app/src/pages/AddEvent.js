import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import { Grid, Button, Container } from '@mui/material';

export default function AddEvent() {
  const [ eventName, setEventName ] = useState(null)
  const [ time, setTime ] = useState(null)
  const [ person, setPerson ] = useState(null)
  const [ heat, setHeat ] = useState(null)

  const addEvent = () => {
    axios.post('http://localhost:3001/api/v1/events', {
      event: {
        event_name: eventName,
        time: time,
        person: person,
        heat: heat,
      }
    })
    .then( resp => {
      console.log('registration response', resp)
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
          <Grid item xs={12} >
            <Box
              sx={{'& > :not(style)': { m: 1, width: '50%' }, marginTop: 8,} }
              noValidate
              autoComplete="off"
              textAlign="center"
              value={time}
              onChange={ e => setTime(e.target.value)}
            >
            <TextField id="outlined-basic" label="開始時間" variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box
              component="form"
              sx={{'& > :not(style)': { m: 1, width: '50%' },}}
              noValidate
              autoComplete="off"
              textAlign="center"
              value={eventName}
              onChange={ e => setEventName(e.target.value)}
            >
            <TextField id="outlined-basic" label="イベント名" variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box
              component="form"
              sx={{'& > :not(style)': { m: 1, width: '50%' },}}
              noValidate
              autoComplete="off"
              textAlign="center"
              value={person}
              onChange={ e => setPerson(e.target.value)}
            >
            <TextField id="outlined-basic" label="担当者" variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box
              component="form"
              sx={{'& > :not(style)': { m: 1, width: '50%' },}}
              noValidate
              autoComplete="off"
              textAlign="center"
              value={heat}
              onChange={ e => setHeat(e.target.value)}
            >
            <TextField id="outlined-basic" label="熱さ" variant="outlined" />
            </Box>
          </Grid>
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
