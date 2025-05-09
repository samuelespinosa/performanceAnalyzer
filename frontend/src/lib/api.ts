import axios from 'axios'

export  async function fetchData(url: string, strategy: 'mobile' | 'desktop'){
const api_key=import.meta.env.VITE_ENV === 'development'?import.meta.env.VITE_API_KEY:'AIzaSyB0NA4C_JS0nYsgLr6XYP6NB0akYoGJSnk';
  // Determine the base URL dynamically
const baseURL =
import.meta.env.VITE_ENV === 'development' 
? 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
: '/api/pageSpeedProxy';

// Create an axios instance with the dynamic base URL
const api = axios.create({baseURL});

  const res = await api.get('', {
    params: {
      url,
      key: api_key,
      strategy,
    },
  })

  return res.data
}