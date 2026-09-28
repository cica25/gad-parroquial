import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, X } from 'lucide-react'
import api from '../services/api'
import ImageUploader from '../components/ImageUploader'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function AdminNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'general',
    is_published: true,
    is_featured: false,
    image_url: '',
  })
  const [uploadedFile, setUploadedFile] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await api.get('/news?limit=100')
      setNews(response.data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let imageUrl = formData.image_url

      // Si hay un archivo subirlo primero
      if (uploadedFile) {
        const uploadData = new FormData()
        uploadData.append('file', uploadedFile)
        const uploadResponse = await api.post('/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        imageUrl = uploadResponse.data.url
      }

      const dataToSave = { ...formData, image_url: imageUrl }

      if (editingNews) {
        await api.put(`/news/${editingNews.id}`, dataToSave)
      } else {
        await api.post('/news', dataToSave)
      }
      resetForm()
      fetchNews()
    } catch (error) {
      console.error('Error saving news:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta novedad?')) {
      try {
        await api.delete(`/news/${id}`)
        fetchNews()
      } catch (error) {
        console.error('Error deleting news:', error)
      }
    }
  }

  const handleEdit = (item) => {
    setEditingNews(item)
    setFormData({
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      is_published: item.is_published,
      is_featured: item.is_featured,
      image_url: item.image_url || '',
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setShowModal(false)
    setEditingNews(null)
    setUploadedFile(null)
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'general',
      is_published: true,
      is_featured: false,
      image_url: '',
    })
  }

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestión de Novedades</h2>
          <p className="text-sm text-gray-500">Administra las noticias y publicaciones del sitio</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Nueva Noticia
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar novedades..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Título</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Categoría</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Fecha</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Estado</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No hay novedades registradas
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.is_featured && (
                          <span className="w-2 h-2 bg-accent-500 rounded-full" title="Destacada"></span>
                        )}
                        <span className="font-medium text-gray-900 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge bg-gray-100 text-gray-700 capitalize">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {format(new Date(item.created_at), "d MMM yyyy", { locale: es })}
                    </td>
                    <td className="px-4 py-3">
                      {item.is_published ? (
                        <span className="badge bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                          <Eye size={12} /> Publicada
                        </span>
                      ) : (
                        <span className="badge bg-gray-100 text-gray-600 flex items-center gap-1 w-fit">
                          <EyeOff size={12} /> Borrador
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingNews ? 'Editar Novedad' : 'Nueva Novedad'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resumen *</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="input-field resize-none"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input-field resize-none"
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="general">General</option>
                    <option value="eventos">Eventos</option>
                    <option value="obras">Obras</option>
                    <option value="comunicados">Comunicados</option>
                    <option value="social">Social</option>
                  </select>
                </div>

                <ImageUploader
                  value={formData.image_url}
                  onChange={(url, file) => {
                    setFormData({ ...formData, image_url: url })
                    setUploadedFile(file)
                  }}
                  label="Imagen de la noticia"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Publicada</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Destacada</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingNews ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
