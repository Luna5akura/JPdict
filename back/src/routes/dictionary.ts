// back/src/routes/dictionary.ts

import { Router } from 'express';
import { getWord } from '../controllers/dictionaryController';

const router = Router();

router.get('/:word', getWord);

export default router;
