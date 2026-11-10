import React, { useEffect, useState } from 'react';
import { ProductReviews, ReviewForm } from '../components/Reviews';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Sparkles } from 'lucide-react';

const COMMUNITY_FEEDBACK_ID = "angel-paradise-community";

const AllReviewsPage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs text-bark-500 hover:text-rose-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-500 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Community Feedback</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-bark-900">
          Stories & Experiences
        </h1>
        <p className="text-sm sm:text-base text-bark-500">
          Discover genuine impressions, sizing notes, and feedback from families dressing their daughters with Angel's Paradise.
        </p>
      </div>

      {/* Write a Review Box */}
      <div className="max-w-2xl mx-auto">
        <ReviewForm
          productId={COMMUNITY_FEEDBACK_ID}
          onReviewAdded={() => setRefreshKey((k) => k + 1)}
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-6 pt-6 border-t border-bark-100">
        <h2 className="font-heading text-2xl font-bold text-bark-900">
          Recent Customer Thoughts
        </h2>
        <ProductReviews productId={COMMUNITY_FEEDBACK_ID} refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default AllReviewsPage;
