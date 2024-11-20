import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useStockStore } from '../store/stockStore';

export function AddStockForm() {
  const [symbol, setSymbol] = useState('');
  const addStock = useStockStore((state) => state.addStock);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      await addStock(symbol.trim());
      setSymbol('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent outline-none text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 
                     bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors 
                     duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
}