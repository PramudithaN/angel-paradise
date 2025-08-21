/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Star, Users, TrendingUp, Eye, MessageCircle, Baby, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
import { Spin } from 'antd';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const [ordersThisMonth, setOrdersThisMonth] = useState<number | null>(null);
  const [loadingOrdersThisMonth, setLoadingOrdersThisMonth] = useState(true);
  const [customerReviews, setCustomerReviews] = useState<number | null>(null);
  const [loadingCustomerReviews, setLoadingCustomerReviews] = useState(true);
  const [activeCustomers, setActiveCustomers] = useState<number | null>(null);
  const [loadingActiveCustomers, setLoadingActiveCustomers] = useState(true);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [loadingTotalProducts, setLoadingTotalProducts] = useState(true);

  // You can adjust the API endpoint as needed
  useEffect(() => {
    setLoadingOrdersThisMonth(true);
    fetch(`${API_BASE}/api/orders`)
      .then(res => res.json())
      .then((orders) => {
        // Filter orders for the current month
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const ordersInMonth = orders.filter((order: any) => {
          const d = new Date(order.createdAt);
          return d.getMonth() === month && d.getFullYear() === year;
        });
        setOrdersThisMonth(ordersInMonth.length);
      })
      .catch(() => setOrdersThisMonth(null))
      .finally(() => setLoadingOrdersThisMonth(false));
  }, []);

  useEffect(() => {
    setLoadingCustomerReviews(true);
    fetch(`${API_BASE}/api/reviews`)
      .then(res => res.json())
      .then((reviews) => {
        setCustomerReviews(Array.isArray(reviews) ? reviews.length : null);
      })
      .catch(() => setCustomerReviews(null))
      .finally(() => setLoadingCustomerReviews(false));
  }, []);

  useEffect(() => {
    setLoadingActiveCustomers(true);
    fetch(`${API_BASE}/api/orders`)
      .then(res => res.json())
      .then((orders) => {
        // Count unique users who placed orders in the last 30 days
        const now = new Date();
        const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const activeUserSet = new Set(
          orders.filter((order: any) => new Date(order.createdAt) >= last30)
            .map((order: any) => order.user)
        );
        setActiveCustomers(activeUserSet.size);
      })
      .catch(() => setActiveCustomers(null))
      .finally(() => setLoadingActiveCustomers(false));
  }, []);

  useEffect(() => {
    setLoadingTotalProducts(true);
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then((products) => {
        setTotalProducts(Array.isArray(products) ? products.length : null);
      })
      .catch(() => setTotalProducts(null))
      .finally(() => setLoadingTotalProducts(false));
  }, []);

  const stats = [
    {
      title: 'Total Products',
      value: loadingTotalProducts ? null : totalProducts?.toString() ?? '-',
      change: '',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Orders This Month',
      value: loadingOrdersThisMonth ? null : ordersThisMonth?.toString() ?? '-',
      change: '',
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      title: 'Customer Reviews',
      value: loadingCustomerReviews ? null : customerReviews?.toString() ?? '-',
      change: '',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Active Customers',
      value: loadingActiveCustomers ? null : activeCustomers?.toString() ?? '-',
      change: '',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];
  // Test data for development/demo purposes
  // Remove or replace with real API calls in production
  // Uncomment below to use test orders instead of fetching from API

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await fetch(`${API_BASE}/api/orders`);
  //       const data = await res.json();
  //       setRecentOrders(data);
  //     } catch {
  //       setRecentOrders([]);
  //     } finally {
  //       setLoadingOrders(false);
  //     }
  //   };
  //   fetchOrders();
  // }, []);



  useEffect(() => {
    setTimeout(() => {
      setRecentOrders([
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
      setLoadingOrders(false);
    }, 500);
  }, []);

  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loadingTopProducts, setLoadingTopProducts] = useState(true);

  useEffect(() => {
    // Simulate API call for top products
    setTimeout(() => {
      setTopProducts([
        { name: 'Pink Princess Dress', sales: 23, revenue: '$689.77' },
        { name: 'Floral Romper Set', sales: 19, revenue: '$379.81' },
        { name: 'Angel Wings Tutu', sales: 16, revenue: '$399.84' },
        { name: 'Hair Accessories Set', sales: 14, revenue: '$181.86' },
      ]);
      setLoadingTopProducts(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-3 relative">
            {/* Logo and page name */}
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-pink-100 to-yellow-100 p-2 rounded-lg flex-shrink-0">
                  <Baby className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">Angel's Paradise Admin</h1>
                  <p className="text-xs sm:text-sm text-gray-500 leading-tight">Management Dashboard</p>
                </div>
              </div>
              {/* Hamburger menu for mobile */}
              <button
                className="sm:hidden ml-2 p-2 rounded-md text-orange-600 hover:bg-orange-100 focus:outline-none"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {/* Actions: visible on desktop, hidden on mobile */}
            <div className="hidden sm:flex flex-row flex-nowrap gap-4 mt-2 sm:mt-0">
              <Link
                to="/"
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200 px-3 py-2 rounded-md whitespace-nowrap"
              >
                <Eye className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">View Store</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-2 rounded-md whitespace-nowrap"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200 px-3 py-2 rounded-md whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium">Logout</span>
              </button>
            </div>
            {/* Mobile menu overlay */}
            {menuOpen && (
              <div className="fixed inset-0 z-50 flex sm:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setMenuOpen(false)}></div>
                <div className="relative w-56 bg-white shadow-xl h-full z-50 p-6 flex flex-col gap-4">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-orange-600"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200 px-3 py-2 rounded-md whitespace-nowrap"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View Store</span>
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 px-3 py-2 rounded-md whitespace-nowrap"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200 px-3 py-2 rounded-md whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Quick Actions Row */}
        <div className=" mb-6">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/admin/products"')}
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-slate-200 py-3 px-1 hover:bg-orange-50 transition-all"

            >
              <Package className="w-6 h-6 text-orange-500 mb-1" />
              <span className="text-xs font-semibold text-gray-700">Manage Products</span>
            </button>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-slate-200 py-3 px-1 hover:bg-green-50 transition-all"
            >
              <MessageCircle className="w-6 h-6 text-green-500 mb-1" />
              <span className="text-xs font-semibold text-gray-700">Support</span>
            </a>
            <button
              onClick={() => navigate('/admin/analytics')}
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-slate-200 py-3 px-1 hover:bg-blue-50 transition-all"
            >
              <TrendingUp className="w-6 h-6 text-blue-500 mb-1" />
              <span className="text-xs font-semibold text-gray-700">Analytics</span>
            </button>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.title === 'Total Products' && loadingTotalProducts ? (
                      <svg className="animate-spin h-6 w-6 text-blue-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : stat.title === 'Orders This Month' && loadingOrdersThisMonth ? (
                      <svg className="animate-spin h-6 w-6 text-green-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : stat.title === 'Customer Reviews' && loadingCustomerReviews ? (
                      <svg className="animate-spin h-6 w-6 text-yellow-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : stat.title === 'Active Customers' && loadingActiveCustomers ? (
                      <svg className="animate-spin h-6 w-6 text-purple-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : stat.value}
                  </p>
                  <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <button
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                onClick={() => navigate('/admin/orders')}
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              <Spin spinning={loadingOrders}>
                {recentOrders.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">No recent orders found.</div>
                ) : recentOrders.slice(0, 6).map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-5 bg-white my-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 group gap-3 relative overflow-hidden"
                  >
                    {/* User Avatar/Initials */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-yellow-100 flex items-center justify-center text-lg font-bold text-orange-600 shadow-inner border border-white">
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
                    {/* Order Total & Status */}
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
                    {/* Decorative gradient bar on hover */}
                    <div className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </Spin>
            </div>
          </div>

          {/* Top Products - Card Design */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
              <button
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                onClick={() => navigate('/admin/analytics')}
              >
                View Analytics
              </button>
            </div>
            <div className="space-y-4">
              <Spin spinning={loadingTopProducts}>
                {
                  topProducts.map((product, index) => (
                    <div
                      key={product.name}
                      className="flex flex-col md:flex-row md:items-center md:justify-between p-5 bg-white my-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 group gap-3 relative overflow-hidden"
                    >
                      {/* Product Avatar/Rank */}
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-orange-100 flex items-center justify-center text-lg font-bold text-orange-600 shadow-inner border border-white">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900 text-base">{product.name}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M16 11V7a4 4 0 00-8 0v4M5 11h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2z" /></svg>
                            <span>{product.sales} sold</span>
                          </div>
                        </div>
                      </div>
                      {/* Product Revenue */}
                      <div className="flex flex-col items-end min-w-[110px]">
                        <span className="text-lg font-extrabold text-gray-900 bg-gradient-to-r from-orange-100 to-yellow-50 px-3 py-1 rounded-lg shadow-inner">{product.revenue}</span>
                      </div>
                      {/* Decorative gradient bar on hover */}
                      <div className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))
                }
              </Spin>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mobile & Desktop: White card style on mobile, gradient on desktop */}
          <Link
            to="/admin/products"
            className="p-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105
              bg-white text-pink-600 border border-slate-200 hover:bg-pink-50 md:bg-gradient-to-r md:from-pink-500 md:to-pink-600 md:text-white md:border-0 md:hover:from-pink-600 md:hover:to-pink-700"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Manage Products</h3>
            <p className="text-pink-400 md:text-orange-100 text-sm">Add, edit, and organize your product catalog</p>
          </Link>

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105
              bg-white text-green-600 border border-slate-200 hover:bg-green-50 md:bg-gradient-to-r md:from-green-500 md:to-green-600 md:text-white md:border-0 md:hover:from-green-600 md:hover:to-green-700"
          >
            <MessageCircle className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Customer Support</h3>
            <p className="text-green-400 md:text-green-100 text-sm">Handle customer inquiries via WhatsApp</p>
          </a>

          <div
            className="p-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer
              bg-white text-blue-600 border border-slate-200 hover:bg-blue-50 md:bg-gradient-to-r md:from-blue-500 md:to-blue-600 md:text-white md:border-0 md:hover:from-blue-600 md:hover:to-blue-700"
            onClick={() => navigate('/admin/analytics')}
          >
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">View Analytics</h3>
            <p className="text-blue-400 md:text-blue-100 text-sm">Track sales performance and insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;