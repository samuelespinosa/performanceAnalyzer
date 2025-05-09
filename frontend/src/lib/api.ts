import axios from 'axios'

export  async function fetchData(url: string, strategy: 'mobile' | 'desktop'){
  const api_key=import.meta.env.VITE_ENV === 'development'?import.meta.env.VITE_API_KEY:'AIzaSyB0NA4C_JS0nYsgLr6XYP6NB0akYoGJSnk';
  const res = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
    params: {
      url,
      key: api_key,
      strategy,
    },
  })

  return res.data
}