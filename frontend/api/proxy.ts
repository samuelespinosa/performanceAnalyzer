// api/proxy.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

const TARGET = "http://ec2-18-226-133-140.us-east-2.compute.amazonaws.com:3002/api/reports"

 const handler= async (req: VercelRequest, res: VercelResponse)=>{
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
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: 'Proxy error', detail: err.message })
  }
}
export { handler as default }