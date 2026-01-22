export type DecimalLike = number | string;

export type BetStatus = "PENDING" | "WON" | "LOST" | "VOID";

export type MarketType =
    | "MATCH_RESULT"
    | "HANDICAP"
    | "CORNERS"
    | "CARDS"
    | "PLAYER_SHOTS"
    | "GOALS"
    | "PLAYER_SHOTS_TARGET"
    | "PLAYER_GOALS"

export type TargetScope = "MATCH" | "HOME_TEAM" | "AWAY_TEAM"

export interface BetBase {
    home_team: string;
    away_team: string;
    market_type: MarketType;
    target_scope: TargetScope; // default MATCH en backend
    selection: string;
    selection_details: string | null;
    odds: DecimalLike;
    line: DecimalLike | null;
    stake: DecimalLike;
}

export interface BetCreate extends Omit<BetBase, "target_scope"> {
    target_scope?: TargetScope;
    status?: BetStatus;
    created_at?: string;
}

export interface BetOut extends BetBase {
    id: number;
    status: BetStatus;
    potential_payout: DecimalLike;
    net_profit: DecimalLike | null;
    created_at: string;
    updated_at: string;
}
