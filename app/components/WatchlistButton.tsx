"use client";
import { useEffect, useState } from "react";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../utils/watchlist";

export default function WatchlistButton({ symbol }: { symbol: string }) {
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const wl = getWatchlist();
    setIsWatched(wl.includes(symbol));
  }, [symbol]);

  function handleToggle() {
    if (isWatched) {
      removeFromWatchlist(symbol);
      setIsWatched(false);
    } else {
      addToWatchlist(symbol);
      setIsWatched(true);
    }
  }

  if (!symbol) return null;
  return (
    <button
      className={`px-2 py-1 text-xs rounded 
        ${isWatched ? "bg-yellow-300 text-yellow-900" : "bg-gray-200 dark:bg-gray-700"}
      `}
      onClick={handleToggle}
      type="button"
    >
      {isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}
