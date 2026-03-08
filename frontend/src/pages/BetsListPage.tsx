import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBets } from "../features/bets/api/api";
import BetCard from "../features/bets/components/BetCard";
import BetStats from "../features/bets/components/BetStats";

export default function BetsListPage() {
  const { data: bets, isLoading, isError, error } = useQuery({
    queryKey: ["bets"],
    queryFn: getBets,
  });

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center">
        <p className="text-red-400">Error loading bets: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">My Bets</h1>
            <p className="text-gray-400 mt-1">
              Track your performance and history.
            </p>
          </div>

          <BetStats />

          <Link
            to="/bets/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 transition-all"
          >
            + New Bet
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 h-[280px] flex flex-col overflow-hidden">
                <div className="h-10 bg-gray-900/50 border-b border-gray-700 px-4 py-3">
                  <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                </div>
                <div className="p-4 flex-1 space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded-full w-1/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t border-gray-700 h-16">
                  <div className="border-r border-gray-700 flex flex-col items-center justify-center gap-1">
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="border-r border-gray-700 flex flex-col items-center justify-center gap-1">
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Empty State */}
            {bets?.length === 0 && (
              <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 border-dashed">
                <p className="text-gray-400 mb-4">No bets recorded yet.</p>
                <Link to="/bets/new" className="text-emerald-400 hover:underline">
                  Create your first bet &rarr;
                </Link>
              </div>
            )}

            {/* Bets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bets?.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
