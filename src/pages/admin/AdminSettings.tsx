import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Baby, LogOut, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const AdminSettings = () => {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    businessName: "Angel's Paradise",
    tagline: "Little Girl's Fashion",
    phone: "+1 (234) 567-8900",
    email: "hello@angelsparadise.com",
    address: "123 Paradise St, Angel City",
    whatsapp: "1234567890",
    facebook: "https://facebook.com/angelsparadise",
    instagram: "https://instagram.com/angelsparadise",
    twitter: "https://twitter.com/angelsparadise",
    heroTitle: "The place to find little girl's accessories",
    heroSubtitle: "Discover adorable, high-quality clothing and accessories that make every little angel shine bright",
    aboutText: "Founded with love and passion for dressing little angels, Angel's Paradise has been creating magical moments for families worldwide. We believe every little girl deserves to feel special, comfortable, and beautifully dressed."
  });

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/business-info`);
        if (!res.ok) return;
        const data = await res.json();
        if (!data || typeof data !== 'object') return;
        setSettings(prev => ({
          ...prev,
          businessName: data.name || prev.businessName,
          tagline: data.tagline || prev.tagline,
          phone: data.contactPhone || prev.phone,
          email: data.contactEmail || prev.email,
          address: data.address || prev.address,
          whatsapp: data.whatsapp || prev.whatsapp,
          facebook: data.facebook || prev.facebook,
          instagram: data.instagram || prev.instagram,
          twitter: data.twitter || prev.twitter,
          heroTitle: data.heroTitle || prev.heroTitle,
          heroSubtitle: data.heroSubtitle || prev.heroSubtitle,
          aboutText: data.about || prev.aboutText,
        }));
      } catch (err) {
        console.log(err)

        // Optionally log or show a message
      }
    };
    fetchSettings();
  }, [API_BASE]);

  const [activeTab, setActiveTab] = useState('business');
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/business-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: settings.businessName,
          tagline: settings.tagline,
          about: settings.aboutText,
          contactEmail: settings.email,
          contactPhone: settings.phone,
          address: settings.address,
          whatsapp: settings.whatsapp,
          facebook: settings.facebook,
          instagram: settings.instagram,
          twitter: settings.twitter,
          heroTitle: settings.heroTitle,
          heroSubtitle: settings.heroSubtitle,
        }),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      Swal.fire({ icon: "success", title: "Saved!", text: "Data has been saved." });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to save settings." });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'business', label: 'Business Info', icon: Baby },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'content', label: 'Website Content', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Facebook }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-pink-100 to-orange-100 p-2 rounded-lg">
                  <Baby className="w-5 h-5 text-orange-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Settings</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-700 p-2 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-orange-100 text-orange-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              {/* Business Info Tab */}
              {activeTab === 'business' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={settings.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        name="tagline"
                        value={settings.tagline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About Us Text
                    </label>
                    <textarea
                      name="aboutText"
                      value={settings.aboutText}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Contact Details Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={settings.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Business Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={settings.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number (without +)
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={settings.whatsapp}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Website Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Website Content</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Section Title
                    </label>
                    <input
                      type="text"
                      name="heroTitle"
                      value={settings.heroTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Section Subtitle
                    </label>
                    <textarea
                      name="heroSubtitle"
                      value={settings.heroSubtitle}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Social Media Links</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Facebook className="w-4 h-4 inline mr-2" />
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        name="facebook"
                        value={settings.facebook}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Instagram className="w-4 h-4 inline mr-2" />
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        name="instagram"
                        value={settings.instagram}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Twitter className="w-4 h-4 inline mr-2" />
                        Twitter URL
                      </label>
                      <input
                        type="url"
                        name="twitter"
                        value={settings.twitter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;