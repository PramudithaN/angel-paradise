import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';
import { BoutiqueSpinner } from '../components/BoutiqueLoader';
import Swal from 'sweetalert2';

interface BusinessInfo {
  name?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  whatsapp?: string;
}

const ContactPage: React.FC = () => {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/business-info`);
        const data = await res.json();
        setInfo(data);
      } catch {
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [API_BASE]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      Swal.fire({
        icon: 'success',
        title: 'Message Received',
        text: 'Thank you for reaching out! Our boutique concierge will respond within 24 hours.',
        confirmButtonColor: '#E28C97',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <BoutiqueSpinner message="Loading concierge..." />
      </div>
    );
  }

  const phone = info?.contactPhone || '+94 71 305 2556';
  const email = info?.contactEmail || 'hello@angelsparadise.com';
  const address = info?.address || 'Colombo, Sri Lanka';
  const wa = info?.whatsapp || '94713052556';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-500 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Boutique Concierge</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-bark-900">
          We'd Love to Hear From You
        </h1>
        <p className="text-sm sm:text-base text-bark-500">
          Have sizing questions, custom order requests, or gift packaging inquiries? Our dedicated client care team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information Cards (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bark-100 shadow-soft space-y-6">
            <h2 className="font-heading text-xl font-bold text-bark-900">
              Direct Contact
            </h2>

            <div className="space-y-5 text-sm text-bark-600">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-bark-400 block">
                    Phone / Inquiries
                  </span>
                  <span className="font-semibold text-bark-800">{phone}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-bark-400 block">
                    Email Support
                  </span>
                  <span className="font-semibold text-bark-800">{email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-bark-400 block">
                    Boutique Location
                  </span>
                  <span className="font-semibold text-bark-800">{address}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="pt-4 border-t border-bark-100">
              <a
                href={`https://wa.me/${wa}?text=${encodeURIComponent(
                  "Hello Angel's Paradise! I have a question regarding sizes and availability."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-sage-50 hover:bg-sage-100 text-sage-600 border border-sage-200 text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-soft"
              >
                <MessageCircle className="w-4 h-4 text-sage-500" />
                <span>Chat Live on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Send a Message Form (Col 7) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-bark-100 shadow-soft">
            <h2 className="font-heading text-2xl font-bold text-bark-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-bark-500 mb-6">
              Fill out the form below and we will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Miller"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Sizing advice for 1st birthday dress"
                  className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-bark-700 uppercase tracking-wider mb-1.5">
                  Your Inquiry / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help your little angel?"
                  className="w-full p-3.5 rounded-xl bg-voile text-bark-800 text-xs border border-bark-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs flex items-center justify-center space-x-2 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sending ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
