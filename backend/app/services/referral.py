from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.user import User
from app.models.referral import Referral

class ReferralService:
    @staticmethod
    async def create_referral(session: AsyncSession, new_user_id: int, referrer_tg_id: int) -> bool:
        result = await session.execute(select(User).where(User.tg_id == referrer_tg_id))
        inviter = result.scalar_one_or_none()

        if not inviter or inviter.id == new_user_id:
            return False

        referral = Referral(
            referrer_id=new_user_id,
            referred_user_id=inviter.id
        )

        session.add(referral)
        await session.commit()
        return True


    @staticmethod
    async def get_referrals(session: AsyncSession, tg_id: int):
        result = await session.execute(
            select(func.count(Referral.id))
            .join(User, User.id == Referral.referrer_id)
            .where(User.tg_id == tg_id)
        )

        users = result.scalars().all()
        return [
            {
                "tg_id": u.tg_id,
                "username": u.username,
                "created_at": u.created_at,
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
        
        return len(result.scalars().all())
