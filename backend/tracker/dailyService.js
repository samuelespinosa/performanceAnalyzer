
import { getTrackedUrls } from './trackerService.js';
import { getFullReport } from './lightHouseService.js';
import { ReportService } from '../report/reportService.js';

export default async function dailyService(){
  console.log('🏃‍♂️ Running daily performance check...');
  try {
    const urls = await getTrackedUrls();
    console.log(urls)
    for (const url of urls) {
      try {
        console.log(`🔍 Checking ${url}...`);
        const report = await getFullReport(url.originalUrl);
        console.log(report);
        await ReportService.createReport(url.hashedUrl,report.data);
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

dailyService()