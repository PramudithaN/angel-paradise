import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Heart, Shield, Truck } from 'lucide-react';
import { Spin } from 'antd';


const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  interface Product {
    _id?: string;
    id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    sizes?: string[];
    colors?: string[];
    gallery?: string[];
    inStock?: boolean;
  }
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-lg text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-yellow-500 hover:text-yellow-600">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images: string[] = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleWhatsAppOrder = () => {
    const orderDetails = {
      product: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      total: (product.price * quantity).toFixed(2)
    };

    const message = `Hi! I'd like to order:

  Product: ${orderDetails.product}
  Size: ${orderDetails.size || 'Not specified'}
  Color: ${orderDetails.color || 'Not specified'}
  Quantity: ${orderDetails.quantity}
  Total: $${orderDetails.total}

  Please confirm availability and shipping details.`;

    const whatsappUrl = `https://wa.me/94713052556?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleProceedToCheckout = () => {
    if (!product) return;
    // Add to cart (replace if already in cart)
    addToCart({
      _id: product._id || product.id || '',
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      sizes: selectedSize ? [selectedSize] : [],
      colors: selectedColor ? [selectedColor] : [],
      category: product.category,
    });
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 py-8">
      <Spin spinning={loading}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-8 text-sm">
            <Link to="/shop" className="text-yellow-500 hover:text-yellow-600 flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((img: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === selectedImage ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200 ${index === selectedImage ? 'ring-2 ring-pink-500' : 'hover:shadow-lg'}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-yellow-600">
                    ${product.price}
                  </span>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Rating */}
              {/* <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 text-sm">(4.9 / 5 based on 127 reviews)</span>
            </div> */}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes && product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedSize === size
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors && product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedColor === color
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    handleWhatsAppOrder();
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Order Now on WhatsApp</span>
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span>Proceed to Checkout-</span>
                </button>
                <div className="text-center text-gray-600 text-sm">
                  Total: <span className="font-bold text-lg text-yellow-600">${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-pink-100">
                <div className="text-center">
                  <Heart className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Made with Love</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Baby Safe</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ProductPage;