import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Top from './pages/Top'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import Layout from './common/Layout';
import BasicTabs from './pages/BasicTabs'
import axios from 'axios';
import AddEvent from './pages/AddEvent';
import SignUpForStore from './components/auth/SignUpForStore';
import LoginForStore from './components/auth/LoginForStore';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")
  const [store, setStore] = useState({})
  const navigate = useNavigate()

  // Store用ログイン
  const handleLogin = (data) => {
    console.log("ログイン成功")
    setStore(data.store)
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
    axios.delete("http://localhost:3001/api/v1/logout", { withCredentials: true})
    .then(resp => {
      handleLogout()
    }).catch(error => console.log("ログアウトエラー", error))
  }

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/api/v1/logged_in", { withCredentials: true }) 
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
            exact path="/login" 
            element={<Login handleLogin={handleLogin} loggedInStatus={loggedInStatus} />} 
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
            exact path='/tabs' element={<BasicTabs/>} 
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App