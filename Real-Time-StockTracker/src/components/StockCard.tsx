import React from 'react';
import { Trash2 } from 'lucide-react';
import { StockData } from '../types/stock';
import { StockChart } from './StockChart';
import { useStockStore } from '../store/stockStore';

interface StockCardProps {
  stock: StockData;
}

export function StockCard({ stock }: StockCardProps) {
  const removeStock = useStockStore((state) => state.removeStock);
  const color = stock.change >= 0 ? '#10B981' : '#EF4444';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {stock.symbol}
          </h3>
          <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
            ${stock.price.toFixed(2)}
          </p>
          <div className={`flex items-center mt-1 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <span className="text-sm font-medium">
              {stock.change >= 0 ? '+' : ''}
              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <button
          onClick={() => removeStock(stock.symbol)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove stock"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-4">
        <StockChart data={stock.history} color={color} />
      </div>
    </div>
  );
}