import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle, Baby } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/50 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-orange-200 to-orange-200 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Baby className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Angel's Paradise
              </h1>
              <p className="text-xs text-orange-400 -mt-1">Little Girl's Fashion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-orange-500 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/shop" className="text-gray-800 hover:text-orange-500 font-medium transition-colors duration-200 relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-orange-500 font-medium transition-colors duration-200 relative group flex items-center gap-1">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-orange-500 font-medium transition-colors duration-200 relative group flex items-center gap-1">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* WhatsApp Button */}
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 shadow-lg">
          <nav className="px-4 py-6 space-y-4">
            <Link
              to="/"
              className="block text-gray-800 hover:text-orange-500 font-medium py-2 border-b border-orange-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-800 hover:text-orange-500 font-medium py-2 border-b border-orange-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-800 hover:text-orange-500 font-medium py-2 border-b border-orange-50 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-gray-800 hover:text-orange-500 font-medium py-2 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;