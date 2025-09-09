"use client";
import { useEffect, useState } from "react";
import { getFundamentals } from "../utils/dockerApi";

export default function FundMetrics({ symbol }: { symbol: string }) {
  const [funds, setFunds] = useState<any>(null);
  useEffect(() => {
    getFundamentals(symbol).then(setFunds).catch(() => setFunds(null));
  }, [symbol]);
  if (!funds) return null;
  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Fundamental Metrics</div>
      <ul className="grid grid-cols-2 gap-x-4 text-xs">
        {Object.entries(funds).map(([k, v]) => (
          <li key={k}>
            <span className="font-mono">{k}</span>: <span className="font-bold">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
