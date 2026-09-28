from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.schemas.news import NewsCreate, NewsUpdate, NewsResponse
from app.schemas.document import DocumentCreate, DocumentUpdate, DocumentResponse
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryResponse
from app.schemas.transparency import TransparencyCreate, TransparencyUpdate, TransparencyResponse

__all__ = [
    "UserCreate", "UserResponse", "UserLogin", "Token",
    "NewsCreate", "NewsUpdate", "NewsResponse",
    "DocumentCreate", "DocumentUpdate", "DocumentResponse",
    "ServiceCreate", "ServiceUpdate", "ServiceResponse",
    "GalleryCreate", "GalleryUpdate", "GalleryResponse",
    "TransparencyCreate", "TransparencyUpdate", "TransparencyResponse",
]
