import axios from 'axios'
import { Report } from '@/intefaces/PageSpeedData';
const reportApiUrl=import.meta.env.VITE_REPORT_API_URL;
export  async function getReports(url: string){
  
    const res = await axios.get(reportApiUrl,{
      params:{
        url
      }
    });
    return res.data
  }

export  async function pushReport(data:Report){
    const res = await axios.post(reportApiUrl,data)
    return res.data
}