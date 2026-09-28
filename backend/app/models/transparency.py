from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Transparency(Base):
    __tablename__ = "transparency"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    file_url = Column(String(500), nullable=False)
    category = Column(String(100), nullable=False)  # presupuestos, rendicion, normativas
    period = Column(String(100), nullable=True)  # ej: "2024", "Trimestre 1 2024"
    is_active = Column(Boolean, default=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
