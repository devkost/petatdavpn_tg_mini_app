import httpx
from aiogram import Router
from aiogram.types import Message
from aiogram.filters import CommandStart, CommandObject
from bot.keyboards.start import start_keyboard
from bot.services.api import init_user

router = Router()

@router.message(CommandStart())
async def cmd_start(message: Message, command: CommandObject):
    referrer_tg_id = None
    if command.args:
        try:
            referrer_tg_id = int(command.args)
        except ValueError:
            pass

    user = await init_user(
        tg_id=message.from_user.id,
        username=message.from_user.username,
        referrer_tg_id=referrer_tg_id
    )

    if not user:
        await message.answer("Произошла ошибка. Попробуй ещё раз.")
        return

    if user['is_new']:
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
    