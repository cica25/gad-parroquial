from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings
from app.database import engine, Base
from app.routers import auth, news, documents, services, gallery, transparency, upload

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Sistema de gestión para GAD Parroquial",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Compresión GZip
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Archivos estáticos (uploads) - la carpeta está en el frontend
import os
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "public", "uploads")
if os.path.exists(UPLOADS_DIR):
    app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# Incluir routers
app.include_router(auth.router)
app.include_router(news.router)
app.include_router(documents.router)
app.include_router(services.router)
app.include_router(gallery.router)
app.include_router(transparency.router)
app.include_router(upload.router)


@app.get("/")
def root():
    return {
        "message": f"Bienvenido a la API de {settings.APP_NAME}",
        "docs": "/api/docs",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/uploads/{file_path:path}")
async def serve_uploads(file_path: str):
    from pathlib import Path
    file = Path(f"frontend/public/uploads/{file_path}")
    if file.exists():
        return FileResponse(file)
    return {"error": "File not found"}
