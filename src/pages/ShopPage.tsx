import { useState, useMemo, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import { categories, sizes } from '../data/products';

const ShopPage = () => {
  type Product = {
    _id?: string;
    id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    sizes?: string[];
    colors?: string[];
    inStock?: boolean;
    featured?: boolean;
    gallery?: string[];
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minMaxPrice, setMinMaxPrice] = useState<[number, number]>([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        setProducts(data);
        // Automatically set price range based on product data
        if (data.length > 0) {
          const prices = data.map((p: Product) => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinMaxPrice([min, max]);
          setPriceRange([min, max]);
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, [API_BASE]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes && product.sizes.some((size: string) => selectedSizes.includes(size));
        if (!hasMatchingSize) return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSizes, priceRange, searchQuery]);

  // Pagination logic
  const PRODUCTS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSizes, priceRange, searchQuery]);
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setPriceRange([0, 100]);
    setSearchQuery('');
  };
  console.log(products, "Products Info");
  console.log(filteredProducts, "Filtered Products Info");
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Shop Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover adorable clothing and accessories for your little angel
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full bg-orange-500 text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-2 mb-4"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Filter Panel */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-200 ${selectedCategory === category
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-gray-300 group-hover:border-orange-300'
                        }`}>
                        {selectedCategory === category && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                      <span className={`text-sm transition-colors duration-200 ${selectedCategory === category
                        ? 'text-orange-600 font-medium'
                        : 'text-gray-600 group-hover:text-orange-500'
                        }`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedSizes.includes(size)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h4>
                <div className="bg-[#fcf7f2] rounded-xl p-4 shadow-inner">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-base font-medium">${minMaxPrice[0]}</span>
                    <span className="text-gray-600 text-base font-medium">${minMaxPrice[1]}+</span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="range"
                      min={minMaxPrice[0]}
                      max={minMaxPrice[1]}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([minMaxPrice[0], parseInt(e.target.value)])}
                      className="w-full h-2 rounded-full appearance-none bg-orange-200 accent-orange-300 cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ea580c 0%, #ea580c ${(priceRange[1] - minMaxPrice[0]) / (minMaxPrice[1] - minMaxPrice[0]) * 100}%, #333 ${(priceRange[1] - minMaxPrice[0]) / (minMaxPrice[1] - minMaxPrice[0]) * 100}%, #333 100%)`,
                        accentColor: '#ea580c',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {(selectedCategory !== 'All' || selectedSizes.length > 0 || searchQuery) && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'All' && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <span>{selectedCategory}</span>
                      <button onClick={() => setSelectedCategory('All')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedSizes.map(size => (
                    <span key={size} className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <span>{size}</span>
                      <button onClick={() => handleSizeToggle(size)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map(product => {
                    const normalizedProduct = {
                      ...product,
                      id: String(product._id || product.id),
                    };
                    return (
                      <div key={normalizedProduct.id}>
                        <ProductCard
                          product={normalizedProduct}
                          showWhatsAppButton
                          onQuickView={() => setQuickViewProduct(product)}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-orange-100 text-orange-600 font-semibold disabled:opacity-50"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-semibold ${currentPage === page ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-200'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-orange-100 text-orange-600 font-semibold disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={{
            ...quickViewProduct,
            id: String(quickViewProduct._id || quickViewProduct.id),
            sizes: quickViewProduct.sizes ?? [],
            inStock: quickViewProduct.inStock ?? false
          }}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default ShopPage;