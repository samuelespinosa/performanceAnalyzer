import { 
  getReportsRef, 
  get, 
  push, 
  set 
} from '../config/firebase.js';
import { generateUrlHash } from '../utils.js';
import { validatePageSpeedData } from './validateReport.js';


export class ReportService {
  
  static async createReport(url, reportData) {
    const validation = validatePageSpeedData(reportData);
    if (!validation.isValid) {
      throw new Error(`Invalid report data: ${validation.errors.join(', ')}`);
    }

    const urlHash = generateUrlHash(url);
    const reportsRef = getReportsRef(urlHash);
    const timestamp = new Date().toISOString();

    const snapshot = await get(reportsRef);
    const newReportRef = push(reportsRef);

    await set(newReportRef, {
      data: reportData,
      createdAt: timestamp,
      updatedAt: timestamp
    });

    return {
      urlHash,
      reportId: newReportRef.key,
      timestamp,
      action: snapshot.exists() ? 'added' : 'created'
    };
  }

  static async getReports(url) {
    const urlHash = generateUrlHash(url);
    const snapshot = await get(getReportsRef(urlHash));
    
    if (!snapshot.exists()) {
      throw new Error('No reports found');
    }

    return this.transformReports(snapshot);
  }

  static transformReports(snapshot) {
    const reports = [];
    snapshot.forEach(child => {
      reports.push({
        id: child.key,
        ...child.val()
      });
    });
    return reports;
  }
}