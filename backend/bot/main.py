import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties
from bot.routers import start
from app.config import settings

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def main():
    logger.info("🚀 Запуск бота...")
    
    # Проверка наличия токена
    if not settings.bot_token:
        logger.error("❌ BOT_TOKEN не найден в переменных окружения!")
        return
    
    logger.info("✅ Токен бота найден")
    
    try:
        bot = Bot(
            token=settings.bot_token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML)
        )
        logger.info("✅ Экземпляр Bot создан")
        
        bot_info = await bot.get_me()
        logger.info(f"✅ Бот авторизован как: @{bot_info.username} (ID: {bot_info.id})")
        
        dp = Dispatcher()
        logger.info("✅ Экземпляр Dispatcher создан")
        
        dp.include_router(start.router)
        logger.info("✅ Роутер 'start' подключен")
        
        await bot.delete_webhook(drop_pending_updates=True)
        logger.info("✅ Вебхук удален")
        
        logger.info("🎯 Бот запущен и готов к работе! Ожидание сообщений...")
        
        await dp.start_polling(bot)
        
    except Exception as e:
        logger.error(f"❌ Ошибка при запуске бота: {e}", exc_info=True)
    finally:
        logger.info("🛑 Бот остановлен")
        await bot.session.close()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("👋 Бот остановлен пользователем (Ctrl+C)")
    except Exception as e:
        logger.error(f"❌ Непредвиденная ошибка: {e}", exc_info=True)
