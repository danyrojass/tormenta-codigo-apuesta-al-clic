import express from 'express';
import controller from '../controllers/ganador.controller.ts';

const router = express.Router();
router.post('/', controller.yaGane);
router.post('/reset', controller.resetearGanador);
export default router;
