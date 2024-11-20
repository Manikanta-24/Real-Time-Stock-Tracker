import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HistoryPoint } from '../types/stock';

interface StockChartProps {
  data: HistoryPoint[];
  color: string;
}

export function StockChart({ data, color }: StockChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          stroke="#9CA3AF"
        />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#F3F4F6',
          }}
          labelFormatter={(label) => new Date(label).toLocaleString()}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}