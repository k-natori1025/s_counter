import { Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCustomer from './AddCustomer';
import { useEffect, useState } from 'react';
import { API_HOST } from '../constants'; 
import axios from 'axios';
import CurrentTime from './CurrentTime';

function CustomersList(props){
  const columns = [
    { field: 'lockerNumber', headerName: 'ロッカー番号', width: 250},
    { field: 'entryTime', headerName: 'ご利用開始時間', width: 250 },
    { field: 'usageTime', headerName: 'ご利用時間', width: 250 },
    { field: 'exitTime', headerName: 'ご退室時間', width: 250 },
    { field: 'button', headerName: '退室ボタン', width: 250, 
      renderCell: (params) => <Button onClick={ e => removeCustomer(params.id, e)} style={{ color: "white", backgroundColor: "#f44336" }}>ととのった</Button>
    },
  ];

  // 時刻を見やすく変更
  const handleToDate=(date)=>{
    date = new Date(date);
    if(date.getMinutes() < 10){
        date = (date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":0"+date.getMinutes()
    } else {
        date = (date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    }
    return date;
  }

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

  // 退室時間を計算
  const calcExitTime = (created_at, usage_time) => {
    const date = new Date(created_at);
    const minutesToAdd = usage_time;
    date.setMinutes(date.getMinutes() + minutesToAdd);
    // console.log(date.toLocaleString());
    return date.toLocaleString()
  } 

  const row = customers.map( customer => (
    { id: customer.id,
      lockerNumber: customer.locker_number, 
      entryTime: handleToDate(customer.created_at), 
      usageTime: customer.usage_time,
      exitTime: handleToDate(calcExitTime(customer.created_at, customer.usage_time))
    }
  ))

  const removeCustomer = (id, e) => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete(`${API_HOST}/api/v1/customers/${id}`,
        {params: {store_id: window.sessionStorage.getItem(['store_id']) }}
      )
      .then( resp => {
        console.log('削除しました')
        const newList = JSON.parse(JSON.stringify(resp.data))
        console.log(newList)
        setCustomers(newList)
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  const removeAllCustomers = () => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete(`${API_HOST}/api/v1/customers/destroy_all`)
      .then( resp => {
        setCustomers([])
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  return (<>
    <CurrentTime/>
    <AddCustomer store={props.store} customers={customers} setCustomers={setCustomers} />
    <DataGrid 
      rows={row}
      columns={columns}
      sx={{height:"700px",fontSize:18,border:"none",backgroundColor:"#fafafa",ml:5,mr:5}}
    />
    <Grid container justifyContent='end' alignItems='center' sx={{mt: 5, height: 60}}>
      <Button 
        style={{ color: "white", backgroundColor: "#f44336", width: "30%", height: "100%" }}
        onClick={removeAllCustomers}
      >
        一括削除
      </Button>
    </Grid>
  </>)
}

export default CustomersList