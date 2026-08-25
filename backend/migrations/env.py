import asyncio
from logging.config import fileConfig
import sys
from pathlib import Path

# Добавляем путь к корню проекта, чтобы импорты работали
sys.path.append(str(Path(__file__).parent.parent))

from alembic import context
from sqlalchemy import engine_from_config, pool

# Импортируем БАЗОВЫЙ класс (Base) и ВСЕ МОДЕЛИ, чтобы они были известны Alembic
# ВАЖНО: Импортируем именно из app.database, а не пытаемся создать новый Base здесь
from app.database import Base
from app.models.user import User
from app.models.referral import Referral
from app.models.payment import Payment
from app.config import settings

# Это объект конфигурации Alembic, который читает alembic.ini
config = context.config

# Override DB URL from settings (convert asyncpg -> psycopg2 for sync migrations)
sync_url = settings.database_url.replace("postgresql+asyncpg://", "postgresql+psycopg2://")
config.set_main_option("sqlalchemy.url", sync_url)

# Настраиваем логирование из конфиг-файла
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Присваиваем target_metadata метаданные нашей Base.
# Именно так Alembic узнает, как должна выглядеть схема базы данных.
target_metadata = Base.metadata

# Другие значения из конфига, определяемые нуждами env.py,
# можно достать так:
# my_important_option = config.get_main_option("my_important_option")

def run_migrations_offline() -> None:
    """Запуск миграций в 'оффлайн' режиме.

    При этом просто генерируется SQL скрипт, без реального подключения к БД.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Запуск миграций в 'онлайн' режиме.

    Здесь мы создаем синхронный движок для подключения к БД.
    Это КЛЮЧЕВОЙ МОМЕНТ для решения проблемы MissingGreenlet.
    """
    # Конфигурация для синхронного движка. Используем URL из alembic.ini
    # Убедитесь, что в alembic.ini в качестве драйвера указан синхронный (psycopg2)!
    configuration = config.get_section(config.config_ini_section)
    
    # Создаем синхронный движок
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    # Работаем с подключением синхронно
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

# Эта функция больше не нужна, мы будем использовать синхронный run_migrations_online
# async def run_async_migrations() -> None: ...

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
    