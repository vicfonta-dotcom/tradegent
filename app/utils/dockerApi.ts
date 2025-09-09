// Utility to talk to your backend API & OpenAI

const API_URL = process.env.DOCKER_API_URL || "https://api.example.com";

export async function getStockData(symbol: string) {
  const res = await fetch(`${API_URL}/stock/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch stock data");
  return res.json();
}

export async function getTechnicalIndicators(symbol: string) {
  const res = await fetch(`${API_URL}/indicators/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch indicators");
  return res.json();
}

export async function getFundamentals(symbol: string) {
  const res = await fetch(`${API_URL}/fundamentals/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch fundamentals");
  return res.json();
}

export async function getRecommendation(symbol: string) {
  const res = await fetch(`${API_URL}/recommendation/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch recommendation");
  return res.json();
}

export async function runMultiAgentAnalysis(symbol: string) {
  const res = await fetch(`${API_URL}/multiagent/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch multi-agent analysis");
  return res.json();
}

export async function getDividendForecast(symbol: string) {
  const res = await fetch(`${API_URL}/dividends/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch dividend forecast");
  return res.json();
}

export async function getRealTimeSignals(symbol: string) {
  const res = await fetch(`${API_URL}/signals/${symbol}`);
  if (!res.ok) throw new Error("Failed to fetch signals");
  return res.json();
}
