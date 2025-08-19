/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AnalyticsPage: React.FC = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSalesData([
        { label: 'Jan', value: 120 },
        { label: 'Feb', value: 180 },
        { label: 'Mar', value: 150 },
        { label: 'Apr', value: 210 },
        { label: 'May', value: 170 },
        { label: 'Jun', value: 230 },
      ]);
      setTopProducts([
        { name: 'Pink Princess Dress', sales: 23 },
        { name: 'Floral Romper Set', sales: 19 },
        { name: 'Angel Wings Tutu', sales: 16 },
        { name: 'Hair Accessories Set', sales: 14 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Overview</h1>
          <Link to="/admin" className="text-orange-600 hover:text-orange-700 text-sm font-medium">Back to Dashboard</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales</h2>
          <Spin spinning={loading}>
            <div className="flex items-end gap-4 h-48">
              {salesData.map((d) => (
                <div key={d.label} className="flex flex-col items-center flex-1">
                  <div
                    className="w-8 rounded-t-lg bg-gradient-to-t from-orange-400 to-pink-300 shadow-md"
                    style={{ height: `${d.value}px` }}
                  ></div>
                  <span className="mt-2 text-xs text-gray-500">{d.label}</span>
                </div>
              ))}
            </div>
          </Spin>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
          <Spin spinning={loading}>
            <ul className="divide-y divide-slate-100">
              {topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">
                      #{i + 1}
                    </div>
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{p.sales} sales</span>
                </li>
              ))}
            </ul>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
