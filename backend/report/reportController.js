import {ReportService} from './reportService.js'
export class ReportController {
  static async createReport(req, res) {
    try {
      const { url, data } = req.body;
      
      if (!url || !/^https?:\/\/.+\..+/.test(url)) {
        return ReportController.sendError(res, 400, 'Invalid URL format');
      }

      const result = await ReportService.createReport(url, data);
      return ReportController.sendSuccess(
        res, 
        result.action === 'created' ? 201 : 200, 
        { ...result }
      );

    } catch (error) {
      return ReportController.handleError(res, error);
    }
  }

  static async getReports(req, res) {
    try {
      const { urlHash } = req.params;
      const reports = await ReportService.getReports(urlHash);
      
      return ReportController.sendSuccess(res, 200, {
        urlHash,
        count: reports.length,
        reports
      });

    } catch (error) {
      return ReportController.handleError(res, error);
    }
  }

  // Helper methods
  static sendSuccess(res, status = 200, data = {}) {
    return res.status(status).json({ success: true, ...data });
  }

  static sendError(res, status = 400, error = 'Bad request') {
    return res.status(status).json({ success: false, message: error });
  }

  static handleError(res, error) {
    console.error('Report error:', error);
    const status = error.message.includes('found') ? 404 : 500;
    const message = error.message;
    return res.status(status).json({ success: false, message });
  }
}