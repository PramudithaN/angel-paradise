import express, { Request, Response } from 'express';
import Review from '../models/Review';

const router = express.Router();

// Get all reviews for a product
router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add a new review
router.post('/', async (req: Request, res: Response) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = new Review({ productId, userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch {
    res.status(400).json({ error: 'Failed to add review' });
  }
});

export default router;
