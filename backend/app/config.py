from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database - SQLite por defecto para desarrollo local
    # Para producción con PostgreSQL: postgresql://user:pass@host:5432/gad_parroquial
    DATABASE_URL: str = "sqlite:///./gad_parroquial.db"

    # JWT
    SECRET_KEY: str = "tu-clave-secreta-super-secreta-cambiar-en-produccion"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 horas

    # App
    APP_NAME: str = "GAD Parroquial"
    DEBUG: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
