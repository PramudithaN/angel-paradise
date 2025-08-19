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

  // Card UI for both homepage (limit 3) and all reviews (paginated)
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 6;
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE);

  const renderCard = (r: Review) => (
    <div
      key={r._id}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100 flex flex-col justify-between min-w-[320px] flex-shrink-0 my-2"
    >
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 mr-2">
          {[1, 2, 3, 4, 5].map((star, i) =>
            star <= r.rating ? (
              <svg
                key={i}
                className="w-5 h-5 text-orange-400 inline"
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
        <span className="font-semibold text-orange-600">{r.userId}</span>
      </div>
      <div className="text-gray-700 italic mb-2">{r.comment}</div>
      <div className="text-xs text-gray-400 mt-2">
        {new Date(r.createdAt).toLocaleDateString()}
      </div>
    </div>
  );

  if (cardMode) {
    return (
      <div className="overflow-x-auto p-2 bg-orange-50 rounded-2xl" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div>
          {reviews.length === 0 && (
            <div className="text-center text-gray-400">No reviews yet.</div>
          )}
          {reviews.slice(0, 3).map(renderCard)}
        </div>
      </div>
    );
  }

  // All reviews as cards (paginated)
  return (
    <div className="flex flex-col gap-4">
      {reviews.length === 0 && <div className="text-center text-gray-400">No reviews yet.</div>}
      {paginatedReviews.map(renderCard)}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-orange-100 text-orange-600 hover:bg-orange-200 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-200"}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-orange-100 text-orange-600 hover:bg-orange-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );

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
        className="flex flex-col md:flex-row items-center justify-center gap-4 bg-orange-50 p-6 rounded-3xl shadow-md max-w-3xl mx-auto"
      >
        <input
          className="border border-orange-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition w-32 text-center"
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
              className={star <= rating ? "text-orange-400" : "text-gray-300"}
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
          className="border border-orange-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition flex-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your review..."
          required
          maxLength={120}
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow transition disabled:opacity-60"
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
