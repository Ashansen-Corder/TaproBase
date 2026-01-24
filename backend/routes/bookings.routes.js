import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getUserBookings
} from '../controllers/bookings.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.route('/')
  .get(getUserBookings)
  .post(createBooking);

router.route('/all').get(protect, getBookings); // Admin/Guide can see all bookings

router.route('/:id')
  .get(getBooking)
  .put(updateBooking)
  .delete(cancelBooking);

export default router;
