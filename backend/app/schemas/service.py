from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ServiceBase(BaseModel):
    name: str
    description: str
    requirements: Optional[str] = None
    procedure: Optional[str] = None
    cost: Optional[str] = None
    icon: Optional[str] = None
    is_active: bool = True
    order: int = 0


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    procedure: Optional[str] = None
    cost: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


class ServiceResponse(ServiceBase):
    id: int
    slug: str
    author_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
