import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ProductCardSkeleton } from '../components/BoutiqueLoader';
import ProductCard, { Product } from '../components/ProductCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import { categories, sizes, products as fallbackProducts } from '../data/products';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minMaxPrice, setMinMaxPrice] = useState<[number, number]>([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  // Sync category from URL if present
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        const productList = Array.isArray(data) && data.length > 0 ? data : fallbackProducts;
        setProducts(productList);

        if (productList.length > 0) {
          const prices = productList.map((p: Product) => Number(p.price));
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinMaxPrice([min, max]);
          setPriceRange([min, max]);
        }
      })
      .catch(() => {
        setProducts(fallbackProducts);
        const prices = fallbackProducts.map((p) => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setMinMaxPrice([min, max]);
        setPriceRange([min, max]);
      })
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setPriceRange(minMaxPrice);
    setSearchQuery('');
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize =
          product.sizes && product.sizes.some((size: string) => selectedSizes.includes(size));
        if (!hasMatchingSize) return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Search query
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedSizes, priceRange, searchQuery, sortBy]);

  // Pagination logic
  const PRODUCTS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSizes, priceRange, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-500 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handcrafted Collection</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-bark-900">
          The Boutique Wardrobe
        </h1>
        <p className="text-sm sm:text-base text-bark-500">
          Delicate fabrics, breathable weaves, and joyful styles designed to make childhood memories shine.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-soft ${
              selectedCategory === cat
                ? 'bg-rose-400 text-white shadow-soft-lg scale-105'
                : 'bg-white text-bark-700 hover:bg-linen border border-bark-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search, Filter Toggle & Sort Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-bark-100 shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bark-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dresses, rompers, tutus..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full bg-voile text-bark-800 text-xs placeholder:text-bark-400 border border-bark-100 focus:outline-none focus:border-rose-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bark-400 hover:text-bark-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Trigger & Sort Options */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center space-x-2 border transition-all ${
              showFilters || selectedSizes.length > 0
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-voile border-bark-100 text-bark-700 hover:bg-linen'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {selectedSizes.length > 0 ? `(${selectedSizes.length})` : ''}</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2.5 rounded-full bg-voile text-bark-700 text-xs font-medium border border-bark-100 focus:outline-none focus:border-rose-400"
          >
            <option value="featured">Featured Outfits</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Expanded Filter Drawer / Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-3xl border border-bark-100 shadow-soft animate-fadeIn space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-bark-100">
            <h3 className="font-heading font-semibold text-base text-bark-900">
              Refine by Size & Budget
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-500 hover:text-rose-600 underline font-medium"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Size Chips */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-bark-800 mb-3">
                Child Age / Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedSizes.includes(size)
                        ? 'bg-rose-400 text-white border-rose-400 shadow-soft'
                        : 'bg-voile text-bark-700 border-bark-200 hover:border-rose-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-bark-800">
                  Maximum Price:
                </label>
                <span className="text-xs font-bold text-rose-500">
                  ${priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min={minMaxPrice[0]}
                max={minMaxPrice[1] || 100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-bark-400 mt-1">
                <span>${minMaxPrice[0]}</span>
                <span>${minMaxPrice[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-bark-100 max-w-lg mx-auto p-8 shadow-soft">
          <p className="font-heading text-xl font-bold text-bark-800 mb-2">
            No matching outfits found
          </p>
          <p className="text-xs text-bark-500 mb-6">
            Try adjusting your size selections or clear the search keywords.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white text-xs font-semibold shadow-soft"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedProducts.map((product) => {
            const normalizedProduct: Product = {
              ...product,
              id: String(product._id || product.id),
            };
            return (
              <ProductCard
                key={normalizedProduct.id}
                product={normalizedProduct}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full border border-bark-200 bg-white text-xs font-medium text-bark-700 hover:bg-linen disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
                currentPage === i + 1
                  ? 'bg-rose-400 text-white shadow-soft'
                  : 'bg-white text-bark-700 hover:bg-linen border border-bark-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full border border-bark-200 bg-white text-xs font-medium text-bark-700 hover:bg-linen disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default ShopPage;
