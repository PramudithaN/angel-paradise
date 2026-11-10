import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/payment');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bark-900/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-voile shadow-2xl flex flex-col border-l border-bark-100">
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-bark-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl font-heading font-semibold text-bark-900">
                Shopping Bag <span className="text-sm font-sans font-normal text-bark-400">({totalItems})</span>
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-bark-400 hover:text-bark-700 hover:bg-bark-50 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-bark-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-bark-800 mb-1">Your bag is empty</h3>
                <p className="text-sm text-bark-400 max-w-xs mb-6">
                  Discover sweet and gentle outfits designed for your little angel.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors shadow-soft"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemKey = item.cartItemId || item._id;
                return (
                  <div key={itemKey} className="py-4 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-xl border border-bark-100 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-bark-900 text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-bark-400 mt-0.5">
                        {item.category || "Outfit"}
                      </p>
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="flex gap-2 text-xs text-bark-600 mt-1">
                          {item.selectedSize && (
                            <span className="bg-linen px-2 py-0.5 rounded text-[11px] font-medium">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="bg-linen px-2 py-0.5 rounded text-[11px] font-medium">
                              {item.selectedColor}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-bark-200 rounded-lg bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                            className="px-2.5 py-1 text-bark-500 hover:text-bark-900 hover:bg-bark-50 rounded-l-lg transition-colors text-sm"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-bark-800 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            className="px-2.5 py-1 text-bark-500 hover:text-bark-900 hover:bg-bark-50 rounded-r-lg transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold text-sm text-bark-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemKey)}
                      className="p-1.5 text-bark-300 hover:text-rose-500 rounded-full hover:bg-rose-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-bark-100 shadow-lg space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-bark-500">Subtotal</span>
                <span className="text-lg font-heading font-bold text-bark-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-bark-400">
                Taxes & shipping calculated at checkout. Free shipping on orders over $50.
              </p>
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-6 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium flex items-center justify-center space-x-2 shadow-soft hover:shadow-soft-lg transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-center text-sm text-bark-500 hover:text-bark-800 font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
