import { Router } from 'express';
import {
  recordProductViewHandler,
  recordSiteVisitHandler,
} from '../controllers/analyticsController.js';

const router = Router();

router.post('/visit', recordSiteVisitHandler);
router.post('/products/:productId/view', recordProductViewHandler);

export default router;
