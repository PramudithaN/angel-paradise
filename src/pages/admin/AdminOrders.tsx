import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Filter, MessageCircle, MapPin, Gift, Phone, CheckCircle2, Clock, Truck, XCircle, ArrowLeft } from 'lucide-react';
import { AdminNav } from '../../components/admin/AdminNav';
import { BoutiqueSpinner } from '../../components/BoutiqueLoader';
import Swal from 'sweetalert2';

interface OrderItem {
  productId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  sizes?: string[];
  colors?: string[];
  category?: string;
}

interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: string;
  paymentId?: string;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [API_BASE]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `Order status changed to ${newStatus}.`,
          timer: 1400,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          background: '#FAF7F2',
          color: '#261E18',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update order status.',
        confirmButtonColor: '#E28C97',
      });
    }
  };

  const getStatusBadge = (status: string = 'pending') => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'delivered':
        return 'bg-sage-50 text-sage-700 border-sage-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'pending':
      default:
        return 'bg-gold-light text-gold-dark border-gold/30';
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'All' && order.status?.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchUser = order.user?.toLowerCase().includes(q);
      const matchId = order._id?.toLowerCase().includes(q);
      const matchAddress = order.shippingAddress?.toLowerCase().includes(q);
      if (!matchUser && !matchId && !matchAddress) return false;
    }
    return true;
  });

  const extractPhone = (shippingAddress: string = '') => {
    const match = shippingAddress.match(/Phone:\s*([^\s|]+)/i);
    return match ? match[1] : '';
  };

  return (
    <div className="min-h-screen bg-voile text-bark-900 pb-16">
      <AdminNav subtitle="Customer Orders & Fulfillment Hub" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bark-100">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-1">
              Fulfillment Desk
            </span>
            <h1 className="font-heading text-3xl font-bold text-bark-900">
              Orders Management
            </h1>
            <p className="text-sm text-bark-500 mt-0.5">
              Track customer packages, update dispatch stages, and manage gift wrapping.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  statusFilter === status
                    ? 'bg-rose-400 text-white shadow-soft'
                    : 'bg-white text-bark-700 hover:bg-linen border border-bark-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-bark-100 shadow-soft flex items-center gap-3">
          <Search className="w-4 h-4 text-bark-400 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by buyer name, order ID, or address..."
            className="flex-1 bg-transparent text-bark-800 text-xs focus:outline-none placeholder:text-bark-400"
          />
        </div>

        {/* Orders Table or Detail Modal */}
        <div className="bg-white rounded-3xl border border-bark-100 shadow-soft p-6 sm:p-8">
          {loading ? (
            <BoutiqueSpinner message="Retrieving orders..." />
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <ShoppingBag className="w-10 h-10 text-bark-300 mx-auto" />
              <h3 className="font-heading text-lg font-bold text-bark-800">
                No orders match your filter
              </h3>
              <p className="text-xs text-bark-400">
                Try selecting a different status pill or clear your search term.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-bark-100 text-bark-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3 pl-2">Order</th>
                    <th className="pb-3">Buyer & Contact</th>
                    <th className="pb-3">Items & Variants</th>
                    <th className="pb-3">Gift Wrap</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 pr-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bark-100 text-bark-700">
                  {filteredOrders.map((order) => {
                    const phone = extractPhone(order.shippingAddress);
                    const isGift = order.shippingAddress?.includes('[Gift Wrapped:');

                    return (
                      <tr key={order._id} className="hover:bg-voile/60 transition-colors">
                        <td className="py-4 pl-2 font-mono text-[11px] text-bark-500">
                          #{order._id.slice(-6)}
                          <span className="block text-[10px] text-bark-400 mt-0.5 font-sans">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-4">
                          <span className="font-semibold text-bark-900 block max-w-[180px] truncate">
                            {order.user}
                          </span>
                          <span className="text-[11px] text-bark-500 block max-w-[180px] truncate">
                            {order.shippingAddress?.split('|')[0]}
                          </span>
                        </td>

                        <td className="py-4">
                          <div className="space-y-1">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="font-semibold">{item.quantity}x</span>
                                <span className="text-bark-900 font-medium">{item.name}</span>
                                {item.sizes && item.sizes.length > 0 && (
                                  <span className="px-1.5 py-0.5 rounded bg-linen text-[10px] font-semibold text-bark-700">
                                    {item.sizes[0]}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4">
                          {isGift ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              <Gift className="w-3 h-3 text-rose-500" />
                              <span>Gift Wrapped</span>
                            </span>
                          ) : (
                            <span className="text-bark-400 text-[11px]">Standard</span>
                          )}
                        </td>

                        <td className="py-4 font-bold text-bark-900 text-sm">
                          ${Number(order.total).toFixed(2)}
                        </td>

                        <td className="py-4">
                          <select
                            value={order.status?.toLowerCase() || 'pending'}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border focus:outline-none cursor-pointer ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>

                        <td className="py-4 pr-2 text-right">
                          <div className="inline-flex items-center gap-2">
                            {phone && (
                              <a
                                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hello! This is Angel's Paradise regarding your order #${order._id.slice(-6)}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-sage-50 text-sage-600 hover:bg-sage-100 transition-colors"
                                title="Contact customer on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 rounded-xl bg-linen hover:bg-linen-hover text-bark-800 text-xs font-medium transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark-900/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl border border-bark-100 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-bark-100 pb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-bark-900">
                    Order #{selectedOrder._id.slice(-6)}
                  </h3>
                  <span className="text-xs text-bark-400">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-bark-400 hover:text-bark-700 rounded-full hover:bg-bark-50"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Recipient Information */}
              <div className="space-y-2 bg-linen/50 p-4 rounded-2xl text-xs text-bark-700 border border-bark-100">
                <p>
                  <strong>Recipient:</strong> {selectedOrder.user}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {selectedOrder.shippingAddress}
                </p>
                {selectedOrder.paymentId && (
                  <p>
                    <strong>Payment Reference:</strong> {selectedOrder.paymentId}
                  </p>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-heading font-semibold text-sm text-bark-900">
                  Purchased Garments
                </h4>
                <div className="divide-y divide-bark-100 max-h-48 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-bark-900">{item.name}</span>
                        <div className="text-[11px] text-bark-500">
                          Qty: {item.quantity}{' '}
                          {item.sizes && `• Size: ${item.sizes.join(', ')} `}
                          {item.colors && `• Color: ${item.colors.join(', ')}`}
                        </div>
                      </div>
                      <span className="font-bold text-bark-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Status Selector */}
              <div className="pt-4 border-t border-bark-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-bark-400 block">Total Paid</span>
                  <span className="font-heading text-xl font-bold text-rose-500">
                    ${Number(selectedOrder.total).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-bark-600">Update:</span>
                  <select
                    value={selectedOrder.status?.toLowerCase() || 'pending'}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-bark-200 bg-voile text-bark-800"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;
