
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../stripeKey';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ total, clearCart }: { total: number; clearCart: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Call backend to create PaymentIntent
            const res = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: Math.round(total * 100), currency: 'usd' })
            });
            const data = await res.json();
            const clientSecret = data.clientSecret;
            if (!clientSecret) throw new Error('Failed to get client secret');

            const result = await stripe!.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements!.getElement(CardElement)!,
                },
            });

            if (result.error) {
                setError(result.error.message || 'Payment failed');
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                setSuccess(true);
                clearCart();
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Payment failed');
            } else {
                setError('Payment failed');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return <div className="text-center text-green-600 font-bold text-xl">Payment successful! Redirecting...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-3 border rounded" options={{ hidePostalCode: true }} />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

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
                <Elements stripe={stripePromise}>
                    <CheckoutForm total={total} clearCart={clearCart} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;
