import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdminNav } from '../../components/admin/AdminNav';
import { BoutiqueSpinner } from '../../components/BoutiqueLoader';
import Swal from 'sweetalert2';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    businessName: "Angel's Paradise",
    tagline: "Little Girl's Boutique & Accessories",
    phone: "+94 71 305 2556",
    email: "hello@angelsparadise.com",
    address: "Colombo, Sri Lanka",
    whatsapp: "94713052556",
    facebook: "https://facebook.com/angelsparadise",
    instagram: "https://instagram.com/angelsparadise",
    aboutText:
      "Angel’s Paradise was born from a mother’s search for baby clothing that didn't compromise between beauty and gentleness. We craft tender, heirloom-quality clothing designed for cherished moments and sensitive skin.",
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/business-info`);
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') {
            setSettings((prev) => ({
              ...prev,
              businessName: data.name || prev.businessName,
              tagline: data.tagline || prev.tagline,
              phone: data.contactPhone || prev.phone,
              email: data.contactEmail || prev.email,
              address: data.address || prev.address,
              whatsapp: data.whatsapp || prev.whatsapp,
              facebook: data.facebook || prev.facebook,
              instagram: data.instagram || prev.instagram,
              aboutText: data.about || prev.aboutText,
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load studio settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [API_BASE]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      name: settings.businessName,
      tagline: settings.tagline,
      about: settings.aboutText,
      contactEmail: settings.email,
      contactPhone: settings.phone,
      address: settings.address,
      whatsapp: settings.whatsapp,
      facebook: settings.facebook,
      instagram: settings.instagram,
    };

    try {
      const res = await fetch(`${API_BASE}/api/business-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Settings Saved',
          text: 'Storefront details and WhatsApp concierge updated successfully.',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          background: '#FAF7F2',
          color: '#261E18',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: 'Could not update settings in database.',
        confirmButtonColor: '#E28C97',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-voile text-bark-900 pb-16">
      <AdminNav subtitle="Studio Configuration & WhatsApp Concierge" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="pb-2 border-b border-bark-100">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-1">
            Storefront Settings
          </span>
          <h1 className="font-heading text-3xl font-bold text-bark-900">
            Boutique Information & Channels
          </h1>
          <p className="text-sm text-bark-500 mt-0.5">
            Configure how your brand details, story, and WhatsApp concierge appear to customers.
          </p>
        </div>

        {loading ? (
          <BoutiqueSpinner message="Retrieving studio profile..." />
        ) : (
          <form onSubmit={handleSave} className="space-y-8 text-xs">
            {/* 1. Identity */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <h2 className="font-heading text-xl font-bold text-bark-900">
                1. Boutique Identity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Studio / Store Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={settings.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={settings.tagline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Our Story & Brand Philosophy (displayed on /about & footer)
                  </label>
                  <textarea
                    rows={4}
                    name="aboutText"
                    value={settings.aboutText}
                    onChange={handleInputChange}
                    className="w-full p-3.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* 2. WhatsApp & Live Concierge */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-sage-500" />
                <h2 className="font-heading text-xl font-bold text-bark-900">
                  2. WhatsApp Concierge Routing
                </h2>
              </div>
              <p className="text-bark-500 text-xs">
                When mothers and gift buyers click "Order via WhatsApp" or "Inquire on WhatsApp", their message opens a chat with this phone number.
              </p>
              <div>
                <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                  WhatsApp Number (with country code, no + or spaces) *
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  required
                  value={settings.whatsapp}
                  onChange={handleInputChange}
                  placeholder="e.g. 94713052556"
                  className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>
            </div>

            {/* 3. Contact & Studio Location */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <h2 className="font-heading text-xl font-bold text-bark-900">
                3. Direct Inquiries & Channels
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Client Care Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={settings.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Client Care Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Physical Studio Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>
            </div>

            {/* 4. Social Links */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-4">
              <h2 className="font-heading text-xl font-bold text-bark-900">
                4. Social Media Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={settings.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1.5">
                    Facebook Page URL
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={settings.facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft hover:shadow-soft-lg transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;
