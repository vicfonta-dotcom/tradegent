"use client";
import { useState } from "react";
import { runMultiAgentAnalysis } from "../../components/../utils/dockerApi";

export default function BatchAnalysisPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleBatch() {
    setLoading(true);
    setResults([]);
    const syms = input
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
    const out = [];
    for (const symbol of syms) {
      try {
        const analysis = await runMultiAgentAnalysis(symbol);
        out.push({ symbol, analysis });
      } catch {
        out.push({ symbol, error: true });
      }
    }
    setResults(out);
    setLoading(false);
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Batch Analysis</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="AAPL,MSFT,GOOG"
        className="border rounded w-full mb-2 p-2"
        rows={2}
      />
      <button
        onClick={handleBatch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Analyze Batch"}
      </button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((res, i) => (
          <div key={i} className="rounded-xl border p-3">
            <div className="font-bold mb-1">{res.symbol}</div>
            {res.error ? (
              <div className="text-red-500">Error</div>
            ) : (
              <pre className="text-xs overflow-x-auto">{JSON.stringify(res.analysis, null, 2)}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
