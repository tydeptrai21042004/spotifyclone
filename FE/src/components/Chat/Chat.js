import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export default function Chat() {
  const [recipient, setRecipient] = useState('');
  const [users, setUsers] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  // Fetch list of users for recipient selection
  useEffect(() => {
    api.get('/auth/users/')
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  // Open WebSocket when a recipient is selected
  useEffect(() => {
    if (!recipient) return;
    const currentUser = localStorage.getItem('uid');
    const room = [currentUser, recipient].sort().join('_');
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);

    ws.current.onmessage = e => {
      const data = JSON.parse(e.data);
      setMsgs(prev => [...prev, data]);
    };

    ws.current.onerror = console.error;

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [recipient]);

  const send = () => {
    if (!input || !ws.current) return;
    ws.current.send(JSON.stringify({ message: input }));
    setInput('');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Chat</h3>

      <select
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        style={{ marginBottom: 10 }}
      >
        <option value="">Select user...</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>{u.username}</option>
        ))}
      </select>

      <div style={{
        maxHeight: 200,
        overflow: 'auto',
        border: '1px solid #ccc',
        padding: 5,
        marginBottom: 10
      }}>
        {msgs.map((m, i) => (
          <div key={i}>
            <strong>{m.sender}</strong>: {m.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && send()}
        style={{ width: '80%' }}
        placeholder="Type a message..."
      />
      <button onClick={send} style={{ marginLeft: 5 }}>Send</button>
    </div>
  );
}