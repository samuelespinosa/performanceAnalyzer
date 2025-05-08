
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const BACKEND_URL = 'http://ec2-18-226-133-140.us-east-2.compute.amazonaws.com:3002/api/reports';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const { url } = req.query;
      const response = await axios.get(BACKEND_URL, { params: { url } });
      res.status(200).json(response.data);
    } else if (req.method === 'POST') {
      const response = await axios.post(BACKEND_URL, req.body);
      res.status(200).json(response.data);
    } else {
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to connect to backend' });
  }
}
