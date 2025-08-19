/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, use the same test data as AdminDashboard
    setTimeout(() => {
      setOrders([
        {
          _id: 'order1',
          user: 'Alice Smith',
          items: [
            { productId: 'p1', name: 'Pink Princess Dress', quantity: 1 },
            { productId: 'p2', name: 'Floral Romper Set', quantity: 2 }
          ],
          shippingAddress: '123 Main St, Springfield',
          createdAt: new Date().toISOString(),
          total: 129.99,
          status: 'Delivered'
        },
        {
          _id: 'order2',
          user: 'Bob Johnson',
          items: [
            { productId: 'p3', name: 'Angel Wings Tutu', quantity: 1 }
          ],
          shippingAddress: '456 Oak Ave, Metropolis',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          total: 49.99,
          status: 'Shipped'
        },
        {
          _id: 'order3',
          user: 'Carol Lee',
          items: [
            { productId: 'p4', name: 'Hair Accessories Set', quantity: 3 }
          ],
          shippingAddress: '789 Pine Rd, Gotham',
          createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
          total: 39.99,
          status: 'Processing'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
          <Link to="/admin" className="text-orange-600 hover:text-orange-700 text-sm font-medium">Back to Dashboard</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <Spin spinning={loading}>
            {orders.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No orders found.</div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group gap-3 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-yellow-100 flex items-center justify-center text-base font-bold text-orange-600 shadow-inner border border-white">
                        {order.user?.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-base">{order.user}</p>
                          <span className="text-xs text-gray-400">#{order._id}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {order.items && order.items.map((item: any, idx: number) => (
                            <span key={item.productId}>
                              <span className="font-medium text-gray-800">{item.name}</span> <span className="text-gray-400">x{item.quantity}</span>{idx < order.items.length - 1 ? <span className="text-gray-300">,&nbsp;</span> : ''}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          <span>Shipping: {order.shippingAddress}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span>Placed: {new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end min-w-[130px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-extrabold text-gray-900 bg-gradient-to-r from-orange-100 to-yellow-50 px-3 py-1 rounded-lg shadow-inner">${order.total.toFixed(2)}</span>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-orange-700'}
                        `}
                      >
                        {order.status === 'Delivered' && (
                          <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                        {order.status === 'Shipped' && (
                          <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h13M9 21V3m0 0l7 7-7-7z" /></svg>
                        )}
                        {order.status === 'Processing' && (
                          <svg className="w-4 h-4 mr-1 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                        )}
                        {order.status}
                      </span>
                    </div>
                    <div className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
