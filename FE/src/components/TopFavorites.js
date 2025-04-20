import React,{useEffect,useState} from 'react';import api from '../services/api';
export default()=>{const[f,setF]=useState([]);
 useEffect(()=>api.get('/top-favorites/').then(r=>setF(r.data)),[]);
 return <div><h3>Top Favorites</h3>{f.map(s=><div key={s.id}>{s.title}</div>)}</div>;
};