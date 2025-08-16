import React from 'react';
import Swal from 'sweetalert2';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface Product {
  id: string;
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
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {

  console.log(product, "Product Info");
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      _id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      sizes: product.sizes,
      colors: product.colors,
      category: product.category,
    });
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added to your cart!`,
      timer: 1200,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      background: '#fff',
    });
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
            onClick={e => {
              e.stopPropagation();
              if (onQuickView) onQuickView();
            }}
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
          {product.colors && product.colors.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Colors: {product.colors.join(', ')}
            </p>
          )}
          {product.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">
            ${product.price}
          </span>
          {product.inStock === false && (
            <span className="text-xs text-red-500 font-semibold ml-2">Out of Stock</span>
          )}
          {product.featured && (
            <span className="text-xs text-yellow-500 font-semibold ml-2">★ Featured</span>
          )}
        </div>

        {product.gallery && product.gallery.length > 1 && (
          <div className="flex gap-2 mt-2">
            {product.gallery.slice(0, 3).map((img, idx) => (
              <img key={idx} src={img} alt={product.name + ' gallery'} className="w-10 h-10 object-cover rounded" />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-center font-medium transition-all duration-200 hover:scale-105 text-sm"
          >
            Add to Cart
          </button>
          {/* {showWhatsAppButton && (
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 font-medium transition-all duration-200 hover:scale-105 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;