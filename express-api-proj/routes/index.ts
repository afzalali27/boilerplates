import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (_req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

export default router;
