import { useQuery } from "@tanstack/react-query";
import { getBetStats } from "../api/api";
import type { BetStatsOut } from "../types/types.ts";

export default function BetStats() {
    const { data: stats, isLoading, isError } = useQuery<BetStatsOut>({
        queryKey: ["bet-stats"],
        queryFn: getBetStats,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col justify-between animate-pulse"
                    >
                        {/* Match padding and layout of original cards */}
                        <div className="block h-3.5 bg-gray-700 rounded w-1/2"></div>

                        <div className="mt-4 flex items-baseline gap-2">
                            <div className="h-9 bg-gray-700 rounded w-2/3"></div>
                            {/* Extra space for "ROI", "Streak" etc subtext */}
                            {i > 1 && <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="mb-8 p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-200 text-sm">
                Error loading data. Check connection.
            </div>
        );
    }

    const profitColor = Number(stats.total_profit) >= 0 ? "text-emerald-400" : "text-red-400";
    const roiColor = Number(stats.roi) >= 0 ? "text-emerald-400" : "text-red-400";
    const streakColor = stats.current_streak >= 0 ? "text-emerald-400" : "text-red-400";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            {/* Card 1: Net Profit */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col justify-between">
                <span className="text-gray-400 text-sm font-medium">Net Profit</span>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${profitColor}`}>
                        ${Number(stats.total_profit) > 0 ? "+" : ""}{Number(stats.total_profit).toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Card 2: ROI */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col justify-between">
                <span className="text-gray-400 text-sm font-medium">ROI (Return)</span>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${roiColor}`}>
                        {Number(stats.roi) > 0 ? "+" : ""}{Number(stats.roi).toFixed(2)}%
                    </span>
                </div>
            </div>

            {/* Card 3: Win Rate */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col justify-between">
                <span className="text-gray-400 text-sm font-medium">Win Rate</span>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">
                        {Number(stats.win_rate).toFixed(2)}%
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                        ({stats.total_won}W - {stats.total_lost}L)
                    </span>
                </div>
            </div>

            {/* Card 4: Streak */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col justify-between">
                <span className="text-gray-400 text-sm font-medium">Current Streak</span>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${streakColor}`}>
                        {stats.current_streak > 0 ? "🔥 +" : "❄️ "}{stats.current_streak}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                        {stats.current_streak >= 0 ? "Wins" : "Losses"}
                    </span>
                </div>
            </div>

        </div>
    );
}