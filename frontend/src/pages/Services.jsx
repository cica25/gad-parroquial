import { useState, useEffect } from 'react'
import { FileText, CheckCircle, Clock, DollarSign } from 'lucide-react'
import api from '../services/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await api.get('/services')
      const data = Array.isArray(response.data) ? response.data : []
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Servicios y Trámites</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conoce los servicios que ofrecemos y los requisitos para cada trámite
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={24} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                    {service.requirements && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-2">
                          <CheckCircle size={14} className="text-primary-600" />
                          Requisitos:
                        </h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{service.requirements}</p>
                      </div>
                    )}

                    {service.procedure && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-2">
                          <Clock size={14} className="text-primary-600" />
                          Procedimiento:
                        </h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{service.procedure}</p>
                      </div>
                    )}

                    {service.cost && (
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <DollarSign size={14} className="text-primary-600" />
                        <span className="font-medium">Costo:</span> {service.cost}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
