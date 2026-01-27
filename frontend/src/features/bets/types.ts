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
    target_scope: TargetScope; // default MATCH in backend
    selection: string;
    selection_details: string | null;
    odds: number;
    line: number | null;
    stake: number;
}

export interface BetCreate extends Omit<BetBase, "target_scope"> {
    target_scope?: TargetScope;
    status?: BetStatus;
    created_at?: string;
}

export interface BetOut extends BetBase {
    id: number;
    status: BetStatus;
    potential_payout: number;
    net_profit: number | null;
    created_at: string;
    updated_at: string;
}
