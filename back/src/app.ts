// back/src/app.ts

import express from 'express';
import dictionaryRoutes from './routes/dictionary';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/dictionary', dictionaryRoutes);

export default app;
