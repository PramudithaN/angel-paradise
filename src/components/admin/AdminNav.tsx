import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, BarChart3, Settings, ExternalLink, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminNavProps {
  title?: string;
  subtitle?: string;
}

export const AdminNav: React.FC<AdminNavProps> = ({
  title = "Boutique Studio Portal",
  subtitle = "Store Operations & Fulfillment",
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Orders & Fulfillment', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory & Pieces', path: '/admin/products', icon: Package },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-voile/90 backdrop-blur-md border-b border-bark-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Studio Header */}
          <div className="flex items-center space-x-3">
            <Link to="/admin" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-heading font-bold text-xl italic shadow-soft group-hover:scale-105 transition-transform">
                A
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-lg text-bark-900 leading-tight">
                    Angel's Paradise
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-linen text-rose-600 border border-rose-200">
                    Studio
                  </span>
                </div>
                <p className="text-xs text-bark-400 font-medium -mt-0.5">{subtitle}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-rose-400 text-white shadow-soft'
                      : 'text-bark-600 hover:text-bark-900 hover:bg-linen'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Secondary Actions (View Storefront + Logout) */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-bark-200 text-bark-700 hover:bg-linen transition-colors shadow-soft"
            >
              <ExternalLink className="w-3.5 h-3.5 text-rose-500" />
              <span>View Storefront</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-bark-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-linen text-bark-700 hover:text-rose-500"
            aria-label="Toggle admin navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-bark-100 px-6 py-5 shadow-lg animate-fadeIn space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-400 text-white shadow-soft'
                    : 'text-bark-700 hover:bg-linen'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-bark-100 flex items-center justify-between">
            <Link
              to="/"
              target="_blank"
              className="text-xs font-semibold text-rose-500 flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Storefront</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-bark-500 hover:text-rose-600 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
