import { Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { API_HOST } from '../constants';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import AddEvent from '../pages/AddEvent';

function EventsList(props){
    const columns = [
    { field: 'eventName', headerName: 'イベント名', width: 240},
    { field: 'time', headerName: '開始時間', width: 240 },
    { field: 'person', headerName: '担当者', width: 240 },
    { field: 'heat', headerName: '熱さ', width: 240 },
    { field: 'button', headerName: '削除ボタン', width: 240, 
      renderCell: (params) => <Button onClick={ e => removeEvent(params.id, e)} style={{ color: "white", backgroundColor: "#f44336" }}>削除</Button>
    },
  ];

  const [ events, setEvents ] = useState([])

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/events`,
      {params: {store_id: window.sessionStorage.getItem(['store_id']) }}
    )
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log(newList)
      setEvents(newList)
    })
    .catch( e => {
      console.log(e)
    })
  }, [])

  const row = events.map( event => (
    { id: event.id,
      eventName: event.event_name, 
      time: event.time, 
      person: event.person,
      heat: event.heat,
    } )
  )

  const removeEvent = (id, e) => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete(`${API_HOST}/api/v1/events/${id}`,
        {params: {store_id: window.sessionStorage.getItem(['store_id']) }}
      )
      .then( resp => {
        console.log('削除しました')
        const newList = JSON.parse(JSON.stringify(resp.data))
        console.log(newList)
        setEvents(newList)
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  const removeAllEvents = () => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete(`${API_HOST}/api/v1/events/destroy_all`)
      .then( resp => {
        setEvents([])
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  return (<>
    <AddEvent store={props.store} events={events} setEvents={setEvents} />
    <DataGrid
      rows={row}
      columns={columns}
      sx={{height:"700px",fontSize:18,border:"none",backgroundColor:"#fafafa",ml:5,mr:5}}
    />
    <Grid container justifyContent='end' alignItems='center' sx={{mt: 5, height: 60}}>
      <Button 
        style={{ color: "white", backgroundColor: "#f44336", width: "30%", height: "100%" }}
        onClick={removeAllEvents}
      >
        一括削除
      </Button>
    </Grid>
  </>)
}

export default EventsList