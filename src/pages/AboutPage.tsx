import React, { useEffect, useState } from 'react';
import { BoutiqueSpinner } from '../components/BoutiqueLoader';
import { Heart, Sparkles, ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BusinessInfo {
  name: string;
  tagline?: string;
  about?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

const AboutPage: React.FC = () => {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <BoutiqueSpinner message="Loading our story..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-500 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Heritage & Values</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-bark-900">
          The Story of Angel's Paradise
        </h1>
        <p className="text-base text-bark-500">
          {info?.tagline || "Handcrafted Elegance for Childhood's Most Treasured Moments"}
        </p>
      </div>

      {/* Founder & Story Section */}
      <div className="bg-white rounded-4xl p-8 sm:p-12 border border-bark-100 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Properly Proportioned Founder / Brand Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-80 rounded-t-[6rem] rounded-b-3xl overflow-hidden shadow-soft-lg border-4 border-white bg-linen">
              <img
                src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg"
                alt="Angel's Paradise Founder and Daughter"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shadow-soft">
                <Heart className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="md:col-span-7 space-y-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bark-900 leading-snug">
              Every Little Girl Deserves to Feel Cherished & Free.
            </h2>
            <p className="text-sm sm:text-base text-bark-600 leading-relaxed">
              {info?.about ||
                "Angel’s Paradise was born from a mother’s search for baby clothing that didn't compromise between beauty and gentleness. We noticed that high-street occasion dresses were frequently made of synthetic scratchy tulles that left toddlers fussy and irritable."}
            </p>
            <p className="text-sm sm:text-base text-bark-600 leading-relaxed">
              We set out to create pieces tailored with natural cotton linings, delicate lace, and smooth interior seams. When a child is comfortable, their radiant joy becomes the most beautiful outfit in the room.
            </p>

            <div className="pt-4 border-t border-bark-100 flex flex-wrap gap-4 text-xs text-bark-600">
              {info?.contactEmail && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  <span>{info.contactEmail}</span>
                </div>
              )}
              {info?.contactPhone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sage-500" />
                  <span>{info.contactPhone}</span>
                </div>
              )}
              {info?.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-bark-400" />
                  <span>{info.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Our 3 Guiding Promises */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linen/60 p-8 rounded-3xl border border-bark-100 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center shadow-soft">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-bark-900">
            Gentle Against Delicate Skin
          </h3>
          <p className="text-xs sm:text-sm text-bark-500 leading-relaxed">
            We banish stiff back-labels and scratchy synthetics. Only breathable, baby-safe fabrics touch your little one.
          </p>
        </div>

        <div className="bg-linen/60 p-8 rounded-3xl border border-bark-100 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white text-sage-600 flex items-center justify-center shadow-soft">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-bark-900">
            Built for Real Childhood
          </h3>
          <p className="text-xs sm:text-sm text-bark-500 leading-relaxed">
            Dresses designed for running on grass, twirling in living rooms, and enduring the washing cycle with grace.
          </p>
        </div>

        <div className="bg-linen/60 p-8 rounded-3xl border border-bark-100 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white text-gold flex items-center justify-center shadow-soft">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-bark-900">
            Keepsake Milestone Memories
          </h3>
          <p className="text-xs sm:text-sm text-bark-500 leading-relaxed">
            Outfits worthy of being preserved in memory boxes or handed down tenderly to younger siblings.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-voile border border-rose-200/80 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-soft">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-bark-900">
          Ready to Dress Your Little Angel?
        </h3>
        <p className="text-sm text-bark-500 max-w-md mx-auto">
          Explore our current seasonal collection of princess dresses, floral sets, and hair bows.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft transition-colors"
          >
            <span>Explore the Boutique</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
