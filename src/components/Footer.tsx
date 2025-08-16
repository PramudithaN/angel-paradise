import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail, MapPin, Facebook, Instagram, Baby } from 'lucide-react';

interface BusinessInfo {
  name?: string;
  tagline?: string;
  about?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

const Footer = () => {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/business-info');
        const data = await res.json();
        setInfo(data);
      } catch {
        setInfo(null);
      }
    };
    fetchInfo();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-t-2 border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-200 p-2 rounded-full">
                <Baby className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-600">{info?.name || "Angel's Paradise"}</h3>
                <p className="text-sm text-orange-400">{info?.tagline || "Little Girl's Fashion"}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {info?.about || "Your trusted destination for adorable, high-quality clothing and accessories for little angels."}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="space-y-3">
              {info?.contactPhone && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{info.contactPhone}</span>
                </div>
              )}
              {info?.contactEmail && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{info.contactEmail}</span>
                </div>
              )}
              {info?.address && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{info.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-600 hover:text-yellow-500 text-sm transition-colors duration-200">Shop</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-yellow-500 text-sm transition-colors duration-200">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-yellow-500 text-sm transition-colors duration-200">Contact</a></li>
              <li><a href="/privacy" className="text-gray-600 hover:text-yellow-500 text-sm transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-yellow-500 text-sm transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {info?.facebook && (
                <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {info?.instagram && (
                <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {info?.whatsapp && (
                <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-orange-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2025 {info?.name || "Angel's Paradise"}. All rights reserved. Made with ❤️ for little angels everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;