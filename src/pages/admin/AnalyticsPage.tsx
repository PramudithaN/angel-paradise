import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Package, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { AdminNav } from '../../components/admin/AdminNav';
import { BoutiqueSpinner } from '../../components/BoutiqueLoader';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

const AnalyticsPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/orders`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setOrders(data);
        }
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [API_BASE]);

  // Aggregate monthly sales
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIdx = new Date().getMonth();
  const past6Months = Array.from({ length: 6 }, (_, i) => {
    const idx = (currentMonthIdx - 5 + i + 12) % 12;
    return months[idx];
  });

  const monthlyTotals: { [key: string]: number } = {};
  past6Months.forEach((m) => (monthlyTotals[m] = 0));

  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const m = months[d.getMonth()];
    if (monthlyTotals[m] !== undefined) {
      monthlyTotals[m] += Number(o.total) || 0;
    }
  });

  // Top products
  const productSalesCount: { [key: string]: { count: number; revenue: number } } = {};
  orders.forEach((o) => {
    o.items?.forEach((item) => {
      if (!productSalesCount[item.name]) {
        productSalesCount[item.name] = { count: 0, revenue: 0 };
      }
      productSalesCount[item.name].count += item.quantity || 1;
      productSalesCount[item.name].revenue += (item.price || 0) * (item.quantity || 1);
    });
  });

  const topProducts = Object.entries(productSalesCount)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const maxMonthValue = Math.max(...Object.values(monthlyTotals), 100);

  return (
    <div className="min-h-screen bg-voile text-bark-900 pb-16">
      <AdminNav subtitle="Studio Analytics & Sales Trends" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="pb-2 border-b border-bark-100">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-1">
            Studio Performance
          </span>
          <h1 className="font-heading text-3xl font-bold text-bark-900">
            Sales & Revenue Analytics
          </h1>
          <p className="text-sm text-bark-500 mt-0.5">
            Visualize customer orders, monthly revenue trends, and top beloved outfits.
          </p>
        </div>

        {loading ? (
          <BoutiqueSpinner message="Aggregating sales data..." />
        ) : (
          <div className="space-y-8">
            {/* Monthly Sales Visual */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl font-bold text-bark-900">
                    6-Month Sales Trend
                  </h2>
                  <p className="text-xs text-bark-400 mt-0.5">
                    Gross order volume across the last 6 months.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sage-600 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Real-time Active</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-bark-100">
                {past6Months.map((month) => {
                  const val = monthlyTotals[month] || 0;
                  const heightPercent = Math.max(12, Math.round((val / maxMonthValue) * 100));

                  return (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-bark-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ${val.toFixed(0)}
                      </span>
                      <div
                        className="w-full max-w-[48px] rounded-t-2xl bg-gradient-to-t from-rose-300 to-rose-400 group-hover:from-rose-400 group-hover:to-rose-500 transition-all shadow-soft"
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-xs font-semibold text-bark-700 mt-1">{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Products Table */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-bark-900">
                  Top-Selling Boutique Pieces
                </h2>
                <span className="text-xs text-bark-400">By units purchased</span>
              </div>

              {topProducts.length === 0 ? (
                <div className="text-center py-8 text-xs text-bark-400">
                  No sales recorded yet. Place an order to see pieces appear here.
                </div>
              ) : (
                <div className="divide-y divide-bark-100 text-xs">
                  {topProducts.map((p, idx) => (
                    <div key={p.name} className="py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-bark-400 w-4">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-bark-900 block">{p.name}</span>
                          <span className="text-[11px] text-bark-400">
                            {p.count} units ordered
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-bark-900 text-sm">
                        ${p.revenue.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalyticsPage;
