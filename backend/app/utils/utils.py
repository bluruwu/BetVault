from app.models.bet import Bet

def serialize_bet(bet: Bet):
    return {
        "id": bet.id,
        "home_team": bet.home_team,
        "away_team": bet.away_team,
        "market_type": bet.market_type,
        "target_scope": bet.target_scope,
        "selection": bet.selection,
        "selection_details": bet.selection_details,
        "odds": float(bet.odds),
        "line": float(bet.line) if bet.line is not None else None,
        "stake": float(bet.stake),
        "status": bet.status,
        "potential_payout": float(bet.potential_payout),
        "net_profit": float(bet.net_profit) if bet.net_profit is not None else None,
        "created_at": bet.created_at,
        "updated_at": bet.updated_at,
    }
