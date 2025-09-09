"use client";
import { useEffect, useState } from "react";
import { getRealTimeSignals } from "../utils/dockerApi";

export default function RealTimeSignals({ symbol }: { symbol: string }) {
  const [signals, setSignals] = useState<any>(null);
  useEffect(() => {
    getRealTimeSignals(symbol).then(setSignals).catch(() => setSignals(null));
  }, [symbol]);
  if (!signals) return null;
  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Real-Time Signals</div>
      <ul className="text-xs">
        {signals.map((sig: any, idx: number) => (
          <li key={idx}>
            <span className="font-mono">{sig.type}</span> — {sig.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
