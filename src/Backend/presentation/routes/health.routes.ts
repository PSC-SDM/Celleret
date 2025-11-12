/**
 * Rutas de health check
 */
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Celleret Backend BFF',
    version: '0.1.0',
  });
});

export default router;
