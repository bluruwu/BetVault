from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from decimal import Decimal, ROUND_HALF_UP

from app.db.session import get_db
from app.models.bet import Bet, BetStatus
from app.schemas.bet import BetCreate, BetOut

router = APIRouter(prefix="/bets", tags=["bets"])

def round_decimal(x: Decimal) -> Decimal:
    return x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) #Related to Numeric(10,2)

@router.post("", response_model=BetOut)
def create_bet(payload: BetCreate, db: Session = Depends(get_db)):
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
    )

    db.add(bet)
    db.commit()
    db.refresh(bet)
    return bet

@router.get("", response_model=list[BetOut])
def list_bets(db: Session = Depends(get_db)):
    return db.scalars(select(Bet).order_by(Bet.created_at.desc())).all()

