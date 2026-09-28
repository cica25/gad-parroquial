from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class NewsBase(BaseModel):
    title: str
    summary: str
    content: str
    category: str = "general"
    is_published: bool = True
    is_featured: bool = False


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None
    image_url: Optional[str] = None


class NewsResponse(NewsBase):
    id: int
    slug: str
    image_url: Optional[str] = None
    author_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
