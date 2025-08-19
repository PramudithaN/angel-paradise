import { ProductReviews } from '../components/Reviews';
import { Link } from 'react-router-dom';

const DEMO_PRODUCT_ID = "demo-product-1"; // Replace with actual product id logic if needed

export default function AllReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-orange-50 rounded-2xl shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">All Reviews</h1>
        <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
      </div>
      <ProductReviews productId={DEMO_PRODUCT_ID} />
    </div>
  );
}
