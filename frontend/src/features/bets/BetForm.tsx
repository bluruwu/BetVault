import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { betCreateSchema, type BetCreateFormValues } from "./betCreateSchema.ts";

type Props = {
  onSubmit: (values: BetCreateFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

// Reusable styles
const inputClasses =
  "block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 transition-colors";
const labelClasses = "mb-2 block text-sm font-medium text-gray-300";
const errorClasses = "mt-1 text-xs text-red-400";
const selectClasses = inputClasses;

// CSS utility to hide number arrows (spinners) in Webkit/Moz
const noSpinnerClasses =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export default function BetForm({
  onSubmit,
  isSubmitting = false,
  submitLabel = "Create Bet",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BetCreateFormValues>({
    resolver: zodResolver(betCreateSchema),
    defaultValues: {
      status: "PENDING",
      target_scope: "MATCH",
      market_type: "MATCH_RESULT",
      line: null,
      selection_details: null,
      odds: 1.0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"
    >
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-white">New Bet Entry</h2>
        <p className="text-sm text-gray-400">Record the details of the event</p>
      </div>

      {/* SECTION: TEAMS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Home Team</label>
          <input
            {...register("home_team")}
            placeholder="Ex: Manchester City"
            className={inputClasses}
          />
          {errors.home_team && (
            <p className={errorClasses}>{errors.home_team.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Away Team</label>
          <input
            {...register("away_team")}
            placeholder="Ex: Liverpool"
            className={inputClasses}
          />
          {errors.away_team && (
            <p className={errorClasses}>{errors.away_team.message}</p>
          )}
        </div>
      </div>

      {/* SECTION: MARKET & SCOPE */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Market Type</label>
          <select {...register("market_type")} className={selectClasses}>
            <option value="MATCH_RESULT">Match Result (1X2)</option>
            <option value="HANDICAP">Handicap</option>
            <option value="CORNERS">Corners</option>
            <option value="CARDS">Cards</option>
            <option value="PLAYER_SHOTS">Player Shots</option>
            <option value="GOALS">Goals</option>
            <option value="PLAYER_SHOTS_TARGET">Player Shots on Target</option>
            <option value="PLAYER_GOALS">Player Goals</option>
          </select>
          {errors.market_type && (
            <p className={errorClasses}>{errors.market_type.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>Target Scope</label>
          <select {...register("target_scope")} className={selectClasses}>
            <option value="MATCH">Match</option>
            <option value="HOME_TEAM">Home Team</option>
            <option value="AWAY_TEAM">Away Team</option>
          </select>
          {errors.target_scope && (
            <p className={errorClasses}>{errors.target_scope.message}</p>
          )}
        </div>
      </div>

      {/* SECTION: SELECTION */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className={labelClasses}>Selection</label>
          <input
            {...register("selection")}
            placeholder="Ex: Over 2.5 Goals / Home Win"
            className={inputClasses}
          />
          {errors.selection && (
            <p className={errorClasses}>{errors.selection.message}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <label className={labelClasses}>
            Selection Details <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <input
            {...register("selection_details", {
              setValueAs: (v) => (v === "" ? null : v),
            })}
            placeholder="Ex: 1st Half only"
            className={inputClasses}
          />
          {errors.selection_details && (
            <p className={errorClasses}>{errors.selection_details.message}</p>
          )}
        </div>
      </div>

      {/* SECTION: NUMERICAL VALUES */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Line: Steps of 0.5, no negatives */}
        <div>
          <label className={labelClasses}>
            Line <span className="text-gray-500 text-xs">(Step 0.5)</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            {...register("line", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
            placeholder="0.5, 1.0, 1.5"
            className={inputClasses}
          />
          {errors.line && <p className={errorClasses}>{errors.line.message}</p>}
        </div>

        {/* Odds: Starts at 1.00, no negatives */}
        <div>
          <label className={labelClasses}>Odds</label>
          <input
            type="number"
            step="0.01"
            min="1.00"
            {...register("odds", { valueAsNumber: true })}
            placeholder="1.90"
            className={inputClasses}
          />
          {errors.odds && <p className={errorClasses}>{errors.odds.message}</p>}
        </div>

        {/* Stake: No arrows (spinners), no negatives */}
        <div>
          <label className={labelClasses}>Stake (Unit)</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-400">$</span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("stake", { valueAsNumber: true })}
              placeholder="10.00"
              className={`${inputClasses} ${noSpinnerClasses} pl-7`}
            />
          </div>
          {errors.stake && <p className={errorClasses}>{errors.stake.message}</p>}
        </div>
      </div>

      {/* SECTION: STATUS & DATE */}
      <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Status</label>
          <select {...register("status")} className={selectClasses}>
            <option value="PENDING">Pending</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
            <option value="VOID">Void</option>
          </select>
          {errors.status && (
            <p className={errorClasses}>{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses}>
            Date
          </label>
          <input
            type="date"
            {...register("created_at")}
            className={inputClasses}
          />
          {errors.created_at && (
            <p className={errorClasses}>{errors.created_at.message}</p>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto md:min-w-[200px] rounded-lg bg-emerald-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-emerald-900/20"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}