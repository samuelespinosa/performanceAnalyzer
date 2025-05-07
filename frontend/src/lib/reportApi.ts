import axios from 'axios'
import { Report } from '@/intefaces/PageSpeedData';

export async function getReports(url: string) {
  const res = await axios.get('/api/report', {
    params: { url },
  });
  return res.data;
}

export async function pushReport(data: Report) {
  const res = await axios.post('/api/report', data);
  return res.data;
}