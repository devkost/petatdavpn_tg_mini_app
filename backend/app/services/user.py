from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.models.referral import Referral

class UserService:
    @staticmethod
    async def get_by_tg_id(session: AsyncSession, tg_id: int) -> User | None:
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_or_create(session: AsyncSession, tg_id: int, username = None, email = None, referrer_tg_id = None) -> tuple[User, bool, User | None]:
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        user = result.scalar_one_or_none()

        if user:
            return user, False, None

        user = User(tg_id=tg_id, username=username, email=email)
        session.add(user)
        await session.flush()

        referrer_with_bonus = None
        if referrer_tg_id:
            referrer_result = await session.execute(select(User).where(User.tg_id == referrer_tg_id))
            referrer = referrer_result.scalar_one_or_none()
            if referrer and referrer.tg_id != tg_id:
                referral = Referral(
                    referrer_id=referrer.id,
                    referred_user_id=user.id
                )
                session.add(referral)
                referrer.balance = (referrer.balance or 0) + 50
                referrer.is_active = True
                user.balance = (user.balance or 0) + 50
                user.is_active = True
                referrer_with_bonus = referrer

        await session.commit()
        await session.refresh(user)
        if referrer_with_bonus:
            await session.refresh(referrer_with_bonus)

        return user, True, referrer_with_bonus
    
    @staticmethod
    async def save_vpn_key(session: AsyncSession, tg_id: int, vpn_key: str):
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        user = result.scalar_one_or_none()

        if not user:
            return False
        
        user.vpn_key = vpn_key
        await session.commit()

        return user