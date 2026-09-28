from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TransparencyBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    period: Optional[str] = None
    is_active: bool = True


class TransparencyCreate(TransparencyBase):
    file_url: str


class TransparencyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    period: Optional[str] = None
    is_active: Optional[bool] = None
    file_url: Optional[str] = None


class TransparencyResponse(TransparencyBase):
    id: int
    slug: str
    file_url: str
    author_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
