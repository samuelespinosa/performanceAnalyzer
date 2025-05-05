import { Router } from 'express';
import {getTrackedList, setTrackedUrl} from './trackerController.js'

const router = Router();

router.get('/', getTrackedList);
router.post('/', setTrackedUrl);


export default router;