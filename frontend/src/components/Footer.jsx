import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg">GAD Crucita</span>
                <p className="text-xs text-gray-400">Gobierno Autónomo Descentralizado</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trabajando por el desarrollo y bienestar de nuestra comunidad de Crucita
              con transparencia y eficiencia.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/novedades" className="hover:text-white transition-colors">Novedades</Link></li>
              <li><Link to="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
              <li><Link to="/documentos" className="hover:text-white transition-colors">Documentos</Link></li>
              <li><Link to="/transparencia" className="hover:text-white transition-colors">Transparencia</Link></li>
              <li><Link to="/galeria" className="hover:text-white transition-colors">Galería</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-white mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/servicios" className="hover:text-white transition-colors">Certificados</Link></li>
              <li><Link to="/servicios" className="hover:text-white transition-colors">Constancias</Link></li>
              <li><Link to="/servicios" className="hover:text-white transition-colors">Trámites</Link></li>
              <li><Link to="/servicios" className="hover:text-white transition-colors">Licencias</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-primary-400 shrink-0" />
                <span>Principal #123, Crucita, Cantón, Provincia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary-400 shrink-0" />
                <span>(000) 000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary-400 shrink-0" />
                <span>info@gadcrucita.gob.ec</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} GAD Parroquial de Crucita. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link to="/admin/login" className="hover:text-white transition-colors">Acceso Administración</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
