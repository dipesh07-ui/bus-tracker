
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import busesRouter from './routes/buses.js';

const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());

app.use('/api', busesRouter);

app.listen(port, host, () => {
  console.log(`Backend server listening on port ${port}`);
  // Auto-seed sample data in dev for a working UI out of the box
  const isProduction = process.env.NODE_ENV === 'production';
  const shouldSeed = !isProduction && process.env.DEV_SEED !== 'false';
  if (shouldSeed) {
    setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:${port}/api/dev/seed`, { method: 'POST' });
        if (!res.ok) {
          console.warn('Dev seed failed with status', res.status);
        } else {
          console.log('Dev seed initialized');
        }
      } catch (err) {
        console.warn('Dev seed error:', err.message);
      }
    }, 300);
  }
});
