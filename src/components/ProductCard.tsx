import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2';

export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  gallery?: string[];
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  showWhatsAppButton?: boolean;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const productId = product._id || product.id;

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/product/${productId}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If product has multiple sizes, open quick view or navigate so parent can choose the right fit
    if (product.sizes && product.sizes.length > 1 && onQuickView) {
      onQuickView(product);
      return;
    }

    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;

    addToCart({
      _id: productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      selectedSize: defaultSize,
      selectedColor: defaultColor,
      category: product.category,
    });

    Swal.fire({
      icon: 'success',
      title: 'Added to Bag',
      text: `${product.name} has been added to your shopping bag.`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      background: '#FAF7F2',
      color: '#261E18',
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden border border-bark-100/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-linen/40 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-white/90 backdrop-blur-md text-bark-700 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-soft">
            {product.category}
          </span>
        </div>

        {/* Stock status / Featured */}
        {product.inStock === false && (
          <div className="absolute top-3.5 right-3.5">
            <span className="bg-bark-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Floating Quick View Overlay */}
        <div className="absolute inset-0 bg-bark-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="bg-white/95 backdrop-blur-md text-bark-800 hover:text-rose-500 px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-semibold tracking-wide shadow-soft-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          <h3 className="font-heading font-semibold text-bark-900 text-base line-clamp-1 group-hover:text-rose-500 transition-colors">
            {product.name}
          </h3>

          {product.sizes && product.sizes.length > 0 && (
            <p className="text-xs text-bark-400">
              Ages: {product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 ? '...' : ''}
            </p>
          )}

          {product.description && (
            <p className="text-xs text-bark-500 line-clamp-2 leading-relaxed pt-0.5">
              {product.description}
            </p>
          )}
        </div>

        <div className="pt-4 mt-2 border-t border-bark-100/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-bark-400 block -mb-0.5">Price</span>
            <span className="font-heading font-bold text-lg text-bark-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-400 hover:text-white font-medium text-xs transition-all shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.sizes && product.sizes.length > 1 ? 'Select Size' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
