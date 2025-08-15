import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ContactPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
    <div className="bg-orange-50 rounded-2xl shadow-lg p-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <PhoneIcon className="w-7 h-7 text-orange-500" />
        <span className="text-lg text-orange">+1 234 567 890</span>
      </div>
      <div className="flex items-center gap-4">
        <EnvelopeIcon className="w-7 h-7 text-orange-500" />
        <span className="text-lg text-orange">hello@angelsparadise.com</span>
      </div>
      <div className="flex items-center gap-4">
        <MapPinIcon className="w-7 h-7 text-orange-500" />
        <span className="text-lg text-orange">123 Angel Lane, Paradise City, Country</span>
      </div>
      <div className="mt-8 text-center">
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-whatsapp hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 003.48 20.52l-1.1 4.02a1 1 0 001.23 1.23l4.02-1.1A12 12 0 1020.52 3.48zm-8.52 17A9 9 0 1119 12a9 9 0 01-7 8.48zm4.29-6.7l-1.2-.6a1 1 0 00-1.1.21l-.26.27a7.07 7.07 0 01-3.18-3.18l.27-.26a1 1 0 00.21-1.1l-.6-1.2a1 1 0 00-1.13-.54A4.5 4.5 0 007 12.5a8.5 8.5 0 008.5 8.5 4.5 4.5 0 00.54-1.13 1 1 0 00-.54-1.13z"/></svg>
          WhatsApp
        </a>
      </div>
    </div>
  </div>
);

export default ContactPage;
