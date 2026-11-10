import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, Search, X, Check, Sparkles, Star, Eye } from 'lucide-react';
import { AdminNav } from '../../components/admin/AdminNav';
import { BoutiqueSpinner } from '../../components/BoutiqueLoader';
import { categories, sizes as defaultSizes } from '../../data/products';
import Swal from 'sweetalert2';

interface Product {
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
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Dresses',
    description: '',
    sizes: [] as string[],
    colors: '' as string, // Comma separated for ease
    inStock: true,
    featured: false,
  });

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [API_BASE]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      image: '',
      category: 'Dresses',
      description: '',
      sizes: ['6M', '12M', '18M'],
      colors: 'Pink, White',
      inStock: true,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: String(product.price),
      image: product.image,
      category: product.category,
      description: product.description || '',
      sizes: product.sizes || [],
      colors: product.colors ? product.colors.join(', ') : '',
      inStock: product.inStock !== false,
      featured: Boolean(product.featured),
    });
    setIsModalOpen(true);
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const colorsArray = formData.colors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      image: formData.image || 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
      category: formData.category,
      description: formData.description,
      sizes: formData.sizes,
      colors: colorsArray,
      inStock: formData.inStock,
      featured: formData.featured,
    };

    try {
      if (editingProduct) {
        const targetId = editingProduct._id || editingProduct.id;
        const res = await fetch(`${API_BASE}/api/products/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setProducts((prev) =>
            prev.map((p) => (p._id === targetId || p.id === targetId ? { ...p, ...payload } : p))
          );
          Swal.fire({
            icon: 'success',
            title: 'Piece Updated',
            text: `${payload.name} updated successfully.`,
            timer: 1400,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            background: '#FAF7F2',
            color: '#261E18',
          });
        }
      } else {
        const res = await fetch(`${API_BASE}/api/products/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const resData = await res.json();
          setProducts((prev) => [...prev, resData.product || { ...payload, _id: String(Date.now()) }]);
          Swal.fire({
            icon: 'success',
            title: 'Piece Added',
            text: `${payload.name} added to your boutique catalog.`,
            timer: 1400,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            background: '#FAF7F2',
            color: '#261E18',
          });
        }
      }
      setIsModalOpen(false);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: 'Could not save product to database.',
        confirmButtonColor: '#E28C97',
      });
    }
  };

  const handleToggleStock = async (product: Product) => {
    const targetId = product._id || product.id;
    const newStock = !(product.inStock !== false);

    try {
      await fetch(`${API_BASE}/api/products/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: newStock }),
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === targetId || p.id === targetId ? { ...p, inStock: newStock } : p))
      );
    } catch {
      // Toggle locally for demo
      setProducts((prev) =>
        prev.map((p) => (p._id === targetId || p.id === targetId ? { ...p, inStock: newStock } : p))
      );
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    const targetId = product._id || product.id;
    const newFeatured = !product.featured;

    try {
      await fetch(`${API_BASE}/api/products/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured }),
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === targetId || p.id === targetId ? { ...p, featured: newFeatured } : p))
      );
    } catch {
      setProducts((prev) =>
        prev.map((p) => (p._id === targetId || p.id === targetId ? { ...p, featured: newFeatured } : p))
      );
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const targetId = product._id || product.id;
    const result = await Swal.fire({
      title: 'Remove Piece?',
      text: `Are you sure you want to delete "${product.name}"? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#E28C97',
      cancelButtonColor: '#DFD9D1',
      background: '#FAF7F2',
      color: '#261E18',
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_BASE}/api/products/${targetId}`, { method: 'DELETE' });
        setProducts((prev) => prev.filter((p) => p._id !== targetId && p.id !== targetId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'The piece was removed from your catalog.',
          timer: 1200,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          background: '#FAF7F2',
        });
      } catch {
        setProducts((prev) => prev.filter((p) => p._id !== targetId && p.id !== targetId));
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.name?.toLowerCase().includes(q) && !p.description?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-voile text-bark-900 pb-16">
      <AdminNav subtitle="Collection Management & Inventory" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bark-100">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-1">
              Boutique Catalog
            </span>
            <h1 className="font-heading text-3xl font-bold text-bark-900">
              Pieces & Inventory
            </h1>
            <p className="text-sm text-bark-500 mt-0.5">
              Add new dresses, adjust sizes and shades, and toggle featured homepage highlights.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium text-xs shadow-soft transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Garment</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shadow-soft ${
                selectedCategory === cat
                  ? 'bg-rose-400 text-white'
                  : 'bg-white text-bark-700 hover:bg-linen border border-bark-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-3xl border border-bark-100 shadow-soft flex items-center gap-3">
          <Search className="w-4 h-4 text-bark-400 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search piece by title or description..."
            className="flex-1 bg-transparent text-bark-800 text-xs focus:outline-none placeholder:text-bark-400"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-bark-100 shadow-soft p-6 sm:p-8">
          {loading ? (
            <BoutiqueSpinner message="Loading catalog..." />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Package className="w-10 h-10 text-bark-300 mx-auto" />
              <h3 className="font-heading text-lg font-bold text-bark-800">
                No pieces found
              </h3>
              <p className="text-xs text-bark-400">
                Try selecting a different category or click "Add New Garment" above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-bark-100 text-bark-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3 pl-2">Garment</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Sizes Available</th>
                    <th className="pb-3 text-center">In Stock</th>
                    <th className="pb-3 text-center">Featured</th>
                    <th className="pb-3 pr-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bark-100 text-bark-700">
                  {filteredProducts.map((product) => {
                    const id = product._id || product.id || '';
                    const inStock = product.inStock !== false;

                    return (
                      <tr key={id} className="hover:bg-voile/60 transition-colors">
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-14 object-cover rounded-xl border border-bark-100 bg-linen/50"
                            />
                            <div>
                              <span className="font-bold text-bark-900 block text-xs">
                                {product.name}
                              </span>
                              <span className="text-[11px] text-bark-400 block max-w-xs truncate">
                                {product.description}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4">
                          <span className="px-2.5 py-1 rounded-full bg-linen text-[10px] font-semibold text-bark-700">
                            {product.category}
                          </span>
                        </td>

                        <td className="py-4 font-bold text-bark-900 text-xs">
                          ${Number(product.price).toFixed(2)}
                        </td>

                        <td className="py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {product.sizes?.map((size) => (
                              <span
                                key={size}
                                className="px-1.5 py-0.5 rounded bg-voile text-[10px] text-bark-600 border border-bark-200"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleStock(product)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                              inStock
                                ? 'bg-sage-50 text-sage-600 border border-sage-200 hover:bg-sage-100'
                                : 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                            }`}
                          >
                            {inStock ? 'In Stock' : 'Sold Out'}
                          </button>
                        </td>

                        <td className="py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(product)}
                            className={`p-1.5 rounded-full transition-all ${
                              product.featured
                                ? 'text-gold hover:text-gold-dark'
                                : 'text-bark-300 hover:text-gold'
                            }`}
                            title={product.featured ? 'Featured on Homepage' : 'Not featured'}
                          >
                            <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                          </button>
                        </td>

                        <td className="py-4 pr-2 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(product)}
                              className="p-1.5 rounded-lg text-bark-500 hover:text-bark-900 hover:bg-linen transition-colors"
                              title="Edit piece"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product)}
                              className="p-1.5 rounded-lg text-bark-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                              title="Delete piece"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add / Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bark-900/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl border border-bark-100 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-bark-100 pb-4">
                <h3 className="font-heading text-xl font-bold text-bark-900">
                  {editingProduct ? 'Edit Boutique Piece' : 'Add New Garment'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-bark-400 hover:text-bark-700 rounded-full hover:bg-bark-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                    Garment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Princess Rose Lace Tutu"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                      Price ($ USD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="29.99"
                      className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.pexels.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                    Available Sizes / Ages
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {defaultSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          formData.sizes.includes(size)
                            ? 'bg-rose-400 text-white border-rose-400 shadow-soft'
                            : 'bg-voile text-bark-700 border-bark-200 hover:border-rose-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                    Color Shades (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Pink, Ivory, Soft Gold"
                    className="w-full px-4 py-2.5 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-bark-700 mb-1">
                    Description & Fabric Details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Handcrafted with breathable cotton lining..."
                    className="w-full p-3 rounded-xl bg-voile text-bark-800 border border-bark-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-bark-800">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4 accent-rose-400 rounded"
                    />
                    <span>Available in Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-bark-800">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 accent-rose-400 rounded"
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-bark-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-linen text-bark-700 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-medium shadow-soft"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Garment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;
