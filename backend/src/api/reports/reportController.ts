import { Request, Response } from 'express';
import { ReportService } from './reportService';
import { httpResponse } from '../../common/utils/httpHandlers';

export class ReportController {
  static async saveReport(req: Request, res: Response) {
    const response = await ReportService.saveReport(req.body);
    httpResponse(res, response);
  }

  static async getReport(req: Request, res: Response) {
    const { id } = req.params;
    const response = await ReportService.getReport(id);
    httpResponse(res, response);
  }
}