
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                    <button onClick={() => navigate('/shop')} className="text-orange-500 hover:text-orange-600">Return to Shop</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-50 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Cart Items</h2>
                    <div className="divide-y">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center py-4 gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.category}</div>
                                    {item.sizes && item.sizes.length > 0 && <div className="text-xs text-gray-500">Sizes: {item.sizes.join(', ')}</div>}
                                    {item.colors && item.colors.length > 0 && <div className="text-xs text-gray-500">Colors: {item.colors.join(', ')}</div>}
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-gray-700">Qty:</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={e => updateQuantity(item._id, Number(e.target.value))}
                                            className="w-16 px-2 py-1 border rounded"
                                        />
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="ml-2 text-red-500 hover:text-red-700 text-xs font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="font-bold text-orange-600 text-lg">${item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-6 border-t pt-4">
                    <div className="flex justify-between text-gray-600 mb-2">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-2">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-800 font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => navigate('/shop')}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200"
                    >
                        Continue Shopping
                    </button>
                </div>
                <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200"
                    onClick={() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Placed!',
                            text: 'Thank you for your purchase!',
                            confirmButtonColor: '#f97316',
                        });
                        clearCart();
                        setTimeout(() => navigate('/'), 2000);
                    }}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
