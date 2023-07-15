import { React, useState, useEffect, memo } from 'react'
import '../App.css'
import SituationForUser from '../components/SituationForUser'
import EventsListForUser from '../components/EventsListForUser'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'


function SaunaDetail(props) {

  const [active, setActive] = useState(1)
  // const [store, setStore] = useState({})

  const activate = (id) => {
    console.log(id)
    setActive( active => active = id)
  }

  const items = [
    {id: 1, title: "混雑状況", path: "dashboard/situations"},  
    {id: 2, title: "イベント情報", path: "dashboard/events"}
  ]

  const params = useParams()

  const store = props.stores.find( store => {
    return store.id === parseInt(params.id, 10)
  })
  
  return(<>
    <Box sx={{
        backgroundImage: "url('/top2.jpeg')",
        // backgroundImage : `url(${store.image.url})`, 
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
          <SituationForUser store={store} />
        </div>
      } 
      { active === 2 && 
        <div className="tab__content">
          <EventsListForUser store={store} />
        </div>
      }
      
    </section>
      
    </Box>
    
  </>)
}

export default SaunaDetail