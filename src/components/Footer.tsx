import React from 'react';
import { MessageCircle, Mail, MapPin, Facebook, Instagram, Twitter, Baby } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-yellow-50 border-t-2 border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-pink-200 to-yellow-200 p-2 rounded-full">
                <Baby className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-pink-600">Angel's Paradise</h3>
                <p className="text-sm text-pink-400">Little Girl's Fashion</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted destination for adorable, high-quality clothing and accessories for little angels.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4 text-pink-500" />
                <span className="text-sm">hello@angelsparadise.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm">123 Paradise St, Angel City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-600 hover:text-pink-500 text-sm transition-colors duration-200">Shop</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-pink-500 text-sm transition-colors duration-200">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-pink-500 text-sm transition-colors duration-200">Contact</a></li>
              <li><a href="/privacy" className="text-gray-600 hover:text-pink-500 text-sm transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-pink-500 text-sm transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with us</span>
            </a>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2025 Angel's Paradise. All rights reserved. Made with ❤️ for little angels everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;