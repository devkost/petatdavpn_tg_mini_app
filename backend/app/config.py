from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    bot_token: str
    echo_sql: bool = False

    marzban_url: str
    marzban_username: str
    marzban_password: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
