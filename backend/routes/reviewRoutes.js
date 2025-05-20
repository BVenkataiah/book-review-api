// routes/reviewRoutes.js
import express from 'express'
import authenticate from '../middleware/authMiddleware.js';
const reviewRouter = express.Router();
import {
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'

reviewRouter.post("/books/:id/reviews", authenticate, createReview);
reviewRouter.put("/reviews/:id", authenticate, updateReview);
reviewRouter.delete("/reviews/:id", authenticate, deleteReview);
export  default reviewRouter;
