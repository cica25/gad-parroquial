from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    file_type: str = "pdf"
    is_active: bool = True


class DocumentCreate(DocumentBase):
    file_url: str


class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    file_type: Optional[str] = None
    is_active: Optional[bool] = None
    file_url: Optional[str] = None


class DocumentResponse(DocumentBase):
    id: int
    slug: str
    file_url: str
    download_count: int
    author_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
