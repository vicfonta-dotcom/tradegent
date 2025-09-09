"use client";
import { useEffect, useState } from "react";
import { getDividendForecast } from "../utils/dockerApi";

export default function DividendForecast({ symbol }: { symbol: string }) {
  const [forecast, setForecast] = useState<any>(null);
  useEffect(() => {
    getDividendForecast(symbol).then(setForecast).catch(() => setForecast(null));
  }, [symbol]);
  if (!forecast) return null;
  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Dividend Forecast</div>
      <div className="text-xs">
        {forecast.upcoming
          ? `Next: $${forecast.upcoming.amount} on ${forecast.upcoming.date}`
          : "No upcoming dividends."}
      </div>
      {forecast.history?.length > 0 && (
        <div className="text-xs mt-1">
          Last: {forecast.history[0].amount} on {forecast.history[0].date}
        </div>
      )}
    </div>
  );
}
