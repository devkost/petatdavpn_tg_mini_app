from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.referral import ReferralService

router = APIRouter(prefix="/api", tags=["api"])


@router.get("/referrals/{tg_id}")
async def get_referrals(tg_id: int, session: AsyncSession = Depends(get_db)):
    referrals = await ReferralService.get_referrals(
        session=session,
        tg_id=tg_id
    )

    return referrals


@router.get("/referrals/count/{tg_id}")
async def get_referrals_count(tg_id: int, session: AsyncSession = Depends(get_db)):
    count = await ReferralService.get_referrals_count(
        session=session,
        tg_id=tg_id,
    )

    return count