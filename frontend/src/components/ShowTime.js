import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";

function ShowTime() {

  const [date, setDate] = useState([])
  const [time, setTime] = useState([])

  useEffect(() => {
    setInterval(() => {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let dayofweek = d.getDay();

      const dayname = ['日','月','火','水','木','金','土'];

      // setDate(year + '年' + month + '月' + day + '日' + '[' + dayname[dayofweek] + ']');
      setDate(`${year}年 ${month}月${day}日[${dayname[dayofweek]}]`);
      let hour = d.getHours().toString().padStart(2, '0');
      let minute = d.getMinutes().toString().padStart(2, '0');
      // setTime(hour + ':' + minute);
      setTime(`${hour}:${minute}`);
    });
  },[])

  return (<>
    <Grid container>
      <Grid item xs={12} textAlign="center" sx={{ height: "30%", pt: 5 }} fontSize={20}>
        現時刻
      </Grid>
      <Grid item xs={12} textAlign="center" sx={{ height: "10%", pt: 2 }} fontSize={20} >
        {date}
      </Grid>
      <Grid item xs={12} textAlign="center" sx={{ height: "70%", pt: 2 }} fontSize={40}>
        {time}
      </Grid>
    </Grid>
  </>);
}

export default ShowTime