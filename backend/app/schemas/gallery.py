from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class GalleryBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str = "general"
    is_active: bool = True
    order: int = 0


class GalleryCreate(GalleryBase):
    image_url: str


class GalleryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None
    image_url: Optional[str] = None


class GalleryResponse(GalleryBase):
    id: int
    image_url: str
    author_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
