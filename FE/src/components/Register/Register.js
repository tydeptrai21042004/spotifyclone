import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await api.post('/auth/register/', {
        username,
        password
      })
      alert('Registration successful! Please log in.')
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Registration failed: username may be taken')
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: 'auto', padding: 20 }}>
      <h3>Register</h3>
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
      <button onClick={handleRegister} style={{ width: '100%' }}>
        Register
      </button>
    </div>
  )
}
