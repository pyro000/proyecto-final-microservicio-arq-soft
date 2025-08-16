import { Router } from 'express';
import { optimizar, listRuns } from '../controllers/optimizar.controller';

const router = Router();
router.post('/optimizar', optimizar);
router.get('/runs', listRuns);

export default router;
