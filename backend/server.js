import express from 'express';
import reportRouter from './report/reportRouter.js';
import trackerRouter from './tracker/trackerRouter.js';
import dailyService from './tracker/dailyService.js';
import cors from 'cors';
import cron from 'node-cron';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/reports', reportRouter);
app.use('/api/tracker', trackerRouter);
cron.schedule('0 3 * * *',dailyService);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});