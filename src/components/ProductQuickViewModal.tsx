import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2';

interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  gallery?: string[];
  inStock?: boolean;
}

interface ProductQuickViewModalProps {
  product: Product;
  onClose: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productId = product._id || product.id || '';

  const handleAddToBag = () => {
    addToCart({
      _id: productId,
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
      text: `${product.name} added to your shopping bag.`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      background: '#FAF7F2',
      color: '#261E18',
    });

    onClose();
  };

  const handleProceedToCheckout = () => {
    addToCart({
      _id: productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      selectedSize,
      selectedColor,
      category: product.category,
    });
    onClose();
    navigate('/payment');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bark-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-voile rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 border border-bark-100 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-bark-400 hover:text-bark-800 hover:bg-bark-50 rounded-full transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto h-64 md:h-full bg-linen/50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-bark-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-bark-900 leading-snug">
                  {product.name}
                </h2>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="font-heading text-2xl font-bold text-rose-500">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-bark-400">Taxes included</span>
                </div>
              </div>

              {product.description && (
                <p className="text-sm text-bark-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-2">
                    Select Size / Age:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-rose-400 text-white shadow-soft font-semibold'
                            : 'bg-white text-bark-700 border border-bark-200 hover:border-rose-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-2">
                    Available Shades:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          selectedColor === color
                            ? 'bg-bark-900 text-white shadow-soft font-semibold'
                            : 'bg-white text-bark-700 border border-bark-200 hover:border-bark-400'
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
                <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-2">
                  Quantity:
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-bark-200 rounded-xl bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-bark-600 hover:bg-bark-50 rounded-l-xl transition-colors font-medium"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-semibold text-bark-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-bark-600 hover:bg-bark-50 rounded-r-xl transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-bark-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage-500" />
                    Baby-safe certified fabric
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleAddToBag}
                className="w-full py-3.5 px-6 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium flex items-center justify-center space-x-2 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-2.5 px-6 rounded-full bg-linen hover:bg-linen-hover text-bark-800 font-medium text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Express Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
