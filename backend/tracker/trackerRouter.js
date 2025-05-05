import { Router } from 'express';
import {isTracked, setTrackedUrl} from './trackerController.js'

const router = Router();

router.get('/', isTracked);
router.post('/', setTrackedUrl);


export default router;