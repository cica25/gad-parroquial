from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import re

from app.database import get_db
from app.auth.security import get_current_user
from app.models.user import User
from app.models.news import News
from app.schemas.news import NewsCreate, NewsUpdate, NewsResponse

router = APIRouter(prefix="/api/news", tags=["Novedades"])


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text


@router.get("/", response_model=List[NewsResponse])
def get_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    query = db.query(News).filter(News.is_published == True)
    if category:
        query = query.filter(News.category == category)
    if featured is not None:
        query = query.filter(News.is_featured == featured)
    return query.order_by(News.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{news_id}", response_model=NewsResponse)
def get_news_by_id(news_id: int, db: Session = Depends(get_db)):
    news = db.query(News).filter(News.id == news_id, News.is_published == True).first()
    if not news:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")
    return news


@router.post("/", response_model=NewsResponse, status_code=status.HTTP_201_CREATED)
def create_news(
    news_data: NewsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    slug = slugify(news_data.title)
    # Asegurar slug único
    existing = db.query(News).filter(News.slug == slug).first()
    if existing:
        slug = f"{slug}-{db.query(News).count() + 1}"

    new_news = News(
        **news_data.model_dump(),
        slug=slug,
        author_id=current_user.id,
    )
    db.add(new_news)
    db.commit()
    db.refresh(new_news)
    return new_news


@router.put("/{news_id}", response_model=NewsResponse)
def update_news(
    news_id: int,
    news_data: NewsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")

    for field, value in news_data.model_dump(exclude_unset=True).items():
        setattr(news, field, value)

    db.commit()
    db.refresh(news)
    return news


@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="Novedad no encontrada")
    db.delete(news)
    db.commit()
