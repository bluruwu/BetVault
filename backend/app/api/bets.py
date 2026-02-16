import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from decimal import Decimal, ROUND_HALF_UP

from app.db.session import get_db
from app.models.bet import Bet, BetStatus
from app.schemas.bet import BetCreate, BetOut
from app.utils.utils import serialize_bet
from app.api.deps import get_current_user_id

router = APIRouter(prefix="/bets", tags=["bets"])

def round_decimal(x: Decimal) -> Decimal:
    return x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) #Related to Numeric(10,2)

@router.post("", response_model=BetOut)
def create_bet(
        payload: BetCreate,
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user_id)
):
    payout = round_decimal(payload.stake * payload.odds)

    profit = None
    if payload.status == BetStatus.WON:
        profit = round_decimal(payout - payload.stake)
    elif payload.status == BetStatus.LOST:
        profit = round_decimal(-payload.stake)
    elif payload.status == BetStatus.VOID:
        profit = Decimal("0.00")

    bet = Bet(
        **payload.model_dump(exclude_none=True),
        potential_payout=payout,
        net_profit = profit,
        user_id=uuid.UUID(current_user_id)
    )

    db.add(bet)
    db.commit()
    db.refresh(bet)
    return serialize_bet(bet)

@router.get("", response_model=list[BetOut])
def list_bets(
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user_id)
):
    user_bets = (
        select(Bet)
        .where(Bet.user_id == uuid.UUID(current_user_id))
        .order_by(Bet.created_at.desc())
    )
    bets = db.scalars(user_bets).all()
    return [serialize_bet(b) for b in bets]

