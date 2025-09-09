"use client";
export default function RecommendationCard({ analysis }: { analysis: any }) {
  if (!analysis) return null;
  return (
    <div className="bg-white dark:bg-gray-900 p-3 mb-2 rounded-xl border">
      <div className="font-bold mb-1">Agent Recommendation</div>
      {analysis.recommendation ? (
        <div>
          <div className="font-semibold text-lg mb-1">{analysis.recommendation}</div>
          <div className="text-xs text-gray-500">{analysis.reason}</div>
        </div>
      ) : (
        <div className="text-gray-500 text-xs">No recommendation available.</div>
      )}
    </div>
  );
}
