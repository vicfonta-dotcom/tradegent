"use client";
import { useEffect, useState } from "react";
import { getTechnicalIndicators } from "../utils/dockerApi";

export default function TechnicalIndicators({ symbol }: { symbol: string }) {
  const [ind, setInd] = useState<any>(null);
  useEffect(() => {
    getTechnicalIndicators(symbol).then(setInd).catch(() => setInd(null));
  }, [symbol]);
  if (!ind) return null;
  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Technical Indicators</div>
      <ul className="grid grid-cols-2 gap-x-4 text-xs">
        {Object.entries(ind).map(([k, v]) => (
          <li key={k}>
            <span className="font-mono">{k}</span>: <span className="font-bold">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
