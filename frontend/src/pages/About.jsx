import { Target, Eye, Users, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="py-12 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestra Institución</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Conoce más sobre nuestra historia, misión y el trabajo que realizamos
            por el desarrollo de nuestra comunidad parroquial.
          </p>
        </div>

        {/* Historia */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              El Gobierno Autónomo Descentralizado Parroquial fue establecido con el objetivo
              de promover el desarrollo integral y sostenible de nuestra comunidad. A lo largo
              de los años, hemos trabajado incansablemente para mejorar la calidad de vida de
              todos los habitantes de la parroquia.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nuestra gestión se basa en principios de transparencia, participación ciudadana
              y eficiencia en el uso de los recursos públicos, siempre buscando el bienestar
              común y el desarrollo armónico de nuestro territorio.
            </p>
          </div>
          <div className="h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
            <div className="text-center text-primary-600">
              <Award size={64} className="mx-auto mb-4" />
              <p className="text-lg font-medium">Años de servicio a la comunidad</p>
            </div>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
              <Target size={28} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Misión</h3>
            <p className="text-gray-600 leading-relaxed">
              Promover el desarrollo integral y sostenible de la parroquia mediante una
              gestión pública eficiente, transparente y participativa, que garantice
              el bienestar y la calidad de vida de todos sus habitantes.
            </p>
          </div>

          <div className="card p-8">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
              <Eye size={28} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visión</h3>
            <p className="text-gray-600 leading-relaxed">
              Ser un modelo de gestión pública parroquial, reconocido por su transparencia,
              eficiencia y compromiso con el desarrollo comunitario, logrando una sociedad
              más justa, equitativa y próspera.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nuestros Valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Transparencia', desc: 'Rendición de cuentas clara y oportuna' },
              { title: 'Eficiencia', desc: 'Uso óptimo de los recursos públicos' },
              { title: 'Participación', desc: 'Involucramiento ciudadano en las decisiones' },
              { title: 'Compromiso', desc: 'Dedicación al servicio comunitario' },
            ].map((value) => (
              <div key={value.title} className="card p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Autoridades */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Autoridades</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Nombre del Presidente', role: 'Presidente' },
              { name: 'Nombre del Vicepresidente', role: 'Vicepresidente' },
              { name: 'Nombre del Secretario', role: 'Secretario' },
              { name: 'Nombre del Tesorero', role: 'Tesorero' },
            ].map((authority) => (
              <div key={authority.role} className="card p-6 text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{authority.name}</h3>
                <p className="text-sm text-primary-600">{authority.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
