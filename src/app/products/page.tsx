'use client';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';

interface Product {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductName.trim()) {
      setProducts([...products, { id: Date.now().toString(), name: newProductName.trim() }]);
      setNewProductName('');
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <PageLayout
      title="My Products"
      emoji="🥫"
      description="Keep track of what you have in your kitchen."
    >
      <div className="space-y-8">
        {/* Add Product Form */}
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              placeholder="Enter product name..."
              className="flex-grow rounded-xl border-2 border-[#FFD93D] p-4 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
            />
            <button
              type="submit"
              className="bg-[#FF6B6B] hover:bg-[#FFD93D] text-white font-bold px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <span className="text-2xl mr-2">➕</span>
              Add
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border-4 border-[#FFD93D] p-6 flex justify-between items-center transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-xl text-[#4A4A4A] font-medium">{product.name}</span>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#4A4A4A]">
              No products added yet. Start by adding some products above!
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
} 