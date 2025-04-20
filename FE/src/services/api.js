import axios from 'axios';
const api = axios.create({ baseURL:process.env.REACT_APP_API_URL });
api.interceptors.request.use(cfg=>{
  const token=localStorage.getItem('access');
  if(token) cfg.headers.Authorization=`Bearer ${token}`;
  return cfg;
});
export default api;