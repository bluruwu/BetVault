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

export interface BetOut extends BetBase {
    id: number;
    status: BetStatus;
    potential_payout: number;
    net_profit: number | null;
    created_at: string;
    updated_at: string;
}

export type BetUpdate = Partial<BetBase> & {
    status?: BetStatus;
};

export interface BetStatsOut {
    total_bets: number;
    total_won: number;
    total_lost: number;
    total_pending: number;
    win_rate: number;
    roi: number;
    total_profit: number;
    current_streak: number;
}
