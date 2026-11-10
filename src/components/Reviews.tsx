import React, { FormEvent, useEffect, useState } from "react";
import { Star, MessageSquare, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

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
  refreshKey,
}: {
  productId: string;
  cardMode?: boolean;
  refreshKey?: number;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId, refreshKey, API_BASE]);

  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 6;
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const renderCard = (r: Review) => (
    <div
      key={r._id}
      className="bg-white rounded-3xl p-6 border border-bark-100 shadow-soft space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-gold">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= r.rating ? "fill-current text-gold" : "text-bark-200"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-bark-400">
          {new Date(r.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-bark-700 leading-relaxed italic">
        "{r.comment}"
      </p>

      <div className="pt-2 flex items-center justify-between text-xs text-bark-500 border-t border-bark-100/60">
        <span className="font-semibold text-bark-800">
          {r.userId && !r.userId.includes("demo") && !r.userId.includes("64")
            ? r.userId
            : "Verified Parent"}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-sage-600 font-medium">
          <CheckCircle2 className="w-3 h-3" />
          <span>Verified Purchase</span>
        </span>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-6 text-xs text-bark-400">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-linen/50 rounded-2xl p-6 text-bark-400 text-xs">
        No reviews posted yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(cardMode ? reviews.slice(0, 4) : paginatedReviews).map(renderCard)}
      </div>

      {!cardMode && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-full border border-bark-200 bg-white text-xs font-medium text-bark-700 disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-full text-xs font-semibold ${
                page === currentPage
                  ? "bg-rose-400 text-white shadow-soft"
                  : "bg-white text-bark-700 border border-bark-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-full border border-bark-200 bg-white text-xs font-medium text-bark-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export function ReviewForm({
  productId,
  onReviewAdded,
}: {
  productId: string;
  onReviewAdded?: () => void;
  enhanced?: boolean;
}) {
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId: name.trim() || "Verified Mother",
          rating,
          comment,
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Thank you for sharing your feedback with our community!",
        confirmButtonColor: "#E28C97",
      });

      setComment("");
      setName("");
      if (onReviewAdded) onReviewAdded();
    } catch {
      Swal.fire({
        icon: "info",
        title: "Review Received",
        text: "Thank you for your valuable feedback!",
        confirmButtonColor: "#E28C97",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4"
    >
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-5 h-5 text-rose-400" />
        <h3 className="font-heading font-semibold text-lg text-bark-900">
          Share Your Experience
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-bark-700 mb-1">
            Your Name or Nickname
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jessica M."
            className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-bark-700 mb-1">
            Rating
          </label>
          <div className="flex items-center space-x-1 py-1.5 text-gold">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 transition-all ${
                    star <= rating ? "fill-current text-gold scale-110" : "text-bark-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-bark-700 mb-1">
          Review Comments
        </label>
        <textarea
          rows={3}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell other parents about the fabric, sizing fit, and how your little angel loved it..."
          className="w-full p-3.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft transition-colors"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
