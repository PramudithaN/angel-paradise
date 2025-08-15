import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  showWhatsAppButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showWhatsAppButton = false }) => {
  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering: ${product.name} - $${product.price}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="bg-white/90 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full flex items-center space-x-2 font-medium hover:bg-white transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight">
            {product.name}
          </h3>
          {product.sizes && (
            <p className="text-xs text-gray-500 mt-1">
              Sizes: {product.sizes.join(', ')}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">
            ${product.price}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {showWhatsAppButton ? (
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 font-medium transition-all duration-200 hover:scale-105 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          ) : (
            <Link
              to={`/product/${product.id}`}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-center font-medium transition-all duration-200 hover:scale-105 text-sm"
            >
              View Product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;