import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Facebook, Instagram, Heart, Sparkles } from 'lucide-react';

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
}

const Footer: React.FC = () => {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/business-info`);
        const data = await res.json();
        setInfo(data);
      } catch {
        setInfo(null);
      }
    };
    fetchInfo();
  }, [API_BASE]);

  return (
    <footer className="bg-linen/70 border-t border-bark-100 text-bark-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-bark-200/60">
          {/* Brand Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-heading font-bold text-lg italic shadow-soft">
                A
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-bark-900">
                  {info?.name || "Angel's Paradise"}
                </h3>
                <p className="text-xs text-rose-400 font-medium tracking-wide">
                  {info?.tagline || "Little Girl's Boutique"}
                </p>
              </div>
            </div>
            <p className="text-sm text-bark-500 leading-relaxed">
              {info?.about ||
                "Created with pure devotion for dressing little angels. We craft and curate tender, heirloom-quality clothing designed for cherished moments and sensitive skin."}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-bark-400">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Certified child-safe fabrics & gentle dyes</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-semibold text-bark-900 tracking-tight">
              Boutique
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-bark-600 hover:text-rose-500 transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dresses" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Princess Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Rompers" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Playsuits & Rompers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Hair & Bows
                </Link>
              </li>
              <li>
                <Link to="/all-reviews" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Customer Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care & Our Story */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-semibold text-bark-900 tracking-tight">
              Client Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Size Guide & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Shipping & Gifting
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-bark-600 hover:text-rose-500 transition-colors">
                  Review Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & WhatsApp */}
          <div className="space-y-4">
            <h4 className="font-heading text-base font-semibold text-bark-900 tracking-tight">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-sm text-bark-600">
              {info?.contactPhone && (
                <div className="flex items-center space-x-2.5">
                  <MessageCircle className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span>{info.contactPhone}</span>
                </div>
              )}
              {info?.contactEmail && (
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{info.contactEmail}</span>
                </div>
              )}
              {info?.address && (
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-bark-400 flex-shrink-0 mt-0.5" />
                  <span>{info.address}</span>
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {info?.whatsapp && (
                <a
                  href={`https://wa.me/${info.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-sage-100 text-sage-600 hover:bg-sage-200 flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {info?.facebook && (
                <a
                  href={info.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {info?.instagram && (
                <a
                  href={info.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-bark-400 gap-4">
          <p>© {new Date().getFullYear()} Angel's Paradise. Handcrafted with care.</p>
          <div className="flex items-center space-x-1 text-bark-500">
            <span>Dressed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current inline" />
            <span>for your little angels</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
