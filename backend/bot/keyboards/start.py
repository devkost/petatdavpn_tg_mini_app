from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from app.config import settings

def start_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text="🚀 Открыть PetardaVPN",
            web_app=WebAppInfo(
                url=f"{settings.backend_url.rstrip('/')}/?fullscreen=1"
            )
        )
    ]])
