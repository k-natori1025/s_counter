import { React, useState, useEffect } from 'react'
import '../App.css'
import SituationForUser from '../components/SituationForUser'
import EventsListForUser from '../components/EventsListForUser'
import AboutStoreForUser from '../components/AboutStoreForUser'
import PostsListForUser from '../components/PostsListForUser'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_HOST } from '../constants'

function SaunaDetail() {

  const [active, setActive] = useState(1)
  const [store, setStore] = useState({})

  const activate = (id) => {
    console.log(id)
    setActive( active => active = id)
  }

  const items = [
    {id: 1, title: "混雑状況", path: "dashboard/situations"},  
    {id: 2, title: "イベント情報", path: "dashboard/events"},
    {id: 3, title: "店舗情報", path: "dashboard/info"},
    {id: 4, title: "お知らせ投稿", path: "dashboard/posts"}
  ]

  const params = useParams()

  // const store = props.stores.find( store => {
  //   return store.id === parseInt(params.id, 10)
  // })

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/stores/${params.id}`)
    .then( resp => {
      const newStore = JSON.parse(JSON.stringify(resp.data))
      console.log(newStore)
      setStore(newStore)
    })
  }, [])
  
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
          {store && 
            <SituationForUser store={store} />
          }
        </div>
      } 
      { active === 2 && 
        <div className="tab__content">
          {store && 
            <EventsListForUser store={store} />
          }
        </div>
      }
      { active === 3 && 
        <div className="tab__content">
          {store && 
            <AboutStoreForUser store={store} />
          }
        </div>
      }
      { active === 4 && 
        <div className="tab__content">
          {store && 
            <PostsListForUser store={store} />
          }
        </div>
      }
      
    </section>
      
    </Box>
    
  </>)
}

export default SaunaDetail