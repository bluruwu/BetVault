import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from sqlalchemy import select
from decimal import Decimal, ROUND_HALF_UP

from app.db.session import get_db
from app.models.bet import Bet, BetStatus
from app.schemas.bet import BetCreate, BetOut, BetUpdate, BetStatsOut
from app.utils.utils import serialize_bet
from app.core.security.auth import get_current_user_id

router = APIRouter(prefix="/bets", tags=["bets"])

#HELPERS
def round_decimal(x: Decimal) -> Decimal:
    return x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) #Related to Numeric(10,2)

def calculate_payout_and_profit(stake: Decimal, odds: Decimal, status: BetStatus) -> tuple[Decimal, Decimal | None]:
    """Calculates profit and payout using stake, odds and status."""
    payout = round_decimal(stake * odds)
    profit = None
    if status == BetStatus.WON:
        profit = round_decimal(payout - stake)
    elif status == BetStatus.LOST:
        profit = round_decimal(-stake)
    elif status == BetStatus.VOID:
        profit = Decimal("0.00")
    return payout, profit

# ENDPOINTS
@router.post("", response_model=BetOut)
def create_bet(
        payload: BetCreate,
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user_id)
):

    payout, profit = calculate_payout_and_profit(payload.stake, payload.odds, payload.status)
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

@router.get("/stats", response_model=BetStatsOut)
def get_user_stats(
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user_id)
):
    user_bets = (
        select(Bet)
        .where(Bet.user_id == uuid.UUID(current_user_id))
        .order_by(Bet.created_at.desc())
    )
    bets = db.scalars(user_bets).all()

    total_bets = len(bets)
    total_won = sum(1 for b in bets if b.status == BetStatus.WON)
    total_lost = sum(1 for b in bets if b.status == BetStatus.LOST)
    total_pending = sum(1 for b in bets if b.status == BetStatus.PENDING)

    #winrate
    settled_bets = total_won + total_lost
    win_rate = Decimal("0.00")
    if settled_bets > 0:
        win_rate = round_decimal(
            (Decimal(total_won) / Decimal(settled_bets)) * 100)

    #profit and ROI
    total_profit = sum((b.net_profit for b in bets if b.net_profit is not None), Decimal("0.00"))

    total_staked_settled = sum((b.stake for b in bets if b.status in (BetStatus.WON, BetStatus.LOST)), Decimal("0.00"))
    roi = Decimal("0.00")
    if total_staked_settled > 0:
        roi = round_decimal((total_profit / total_staked_settled) * 100)

    #Streak
    current_streak = 0
    streak_type = None
    for bet in  bets:
        if bet.status not in (BetStatus.WON, BetStatus.LOST):
            continue

        if streak_type is None:
            streak_type = bet.status

        if bet.status == streak_type:
            current_streak += 1 if streak_type == BetStatus.WON else -1
        else:
            break

    return BetStatsOut(
        total_bets = total_bets,
        total_won = total_won,
        total_lost = total_lost,
        total_pending = total_pending,
        win_rate = win_rate,
        roi = roi,
        total_profit = total_profit,
        current_streak = current_streak,
    )

@router.patch("/{bet_id}", response_model=BetOut)
def update_bet(
        bet_id: int,
        payload: BetUpdate,
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user_id)
):
    search = select(Bet).where(Bet.id == bet_id, Bet.user_id == uuid.UUID(current_user_id))
    bet = db.scalars(search).first()
    if not bet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bet not found")
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(bet, key, value)
    payout, profit = calculate_payout_and_profit(bet.stake, bet.odds, bet.status)
    bet.potential_payout = payout
    bet.net_profit = profit
    db.commit()
    db.refresh(bet)
    return serialize_bet(bet)

@router.delete("/{bet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bet(
        bet_id: int,
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user_id)
):
    search = select(Bet).where(Bet.id == bet_id, Bet.user_id == uuid.UUID(current_user_id))
    bet = db.scalars(search).first()
    if not bet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bet not found")
    db.delete(bet)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)