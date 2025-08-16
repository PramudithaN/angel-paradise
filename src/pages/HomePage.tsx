/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

const heroImages = [
  "https://images.pexels.com/photos/33459585/pexels-photo-33459585.jpeg",
  "https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg",
  "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg"
];

function HeroImageSlider() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setSliding(true);
      setTimeout(() => {
        setIndex((prev: number) => (prev + 1) % heroImages.length);
        setSliding(false);
      }, 600); // slide duration
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  // For smooth slide, render both prev and current image, animate current from right to center, prev from center to left
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
          <img
            src={heroImages[prevIndex]}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-700 ${sliding ? '-translate-x-full' : 'translate-x-0'} absolute top-0 left-0`}
          style={{ filter: 'brightness(0.7) blur(0px)', zIndex: 1 }}
          draggable={false}
        />
        <img
          src={heroImages[index]}
          alt="Baby clothing collection"
           className={`w-full h-full object-cover transition-transform duration-700 ${sliding ? 'translate-x-0' : 'translate-x-full'} absolute top-0 left-0`}
          style={{ filter: 'brightness(0.7) blur(0px)', zIndex: 2 }}
          id="hero-img"
          draggable={false}
        />
      </div>
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-orange-400' : 'bg-white/60'} border border-orange-400 transition-all duration-300`}
            style={{ display: 'inline-block' }}
          ></span>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { ProductReviews, ReviewForm } from '../components/Reviews';
import ScrollToTopButton from '../components/ScrollToTopButton';

const HomePage = () => {
  const [refresh, setRefresh] = useState(0);
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

  useEffect(() => {
    // Fetch products from backend
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh]);

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
console.log(featuredProducts,"Featured Products");
  return (
    <div className="space-y-16 pb-16">
      <ScrollToTopButton />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Animated Hero Image with floating and scroll effect */}

        {/* Hero Image Slider */}
        <div
          className="absolute inset-0 rounded-3xl mx-4 overflow-hidden will-change-transform"
          style={{ zIndex: 1 }}
        >
          <HeroImageSlider />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-yellow-200/10 to-yellow-200/30"></div>
        </div>

        {/* Hero Text with enhanced visibility and drop shadow */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            The place to find
            <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
              little girl's accessories
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-xl">
            Discover adorable, high-quality clothing and accessories that make every little angel shine bright
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ boxShadow: '0 4px 24px 0 rgba(236,72,153,0.25)' }}
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Made with Love</h3>
            <p className="text-gray-600">Every piece is carefully selected for comfort, quality, and adorable style</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Safe & Gentle</h3>
            <p className="text-gray-600">All materials are baby-safe and tested for sensitive skin</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and secure delivery right to your doorstep</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pieces that make little angels look and feel special
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading ? (
            <div className="col-span-3 text-center text-gray-500">Loading featured products...</div>
          ) : featuredProducts.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No featured products found.</div>
          ) : (
            featuredProducts.map(product => {
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
            // featuredProducts.map((product) => (
            //   <ProductCard key={product.id || product._id || id} product={product}/>
            // )
          )
          }
        </div>

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
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Share Your Experience</h2>
          <ReviewForm productId={DEMO_PRODUCT_ID} onReviewAdded={() => setRefresh(r => r + 1)} enhanced />
        </div>
        {DEMO_PRODUCT_ID && (
          <div className="my-8">
            <h2 className="text-3xl font-bold mb-4 text-center text-orange-600">What Our Customers Say</h2>
            <ProductReviews productId={DEMO_PRODUCT_ID} key={refresh} cardMode />
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;