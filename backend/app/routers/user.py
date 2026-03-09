from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.user import UserService

router = APIRouter(prefix="/api", tags=["api"])


@router.post("/user/create")
async def create_user(tg_id: int, username: str | None = None, referrer_tg_id: int | None = None, session: AsyncSession = Depends(get_db)):
    user, is_new, referrer = await UserService.get_or_create(
        session=session,
        tg_id=tg_id,
        username=username,
        referrer_tg_id=referrer_tg_id
    )

    if not user:
        raise HTTPException(404, f"Пользователь не создан")

    return {
        "user": {
            "id": user.id,
            "tg_id": user.tg_id,
            "username": user.username,
            "email": user.email,
            "vpn_key": user.vpn_key
        },
        "is_new": is_new,
        "referrer_tg_id": referrer.tg_id if referrer else None
    }

@router.get("/user/{tg_id}")
async def get_user(tg_id: int, session: AsyncSession = Depends(get_db)):
    user = await UserService.get_by_tg_id(session, tg_id)
    if not user:
        raise HTTPException(404, f"Пользователь не найден")
    return user

@router.post("/user/vpn-key")
async def save_vpn_key(tg_id: int, vpn_key: str, session: AsyncSession = Depends(get_db)):
    result = await UserService.save_vpn_key(session, tg_id, vpn_key)

    if not result:
        raise HTTPException(404, f"Пользователь не найден")

    return result
