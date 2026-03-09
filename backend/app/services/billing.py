from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User

DAILY_COST = 5

async def charge_all_users(session: AsyncSession):
    result = await session.execute(select(User).where(User.balance > 0, User.is_active == True))
    users = result.scalars().all()

    for user in users:
        user.balance -= DAILY_COST

        if user.balance <= 0:
            user.balance = 0
            user.is_active = False

    await session.commit()
    return True
