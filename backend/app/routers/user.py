from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.services.user import UserService

router = APIRouter(prefix="/api", tags=["api"])

@router.post("/user/create")
async def create_user(tg_id: int, username = None, referrer_tg_id = None, session: AsyncSession = Depends(get_db)):
    user, is_new = await UserService.get_or_create(
        session=session,
        tg_id=tg_id,
        username=username,
        referrer_tg_id=referrer_tg_id
    )

    if not user:
        return HTTPException(404, f"Пользователь не создан")

    return {
        "user": user,
        "is_new": is_new
    }

@router.get("/user/{tg_id}")
async def get_user(tg_id: int, session: AsyncSession = Depends(get_db)):
    user = await UserService.get_by_tg_id(session, tg_id)
    if not user:
        raise HTTPException(404, f"Пользователь не найден")
    return user
