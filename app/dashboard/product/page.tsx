"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Edit, Trash2, X, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface IProduct {
  id: string;
  name: string;
  model: string;
  primary_image_url: string;
  rating: number;
  review_count: number;
  price: number;
  reward: number;
}

// A simple debounce function
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function ProductManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
    reward: "",
    rating: "",
    reviewCount: "",
    imageUrl: "",
  });

  const fetchProducts = async (term = "") => {
    setLoading(true);
    try {
      const url = term
        ? `http://3.34.52.243:3000/api/v1/product/search/${term}`
        : "http://3.34.52.243:3000/api/v1/product";

      const response = await axios.get(url);

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        console.error("Failed to fetch products:", response.data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    debouncedFetchProducts(searchTerm);
  }, [searchTerm, debouncedFetchProducts]);

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      model: "",
      price: "",
      reward: "",
      rating: "",
      reviewCount: "",
      imageUrl: "",
    });
    setShowForm(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      model: product.model,
      price: product.price.toString(),
      reward: product.reward.toString(),
      rating: product.rating.toString(),
      reviewCount: product.review_count.toString(),
      imageUrl: product.primary_image_url,
    });
    setShowForm(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Here you would call your delete API
      console.log(`Deleting product ${productId}`);
      // Example: axios.delete(`/api/v1/product/${productId}`).then(() => fetchProducts());
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: parseInt(formData.price),
                reward: parseInt(formData.reward),
                rating: parseFloat(formData.rating),
                review_count: parseInt(formData.reviewCount),
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        price: parseInt(formData.price),
        reward: parseInt(formData.reward),
        rating: parseFloat(formData.rating),
        review_count: parseInt(formData.reviewCount),
        primary_image_url: formData.imageUrl,
      };
      setProducts([...products, newProduct]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-3">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Product Management
        </h1>
        <div className="flex flex-1 items-center gap-4 sm:justify-end">
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Link
            href="/dashboard/product/create"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Link>
        </div>
      </div>

      {/* Product Cards Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow rounded-lg p-4 flex flex-col"
                >
                  <div className="flex-1 flex flex-col items-left">
                    <Image
                      src={
                        product.primary_image_url ||
                        "/images/products/demo-product.png"
                      }
                      alt={product.name}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover mb-2 w-full border border-gray-200"
                      unoptimized // Needed for external URLs like Cloudinary
                    />
                    <h3 className="text-lg font-semibold text-gray-900 text-left mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-left mb-2">
                      <p className="text-[12px] text-gray-500 text-left ">
                        {product.model}
                      </p>{" "}
                      |
                      <div className="flex items-center gap-1 text-[12px] text-yellow-500">
                        <span>★</span>
                        <span className="text-gray-900 font-medium">
                          {product.rating}
                        </span>
                        <span className="text-gray-400">
                          ({product.review_count})
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 mb-2">
                      <span className="text-base font-bold text-blue-700">
                        ₩{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600">
                        Reward: ₩{product.reward.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                      aria-label="Delete product"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </>
      )}

      {/* Card-style Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md relative animate-fadeIn">
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close form"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {editingProduct ? "Edit Product" : "Create New Product"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter model number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₩)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reward (₩)
                </label>
                <input
                  type="number"
                  value={formData.reward}
                  onChange={(e) =>
                    setFormData({ ...formData, reward: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reward amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rating (0-5)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Count
                </label>
                <input
                  type="number"
                  value={formData.reviewCount}
                  onChange={(e) =>
                    setFormData({ ...formData, reviewCount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter review count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
