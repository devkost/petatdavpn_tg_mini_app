from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.payment import Payment
from app.models.user import User
from app.services.marzban import set_user_status
from datetime import datetime, timezone

class PaymentService:
    @staticmethod
    async def create_payment(session: AsyncSession, tg_id: int, amount: int):
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        user = result.scalar_one_or_none()
        if not user:
            return None

        payment = Payment(
            user_id=user.id,
            amount=amount,
            status="pending"
        )
        session.add(payment)

        await session.commit()
        await session.refresh(payment)

        return payment

    @staticmethod
    async def confirm_payment(session: AsyncSession, payment_id: int):
        payment = await session.get(Payment, payment_id)
        if not payment or payment.status != "pending":
            return None

        payment.status = "paid"
        payment.paid_at = datetime.now(timezone.utc)

        user = await session.get(User, payment.user_id)
        if not user:
            await session.rollback()
            return None

        user.balance += payment.amount
        user.is_active = True

        await session.commit()

        if user.vpn_key:
            await set_user_status(user.vpn_key, active=True)

        return payment