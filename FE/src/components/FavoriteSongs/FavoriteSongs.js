import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function FavoriteSongs() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    api.get('/favorites/').then(res => setFavs(res.data));
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Favorites</h3>
      {favs.map(f => (
        <div key={f.id}>{f.song}</div>
      ))}
    </div>
  );
}