import axios from 'axios';

// Determine the base URL dynamically
const baseURL =
    import.meta.env.VITE_ENV === 'development' 
    ? import.meta.env.VITE_REPORT_API_URL+'/api/tracker'
    : '/api/trackerProxy';

// Create an axios instance with the dynamic base URL
const api = axios.create({
  baseURL,
});

export async function isTracked(url: string) {
  const res = await api.get('', {
    params: { url },
  });
  return res.data;
}

export async function setTracked(data:{url:string}) {
  const res = await api.post('', data);
  return res.data;
}