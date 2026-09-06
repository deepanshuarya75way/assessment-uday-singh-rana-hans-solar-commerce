import { Router } from 'express';
import { getAdminVisitorAnalyticsHandler } from '../controllers/analyticsController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = Router();

router.use(protectAdmin);
router.get('/visitors', getAdminVisitorAnalyticsHandler);

export default router;
