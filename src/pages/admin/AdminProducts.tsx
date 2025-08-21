import React, { useState, useEffect } from "react";
import Swal from "../../utils/swal";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Baby,
  Save,
  X,
  LogOut,
} from "lucide-react";
import { products as categories, sizes } from "../../data/products";
import { useAuth } from "../../contexts/AuthContext";
import { Spin, Upload } from "antd";

const AdminProducts = () => {
  const { logout } = useAuth();
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
  };
  type FormData = {
    name: string;
    price: string;
    image: string;
    category: string;
    description: string;
    sizes: string[];
    colors: string[];
    inStock: boolean;
    featured: boolean;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    image: "",
    category: "Dresses",
    description: "",
    sizes: [],
    colors: [],
    inStock: true,
    featured: false,
  });

  // Fetch products from backend on mount
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [API_BASE]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  type InputChangeEvent = React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorChange = (colors: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: colors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      sizes: formData.sizes,
      colors: formData.colors,
      inStock: formData.inStock,
      featured: formData.featured,
    };

    try {
      let response: Response, data: { product: Product };
      if (editingProduct && (editingProduct._id || editingProduct.id)) {
        // Update existing product
        response = await fetch(
          `${API_BASE}/api/products/${editingProduct._id || editingProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          }
        );

        console.log(response, "Response from update");
        if (!response.ok) throw new Error("Failed to update product");
        data = await response.json();
        setProducts((prev) =>
          prev.map((p) =>
            p._id === (editingProduct._id || editingProduct.id) ||
              p.id === (editingProduct._id || editingProduct.id)
              ? data.product
              : p
          )
        );
        Swal.fire({
          icon: "success",
          title: "Product updated!",
          text: "The product was updated successfully.",
        });
      } else {
        // Add new product
        response = await fetch(`${API_BASE}/api/products/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error("Failed to add product");
        data = await response.json();
        setProducts((prev) => [
          ...prev,
          {
            ...data.product,
            ...formData,
            price: parseFloat(formData.price),
            id: data.product._id,
          },
        ]);
        Swal.fire({
          icon: "success",
          title: "Product added!",
          text: "The product was added successfully.",
        });
      }
      // Reset form
      setFormData({
        name: "",
        price: "",
        image: "",
        category: "Dresses",
        description: "",
        sizes: [],
        colors: [],
        inStock: true,
        featured: false,
      });
      setShowAddForm(false);
      setEditingProduct(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleEdit = async (product: Product) => {
    if (!product) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/products/${product._id || product.id}`
      );
      console.log(res, "Response from edit fetch");
      if (!res.ok) throw new Error("Failed to fetch product");
      const data: Product = await res.json();
      setEditingProduct(data);
      setFormData({
        name: data.name,
        price: data.price.toString(),
        image: data.image,
        category: data.category,
        description: data.description,
        sizes: data.sizes || [],
        colors: data.colors || [],
        inStock: data.inStock ?? true,
        featured: data.featured ?? false,
      });
      setShowAddForm(true);
    } catch (err) {
      console.log(err);
      alert("Failed to load product for editing.");
    }
  };

  const handleDelete = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `${API_BASE}/api/products/${productId}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to delete product");
        setProducts((prev) =>
          prev.filter((p) => p.id !== productId && p._id !== productId)
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted.",
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete product.",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "Dresses",
      description: "",
      sizes: [],
      colors: [],
      inStock: true,
      featured: false,
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

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
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-2 rounded-lg">
                  <Baby className="w-5 h-5 text-orange-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">
                  Product Management
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
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
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                {categories.map((categoryObj) => (
                  <option
                    key={
                      typeof categoryObj === "string"
                        ? categoryObj
                        : categoryObj.category
                    }
                    value={
                      typeof categoryObj === "string"
                        ? categoryObj
                        : categoryObj.category
                    }
                  >
                    {typeof categoryObj === "string"
                      ? categoryObj
                      : categoryObj.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <Spin spinning={loading}>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Products ({filteredProducts.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id || product._id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Sizes: {(product.sizes || []).join(", ")}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-orange-600 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${product.inStock
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                            }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-cyan-600 hover:text-cyan-700 transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(product.id || product._id || "")
                            }
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-slate-100 text-gray-600 hover:bg-slate-200 disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${page === currentPage
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-slate-100 text-gray-600 hover:bg-slate-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </Spin>
      </div>

      {/* Add/Edit Product Modal */}
      <Spin spinning={loadingImage}>
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                    >
                      {categories
                        .filter((cat) =>
                          typeof cat === "string"
                            ? cat !== "All"
                            : cat.category !== "All"
                        )
                        .map((cat) =>
                          typeof cat === "string" ? (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ) : (
                            <option key={cat.category} value={cat.category}>
                              {cat.category}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <Upload
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      const formDataObj = new FormData();
                      formDataObj.append("image", file);
                      try {
                        // You must implement this endpoint in your backend to handle image uploads
                        setLoadingImage(true)
                        const res = await fetch(
                          `${API_BASE}/api/products/upload`,
                          {
                            method: "POST",
                            body: formDataObj,
                          }
                        );
                        const data = await res.json();
                        console.log(data);
                        if (data.imageUrl) {
                          setFormData((prev) => ({
                            ...prev,
                            image: data.imageUrl,
                          }));
                          if (onSuccess) onSuccess(data, file);
                        } else {
                          if (onError) onError(new Error("No imageUrl returned"));
                        }
                        setLoadingImage(false);
                      } catch (err) {
                        if (onError) onError(err as Error);
                      }
                    }}
                  >
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        style={{
                          width: "104px",
                          height: "104px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div>
                        <span className="text-gray-400">Upload</span>
                      </div>
                    )}
                  </Upload>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${formData.sizes.includes(size)
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-orange-600"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colors (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Pink, White, Yellow"
                    value={formData.colors.join(", ")}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                    />
                    <label className="ml-2 text-sm text-gray-700">In Stock</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                    />
                    <label className="ml-2 text-sm text-gray-700">Featured</label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {editingProduct ? "Update Product" : "Add Product"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default AdminProducts;
