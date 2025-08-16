import { Router } from 'express';
import optimizarRoute from './optimizar.route';

const router = Router();
router.use(optimizarRoute);
export default router;