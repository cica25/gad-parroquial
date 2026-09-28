from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import re

from app.database import get_db
from app.auth.security import get_current_user
from app.models.user import User
from app.models.transparency import Transparency
from app.schemas.transparency import TransparencyCreate, TransparencyUpdate, TransparencyResponse

router = APIRouter(prefix="/api/transparency", tags=["Transparencia"])


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text


@router.get("/", response_model=List[TransparencyResponse])
def get_transparency(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Transparency).filter(Transparency.is_active == True)
    if category:
        query = query.filter(Transparency.category == category)
    return query.order_by(Transparency.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{transparency_id}", response_model=TransparencyResponse)
def get_transparency_item(transparency_id: int, db: Session = Depends(get_db)):
    item = db.query(Transparency).filter(
        Transparency.id == transparency_id,
        Transparency.is_active == True
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    return item


@router.post("/", response_model=TransparencyResponse, status_code=status.HTTP_201_CREATED)
def create_transparency_item(
    item_data: TransparencyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    slug = slugify(item_data.title)
    existing = db.query(Transparency).filter(Transparency.slug == slug).first()
    if existing:
        slug = f"{slug}-{db.query(Transparency).count() + 1}"

    new_item = Transparency(
        **item_data.model_dump(),
        slug=slug,
        author_id=current_user.id,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.put("/{transparency_id}", response_model=TransparencyResponse)
def update_transparency_item(
    transparency_id: int,
    item_data: TransparencyUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = db.query(Transparency).filter(Transparency.id == transparency_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Documento no encontrado")

    for field, value in item_data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{transparency_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transparency_item(
    transparency_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = db.query(Transparency).filter(Transparency.id == transparency_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    db.delete(item)
    db.commit()
