import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Heart, ShieldCheck, Truck, Sparkles, Check, Info } from 'lucide-react';
import { BoutiqueSpinner } from '../components/BoutiqueLoader';
import { useCart } from '../contexts/CartContext';
import { products as fallbackProducts } from '../data/products';
import Swal from 'sweetalert2';

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

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('94713052556');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  useEffect(() => {
    // Fetch business info for dynamic WhatsApp contact
    fetch(`${API_BASE}/api/business-info`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.whatsapp) setWhatsappNumber(data.whatsapp);
      })
      .catch(() => {});
  }, [API_BASE]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
          if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        } else {
          // Fallback to local data
          const found = fallbackProducts.find((p) => p.id === id || p._id === id);
          if (found) {
            setProduct(found);
            if (found.sizes && found.sizes.length > 0) setSelectedSize(found.sizes[0]);
            if (found.colors && found.colors.length > 0) setSelectedColor(found.colors[0]);
          } else {
            setProduct(null);
          }
        }
      } catch {
        const found = fallbackProducts.find((p) => p.id === id || p._id === id);
        if (found) {
          setProduct(found);
          if (found.sizes && found.sizes.length > 0) setSelectedSize(found.sizes[0]);
          if (found.colors && found.colors.length > 0) setSelectedColor(found.colors[0]);
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <BoutiqueSpinner message="Loading garment details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-bark-900 mb-2">Garment Not Found</h2>
        <p className="text-sm text-bark-500 mb-6 max-w-sm">
          The boutique piece you are looking for may have been retired or moved.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-sm transition-colors shadow-soft"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const images: string[] =
    product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToBag = () => {
    addToCart({
      _id: product._id || product.id || '',
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      selectedSize,
      selectedColor,
      category: product.category,
    });

    Swal.fire({
      icon: 'success',
      title: 'Added to Bag',
      text: `${product.name} (${selectedSize || 'Standard'}) added to your bag.`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      background: '#FAF7F2',
      color: '#261E18',
    });
  };

  const handleBuyNow = () => {
    addToCart({
      _id: product._id || product.id || '',
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      selectedSize,
      selectedColor,
      category: product.category,
    });
    navigate('/payment');
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Angel's Paradise! 👼
I would love to order:
• Item: ${product.name}
• Size: ${selectedSize || 'Default'}
• Shade: ${selectedColor || 'As pictured'}
• Qty: ${quantity}
• Total: $${(product.price * quantity).toFixed(2)}

Could you confirm current availability and delivery time?`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-bark-400 mb-8">
        <Link to="/shop" className="hover:text-rose-500 flex items-center space-x-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Outfits</span>
        </Link>
        <span>/</span>
        <span className="hover:text-rose-500">{product.category}</span>
        <span>/</span>
        <span className="text-bark-800 font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Gallery (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-bark-100 shadow-soft">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-bark-700 shadow-soft hover:bg-white transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-bark-700 shadow-soft hover:bg-white transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-bark-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-soft">
              {product.category}
            </span>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === idx
                      ? 'border-rose-400 shadow-soft scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Order Controls (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Heirloom Boutique Cut</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark-900 leading-snug">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-3 mt-3">
                <span className="font-heading text-3xl font-bold text-rose-500">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="text-xs text-bark-400">Taxes included</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-bark-600 leading-relaxed border-b border-bark-100 pb-6">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-bark-800">
                    Select Age / Size
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium underline underline-offset-2"
                  >
                    <Info className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                        selectedSize === size
                          ? 'bg-rose-400 text-white border-rose-400 shadow-soft'
                          : 'bg-white text-bark-700 border-bark-200 hover:border-rose-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size Guide Collapse */}
                {showSizeGuide && (
                  <div className="p-4 bg-linen rounded-2xl text-xs text-bark-600 space-y-1 animate-fadeIn border border-bark-200">
                    <p className="font-semibold text-bark-900">Recommended Fit Guide:</p>
                    <p>• <strong>0-6M</strong>: Weight 8-16 lbs / Height up to 26 in</p>
                    <p>• <strong>6-12M</strong>: Weight 16-22 lbs / Height 26-29 in</p>
                    <p>• <strong>12-24M / 2T</strong>: Weight 22-28 lbs / Height 29-33 in</p>
                    <p>• <strong>3T-4T</strong>: Weight 28-36 lbs / Height 33-38 in</p>
                  </div>
                )}
              </div>
            )}

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-bark-800 block">
                  Color / Shade: <span className="font-normal text-bark-500">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
                        selectedColor === color
                          ? 'bg-bark-900 text-white border-bark-900 shadow-soft'
                          : 'bg-white text-bark-700 border-bark-200 hover:border-bark-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-bark-800 block">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-bark-200 rounded-xl bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-bark-500 hover:text-bark-900 hover:bg-bark-50 rounded-l-xl transition-colors font-medium text-base"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-semibold text-bark-900 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-bark-500 hover:text-bark-900 hover:bg-bark-50 rounded-r-xl transition-colors font-medium text-base"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-bark-400">
                  Subtotal: <strong className="text-bark-800">${(product.price * quantity).toFixed(2)}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={handleAddToBag}
                className="w-full py-4 px-6 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3 px-6 rounded-full bg-white hover:bg-linen text-bark-800 border border-bark-200 text-xs font-semibold tracking-wide transition-colors"
              >
                Proceed Directly to Checkout
              </button>

              {/* WhatsApp Express Order */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-6 rounded-full bg-sage-50 hover:bg-sage-100 text-sage-600 border border-sage-200 text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-soft"
              >
                <MessageCircle className="w-4 h-4 text-sage-500" />
                <span>Quick Order via WhatsApp Concierge</span>
              </button>
            </div>
          </div>

          {/* Reassurance Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-bark-100 text-center text-xs text-bark-600">
            <div className="space-y-1">
              <Heart className="w-5 h-5 text-rose-400 mx-auto" />
              <p className="font-semibold text-bark-800">Ultra-Soft</p>
              <p className="text-[11px] text-bark-400">Zero scratchy tags</p>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-sage-500 mx-auto" />
              <p className="font-semibold text-bark-800">Baby-Safe</p>
              <p className="text-[11px] text-bark-400">Certified safe dyes</p>
            </div>
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-gold mx-auto" />
              <p className="font-semibold text-bark-800">Gift Wrapped</p>
              <p className="text-[11px] text-bark-400">Packed with silk tissue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
