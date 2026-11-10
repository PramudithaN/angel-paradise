import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ShieldCheck, Sparkles, Star, Truck, CheckCircle2 } from 'lucide-react';
import { ProductCardSkeleton } from '../components/BoutiqueLoader';
import ProductCard, { Product } from '../components/ProductCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import { products as fallbackProducts } from '../data/products';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch(() => {
        setProducts(fallbackProducts);
      })
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const featuredList = products
    .filter((p) => p.featured)
    .slice(0, 6);

  const displayFeatured = featuredList.length > 0 ? featuredList : products.slice(0, 6);

  const parentTestimonials = [
    {
      name: "Sophia M.",
      location: "Verified Parent",
      rating: 5,
      comment: "The Pink Princess Dress for my daughter's 1st birthday was breathtaking! The fabric is buttery-soft against her sensitive skin. Not a single scratch or irritation.",
      date: "2 weeks ago",
      item: "Adorable Pink Princess Dress"
    },
    {
      name: "Hannah K.",
      location: "Aunt & Gifter",
      rating: 5,
      comment: "Bought the floral romper set as a baby shower gift. The presentation, stitching, and tiny headband exceeded expectations. My sister was in tears of joy!",
      date: "1 month ago",
      item: "Cute Floral Romper Set"
    },
    {
      name: "Elena R.",
      location: "Mother of Two",
      rating: 5,
      comment: "Finally, children's clothes that withstand washing while remaining delicate and luxurious. She twirls in her tutu skirt every single afternoon.",
      date: "Recently",
      item: "Angel Wings Tutu Skirt"
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-100/70 text-rose-600 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Season • Tender Childhood Keepsakes</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-bark-900 leading-[1.12]">
              Dressing your <br />
              <span className="italic font-normal text-rose-400">little angel</span> in pure, <br />
              gentle comfort.
            </h1>

            <p className="text-base sm:text-lg text-bark-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Every dress, romper, and hair ribbon is thoughtfully handpicked for sensitive skin, joyful laughter, and picture-perfect milestones.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-soft-lg hover:shadow-soft-xl hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Boutique</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-linen text-bark-800 border border-bark-200/80 font-medium text-sm transition-colors text-center"
              >
                Our Quality Standards
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-bark-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-bark-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-500" />
                <span>100% Breathable Fabrics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-500" />
                <span>Non-toxic Safe Dyes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-500" />
                <span>Loved by 2,000+ Mothers</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Collage (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Arched Main Image */}
              <div className="aspect-[3/4] rounded-t-[10rem] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-linen">
                <img
                  src="https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg"
                  alt="Little girl wearing floral boutique dress"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Testimonial Pill */}
              <div className="absolute -bottom-6 -left-6 sm:left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-soft-lg border border-bark-100 max-w-xs animate-fadeIn">
                <div className="flex items-center space-x-1 text-gold mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-bark-700 italic">
                  "The softest fabric my 18-month old has ever worn."
                </p>
                <span className="text-[10px] text-bark-400 mt-1 block">- Sarah T., Verified Mom</span>
              </div>

              {/* Floating Seal */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-rose-50 border border-rose-200 flex flex-col items-center justify-center text-center p-2 shadow-soft">
                <Heart className="w-5 h-5 text-rose-400 mb-0.5" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-rose-600 leading-tight">
                  Pure Love
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Values & Brand Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white p-8 rounded-3xl border border-bark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-bark-900 mb-2">
              Made with Gentle Love
            </h3>
            <p className="text-sm text-bark-500 leading-relaxed">
              Every garment is selected for ultra-soft hand feel, smooth seams, and zero scratchy labels to keep delicate skin irritation-free.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-bark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-bark-900 mb-2">
              Tested Child-Safe
            </h3>
            <p className="text-sm text-bark-500 leading-relaxed">
              Securely fastened buttons, lead-free snaps, and breathable weaves tested to withstand crawling, twirling, and endless naps.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-bark-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gold-light text-gold-dark flex items-center justify-center mb-5">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-bark-900 mb-2">
              Gift-Ready Packaging
            </h3>
            <p className="text-sm text-bark-500 leading-relaxed">
              Wrapped carefully in signature silk tissue paper, ready to be gifted directly for baby showers, birthdays, or special celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Outfits Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-2">
              Curated Wardrobe
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bark-900">
              Most Loved Pieces
            </h2>
            <p className="text-sm sm:text-base text-bark-500 mt-1 max-w-xl">
              From birthday galas to playful sunny afternoons, explore our most cherished wardrobe staples.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-rose-500 hover:text-rose-600 group self-start md:self-auto"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayFeatured.map((product) => {
              const normalizedProduct: Product = {
                ...product,
                id: String(product._id || product.id),
              };
              return (
                <ProductCard
                  key={normalizedProduct.id}
                  product={normalizedProduct}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Story & Mission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linen/80 rounded-4xl p-8 sm:p-12 lg:p-16 border border-bark-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
                Our Motherhood Story
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bark-900 leading-tight">
                Born from a mother’s search for softness, elegance & joy.
              </h2>
              <p className="text-sm sm:text-base text-bark-600 leading-relaxed">
                Angel’s Paradise started at a nursery table when our founder couldn't find occasion wear that was both breathtakingly beautiful and genuinely gentle on infant skin. Too many dresses were stiff, scratchy, and uncomfortable.
              </p>
              <p className="text-sm sm:text-base text-bark-600 leading-relaxed">
                We believe young girls should feel like angels without having to sacrifice freedom of movement or comfort. Every seam, bow, and fold is designed with that singular promise.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-bark-900 text-white hover:bg-bark-800 text-xs font-medium tracking-wide transition-colors"
                >
                  <span>Read Our Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-soft-lg border-2 border-white">
                <img
                  src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg"
                  alt="Mother and toddler daughter sharing a peaceful moment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Love Stories (Reviews Carousel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
            Mother Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bark-900">
            Cherished by Families Worldwide
          </h2>
          <p className="text-sm text-bark-500">
            Real experiences from mothers, aunts, and grandmothers dressing their precious little ones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {parentTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-bark-100 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-bark-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-bark-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-bark-900 block">{t.name}</span>
                  <span className="text-bark-400">{t.location}</span>
                </div>
                <span className="text-rose-400 font-medium">{t.item}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/all-reviews"
            className="text-xs font-semibold text-bark-600 hover:text-rose-500 underline underline-offset-4 transition-colors"
          >
            Read all customer reviews & community ratings →
          </Link>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
