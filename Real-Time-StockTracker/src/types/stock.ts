export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  history: HistoryPoint[];
}

export interface HistoryPoint {
  timestamp: string;
  price: number;
}

export interface StockStore {
  stocks: { [symbol: string]: StockData };
  watchlist: string[];
  addStock: (symbol: string) => Promise<void>;
  removeStock: (symbol: string) => void;
  updateStockData: (symbol: string, data: Partial<StockData>) => void;
}