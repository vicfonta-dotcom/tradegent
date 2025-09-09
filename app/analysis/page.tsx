"use client";
import { useState } from "react";
import AnalysisForm from "../components/AnalysisForm";
import PriceChart from "../components/PriceChart";
import TechnicalIndicators from "../components/TechnicalIndicators";
import FundMetrics from "../components/FundMetrics";
import RecommendationCard from "../components/RecommendationCard";
import AgentProgressFeed from "../components/AgentProgressFeed";
import DividendForecast from "../components/DividendForecast";
import TradeCalculator from "../components/TradeCalculator";
import RealTimeSignals from "../components/RealTimeSignals";
import WatchlistButton from "../components/WatchlistButton";

export default function AnalysisPage() {
  const [symbol, setSymbol] = useState("AAPL");
  const [analysis, setAnalysis] = useState<any>(null);
  const [stock, setStock] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container max-w-5xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Single Analysis</h1>
      <AnalysisForm
        onResult={({ stock, analysis }) => {
          setStock(stock);
          setAnalysis(analysis);
          setSymbol(stock?.symbol || "");
        }}
        onError={setError}
      />
      <div className="flex gap-2 items-center mb-2">
        <span className="font-mono text-lg">{symbol}</span>
        <WatchlistButton symbol={symbol} />
      </div>
      {error && (
        <div className="bg-yellow-100 text-yellow-700 p-2 rounded mb-3">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <PriceChart symbol={symbol} />
          <TechnicalIndicators symbol={symbol} />
          <FundMetrics symbol={symbol} />
        </div>
        <div>
          <RecommendationCard analysis={analysis} />
          <AgentProgressFeed analysis={analysis} />
          <DividendForecast symbol={symbol} />
          <TradeCalculator />
          <RealTimeSignals symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
