import httpx
from aiogram import Router
from aiogram.types import Message
from aiogram.filters import CommandStart, CommandObject
from bot.keyboards.start import start_keyboard
from bot.services.api import init_user, save_vpn_key
from bot.services.marzban import create_vpn_user, set_user_status

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

        sub_url = await create_vpn_user(f"{message.from_user.id}")
        if sub_url:
            await save_vpn_key(tg_id=message.from_user.id, vpn_key=sub_url)
            if user.get("referrer_vpn_key"):
                await set_user_status(sub_url, active=True)
                await set_user_status(user["referrer_vpn_key"], active=True)
    else:
        text = (
            f"👋 С возвращением, {message.from_user.first_name}!\n\n"
            f"Открывай приложение и подключайся 👇"
        )

    await message.answer(text, reply_markup = start_keyboard())
    