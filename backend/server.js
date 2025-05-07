import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import reportRouter from './report/reportRouter.js';
import trackerRouter from './tracker/trackerRouter.js';
import dailyService from './tracker/dailyService.js';

const app = express();
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://performance-analyzer-nu.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
}))
app.use('/api/reports', reportRouter);
app.use('/api/tracker', trackerRouter);
cron.schedule('0 3 * * *',dailyService);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});