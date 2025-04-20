import React,{useState} from 'react'; import api from '../services/api';
export default()=>{const[t,a,f]=[useState(''),useState(''),useState(null)];
 return <div><h3>Upload Song</h3>
  <input placeholder="title" onChange={e=>t[1](e.target.value)}/>
  <input placeholder="artist" onChange={e=>a[1](e.target.value)}/>
  <input type="file" onChange={e=>f[1](e.target.files[0])}/>
  <button onClick={()=>{
    const d=new FormData();d.append('title',t);d.append('artist',a);d.append('audio_file',f);
    api.post('/songs/',d).then(()=>alert('Uploaded – pending approval'));
  }}>Upload</button>
</div>};