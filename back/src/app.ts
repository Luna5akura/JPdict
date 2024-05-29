// back/src/app.ts

process.env.TS_NODE_CACHE = "true";

import express from 'express';
import dictionaryRoutes from './routes/dictionary';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/dictionary', dictionaryRoutes);

export default app;
