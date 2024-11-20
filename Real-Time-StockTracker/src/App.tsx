import React, { useEffect } from 'react';
import { useStockStore } from './store/stockStore';
import { StockCard } from './components/StockCard';
import { AddStockForm } from './components/AddStockForm';
import { ThemeToggle } from './components/ThemeToggle';
import { updateStockPrice } from './utils/api';
import { LineChart } from 'lucide-react';

export default function App() {
  const { stocks, watchlist, updateStockData } = useStockStore();

  useEffect(() => {
    const interval = setInterval(async () => {
      for (const symbol of watchlist) {
        const update = await updateStockPrice(symbol);
        updateStockData(symbol, update);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [watchlist, updateStockData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <LineChart className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Stock Tracker
          </h1>
        </div>

        <AddStockForm />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((symbol) => (
            <StockCard key={symbol} stock={stocks[symbol]} />
          ))}
        </div>

        {watchlist.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
            <p className="text-lg">No stocks in your watchlist</p>
            <p className="text-sm mt-2">Add a stock symbol to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}