
import React, { useEffect, useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

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
}

const ContactPage = () => {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/business-info');
        const data = await res.json();
        setInfo(data);
      } catch {
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
      <div className="bg-orange-50 rounded-2xl shadow-lg p-8 flex flex-col gap-8">
        {info?.contactPhone && (
          <div className="flex items-center gap-4">
            <PhoneIcon className="w-7 h-7 text-orange-500" />
            <span className="text-lg text-orange-600">{info.contactPhone}</span>
          </div>
        )}
        {info?.contactEmail && (
          <div className="flex items-center gap-4">
            <EnvelopeIcon className="w-7 h-7 text-orange-500" />
            <span className="text-lg text-orange-600">{info.contactEmail}</span>
          </div>
        )}
        {info?.address && (
          <div className="flex items-center gap-4">
            <MapPinIcon className="w-7 h-7 text-orange-500" />
            <span className="text-lg text-orange-600">{info.address}</span>
          </div>
        )}
        {info?.whatsapp && (
          <div className="mt-8 text-center">
            <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow transition">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-6">
          {info?.facebook && (
            <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
              <Facebook className="w-5 h-5" />
            </a>
          )}
          {info?.instagram && (
            <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
