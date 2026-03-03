import sys
import os
from aiogram import Router
from aiogram.types import Message
from aiogram.filters import CommandStart, CommandObject
from bot.keyboards.start import start_keyboard
from app.database import AsyncSessionLocal
from app.services.user import UserService
from app.services.referral import ReferralService

router = Router()

@router.message(CommandStart())
async def cmd_start(message: Message, command: CommandObject):
    async with AsyncSessionLocal() as session:
        user, is_new = await UserService.get_or_create(
            session=session,
            tg_id=message.from_user.id,
            username=message.from_user.username
        )

        if is_new and command.args:
            try:
                referrer_tg_id = int(command.args)

                if referrer_tg_id != message.from_user.id:
                    await ReferralService.create_referral(
                        session=session,
                        new_user_id=user.id,
                        referrer_tg_id=referrer_tg_id
                    )
            except ValueError:
                pass

    if is_new:
        text = (
            f"👋 Привет, {message.from_user.first_name}!\n\n"
            f"Добро пожаловать в <b>PetardaVPN</b> 🚀\n"
            f"Ты успешно зарегистрирован!"
        )
    else:
        text = (
            f"👋 С возвращением, {message.from_user.first_name}!\n\n"
            f"Открывай приложение и подключайся 👇"
        )

    await message.answer(text, reply_markup = start_keyboard())
    