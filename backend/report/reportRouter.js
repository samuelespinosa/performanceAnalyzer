import { Router } from 'express';
import { ReportController } from './reportController.js';

const router = Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getReports);

export default router;