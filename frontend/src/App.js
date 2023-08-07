import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { API_HOST } from './constants';
import Top from './pages/Top'
import SignUp from './components/auth/SignUp'
import Dashboard from './pages/Dashboard';
import Layout from './common/Layout';
import axios from 'axios';
import AddEvent from './components/AddEvent';
import SignUpForStore from './components/auth/SignUpForStore';
import LoginForStore from './components/auth/LoginForStore';
import SearchSauna from './pages/SearchSauna';
import SaunaDetail from './pages/SaunaDetail'
import TopForCustomers from './pages/TopForCustomers'
import LayoutForCustomers from './common/LayoutForCustomers'
import LayoutForUser from './common/LayoutForUser';
import EditStore from './pages/EditStore';
// import Status404 from './pages/errors/Status404'

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [store, setStore] = useState({})
  const [stores, setStores] = useState([])
  const navigate = useNavigate()

  // Store用ログイン
  const handleLogin = (data) => {
    console.log("ログイン成功")
    setStore(data.store)
    window.sessionStorage.setItem(['store_id'],[data.store.id]);
    console.log(window.sessionStorage.getItem(['store_id']));
    console.log(data.store)
    setLoggedInStatus(data.store.store_name)
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setStore({})
    navigate("/")
  }

  const handleLogoutClick = () => {
    console.log("ログアウトボタンが押されました")
    axios.delete(`${API_HOST}/api/v1/logout`, { withCredentials: true})
    .then(resp => {
      handleLogout()
    }).catch(error => console.log("ログアウトエラー", error))
  }

  const checkLoginStatus = () => {
    axios.get(`${API_HOST}/api/v1/logged_in`, 
      { withCredentials: true }
    ) 
      .then(resp => {
        if(resp.data.logged_in) {
          console.log("ログインステータスをチェックしました")
          console.log(resp.data)
          setStore(resp.data.store)
          setLoggedInStatus(resp.data.store.store_name)
        } else if (!resp.data.logged_in) {
          setLoggedInStatus("未ログイン")
          setStore({})
        }
    }).catch(error => {
        console.log("ログインエラーです", error)
    })
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/stores`)
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log(newList)
      setStores(newList)
    })
  }, [])

  return (
    <div>
      <Routes>
        <Route element={<Layout loggedInStatus={loggedInStatus} handleLogoutClick={handleLogoutClick} />}  >
          <Route 
            exact path="/" 
            element={<Top />} 
          />
          <Route 
            exact path="/signup" 
            element={<SignUp handleLogin={handleLogin} loggedInStatus={loggedInStatus} />} 
          />
          <Route 
            exact path="/signupforstore" 
            element={<SignUpForStore handleLogin={handleLogin} loggedInStatus={loggedInStatus} />} 
          />
          <Route 
            exact path="/loginforstore" 
            element={<LoginForStore handleLogin={handleLogin} loggedInStatus={loggedInStatus} />} 
          />
          <Route 
            exact path="/dashboard" 
            element={<Dashboard loggedInStatus={loggedInStatus} store={store} />} 
          />
          <Route 
            exact path="/addevent" 
            element={<AddEvent store={store} />} 
          />
          <Route 
            exact path="/editstore" 
            element={<EditStore store={store} />} 
          />
        </Route>
        <Route element={<LayoutForCustomers />} >
          <Route  
            path="/saunadetail/:id" 
            element={<SaunaDetail stores={stores} />} 
          />
          {/* <Route 
            path="*" 
            element={<Status404 />} 
            status={404} 
          /> */}
        </Route>
        <Route element={<LayoutForUser />}  >
          <Route 
            exact path='/searchsauna' 
            element={<SearchSauna/>} 
          />
          <Route 
            exact path="/topforcustomers" 
            element={<TopForCustomers />} 
          />
          
        </Route>
      </Routes>
    </div>
  )
}

export default App