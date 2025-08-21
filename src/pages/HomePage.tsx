/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Truck } from 'lucide-react';
import { Spin } from 'antd';
import ProductCard from '../components/ProductCard';
import { ProductReviews, ReviewForm } from '../components/Reviews';
import ScrollToTopButton from '../components/ScrollToTopButton';

const heroImages = [
  "https://images.pexels.com/photos/33459585/pexels-photo-33459585.jpeg",
  "https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg",
  "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg"
];

import { AnimatePresence, motion as fmMotion } from 'framer-motion';

function HeroImageSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <fmMotion.img
          key={index}
          src={heroImages[index]}
          alt="Baby clothing collection"
          className="w-full h-full object-cover absolute top-0 left-0"
          id="hero-img"
          draggable={false}
          initial={{ opacity: 0, scale: 1.04, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0, filter: 'brightness(0.7) blur(0px)' }}
          exit={{ opacity: 0, scale: 0.98, x: -80 }}
          transition={{ duration: 1.1, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ zIndex: 2 }}
        />
      </AnimatePresence>
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={
              'w-3 h-3 rounded-full border border-orange-400 transition-all duration-300 ' +
              (i === index ? 'bg-orange-400' : 'bg-white/60')
            }
            style={{ display: 'inline-block' }}
          ></span>
        ))}
      </div>
    </div>
  );
}

const HomePage = () => {
  type Product = {
    id: string;
    featured?: boolean;
    [key: string]: any;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);


  // Handler to close Quick View modal
  const closeQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  // Hero image URL
  // const heroImage = "https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg";


  // Temporary demo product ID for reviews section
  const DEMO_PRODUCT_ID = "demo-product-1";

  // Ratings summary state
  const [ratingsSummary, setRatingsSummary] = useState({
    average: 0,
    count: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [ratingsLoading, setRatingsLoading] = useState(true);
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState(0);

  // Fetch and calculate ratings summary from reviews
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
    setRatingsLoading(true);
    fetch(`${API_BASE}/api/reviews/${DEMO_PRODUCT_ID}`)
      .then((res) => res.json())
      .then((reviews) => {
        if (!Array.isArray(reviews) || reviews.length === 0) {
          setRatingsSummary({
            average: 0,
            count: 0,
            breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          });
          setRatingsLoading(false);
          return;
        }
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let sum = 0;
        reviews.forEach((r: any) => {
          const rating = Math.round(Number(r.rating)) as keyof typeof breakdown;
          if (breakdown[rating] !== undefined) breakdown[rating]!++;
          sum += Number(r.rating);
        });
        setRatingsSummary({
          average: sum / reviews.length,
          count: reviews.length,
          breakdown
        });
        setRatingsLoading(false);
      })
      .catch(() => {
        setRatingsSummary({
          average: 0,
          count: 0,
          breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        });
        setRatingsLoading(false);
      });
  }, [API_BASE, reviewsRefreshKey]);

  // Parallax effect for hero image
  useEffect(() => {
    // Fetch products from backend
    setLoading(true);
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const img = document.getElementById('hero-img') as HTMLImageElement | null;
      if (img) {
        const scrollY = window.scrollY;
        img.style.transform = `translateY(${scrollY * 0.15}px) scale(1.03)`;
        img.style.filter = scrollY > 40 ? 'brightness(0.5) blur(1.5px)' : 'brightness(0.7) blur(0px)';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main return
  return (
    <div className="snap-y snap-mandatory">
      <ScrollToTopButton />
      {/* Animated floating shapes */}
      <div className="pointer-events-none select-none">
        <motion.div
          className="fixed top-10 left-10 w-32 h-32 bg-primary-light rounded-full opacity-40 blur-2xl z-0"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="fixed bottom-20 right-10 w-40 h-40 bg-accent-light rounded-full opacity-30 blur-2xl z-0"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="fixed top-1/2 left-1/2 w-24 h-24 bg-primary-dark rounded-full opacity-20 blur-2xl z-0"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero Section */}
      <section id="hero" className="h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-cream to-primary-light snap-start">
        <div className="absolute inset-0 rounded-3xl mx-4 overflow-hidden will-change-transform z-0">
          <HeroImageSlider />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-yellow-200/10 to-yellow-200/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-50 mb-6 leading-tight drop-shadow-2xl font-heading">
            The place to find
            <span className="block bg-gradient-to-r from-primary-dark to-accent-dark bg-clip-text text-pink-200 drop-shadow-2xl">
              little girl's accessories
            </span>
          </h1>
          <p className="text-xs md:text-lg text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-xl font-body">
            Discover adorable, high-quality clothing and accessories that make every little angel shine bright
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ boxShadow: '0 4px 24px 0 rgba(236,72,153,0.15)' }}
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <motion.section
        id="features"
        className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-primary-light snap-start"
        style={{ transition: 'background 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="text-center group" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-primary to-primary-light p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown mb-2 font-heading">Made with Love</h3>
              <p className="text-brown/70 font-body">Every piece is carefully selected for comfort, quality, and adorable style</p>
            </motion.div>
            <motion.div className="text-center group" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-accent to-accent-light p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown mb-2 font-heading">Safe & Gentle</h3>
              <p className="text-brown/70 font-body">All materials are baby-safe and tested for sensitive skin</p>
            </motion.div>
            <motion.div className="text-center group" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown mb-2 font-heading">Fast Delivery</h3>
              <p className="text-brown/70 font-body">Quick and secure delivery right to your doorstep</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* --- End Features Section --- */}

      {/* Featured Products */}
      <motion.section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 snap-start mt-8"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pieces that make little angels look and feel special
          </p>
        </div>

        <Spin spinning={loading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredProducts.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">No featured products found.</div>
            ) : (
              featuredProducts
                .slice(-3)
                .map(product => {
                  const normalizedProduct = {
                    ...product,
                    id: String(product._id || product.id),
                    name: product.name || "",
                    price: product.price || 0,
                    image: product.image || "",
                    category: product.category || "",
                  };
                  return (
                    <div key={normalizedProduct.id}>
                      <ProductCard
                        product={normalizedProduct}
                        showWhatsAppButton
                        onQuickView={() => setQuickViewProduct(product)}
                      />
                    </div>
                  );
                })
            )}
          </div>
        </Spin>

        {/* Quick View Modal */}
        {showQuickView && quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-orange-600 text-2xl font-bold"
                onClick={closeQuickView}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-48 h-48 object-cover rounded-xl mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{quickViewProduct.name}</h3>
                <p className="text-lg text-orange-600 font-semibold mb-2">${quickViewProduct.price}</p>
                <p className="text-gray-600 mb-4 text-center">{quickViewProduct.description}</p>
                {/* Add more product details as needed */}
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-600 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 snap-start mt-8"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-gradient-to-r from-orange-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Angel's Paradise
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded with love and passion for dressing little angels, Angel's Paradise has been creating magical moments for families worldwide. We believe every little girl deserves to feel special, comfortable, and beautifully dressed.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our carefully curated collection features soft fabrics, adorable designs, and the perfect fit for your growing angel. From everyday wear to special occasions, we have everything you need to keep your little one looking absolutely adorable.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg"
                alt="About Angel's Paradise"
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-orange-200 p-4 rounded-full shadow-lg">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* User-friendly review form */}
      <div className="mb-8 mt-8">
        <ReviewForm
          productId={DEMO_PRODUCT_ID}
          enhanced
          onReviewAdded={() => setReviewsRefreshKey((k) => k + 1)}
        />
      </div>
      {/* Testimonials/Reviews Section - Project Colors, Screenshot Layout */}
      <motion.section
        id="reviews"
        className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-2xl shadow border border-gray-200 snap-start"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews</h2>

        <div className="flex flex-col gap-6">
          {/* Ratings summary */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Left: Average rating and stars */}
            <div className="flex flex-col items-center md:items-start min-w-[160px]">
              {ratingsLoading ? (
                <span className="text-2xl text-gray-400">Loading...</span>
              ) : (
                <>
                  <span className="text-5xl font-bold text-gray-900">{ratingsSummary.average.toFixed(1)}</span>
                  <div className="flex items-center gap-1 mt-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= Math.round(ratingsSummary.average) ? "text-orange-500" : "text-orange-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 mb-2">{ratingsSummary.count.toLocaleString()} ratings</span>
                </>
              )}
            </div>
            {/* Middle: Bar chart */}
            <div className="flex-1 w-full ">
              {[5, 4, 3, 2, 1].map((star) => {
                const key = star as keyof typeof ratingsSummary.breakdown;
                const count = ratingsSummary.breakdown[key] || 0;
                const percent = ratingsSummary.count ? (count / ratingsSummary.count) * 100 : 0;
                return (
                  <div key={star} className="flex gap-2 mb-1 items-center">
                    <span className="w-6 text-sm font-medium text-gray-700">{star}.0</span>
                    <div className="flex-1 h-2 rounded bg-gray-200 overflow-hidden">
                      <div className="h-2 rounded bg-orange-400 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="w-14 text-xs text-gray-400 text-right">{count} review{count !== 1 ? 's' : ''}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t pt-4 mt-2">
            <Link to="/all-reviews" className="text-orange-600 font-semibold hover:underline">Read all reviews</Link>
          </div>
          {/* Reviews list (dynamic) */}
          <div className="w-full">
            <ProductReviews productId={DEMO_PRODUCT_ID} cardMode refreshKey={reviewsRefreshKey} />
          </div>

        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;