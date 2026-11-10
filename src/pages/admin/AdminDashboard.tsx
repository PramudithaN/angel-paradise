import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Star, DollarSign, Plus, ArrowRight, Clock, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { AdminNav } from '../../components/admin/AdminNav';
import { BoutiqueSpinner } from '../../components/BoutiqueLoader';

interface Order {
  _id: string;
  user: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    sizes?: string[];
    colors?: string[];
  }>;
  total: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch orders
        const ordersRes = await fetch(`${API_BASE}/api/orders`);
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          if (Array.isArray(ordersData)) setOrders(ordersData);
        }

        // Fetch products
        const productsRes = await fetch(`${API_BASE}/api/products`);
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          if (Array.isArray(productsData)) setProductCount(productsData.length);
        }

        // Fetch reviews
        const reviewsRes = await fetch(`${API_BASE}/api/reviews/angel-paradise-community`);
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          if (Array.isArray(reviewsData)) setReviewCount(reviewsData.length);
        }
      } catch (err) {
        console.error('Failed to load studio metrics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE]);

  // Derived metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const pendingOrders = orders.filter((o) => o.status?.toLowerCase() === 'pending');
  const recentOrders = orders.slice(0, 5);

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

  return (
    <div className="min-h-screen bg-voile text-bark-900 pb-16">
      <AdminNav subtitle="Studio Operations & Performance" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bark-100">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-1">
              Store Owner Overview
            </span>
            <h1 className="font-heading text-3xl font-bold text-bark-900">
              Welcome back to your Studio
            </h1>
            <p className="text-sm text-bark-500 mt-0.5">
              Review current orders, manage pieces in your collection, and coordinate fulfillments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Piece</span>
            </Link>
            <Link
              to="/admin/orders"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white hover:bg-linen text-bark-800 border border-bark-200 font-medium text-xs shadow-soft transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              <span>All Orders ({orders.length})</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className="bg-white p-6 rounded-3xl border border-bark-100 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-bark-400">
                Gross Sales
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-heading text-2xl font-bold text-bark-900">
                ${totalRevenue.toFixed(2)}
              </h3>
              <p className="text-[11px] text-bark-400">Total customer orders placed</p>
            </div>
          </div>

          {/* Pending Fulfillment */}
          <div className="bg-white p-6 rounded-3xl border border-bark-100 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-bark-400">
                Needs Packing
              </span>
              <div className="w-9 h-9 rounded-xl bg-gold-light text-gold-dark flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-heading text-2xl font-bold text-bark-900">
                {pendingOrders.length}
              </h3>
              <p className="text-[11px] text-rose-500 font-medium">
                {pendingOrders.length > 0 ? 'Orders awaiting fulfillment' : 'All caught up!'}
              </p>
            </div>
          </div>

          {/* Total Pieces */}
          <div className="bg-white p-6 rounded-3xl border border-bark-100 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-bark-400">
                Active Catalog
              </span>
              <div className="w-9 h-9 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-heading text-2xl font-bold text-bark-900">
                {productCount} Pieces
              </h3>
              <p className="text-[11px] text-bark-400">Garments, sets & hair ribbons</p>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white p-6 rounded-3xl border border-bark-100 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-bark-400">
                Parent Feedback
              </span>
              <div className="w-9 h-9 rounded-xl bg-linen text-gold flex items-center justify-center">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-heading text-2xl font-bold text-bark-900">
                {reviewCount} Reviews
              </h3>
              <p className="text-[11px] text-bark-400">Verified buyer community thoughts</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-3xl border border-bark-100 shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-bark-900">
                Recent Orders
              </h2>
              <p className="text-xs text-bark-400 mt-0.5">
                The latest requests placed through the storefront or WhatsApp concierge.
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <span>Manage all orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <BoutiqueSpinner message="Loading orders..." />
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-12 bg-voile rounded-2xl border border-bark-100 space-y-2">
              <ShoppingBag className="w-8 h-8 text-bark-300 mx-auto" />
              <p className="text-sm font-semibold text-bark-800">No orders placed yet</p>
              <p className="text-xs text-bark-400">
                New customer orders will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-bark-100 text-bark-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3 pl-2">Order ID</th>
                    <th className="pb-3">Buyer</th>
                    <th className="pb-3">Items Purchased</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bark-100 text-bark-700">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-voile/60 transition-colors">
                      <td className="py-4 pl-2 font-mono text-[11px] text-bark-400">
                        #{order._id ? order._id.slice(-6) : 'ORD'}
                      </td>
                      <td className="py-4">
                        <span className="font-semibold text-bark-900 block truncate max-w-[160px]">
                          {order.user || 'Customer'}
                        </span>
                        <span className="text-[10px] text-bark-400 block truncate max-w-[160px]">
                          {order.shippingAddress?.split('|')[0] || ''}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="space-y-0.5">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-xs">
                              {item.quantity}x {item.name}{' '}
                              {item.sizes && item.sizes.length > 0 && (
                                <span className="text-[10px] text-bark-400">
                                  ({item.sizes[0]})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 font-bold text-bark-900">
                        ${Number(order.total).toFixed(2)}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <Link
                          to="/admin/orders"
                          className="px-3 py-1.5 rounded-lg bg-linen text-bark-800 hover:bg-linen-hover font-medium transition-colors text-xs"
                        >
                          Fulfill
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
