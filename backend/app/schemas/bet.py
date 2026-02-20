from decimal import Decimal
import uuid
from pydantic import BaseModel, Field
from app.models.bet import MarketType, BetStatus, TargetScope
from datetime import datetime, timezone

class BetBase(BaseModel):
    home_team: str = Field(min_length=1, max_length=80)
    away_team: str = Field(min_length=1, max_length=80)
    market_type: MarketType
    target_scope: TargetScope = TargetScope.MATCH
    selection: str = Field(min_length=1, max_length=120)
    selection_details: str | None = None
    odds: Decimal = Field(gt=1.0)
    line: Decimal | None = None
    stake: Decimal = Field(gt=0)

class BetCreate(BetBase):
    status: BetStatus = BetStatus.PENDING
    created_at: datetime | None = None

class BetOut(BetBase):
    id: int
    user_id: uuid.UUID
    status: BetStatus
    potential_payout: Decimal = Field(gt=0)
    net_profit: Decimal | None = None
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}

class BetUpdate(BaseModel):
    home_team: str | None = Field(None, min_length=1, max_length=80)
    away_team: str | None = Field(None, min_length=1, max_length=80)
    market_type: MarketType | None = None
    target_scope: TargetScope | None = None
    selection: str | None = Field(None, min_length=1, max_length=120)
    selection_details: str | None = None
    odds: Decimal | None = Field(None, gt=1.0)
    line: Decimal | None = None
    stake: Decimal | None = Field(None, gt=0)
    status: BetStatus | None = None

class BetStatsOut(BaseModel):
    total_bets: int
    total_won: int
    total_lost: int
    total_pending: int
    win_rate: Decimal
    roi: Decimal
    total_profit: Decimal
    current_streak: int