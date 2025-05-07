import axios from 'axios';

const REPORT_API_URL = process.env.REPORT_API_URL!;

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { url } = req.query;
      const response = await axios.get(REPORT_API_URL, { params: { url } });
      return res.status(200).json(response.data);
    }

    if (req.method === 'POST') {
      const response = await axios.post(REPORT_API_URL, req.body);
      return res.status(200).json(response.data);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
