"use client";
import { useState } from "react";

export default function TradeCalculator() {
  const [shares, setShares] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    setTotal(shares * price);
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Trade Calculator</div>
      <form onSubmit={calculate} className="flex items-center gap-2 text-xs">
        <input
          type="number"
          min={0}
          className="border rounded p-1"
          placeholder="Shares"
          value={shares || ""}
          onChange={(e) => setShares(Number(e.target.value))}
          style={{ width: "60px" }}
        />
        <span>x</span>
        <input
          type="number"
          min={0}
          className="border rounded p-1"
          placeholder="Price"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{ width: "70px" }}
        />
        <button
          type="submit"
          className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
        >
          =
        </button>
        <span className="ml-2">Total: <span className="font-bold">${total.toFixed(2)}</span></span>
      </form>
    </div>
  );
}
