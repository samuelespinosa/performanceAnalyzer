import express from 'express';
import reportRouter from './report/reportRouter.js';

const app = express();
app.use(express.json());

// Mount the router
app.use('/api/reports', reportRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});