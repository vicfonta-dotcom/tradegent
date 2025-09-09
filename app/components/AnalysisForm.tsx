"use client";
import { useState } from "react";
import { getStockData, getRecommendation } from "../utils/dockerApi";
import { addToHistory } from "../utils/history";

type Props = {
  onResult: (res: { stock: any; analysis: any }) => void;
  onError: (err: string) => void;
};

export default function AnalysisForm({ onResult, onError }: Props) {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol) return;
    setLoading(true);
    try {
      const stock = await getStockData(symbol);
      const analysis = await getRecommendation(symbol);
      addToHistory(symbol);
      onResult({ stock, analysis });
      onError("");
    } catch (e: any) {
      onError("Could not find the symbol or failed to fetch data.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
      <input
        type="text"
        placeholder="Enter symbol (e.g. AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="border rounded p-2 font-mono"
        style={{ width: "200px" }}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Analyze"}
      </button>
    </form>
  );
}
