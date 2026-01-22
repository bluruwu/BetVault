import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {betCreateSchema, type BetCreateFormValues} from "./betCreateSchema.ts";

type Props = {
  onSubmit: (values: BetCreateFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export default function BetForm({
    onSubmit,
    isSubmitting = false,
    submitLabel = "Create bet"
}: Props) {
    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm<BetCreateFormValues>({
        resolver: zodResolver(betCreateSchema),
        defaultValues: {
            status: "PENDING",
            target_scope: "MATCH",
            market_type: "MATCH_RESULT",
            line: null,
            selection_details: null,
        },
    });

    return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: 12, maxWidth: 560 }}
    >
      {/* Teams */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label>Home team</label>
          <input {...register("home_team")} placeholder="Ej: Tottenham" />
          {errors.home_team && (
            <small style={{ color: "crimson" }}>{errors.home_team.message}</small>
          )}
        </div>

        <div>
          <label>Away team</label>
          <input {...register("away_team")} placeholder="Ej: Fulham" />
          {errors.away_team && (
            <small style={{ color: "crimson" }}>{errors.away_team.message}</small>
          )}
        </div>
      </div>

      {/* Market + Scope */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label>Market Type</label>
          <select {...register("market_type")}>
            <option value="MATCH_RESULT">MATCH_RESULT</option>
            <option value="HANDICAP">HANDICAP</option>
            <option value="CORNERS">CORNERS</option>
            <option value="CARDS">CARDS</option>
            <option value="PLAYER_SHOTS">PLAYER_SHOTS</option>
            <option value="GOALS">GOALS</option>
            <option value="PLAYER_SHOTS_TARGET">PLAYER_SHOTS_TARGET</option>
            <option value="PLAYER_GOALS">PLAYER_GOALS</option>
          </select>
          {errors.market_type && (
            <small style={{ color: "crimson" }}>
              {errors.market_type.message}
            </small>
          )}
        </div>

        <div>
          <label>Target Scope</label>
          <select {...register("target_scope")}>
            <option value="MATCH">MATCH</option>
            <option value="HOME_TEAM">HOME_TEAM</option>
            <option value="AWAY_TEAM">AWAY_TEAM</option>
          </select>
          {errors.target_scope && (
            <small style={{ color: "crimson" }}>
              {errors.target_scope.message}
            </small>
          )}
        </div>
      </div>

      {/* Selection */}
      <div>
        <label>Selection</label>
        <input {...register("selection")} placeholder="Ej: Over 2.5 / Home win" />
        {errors.selection && (
          <small style={{ color: "crimson" }}>{errors.selection.message}</small>
        )}
      </div>

      <div>
        <label>Selection details (opcional)</label>
        <input
          {...register("selection_details", { setValueAs: v => v === "" ? null : v })}
          placeholder="Ej: 1st half / corners / etc."
        />
        {errors.selection_details && (
          <small style={{ color: "crimson" }}>
            {errors.selection_details.message}
          </small>
        )}
      </div>

      {/* Numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div>
          <label>Line (opcional)</label>
          <input type="number" step="0.01" {...register("line", {setValueAs: v => v === "" ? null : Number(v)})} placeholder="Ej: -0.5" />
          {errors.line && (
            <small style={{ color: "crimson" }}>{errors.line.message}</small>
          )}
        </div>

        <div>
          <label>Odds</label>
          <input type="number" step="0.0001" {...register("odds", { valueAsNumber: true })} placeholder="Ej: 1.8500" />
          {errors.odds && (
            <small style={{ color: "crimson"}}>{errors.odds.message}</small>
          )}
        </div>

        <div>
          <label>Stake</label>
          <input type="number" step="0.01" {...register("stake", { valueAsNumber: true })} placeholder="Ej: 10.00" />
          {errors.stake && (
            <small style={{ color: "crimson" }}>{errors.stake.message}</small>
          )}
        </div>
      </div>

      {/* Status + created_at */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
        <div>
          <label>Status</label>
          <select {...register("status")}>
            <option value="PENDING">PENDING</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
            <option value="VOID">VOID</option>
          </select>
          {errors.status && (
            <small style={{ color: "crimson" }}>{errors.status.message}</small>
          )}
        </div>

        <div>
          <label>Created at (opcional, ISO)</label>
          <input
            {...register("created_at", { setValueAs: v => v === "" ? undefined : v })}
            placeholder="Ej: 2026-01-18T10:00:00Z"
          />
          {errors.created_at && (
            <small style={{ color: "crimson" }}>{errors.created_at.message}</small>
          )}
        </div>
      </div>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}