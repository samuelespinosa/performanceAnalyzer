import { ReportRepository } from './reportRepository';
import { ServiceResponse } from '../../common/models/serviceResponse';
import { PerformanceReport, CreateReportDTO } from '../../common/models/performanceTypes';

export class ReportService {
  static async saveReport(dto: CreateReportDTO): Promise<ServiceResponse<{ id: string }>> {
    try {
      const id = await ReportRepository.create(dto);
      return {
        success: true,
        data: { id },
        message: 'Report saved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save report',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async getReport(id: string): Promise<ServiceResponse<PerformanceReport>> {
    try {
      const report = await ReportRepository.findById(id);
      if (!report) {
        return {
          success: false,
          message: 'Report not found',
          statusCode: 404
        };
      }
      return {
        success: true,
        data: report,
        message: 'Report retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve report',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}