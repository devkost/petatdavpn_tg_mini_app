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
    async def get_or_create(session: AsyncSession, tg_id: int, username = None, email = None, referrer_tg_id = None) -> tuple[User, bool]:
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        user = result.scalar_one_or_none()

        if user:
            return user, False

        user = User(tg_id=tg_id, username=username, email=email)
        session.add(user)

        if referrer_tg_id:
            referrer = await session.execute(select(User).where(User.tg_id == referrer_tg_id))
            referrer = referrer.scalar_one_or_none()
            if referrer and referrer.tg_id != tg_id:
                referral = Referral(
                    referrer_id=referrer.id,
                    referred_user_id=user.id
                )
                session.add(referral)

        await session.commit()
        await session.refresh(user)

        return user, True