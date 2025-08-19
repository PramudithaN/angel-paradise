
import express, { Request, Response } from 'express';
import Review from '../models/Review';

const router = express.Router();

// Ratings summary for a product
router.get('/summary/:productId', async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ productId });
    if (!reviews.length) {
      return res.json({
        average: 0,
        count: 0,
        breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      });
    }
    const count = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / count;
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const key = r.rating as keyof typeof breakdown;
      breakdown[key] = (breakdown[key] || 0) + 1;
    });
    res.json({
      average: Number(average.toFixed(2)),
      count,
      breakdown
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch ratings summary' });
  }
});

// Get all reviews for a product, sorted by latest first
router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
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
