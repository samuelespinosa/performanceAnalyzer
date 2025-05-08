// api/proxy.ts

import axios from 'axios'

const TARGET = process.env.API_URL;

 const handler= async (req, res)=>{
  const { method, query, body } = req

  try {
    if (method === 'GET') {
      const response = await axios.get(`${TARGET}/api/reports`, { params: query })
      return res.status(200).json(response.data)
    }

    if (method === 'POST') {
      const response = await axios.post(`${TARGET}/api/reports`, body)
      return res.status(200).json(response.data)
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Proxy error', detail: err.message })
  }
}
export { handler as default }