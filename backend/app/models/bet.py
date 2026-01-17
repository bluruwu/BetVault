from sqlalchemy import String, DateTime, Numeric, Enum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from datetime import datetime, timezone
from decimal import Decimal
import enum
#Import Base Class
from app.db.base import Base

#Different status for a bet
class BetStatus(str, enum.Enum):
    PENDING = "PENDING"
    WON = "WON"
    LOST = "LOST"
    VOID = "VOID"

#Available markets to bet
class MarketType(str, enum.Enum):
    MATCH_RESULT = "MATCH_RESULT"
    HANDICAP = "HANDICAP"
    CORNERS = "CORNERS"
    CARDS = "CARDS"
    PLAYER_SHOTS = "PLAYER_SHOTS"
    GOALS = "GOALS"
    PLAYER_SHOTS_TARGET = "PLAYER_SHOTS_TARGET"
    PLAYER_GOALS = "PLAYER_GOALS"

#Scope of a bet
class TargetScope(str, enum.Enum):
    MATCH = "MATCH"
    HOME_TEAM = "HOME_TEAM"
    AWAY_TEAM = "AWAY_TEAM"

class Bet(Base):
    __tablename__ = "bets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    #Team fields
    home_team: Mapped[str] = mapped_column(String(80))
    away_team: Mapped[str] = mapped_column(String(80))

    #Enum fields
    market_type: Mapped[MarketType] = mapped_column(Enum(MarketType, native_enum=False, name="market_type"), index=True)
    target_scope: Mapped[TargetScope] = mapped_column(Enum(TargetScope, name="target_scope", native_enum=False), default=TargetScope.MATCH)
    status: Mapped[BetStatus] = mapped_column(Enum(BetStatus, name="status", native_enum=False),
                                              default=BetStatus.PENDING, index=True)
    #Detail fields
    selection: Mapped[str] = mapped_column(String(120)) #Over, Under...
    selection_details: Mapped[str | None] = mapped_column(String(120), nullable=True)
    line: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)  #Number of: handicap, goals...
    odds: Mapped[Decimal] = mapped_column(Numeric(10, 4))
    stake: Mapped[Decimal] = mapped_column(Numeric(10, 2))

    #Profit fields
    potential_payout: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    net_profit: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)

    #Time fields
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
