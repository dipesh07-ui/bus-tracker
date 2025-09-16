
import express from 'express';
import cors from 'cors';
import busesRouter from './routes/buses.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', busesRouter);

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
