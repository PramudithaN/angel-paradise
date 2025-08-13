
import { FormEvent, useEffect, useState } from "react";

interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews/${productId}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [productId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((r) => (
        <div key={r._id} style={{ marginBottom: 8 }}>
          <strong>{r.rating}★</strong> {r.comment}
        </div>
      ))}
    </div>
  );
}

export function ReviewForm({ productId, onReviewAdded }: { productId: string; onReviewAdded?: () => void }) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId: "user1", rating, comment }),
    });
    setComment("");
    if (onReviewAdded) onReviewAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <input type="number" value={rating} min={1} max={5} onChange={e => setRating(Number(e.target.value))} required />
      <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Your review" required style={{ marginLeft: 8 }} />
      <button type="submit" style={{ marginLeft: 8 }}>Submit</button>
    </form>
  );
}
