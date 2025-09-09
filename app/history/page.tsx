"use client";
import { useEffect, useState } from "react";
import { getHistory, clearHistory } from "../utils/history";
import { getStockData } from "../utils/dockerApi";

type HistoryItem = {
  symbol: string;
  date: string;
};

export default function HistoryPage() {
  const [list, setList] = useState<HistoryItem[]>([]);
  const [info, setInfo] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items = getHistory();
    setList(items);
    setLoading(true);
    Promise.all(
      items.map(async ({ symbol }) => {
        try {
          const data = await getStockData(symbol);
          return {
            symbol,
            price: data?.price,
            dividendYield: data?.dividendYield,
          };
        } catch {
          return { symbol };
        }
      })
    ).then((arr) => {
      const bySymbol: Record<string, any> = {};
      arr.forEach((i) => (bySymbol[i.symbol] = i));
      setInfo(bySymbol);
      setLoading(false);
    });
  }, []);

  function handleClear() {
    clearHistory();
    setList([]);
    setInfo({});
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Analysis History</h1>
      <button
        className="mb-3 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-xs"
        onClick={handleClear}
      >
        Clear history
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : list.length === 0 ? (
        <div className="text-gray-500">No analysis history yet.</div>
      ) : (
        <table className="min-w-full border text-sm bg-white dark:bg-gray-900 rounded">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Symbol</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-right">Dividend Yield</th>
              <th className="px-3 py-2 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={`${item.symbol}-${item.date}`} className="border-t">
                <td className="font-mono px-3 py-2">{item.symbol}</td>
                <td className="text-right px-3 py-2">
                  {info[item.symbol]?.price !== undefined
                    ? `$${info[item.symbol]?.price?.toFixed(2)}`
                    : "—"}
                </td>
                <td className="text-right px-3 py-2">
                  {info[item.symbol]?.dividendYield !== undefined
                    ? `${(info[item.symbol]?.dividendYield * 100).toFixed(2)}%`
                    : "—"}
                </td>
                <td className="text-right px-3 py-2">
                  {new Date(item.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
