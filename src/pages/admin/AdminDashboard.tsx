import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Star, Users, TrendingUp, Eye, MessageCircle, Baby, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    {
      title: 'Total Products',
      value: '48',
      change: '+12%',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Orders This Month',
      value: '156',
      change: '+23%',
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      title: 'Customer Reviews',
      value: '89',
      change: '+8%',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Active Customers',
      value: '324',
      change: '+15%',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  const recentOrders = [
    { id: '001', customer: 'Sarah Johnson', product: 'Pink Princess Dress', amount: '$29.99', status: 'Processing' },
    { id: '002', customer: 'Maria Garcia', product: 'Floral Romper Set', amount: '$19.99', status: 'Shipped' },
    { id: '003', customer: 'Emily Chen', product: 'Angel Wings Tutu', amount: '$24.99', status: 'Delivered' },
    { id: '004', customer: 'Lisa Wang', product: 'Sweet Dreams Sleepwear', amount: '$16.99', status: 'Processing' },
  ];

  const topProducts = [
    { name: 'Pink Princess Dress', sales: 23, revenue: '$689.77' },
    { name: 'Floral Romper Set', sales: 19, revenue: '$379.81' },
    { name: 'Angel Wings Tutu', sales: 16, revenue: '$399.84' },
    { name: 'Hair Accessories Set', sales: 14, revenue: '$181.86' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-pink-100 to-yellow-100 p-2 rounded-lg">
                <Baby className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Angel's Paradise Admin</h1>
                <p className="text-sm text-gray-500">Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">View Store</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
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
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-orange-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                View Analytics
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Manage Products</h3>
            <p className="text-orange-100 text-sm">Add, edit, and organize your product catalog</p>
          </Link>

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <MessageCircle className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Customer Support</h3>
            <p className="text-green-100 text-sm">Handle customer inquiries via WhatsApp</p>
          </a>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer">
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">View Analytics</h3>
            <p className="text-blue-100 text-sm">Track sales performance and insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;