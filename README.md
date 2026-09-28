# GAD Parroquial - Sitio Web Institucional

Sistema de gestión de contenido para un Gobierno Autónomo Descentralizado Parroquial, con sitio público y panel de administración.

## Características

### Sitio Público
- **Inicio** — Hero, novedades destacadas, servicios, transparencia
- **Institución** — Historia, misión, visión, valores, autoridades
- **Novedades** — Blog con categorías y búsqueda
- **Servicios** — Catálogo de trámites con requisitos y procedimientos
- **Documentos** — Certificados, constancias, formatos descargables
- **Galería** — Imágenes con lightbox
- **Transparencia** — Presupuestos, rendición de cuentas, normativas
- **Contacto** — Formulario, información de contacto, mapa

### Panel de Administración (`/admin`)
- Dashboard con métricas
- CRUD completo de Novedades
- CRUD completo de Documentos
- CRUD completo de Servicios
- CRUD completo de Galería
- CRUD completo de Transparencia
- Gestión de usuarios (próximamente)

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Backend | Python + FastAPI |
| Frontend | React + Vite + TailwindCSS |
| Base de datos | PostgreSQL |
| Autenticación | JWT |

## Estructura del Proyecto

```
GAD-Parroquial/
├── backend/                 # API REST con FastAPI
│   ├── app/
│   │   ├── main.py         # Punto de entrada
│   │   ├── config.py       # Configuración
│   │   ├── database.py     # Conexión a BD
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── routers/        # Endpoints de la API
│   │   ├── schemas/        # Esquemas Pydantic
│   │   └── auth/           # Autenticación JWT
│   ├── requirements.txt
│   └── .env.example
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas públicas
│   │   ├── admin/          # Panel de administración
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Llamadas a la API
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Instalación y Ejecución

### Requisitos Previos
- Python 3.10+
- Node.js 18+
- PostgreSQL (o usar Supabase gratuito)

### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar migraciones (opcional, las tablas se crean automáticamente)
alembic upgrade head

# Iniciar servidor
uvicorn app.main:app --reload
```

El backend estará disponible en `http://localhost:8000`
Documentación API: `http://localhost:8000/api/docs`

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Despliegue (Gratuito)

### Opción 1: Render + Netlify + Supabase

1. **Base de datos**: Crear proyecto en [Supabase](https://supabase.com) (gratuito)
2. **Backend**: Desplegar en [Render](https://render.com) (plan gratuito)
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. **Frontend**: Desplegar en [Netlify](https://netlify.com) (plan gratuito)
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Opción 2: Todo en Render

1. **Base de datos**: Supabase o PostgreSQL en Render
2. **Backend**: Web Service en Render
3. **Frontend**: Static Site en Render

## Credenciales por Defecto

Después de crear las tablas, debes crear un usuario administrador manualmente:

```python
from app.database import SessionLocal
from app.models.user import User
from app.auth.security import get_password_hash

db = SessionLocal()
admin = User(
    email="admin@gadparroquial.gob.ec",
    username="admin",
    full_name="Administrador",
    hashed_password=get_password_hash("admin123"),
    is_admin=True,
)
db.add(admin)
db.commit()
```

**Credenciales iniciales:**
- Usuario: `admin`
- Contraseña: `admin123`

## Próximas Funcionalidades

- [ ] Integración con firma electrónica
- [ ] Sistema de notificaciones por email
- [ ] Generación automática de certificados PDF
- [ ] Sistema de citas online
- [ ] Multi-idioma
- [ ] Dashboard con estadísticas avanzadas

## Licencia

MIT
