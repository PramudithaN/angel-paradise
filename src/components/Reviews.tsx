import { FormEvent, useEffect, useState } from "react";

interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function ProductReviews({
  productId,
  cardMode,
}: {
  productId: string;
  cardMode?: boolean;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [productId]);

  if (cardMode) {
    return (
      <div className="overflow-x-auto p-2 bg-red-50 rounded-2xl"style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div
          className="flex gap-8 min-w-max"
          
        >
          {reviews.length === 0 && (
            <div className="text-center text-gray-400">No reviews yet.</div>
          )}
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-100 flex flex-col justify-between min-w-[320px] max-w-xs flex-shrink-0"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 mr-2">
                  {[1, 2, 3, 4, 5].map((star, i) =>
                    star <= r.rating ? (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 inline"
                        fill="currentColor"
                        stroke="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.63 16.56,17.99 10,13.72 3.44,17.99 6.03,11.63 0.49,7.36 7.41,7.36" />
                      </svg>
                    ) : (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gray-300 inline"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.63 16.56,17.99 10,13.72 3.44,17.99 6.03,11.63 0.49,7.36 7.41,7.36" />
                      </svg>
                    )
                  )}
                </div>
                <span className="font-semibold text-pink-600">{r.userId}</span>
              </div>
              <div className="text-gray-700 italic mb-2">{r.comment}</div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {reviews.map((r) => (
        <div key={r._id} style={{ marginBottom: 8 }}>
          <strong>{r.rating}★</strong> {r.comment}
        </div>
      ))}
    </div>
  );
}

export function ReviewForm({
  productId,
  onReviewAdded,
  enhanced,
}: {
  productId: string;
  onReviewAdded?: () => void;
  enhanced?: boolean;
}) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        userId: user || "Anonymous",
        rating,
        comment,
      }),
    });
    setComment("");
    setUser("");
    setRating(5);
    setSubmitting(false);
    if (onReviewAdded) onReviewAdded();
  };

  if (enhanced) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-4 bg-pink-50 p-6 rounded-2xl shadow-md max-w-2xl mx-auto"
      >
        <input
          className="border border-pink-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition w-32 text-center"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Your name"
          maxLength={20}
        />
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={star <= rating ? "text-yellow-400" : "text-gray-300"}
              onClick={() => setRating(star)}
              aria-label={`Set rating to ${star}`}
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.63 16.56,17.99 10,13.72 3.44,17.99 6.03,11.63 0.49,7.36 7.41,7.36" />
              </svg>
            </button>
          ))}
        </div>
        <input
          className="border border-pink-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition flex-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your review..."
          required
          maxLength={120}
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-full shadow transition disabled:opacity-60"
          disabled={submitting || !comment.trim()}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <input
        type="number"
        value={rating}
        min={1}
        max={5}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review"
        required
        style={{ marginLeft: 8 }}
      />
      <button type="submit" style={{ marginLeft: 8 }}>
        Submit
      </button>
    </form>
  );
}
