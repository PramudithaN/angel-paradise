import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { ProductReviews, ReviewForm } from '../components/Reviews';


const HomePage = () => {
  const [refresh, setRefresh] = useState(0);
  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  // Temporary demo product ID for reviews section
  const DEMO_PRODUCT_ID = "demo-product-1";

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/90 to-yellow-100/90 rounded-3xl mx-4 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1648386/pexels-photo-1648386.jpeg"
            alt="Baby clothing collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200/80 via-transparent to-yellow-200/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            The place to find
            <span className="block bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              little girl's accessories
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover adorable, high-quality clothing and accessories that make every little angel shine bright
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-pink-100 hover:bg-pink-200 text-pink-600 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-3xl p-8 md:p-12">
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
                className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
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
              <div className="absolute -top-4 -right-4 bg-yellow-200 p-4 rounded-full shadow-lg">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="my-8">
          <h2 className="text-xl font-semibold mb-2">Product Reviews</h2>
          <ProductReviews productId={DEMO_PRODUCT_ID} key={refresh} />
          <ReviewForm productId={DEMO_PRODUCT_ID} onReviewAdded={() => setRefresh(r => r + 1)} />
        </div>
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from happy parents who love shopping with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-100">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <Quote className="w-6 h-6 text-pink-200 absolute -top-2 -left-2" />
                <p className="text-gray-600 italic leading-relaxed pl-4">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
};

export default HomePage;