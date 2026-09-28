import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Users, Shield, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Home() {
  const [featuredNews, setFeaturedNews] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Crucita "La Bella"',
      subtitle: 'Un paraíso costero con playas de ensueño y gente amable',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop&q=60&auto=format'
    },
    {
      title: 'Crucita "La Bella"',
      subtitle: 'Disfruta de nuestras playas, gastronomía y cultura',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=400&fit=crop&q=60&auto=format'
    },
    {
      title: 'Crucita "La Bella"',
      subtitle: 'El lugar perfecto para descansar y conectar con la naturaleza',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=400&fit=crop&q=60&auto=format'
    }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const fetchData = async () => {
    try {
      const [newsRes, servicesRes] = await Promise.all([
        api.get('/news?featured=true&limit=3'),
        api.get('/services?limit=4'),
      ])
      setFeaturedNews(newsRes.data)
      setServices(servicesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-transparent" />
            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/servicios" className="bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2">
                    Nuestros Servicios
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/institucion" className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    Conócenos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Habitantes' },
              { number: '15+', label: 'Servicios' },
              { number: '100%', label: 'Transparencia' },
              { number: '24/7', label: 'Disponible' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rendición de Cuentas / PDOT / Turismo */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-8 text-center hover:border-primary-200 transition-colors">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rendición de Cuentas</h3>
              <p className="text-gray-600 mb-4">Informe anual sobre los trabajos y gestión realizada</p>
              <Link to="/transparencia" className="text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center gap-1">
                Ver más <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card p-8 text-center hover:border-primary-200 transition-colors">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">PDOT</h3>
              <p className="text-gray-600 mb-4">Plan de Desarrollo y Ordenamiento Territorial</p>
              <Link to="/transparencia" className="text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center gap-1">
                Ver documento <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card p-8 text-center hover:border-primary-200 transition-colors">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Turismo</h3>
              <p className="text-gray-600 mb-4">Descubre los atractivos turísticos de Crucita</p>
              <Link to="/galeria" className="text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center gap-1">
                Ver galería <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Novedades Destacadas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Últimas Noticias</h2>
              <p className="section-subtitle">Mantente informado sobre las últimas novedades</p>
            </div>
            <Link to="/novedades" className="hidden md:flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700">
              Ver todas <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredNews.length > 0 ? (
                featuredNews.map((news) => (
                  <Link key={news.id} to={`/novedades/${news.id}`} className="card overflow-hidden group">
                    <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                      {news.image_url ? (
                        <img src={news.image_url} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Newspaper size={48} className="text-primary-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="badge bg-primary-50 text-primary-700 mb-3">{news.category}</span>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{news.summary}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Newspaper size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No hay novedades destacadas</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">Conoce los trámites y servicios que ofrecemos</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.map((service) => (
                <Link key={service.id} to="/servicios" className="card p-6 text-center group hover:border-primary-200">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                    <FileText size={24} className="text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                </Link>
              ))
            ) : (
              <>
                {['Certificados', 'Constancias', 'Trámites', 'Licencias'].map((name) => (
                  <div key={name} className="card p-6 text-center">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                    <p className="text-sm text-gray-600">Servicio disponible próximamente</p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="text-center mt-10">
            <Link to="/servicios" className="btn-primary inline-flex items-center gap-2">
              Ver todos los servicios <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mensaje de Presidencia */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mensaje de Presidencia</h2>
              <blockquote className="text-xl italic text-primary-100 mb-6 leading-relaxed">
                "Un saludo fraterno a todo mi pueblo. Trabajamos día a día por el desarrollo 
                y bienestar de nuestra querida parroquia de Crucita, con transparencia 
                y compromiso con cada uno de ustedes."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">DC</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">Sra. Diana Castro</p>
                  <p className="text-primary-200">Presidenta del GAD Crucita</p>
                </div>
              </div>
            </div>
            <div className="h-80 bg-primary-600 rounded-2xl flex items-center justify-center">
              <div className="text-center text-primary-200">
                <Users size={64} className="mx-auto mb-4" />
                <p className="text-lg">Foto de la Presidenta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contacto */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesitas ayuda?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Estamos para servirte. Contáctanos y te responderemos a la brevedad posible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacto" className="btn-primary">
              Contáctanos
            </Link>
            <Link to="/servicios" className="btn-secondary">
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
