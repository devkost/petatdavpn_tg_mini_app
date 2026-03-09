from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.services.user import UserService

router = APIRouter(prefix="/api", tags=["api"])

@router.post("/user/create")
async def create_user(tg_id: int, username: str = None, referrer_tg_id: int = None, session: AsyncSession = Depends(get_db)):
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

@router.post("/user/vpn-key")
async def save_vpn_key(tg_id: int, vpn_key: str, session: AsyncSession = Depends(get_db)):
    vpn_key = await UserService.save_vpn_key(session, tg_id, vpn_key)

    if not vpn_key:
        raise HTTPException(404, f"Пользователь не найден") 
    
    return vpn_key
