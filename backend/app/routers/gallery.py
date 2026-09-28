from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.auth.security import get_current_user
from app.models.user import User
from app.models.gallery import Gallery
from app.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryResponse

router = APIRouter(prefix="/api/gallery", tags=["Galería"])


@router.get("/", response_model=List[GalleryResponse])
def get_gallery(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Gallery).filter(Gallery.is_active == True)
    if category:
        query = query.filter(Gallery.category == category)
    return query.order_by(Gallery.order).offset(skip).limit(limit).all()


@router.get("/{gallery_id}", response_model=GalleryResponse)
def get_gallery_item(gallery_id: int, db: Session = Depends(get_db)):
    item = db.query(Gallery).filter(Gallery.id == gallery_id, Gallery.is_active == True).first()
    if not item:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    return item


@router.post("/", response_model=GalleryResponse, status_code=status.HTTP_201_CREATED)
def create_gallery_item(
    item_data: GalleryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_item = Gallery(
        **item_data.model_dump(),
        author_id=current_user.id,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.put("/{gallery_id}", response_model=GalleryResponse)
def update_gallery_item(
    gallery_id: int,
    item_data: GalleryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")

    for field, value in item_data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{gallery_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_item(
    gallery_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    db.delete(item)
    db.commit()
