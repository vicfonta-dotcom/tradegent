"use client";
import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";
import { getStockData } from "../utils/dockerApi";

type WatchInfo = {
  symbol: string;
  price?: number;
  dividendYield?: number;
};

export default function WatchlistPage() {
  const [list, setList] = useState<string[]>([]);
  const [info, setInfo] = useState<Record<string, WatchInfo>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const wl = getWatchlist();
    setList(wl);
    setLoading(true);
    Promise.all(
      wl.map(async (symbol: string) => {
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
      const bySymbol: Record<string, WatchInfo> = {};
      arr.forEach((i) => (bySymbol[i.symbol] = i));
      setInfo(bySymbol);
      setLoading(false);
    });
  }, []);

  function handleRemove(symbol: string) {
    removeFromWatchlist(symbol);
    setList((prev) => prev.filter((s) => s !== symbol));
    setInfo((prev) => {
      const { [symbol]: _, ...rest } = prev;
      return rest;
    });
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      {loading ? (
        <div>Loading...</div>
      ) : list.length === 0 ? (
        <div className="text-gray-500">Your watchlist is empty.</div>
      ) : (
        <table className="min-w-full border text-sm bg-white dark:bg-gray-900 rounded">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Symbol</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-right">Dividend Yield</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((symbol) => (
              <tr key={symbol} className="border-t">
                <td className="font-mono px-3 py-2">{symbol}</td>
                <td className="text-right px-3 py-2">
                  {info[symbol]?.price !== undefined
                    ? `$${info[symbol]?.price?.toFixed(2)}`
                    : "—"}
                </td>
                <td className="text-right px-3 py-2">
                  {info[symbol]?.dividendYield !== undefined
                    ? `${(info[symbol]?.dividendYield * 100).toFixed(2)}%`
                    : "—"}
                </td>
                <td className="px-3 py-2">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleRemove(symbol)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
