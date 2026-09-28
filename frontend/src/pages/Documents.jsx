import { useState, useEffect } from 'react'
import { FileText, Download, Search } from 'lucide-react'
import api from '../services/api'

export default function Documents() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchDocuments()
  }, [category])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = category ? `?category=${category}` : ''
      const response = await api.get(`/docs${params}`)
      const data = Array.isArray(response.data) ? response.data : []
      setDocuments(data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: '', label: 'Todos' },
    { value: 'certificados', label: 'Certificados' },
    { value: 'constancias', label: 'Constancias' },
    { value: 'informes', label: 'Informes' },
    { value: 'tramites', label: 'Trámites' },
    { value: 'formatos', label: 'Formatos' },
  ]

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="py-12 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Documentos</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Accede a certificados, constancias, formatos y documentos oficiales
          </p>
        </div>

        {/* Búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  category === cat.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de documentos */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron documentos</h3>
            <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="card p-4 flex items-center gap-4 hover:border-primary-200 transition-colors">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={24} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">{doc.category}</p>
                </div>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center hover:bg-primary-100 transition-colors shrink-0"
                  title="Descargar"
                >
                  <Download size={18} className="text-primary-600" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
