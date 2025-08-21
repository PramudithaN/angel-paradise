
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';

interface BusinessInfo {
  name: string;
  tagline?: string;
  about?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

const AboutPage = () => {
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
    return <div className="text-center py-16 text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Spin spinning={loading}>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-8 text-center">{info?.name || "About Our Business"}</h1>
        <div className="bg-orange-50 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <img src="https://images.pexels.com/photos/33435704/pexels-photo-33435704.jpeg" alt="Founder" className="w-4/6 h-40 rounded-full object-cover border-4 border-orange-100 shadow-md mb-6 md:mb-0" />
          <div>
            <h2 className="text-2xl font-heading font-bold text-orange-400 mb-4">{info?.tagline || "Our Story"}</h2>
            <p className="text-zinc-800 text-lg mb-4 leading-relaxed">
              {info?.about || "Angel’s Paradise was born from a mother’s love for her little girl and a passion for beautiful, quality clothing. We believe every child deserves to feel special, and our handpicked collection is designed to bring joy, comfort, and style to your little angels."}
            </p>
            {info?.contactEmail && (
              <p className="text-zinc-800 text-lg leading-relaxed mt-4">
                <span className="font-semibold">Contact us:</span> {info.contactEmail}
              </p>
            )}
            {info?.contactPhone && (
              <p className="text-zinc-800 text-lg leading-relaxed mt-2">
                <span className="font-semibold">Phone:</span> {info.contactPhone}
              </p>
            )}
            {info?.address && (
              <p className="text-zinc-800 text-lg leading-relaxed mt-2">
                <span className="font-semibold">Address:</span> {info.address}
              </p>
            )}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default AboutPage;
