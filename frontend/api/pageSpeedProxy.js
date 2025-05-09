// api/proxy.ts

import axios from 'axios'
 const handler= async (req, res)=>{
  const {query } = req
  query.key=process.env.API_KEY;
  try {
    
    const response = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', { params: query })
    return res.status(200).json(response.data)
    
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Proxy error', detail: err.message })
  }
}
export { handler as default }