import React, { useState } from 'react'
import axios from 'axios'

function Registration(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSubmit = (event) => {
    console.log("イベント発火")
    event.preventDefault()
    // `${process.env.REACT_APP_API_SERVE}/registrations`
    axios.post('http://localhost:3001/api/v1/registrations', 
      {
        user: {
            email: email, 
            password: password, 
            password_confirmation: passwordConfirmation
        }
      },
      { withCredentials: true }
    ).then(resp=> {
        console.log('registration response', resp)
        if(resp.data.status === 'created') {
            props.handleSuccessfulAuthentication(resp.data)
        }
    }).catch(error=> {
        console.log("registration error", error)
    })
    event.preventDefault()
  }

  

  return (
    <div>
      <p>新規登録</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={event => setPassword(event.target.value)}           
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          value={passwordConfirmation}
          onChange={event => setPasswordConfirmation(event.target.value)}
        />

        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default Registration
