import React, { useState } from 'react';
import api from '../../services/api';

export default function AlbumCreator() {
  const [name, setName] = useState('');
  const handleCreate = () => {
    api.post('/albums/', { name, owner: 1 })
      .then(() => window.location.reload());
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New album name"
      />
      <button onClick={handleCreate} style={{ marginLeft: 5 }}>
        Create Album
      </button>
    </div>
  );
}