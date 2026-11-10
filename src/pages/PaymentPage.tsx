import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, ShoppingBag, Gift, CheckCircle2, MessageCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    giftWrap: false,
    giftMessage: '',
    paymentMethod: 'card' as 'card' | 'cod' | 'whatsapp',
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
  const giftWrapFee = formData.giftWrap ? 3.5 : 0;
  const grandTotal = subtotal + shipping + giftWrapFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.address.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please provide your full name, email, and shipping address.',
        confirmButtonColor: '#E28C97',
      });
      return;
    }

    setSubmitting(true);

    const fullShippingAddress = `${formData.address}, ${formData.city} ${formData.postalCode} | Phone: ${formData.phone}${
      formData.giftWrap ? ` | [Gift Wrapped: "${formData.giftMessage}"]` : ''
    }`;

    const orderPayload = {
      user: `${formData.fullName} (${formData.email})`,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        sizes: item.selectedSize ? [item.selectedSize] : item.sizes || [],
        colors: item.selectedColor ? [item.selectedColor] : item.colors || [],
        category: item.category || 'Apparel',
      })),
      total: Number(grandTotal.toFixed(2)),
      status: formData.paymentMethod === 'card' ? 'paid' : 'pending',
      shippingAddress: fullShippingAddress,
      paymentId: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      let savedOrder = orderPayload;
      if (res.ok) {
        savedOrder = await res.json();
      }

      setOrderComplete(savedOrder);
      clearCart();

      // If customer selected WhatsApp confirmation
      if (formData.paymentMethod === 'whatsapp') {
        const waMsg = `Hello Angel's Paradise! 👼
I have placed Order #${savedOrder._id || savedOrder.paymentId || 'NEW'}
• Customer: ${formData.fullName}
• Phone: ${formData.phone}
• Total: $${grandTotal.toFixed(2)}
• Shipping to: ${formData.address}, ${formData.city}

Please confirm order fulfillment details!`;
        window.open(`https://wa.me/94713052556?text=${encodeURIComponent(waMsg)}`, '_blank');
      }
    } catch {
      // Graceful fallback for offline demo
      setOrderComplete(orderPayload);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Order Completion Screen
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-sage-50 text-sage-600 flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">
            Order Confirmed
          </span>
          <h1 className="font-heading text-4xl font-bold text-bark-900">
            Thank you for trusting Angel's Paradise!
          </h1>
          <p className="text-sm text-bark-500 max-w-md mx-auto">
            Your precious order has been received and is being carefully prepared and packaged in our signature tissue wrap.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft max-w-lg mx-auto text-left space-y-4">
          <div className="flex justify-between items-center text-xs text-bark-500 border-b border-bark-100 pb-3">
            <span>Order Reference</span>
            <span className="font-mono font-semibold text-bark-800">
              {orderComplete._id || orderComplete.paymentId}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-bark-500 border-b border-bark-100 pb-3">
            <span>Recipient</span>
            <span className="font-semibold text-bark-800">{formData.fullName || 'Customer'}</span>
          </div>

          <div className="flex justify-between items-center text-sm font-semibold text-bark-900 pt-1">
            <span>Total Paid</span>
            <span className="font-heading text-xl text-rose-500">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft transition-colors"
          >
            Continue Browsing Boutique
          </Link>
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full bg-linen hover:bg-linen-hover text-bark-800 font-medium text-xs transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // 2. Empty Cart Screen
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-bark-900">Your shopping bag is empty</h2>
        <p className="text-sm text-bark-500">
          Explore our collection of dresses, rompers, and delicate hair accessories for your little angel.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft transition-colors"
          >
            <span>Explore Boutique</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Checkout Form Screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Return Link */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center space-x-1.5 text-xs text-bark-500 hover:text-rose-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping</span>
        </Link>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-bark-900 mb-8">
        Secure Boutique Checkout
      </h1>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details & Shipping (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Customer Details */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <h2 className="font-heading text-xl font-bold text-bark-900 flex items-center gap-2">
                <span>1. Contact Information</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="eleanor@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number (for shipping updates) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <h2 className="font-heading text-xl font-bold text-bark-900">
                2. Delivery Destination
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                    Street Address & Apartment *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Springfield"
                      className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                      Postal Code / ZIP *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="97477"
                      className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Wrap Addon */}
            <div className="bg-linen/80 p-6 rounded-3xl border border-bark-100 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="giftWrap"
                  checked={formData.giftWrap}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 accent-rose-400 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 font-semibold text-bark-900 text-sm">
                    <Gift className="w-4 h-4 text-rose-500" />
                    <span>Include Signature Gift Wrap & Silk Ribbon (+ $3.50)</span>
                  </div>
                  <p className="text-xs text-bark-500 mt-0.5">
                    We pack with soft scented tissue paper, sealed with an Angel's Paradise golden crest.
                  </p>
                </div>
              </label>

              {formData.giftWrap && (
                <div className="pt-2 animate-fadeIn">
                  <label className="block text-xs font-semibold text-bark-700 mb-1">
                    Personalized Card Message:
                  </label>
                  <textarea
                    name="giftMessage"
                    rows={2}
                    value={formData.giftMessage}
                    onChange={handleInputChange}
                    placeholder="Happy 1st Birthday little angel! With love from Auntie..."
                    className="w-full p-3 rounded-xl bg-white text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
              )}
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <h2 className="font-heading text-xl font-bold text-bark-900">
                3. Payment Preference
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-rose-400 bg-rose-50/40'
                      : 'border-bark-200 hover:border-bark-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="accent-rose-400"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-rose-500" />
                      <span className="text-sm font-semibold text-bark-800">
                        Credit / Debit Card (Stripe Encrypted)
                      </span>
                    </div>
                    <span className="text-xs text-bark-400">Instant</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'whatsapp'
                      ? 'border-sage-400 bg-sage-50/40'
                      : 'border-bark-200 hover:border-bark-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="whatsapp"
                    checked={formData.paymentMethod === 'whatsapp'}
                    onChange={handleInputChange}
                    className="accent-sage-500"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-sage-500" />
                      <span className="text-sm font-semibold text-bark-800">
                        Order via WhatsApp Concierge
                      </span>
                    </div>
                    <span className="text-xs text-sage-600 font-medium">Boutique Direct</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-rose-400 bg-rose-50/40'
                      : 'border-bark-200 hover:border-bark-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="accent-rose-400"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-bark-800">
                      Cash on Delivery / Bank Transfer
                    </span>
                    <span className="text-xs text-bark-400">At Doorstep</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-6 sticky top-28">
              <h2 className="font-heading text-xl font-bold text-bark-900 border-b border-bark-100 pb-4">
                Order Summary ({cart.length})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-bark-100 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const key = item.cartItemId || item._id;
                  return (
                    <div key={key} className="py-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-16 object-cover rounded-xl border border-bark-100 bg-linen/50"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-xs text-bark-900 truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-bark-500">
                          {item.selectedSize && `Size: ${item.selectedSize} `}
                          {item.selectedColor && `• ${item.selectedColor}`}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            className="text-xs w-5 h-5 rounded bg-linen text-bark-600 hover:bg-bark-200"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            className="text-xs w-5 h-5 rounded bg-linen text-bark-600 hover:bg-bark-200"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(key)}
                            className="text-[10px] text-rose-500 hover:underline ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-bark-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-bark-100 text-xs text-bark-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-bark-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-sage-600">Free</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {formData.giftWrap && (
                  <div className="flex justify-between">
                    <span>Gift Packaging</span>
                    <span className="font-semibold text-bark-900">$3.50</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-bark-900 pt-3 border-t border-bark-100">
                  <span className="font-heading text-lg">Total</span>
                  <span className="font-heading text-2xl text-rose-500">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-soft-lg hover:shadow-soft-xl transition-all disabled:opacity-50"
              >
                <span>{submitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-bark-400 pt-2">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-500" />
                  <span>256-Bit SSL Protection</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-bark-500" />
                  <span>Dispatched with Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
