from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.payment import PaymentService


router = APIRouter(prefix="/api", tags=["api"])


@router.post("/payment/create")
async def create_payment(tg_id: int, amount: int, session: AsyncSession = Depends(get_db)):
    payment = await PaymentService.create_payment(
        session=session,
        tg_id=tg_id,
        amount=amount
    )

    if not payment:
        raise HTTPException(404, "Пользователь не найден")

    return payment


@router.post("/payment/confirm/{payment_id}")
async def confirm_payment(payment_id: int, session: AsyncSession = Depends(get_db)):
    payment = await PaymentService.confirm_payment(session, payment_id)
    if not payment:
        raise HTTPException(404, "Платёж не найден")
    return payment
