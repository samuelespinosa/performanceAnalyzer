
import { getTrackedUrls } from './trackerService.js';
import { getFullReport } from './lightHouseService.js';
import { ReportService } from '../report/reportService.js';

export default async function dailyService(){
  console.log('🏃‍♂️ Running daily performance check...');
  try {
    const urls = await getTrackedUrls();
    
    for (const url of urls) {
      try {
        console.log(`🔍 Checking ${url}...`);
        const report = await getFullReport(url);
        await ReportService.createReport(url,report);
        console.log(`✅ Updated report for ${url}`);
      } catch (error) {
        console.error(`❌ Failed to update ${url}:`, error.message);
      }
    }
    
    console.log('🎉 Daily performance check completed');
  } catch (error) {
    console.error('❌ Cron job failed:', error);
  }
}