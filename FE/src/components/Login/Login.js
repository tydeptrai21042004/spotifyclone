import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/auth/token/', {
        username,
        password
      })
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('username', username)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Login failed: check your credentials')
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: 'auto', padding: 20 }}>
      <h3>Login</h3>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        style={{ width: '100%', marginBottom: 10 }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ width: '100%' }}>
        Log In
      </button>
    </div>
  )
}
