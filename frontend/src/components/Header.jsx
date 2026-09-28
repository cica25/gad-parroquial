import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, Phone, Clock, User } from 'lucide-react'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Institución', href: '/institucion' },
  { name: 'Novedades', href: '/novedades' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Documentos', href: '/documentos' },
  { name: 'Galería', href: '/galeria' },
  { name: 'Transparencia', href: '/transparencia' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Barra superior */}
      <div className="bg-primary-700 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              Crucita, Cantón, Provincia
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone size={14} />
              (000) 000-0000
            </span>
          </div>
          <span className="hidden md:flex items-center gap-1">
            <Clock size={14} />
            Lun - Vie: 8:00 AM - 5:00 PM
          </span>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg">GAD Crucita</span>
              <p className="text-xs text-gray-500 -mt-1">Gobierno Autónomo Descentralizado</p>
            </div>
          </Link>

          {/* Navegación desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Icono de usuario + menú móvil */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary-700 hover:bg-primary-50 transition-colors"
              title="Acceso administración"
            >
              <User size={20} />
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                <User size={18} />
                Administración
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
