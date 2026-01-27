import type { BetOut, BetStatus } from "./types";
import {formatDate} from "../../utils/date.ts";

// Mapa de colores según el estado
const statusColors: Record<BetStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  WON: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  LOST: "bg-red-500/10 text-red-400 border-red-500/20",
  VOID: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

interface Props {
  bet: BetOut;
}

export default function BetCard({ bet }: Props) {
  const isPending = bet.status === "PENDING";

  return (
    <div className="flex flex-col rounded-xl bg-gray-800 border border-gray-700 shadow-lg overflow-hidden hover:border-gray-600 transition-colors group">
      {/* Header: Fecha y Estado */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/50 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-400">
          {formatDate(bet.created_at)}
        </span>
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold border ${
            statusColors[bet.status]
          }`}
        >
          {bet.status}
        </span>
      </div>

      {/* Body: Equipos y Selección */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white leading-tight">
            {bet.home_team} <span className="text-gray-500 text-sm font-normal">vs</span> {bet.away_team}
            </h3>
        </div>

        <div className="mt-3">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-400/10 px-1.5 rounded">
                    {bet.market_type.replace("_", " ")}
                </span>
                {bet.target_scope !== "MATCH" && (
                    <span className="text-xs text-gray-400 border border-gray-600 px-1.5 rounded">
                        {bet.target_scope.replace("_", " ")}
                    </span>
                )}
            </div>
            <p className="text-sm text-gray-200 font-medium">
                {bet.selection}
                {bet.line !== null && <span className="ml-1 text-gray-400">
                    ({bet.line > 0 ? "+" : ""}{bet.line})</span>}
            </p>
            {bet.selection_details && (
                <p className="text-xs text-gray-500 mt-0.5">{bet.selection_details}</p>
            )}
        </div>
      </div>

      {/* Footer: Stats (Odds, Stake, Profit) */}
      <div className="grid grid-cols-3 border-t border-gray-700 bg-gray-800/50">
        <div className="p-3 text-center border-r border-gray-700">
            <span className="block text-xs text-gray-500 uppercase">Odds</span>
            <span className="font-bold text-white">{Number(bet.odds).toFixed(2)}</span>
        </div>
        <div className="p-3 text-center border-r border-gray-700">
            <span className="block text-xs text-gray-500 uppercase">Stake</span>
            <span className="font-medium text-gray-200">${Number(bet.stake).toFixed(2)}</span>
        </div>
        <div className="p-3 text-center relative overflow-hidden">
            <span className="block text-xs text-gray-500 uppercase">
                {isPending ? "Potential" : "Profit"}
            </span>
            <span className={`font-bold ${
                bet.status === 'WON' ? 'text-emerald-400' : 
                bet.status === 'LOST' ? 'text-red-400' : 'text-gray-200'
            }`}>
                {isPending
                    ? `$${Number(bet.potential_payout).toFixed(2)}`
                    : bet.net_profit
                        ? (Number(bet.net_profit) > 0 ? "+" : "") + `$${Number(bet.net_profit).toFixed(2)}`
                        : "$0.00"
                }
            </span>
        </div>
      </div>
    </div>
  );
}