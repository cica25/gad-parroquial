import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

router = APIRouter(prefix="/api/upload", tags=["Subida de archivos"])

# Carpeta de uploads
UPLOAD_DIR = Path(__file__).parent.parent.parent.parent / "frontend" / "public" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
MAX_SIZE = 5 * 1024 * 1024  # 5MB


@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    # Validar tipo de archivo
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Solo se permiten imágenes JPG, PNG o WebP"
        )

    # Validar tamaño
    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(
            status_code=400,
            detail="El archivo no debe superar 5MB"
        )

    # Generar nombre único
    import uuid
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename

    # Guardar archivo
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    # Retornar URL pública
    public_url = f"/uploads/{unique_filename}"

    return {
        "url": public_url,
        "filename": unique_filename,
        "size": len(contents)
    }
