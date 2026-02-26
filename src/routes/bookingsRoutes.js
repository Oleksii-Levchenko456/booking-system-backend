import { Router } from 'express';
import {
  createReservation,
  cancelReservation,
  getAllReservations,
  updateReservation,
  getClientReservations,
} from '../controllers/bookingsControllers.js';

const router = Router();

router.get('/', getAllReservations);
router.get('/client', getClientReservations);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', cancelReservation);

export default router;
