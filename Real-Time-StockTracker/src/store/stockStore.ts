import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StockStore } from '../types/stock';
import { fetchStockData } from '../utils/api';

export const useStockStore = create<StockStore>()(
  persist(
    (set, get) => ({
      stocks: {},
      watchlist: [],
      addStock: async (symbol: string) => {
        const upperSymbol = symbol.toUpperCase();
        if (get().watchlist.includes(upperSymbol)) return;

        try {
          const stockData = await fetchStockData(upperSymbol);
          set((state) => ({
            stocks: { ...state.stocks, [upperSymbol]: stockData },
            watchlist: [...state.watchlist, upperSymbol],
          }));
        } catch (error) {
          console.error('Failed to fetch stock data:', error);
        }
      },
      removeStock: (symbol: string) => {
        set((state) => ({
          watchlist: state.watchlist.filter((s) => s !== symbol),
          stocks: Object.fromEntries(
            Object.entries(state.stocks).filter(([key]) => key !== symbol)
          ),
        }));
      },
      updateStockData: (symbol: string, data: Partial<StockData>) => {
        set((state) => ({
          stocks: {
            ...state.stocks,
            [symbol]: { ...state.stocks[symbol], ...data },
          },
        }));
      },
    }),
    {
      name: 'stock-storage',
    }
  )
);