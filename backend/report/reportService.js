import { 
  getReportsRef, 
  get, 
  push, 
  set 
} from '../config/firebase.js';
import { validatePageSpeedData } from './validateReport.js';

export class ReportService {
  static async createReport(url, reportData) {
    const validation = validatePageSpeedData(reportData);
    if (!validation.isValid) {
      throw new Error(`Invalid report data: ${validation.errors.join(', ')}`);
    }

    const urlHash = this.generateUrlHash(url);
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
      action: snapshot.exists() ? 'appended' : 'created'
    };
  }

  static async getReports(urlHash) {
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

  static generateUrlHash(url) {
    return Buffer.from(url)
      .toString('base64')
      .replace(/[^a-z0-9]/gi, '')
      .slice(0, 20);
  }
}