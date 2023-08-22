import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { API_HOST } from '../constants';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';

function EventsListForUser(props){
    const columns = [
    { field: 'eventName', headerName: 'イベント名', width: 240},
    { field: 'time', headerName: '開始時間', width: 240 },
    { field: 'person', headerName: '担当者', width: 240 },
    { field: 'heat', headerName: '熱さ', width: 240 },
  ];

  const [ events, setEvents ] = useState([])

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/events`,
      {params: {store_id: props.store.id }}
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

  return (<>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
    </Box>
    <DataGrid
      rows={row}
      columns={columns}
      sx={{height:"700px",fontSize:18,border:"none",backgroundColor:"#fafafa",m:5}}
    />
  </>)
}

export default EventsListForUser