
const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-8 text-center">About Angel's Paradise</h1>
    <div className="bg-orange-50 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
      <img src="https://images.pexels.com/photos/33435704/pexels-photo-33435704.jpeg" alt="Founder" className="w-4/6 h-40 rounded-full object-cover border-4 border-orange-100 shadow-md mb-6 md:mb-0" />
      <div>
        <h2 className="text-2xl font-heading font-bold text-orange-400 mb-4">Our Story</h2>
        <p className="text-zinc-800 text-lg mb-4 leading-relaxed">
          Angel’s Paradise was born from a mother’s love for her little girl and a passion for beautiful, quality clothing. We believe every child deserves to feel special, and our handpicked collection is designed to bring joy, comfort, and style to your little angels.
        </p>
        <p className="text-zinc-800 text-lg leading-relaxed">
          Thank you for supporting our small business and being a part of our story. We hope you and your little ones love our products as much as we love curating them for you!
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
