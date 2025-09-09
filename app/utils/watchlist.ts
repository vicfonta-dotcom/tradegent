const WATCHLIST_KEY = "tradegent_watchlist";

export function getWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  const json = localStorage.getItem(WATCHLIST_KEY);
  return json ? JSON.parse(json) : [];
}

export function addToWatchlist(symbol: string) {
  const list = getWatchlist();
  if (!list.includes(symbol)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...list, symbol]));
  }
}

export function removeFromWatchlist(symbol: string) {
  const list = getWatchlist();
  const updated = list.filter((s) => s !== symbol);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
}
