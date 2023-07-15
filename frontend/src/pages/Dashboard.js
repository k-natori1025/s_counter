import { useState } from 'react'
import '../App.css'
import Situation from '../components/Situation'
import CustomersList from '../components/CustomersList'
import EventsList from '../components/EventsList'
import { Box } from '@mui/material'

const Dashboard = (props) => {

  const [active, setActive] = useState(1)

  const activate = (id) => {
    console.log(id)
    setActive( active => active = id)
  }

  const items = [
    {id: 1, title: "入退室管理", path: "dashboard/customers"},
    {id: 2, title: "混雑状況", path: "dashboard/situations"},  
    {id: 3, title: "イベント情報", path: "dashboard/events"}
  ]

  return(<>
    <Box sx={{
        backgroundImage: "url('top2.jpeg')", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 1100,
        opacity: 0.8
      }}>
      <section className="tab">
      <ul className="tab__label">
        { items.map(item => (
          <li key={item.id}>
            <a className={ item.id === active ? "active" : "" } href="#" onClick={()=> activate(item.id) }>{item.title}</a> 
          </li>
        ) ) }
      </ul>
     
      { active === 1 && 
        <div className="tab__content">
          <CustomersList store={props.store} />
        </div>
      }
      { active === 2 && 
        <div className="tab__content">
          <Situation store={props.store} />
        </div>
      } 
      { active === 3 && 
        <div className="tab__content">
          <EventsList store={props.store} />
        </div>
      }
      
    </section>
      
    </Box>
    
  </>)
}

export default Dashboard