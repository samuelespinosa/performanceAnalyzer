import express from 'express';
import reportRouter from './report/reportRouter.js';
import trackerRouter from './tracker/trackerRouter.js';
import cors from 'cors';
const app = express();
app.use(express.json());

// Mount the router
app.use(cors());
app.use('/api/reports', reportRouter);
app.use('/api/tracker', trackerRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});