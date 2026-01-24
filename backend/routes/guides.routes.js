import express from 'express';
import {
  getGuides,
  getGuide,
  updateGuide,
  searchGuides
} from '../controllers/guides.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getGuides);
router.route('/search').get(searchGuides);
router.route('/:id').get(getGuide);
router.route('/:id').put(protect, updateGuide);

export default router;
