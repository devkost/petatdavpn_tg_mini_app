from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import aliased
from app.models.user import User
from app.models.referral import Referral

REFERRAL_BONUS = 100

class ReferralService:
    @staticmethod
    async def get_referrals(session: AsyncSession, tg_id: int):
        referrer = aliased(User)
        referred = aliased(User)

        result = await session.execute(
            select(referred)
            .join(Referral, referred.id == Referral.referred_user_id)
            .join(referrer, referrer.id == Referral.referrer_id)
            .where(referrer.tg_id == tg_id)
        )
        users = result.scalars().all()

        return [
            {
                "tg_id": u.tg_id,
                "username": u.username,
                "created_at": str(u.created_at),
            }
            for u in users
        ]
    

    @staticmethod
    async def get_referrals_count(session: AsyncSession, tg_id: int):
        result = await session.execute(
            select(func.count(Referral.id))
            .join(User, User.id == Referral.referrer_id)
            .where(User.tg_id == tg_id)
        )
        
        return result.scalar() or 0
