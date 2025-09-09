"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getStockData } from "../utils/dockerApi";

export default function PriceChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    let cancelled = false;
    getStockData(symbol).then((stock) => {
      if (!cancelled && stock?.history) setData(stock.history);
    });
    return () => { cancelled = true; };
  }, [symbol]);
  if (!data?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Price Chart</div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#2563eb" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
