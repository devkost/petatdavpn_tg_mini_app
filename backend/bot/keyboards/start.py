from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

def start_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text="🚀 Открыть PetardaVPN",
            web_app=WebAppInfo(url="https://www.youtube.com/")  # URL твоего React приложения
        )
    ]])
