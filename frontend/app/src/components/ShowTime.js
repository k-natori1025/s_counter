import React, {useEffect, useState} from "react";

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
    <h1>{date}</h1><br/>
    <h1>{time}</h1>
  </>);
}

export default ShowTime