import axios from 'axios';
import { Report } from '@/intefaces/PageSpeedData';

// Determine the base URL dynamically
const baseURL =
    import.meta.env.VITE_ENV === 'development' 
    ? process.env.VITE_REPORT_API_URL
    : '/api/proxy';

// Create an axios instance with the dynamic base URL
const api = axios.create({
  baseURL,
});

export async function getReports(url: string) {
  const res = await api.get('', {
    params: { url }, // No need to attach "/api/proxy" or anything; baseURL handles it
  });
  return res.data;
}

export async function pushReport(data: Report) {
  const res = await api.post('', data);
  return res.data;
}