import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '15px 0',
      borderTop: '1px solid #ccc',
      marginTop: 30
    }}>
      <small>© {new Date().getFullYear()} My Spotify Clone</small>
    </footer>
  )
}
