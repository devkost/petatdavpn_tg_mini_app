from sqlalchemy.ext.asyncio import AsyncSession
from app.models.payment import Payment
from app.models.user import User
from datetime import datetime

class PaymentService:
    @staticmethod
    async def create_payment(session: AsyncSession, user_id: int, amount: int):
        payment = Payment(
            user_id=user_id,
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
        payment.created_at = datetime.utcnow()

        user = await session.get(User, payment.user_id)
        if not user:
            await session.rollback()
            return None

        user.balance += payment.amount
        await session.commit()
        return payment