const HISTORY_KEY = "tradegent_history";

type HistoryItem = {
  symbol: string;
  date: string;
};

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const json = localStorage.getItem(HISTORY_KEY);
  return json ? JSON.parse(json) : [];
}

export function addToHistory(symbol: string) {
  const history = getHistory();
  history.unshift({ symbol, date: new Date().toISOString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
