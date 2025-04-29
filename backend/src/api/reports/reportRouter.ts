import { Router } from 'express';
import { ReportController } from './reportController';
import { validateRequest } from '../../common/utils/commonValidation';
import { CreateReportDTO } from '../../common/models/performanceTypes';

const router = Router();

router.post('/', 
  validateRequest(CreateReportDTO),
  ReportController.saveReport
);

router.get('/:id', 
  ReportController.getReport
);

export default router;