import { Router } from 'express';
import * as stockController from '../controllers/stockController';

const router: Router = Router();

// CRUD Routes for items
router.get('/', stockController.stockAccessSummary)
router.get('/activity', stockController.getStockAccessFrequency);
router.get('/:ticker', stockController.getStockByTicker);

export default router;
