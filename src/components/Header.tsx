import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartDrawer from './CartDrawer';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState<string | null>(null);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/business-info`);
        const data = await res.json();
        setWhatsapp(data.whatsapp || '94713052556');
      } catch {
        setWhatsapp('94713052556');
      }
    };
    fetchInfo();
  }, [API_BASE]);

  // Close mobile menu upon navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop Boutique', path: '/shop' },
    { label: 'Our Story', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-voile/85 backdrop-blur-md border-b border-bark-100 transition-all duration-200">
        {/* Subtle Top Notification Bar */}
        <div className="bg-linen py-1.5 px-4 text-center text-xs font-medium text-bark-600 tracking-wide flex items-center justify-center gap-2 border-b border-bark-100">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Curated with love for delicate skin - Handcrafted Little Girl Fashion</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-soft">
                <span className="font-heading font-bold text-xl italic">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl md:text-2xl font-bold tracking-tight text-bark-900 group-hover:text-rose-500 transition-colors">
                  Angel's Paradise
                </span>
                <span className="text-[11px] uppercase tracking-widest text-bark-400 font-medium -mt-1">
                  Little Girl's Boutique
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors py-1 ${
                      isActive
                        ? 'text-rose-500 font-semibold'
                        : 'text-bark-700 hover:text-rose-500'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Bar (WhatsApp + Cart + Mobile Menu) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* WhatsApp Quick Concierge */}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    "Hello Angel's Paradise! I would like to inquire about your little girl collection."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full border border-sage-200 bg-sage-50 text-sage-600 hover:bg-sage-100 hover:border-sage-300 transition-all shadow-soft"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-sage-500" />
                  <span>WhatsApp Inquiry</span>
                </a>
              )}

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 rounded-full text-bark-800 hover:text-rose-500 hover:bg-rose-50/60 transition-all focus:outline-none"
                aria-label={`Open shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-soft animate-scaleIn">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-linen text-bark-700 hover:text-rose-500 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-bark-100 px-6 py-5 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-1 ${
                    location.pathname === link.path
                      ? 'text-rose-500 font-semibold'
                      : 'text-bark-700 hover:text-rose-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    "Hello Angel's Paradise! I would like to inquire about your collection."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 text-sm font-semibold px-4 py-2.5 rounded-full bg-sage-50 text-sage-600 border border-sage-200 mt-2"
                >
                  <MessageCircle className="w-4 h-4 text-sage-500" />
                  <span>WhatsApp Concierge</span>
                </a>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Header;
