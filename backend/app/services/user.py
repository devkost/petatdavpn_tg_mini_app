from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User

class UserService:
    @staticmethod
    async def get_by_tg_id(session: AsyncSession, tg_id: int) -> User | None:
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_or_create(session: AsyncSession, tg_id: int, username: str | None = None, email: str | None = None) -> tuple[User, bool]:
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        user = result.scalar_one_or_none()

        if user:
            return user, False

        user = User(tg_id=tg_id, username=username, email=email)
        session.add(user)
        await session.commit()
        await session.refresh(user)

        return user, True