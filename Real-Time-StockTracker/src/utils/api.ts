import { StockData } from '../types/stock';

// Simulated API for demo purposes
export async function fetchStockData(symbol: string): Promise<StockData> {
  // In a real app, replace this with actual API calls
  const basePrice = Math.random() * 1000 + 50;
  const history = Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    price: basePrice + Math.random() * 50 - 25,
  })).reverse();

  const currentPrice = basePrice + Math.random() * 10 - 5;
  const previousPrice = history[history.length - 2].price;
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;

  return {
    symbol,
    price: currentPrice,
    change,
    changePercent,
    history,
  };
}

export async function updateStockPrice(symbol: string): Promise<{
  price: number;
  change: number;
  changePercent: number;
}> {
  const previousPrice = Math.random() * 1000 + 50;
  const currentPrice = previousPrice + Math.random() * 10 - 5;
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;

  return {
    price: currentPrice,
    change,
    changePercent,
  };
}