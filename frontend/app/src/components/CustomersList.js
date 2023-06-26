import { Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCustomer from './AddCustomer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomersList(props){
  const columns = [
    { field: 'lockerNumber', headerName: 'ロッカー番号', width: 250},
    { field: 'entryTime', headerName: 'ご利用開始時間', width: 250 },
    { field: 'usageTime', headerName: 'ご利用時間', width: 250 },
    // { field: 'exitTime', headerName: 'ご退室時間', width: 250 },
    { field: 'button', headerName: '退室ボタン', width: 250, 
      renderCell: (params) => <Button onClick={ e => removeCustomer(params.id, e)} style={{ color: "black", backgroundColor: "#bdbdbd" }}>退室</Button>
    },
  ];

  const handleToDate=(date)=>{
    date = new Date(date);
    if(date.getMinutes() < 10){
        date = date.getFullYear()+"/"+(date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":0"+date.getMinutes()
    } else {
        date = date.getFullYear()+"/"+(date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    }
    return date;
  }

  const [ customers, setCustomers ] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3001/api/v1/customers')
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log(newList)
      setCustomers(newList)
    })
    .catch( e => {
      console.log(e)
    })
  }, [])
 
  const row = customers.map( customer => (
    { id: customer.id,
      lockerNumber: customer.locker_number, 
      entryTime: handleToDate(customer.created_at), 
      usageTime: customer.usage_time
    }
  ))

  const removeCustomer = (id, e) => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete(`http://localhost:3001/api/v1/customers/${id}`)
      .then( resp => {
        console.log('削除しました')
        // const newList = JSON.parse(JSON.stringify(resp.data))
        // console.log(newList)
        // setCustomers(newList)
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  const removeAllCustomers = () => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete('http://localhost:3001/api/v1/customers/destroy_all')
      .then( resp => {
        setCustomers([])
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  return (<>
    <AddCustomer store={props.store} />
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