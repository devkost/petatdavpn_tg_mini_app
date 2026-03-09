from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.services.marzban import set_user_status

DAILY_COST = 5

async def charge_all_users(session: AsyncSession):
    result = await session.execute(select(User).where(User.is_active == True))
    users = result.scalars().all()

    to_disable = []

    for user in users:
        if user.balance > 0:
            user.balance -= DAILY_COST

        if user.balance <= 0:
            user.balance = 0
            user.is_active = False
            if user.vpn_key:
                to_disable.append(user.vpn_key)

    await session.commit()

    for vpn_key in to_disable:
        await set_user_status(vpn_key, active=False)

    return True
