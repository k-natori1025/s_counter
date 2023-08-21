import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";

function CurrentTime() {

  const [time, setTime] = useState([])

  useEffect(() => {
    setInterval(() => {
      let d = new Date();
      let hour = d.getHours().toString().padStart(2, '0');
      let minute = d.getMinutes().toString().padStart(2, '0');
      // setTime(hour + ':' + minute);
      setTime(`${hour}:${minute}`);
    });
  },[])

  return (<>
    <Grid container justify="center" alignItems="center" >
      <Grid item xs={6} textAlign="right" fontSize={20}>
        現時刻:
      </Grid>
      <Grid item xs={6} textAlign="left" fontSize={40}>
        {time}
      </Grid>
    </Grid>
  </>);
}

export default CurrentTime