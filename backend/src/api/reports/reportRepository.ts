import { getFirebaseDB } from '../../common/utils/firebaseClient';
import { ref, set, get } from 'firebase/database';
import { PerformanceReport, CreateReportDTO } from '../../common/models/performanceTypes';

const COLLECTION = 'performanceReports';

export class ReportRepository {
  static async create(report: CreateReportDTO): Promise<string> {
    const db = getFirebaseDB();
    const id = this.generateId(report.url);
    await set(ref(db, `${COLLECTION}/${id}`), {
      ...report,
      id,
      createdAt: new Date().toISOString()
    });
    return id;
  }

  static async findById(id: string): Promise<PerformanceReport | null> {
    const db = getFirebaseDB();
    const snapshot = await get(ref(db, `${COLLECTION}/${id}`));
    return snapshot.exists() ? snapshot.val() : null;
  }

  private static generateId(url: string): string {
    return Buffer.from(url).toString('base64').replace(/[^a-z0-9]/gi, '');
  }
}