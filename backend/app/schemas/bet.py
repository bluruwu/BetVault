from decimal import Decimal

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
    status: BetStatus
    potential_payout: Decimal = Field(gt=0)
    net_profit: Decimal | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}