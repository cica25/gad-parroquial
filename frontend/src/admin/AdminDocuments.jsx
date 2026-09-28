import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, FileText, X } from 'lucide-react'
import api from '../services/api'
import ImageUploader from '../components/ImageUploader'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function AdminDocuments() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDoc, setEditingDoc] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'certificados',
    file_url: '',
    is_active: true,
  })
  const [uploadedFile, setUploadedFile] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/docs?limit=100')
      const data = Array.isArray(response.data) ? response.data : []
      setDocuments(data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let fileUrl = formData.file_url

      // Si hay un archivo subirlo primero
      if (uploadedFile) {
        const uploadData = new FormData()
        uploadData.append('file', uploadedFile)
        const uploadResponse = await api.post('/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        fileUrl = uploadResponse.data.url
      }

      const dataToSave = { ...formData, file_url: fileUrl }

      if (editingDoc) {
        await api.put(`/docs/${editingDoc.id}`, dataToSave)
      } else {
        await api.post('/docs', dataToSave)
      }
      resetForm()
      fetchDocuments()
    } catch (error) {
      console.error('Error saving document:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este documento?')) {
      try {
        await api.delete(`/docs/${id}`)
        fetchDocuments()
      } catch (error) {
        console.error('Error deleting document:', error)
      }
    }
  }

  const handleEdit = (item) => {
    setEditingDoc(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      file_url: item.file_url,
      is_active: item.is_active,
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setShowModal(false)
    setEditingDoc(null)
    setUploadedFile(null)
    setFormData({
      title: '',
      description: '',
      category: 'certificados',
      file_url: '',
      is_active: true,
    })
  }

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestión de Documentos</h2>
          <p className="text-sm text-gray-500">Administra certificados, constancias y formatos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nuevo Documento
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar documentos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Título</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Categoría</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Descargas</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Fecha</th>
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
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No hay documentos registrados
                  </td>
                </tr>
              ) : (
                filteredDocs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge bg-gray-100 text-gray-700 capitalize">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.download_count}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {format(new Date(item.created_at), "d MMM yyyy", { locale: es })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingDoc ? 'Editar Documento' : 'Nuevo Documento'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="certificados">Certificados</option>
                  <option value="constancias">Constancias</option>
                  <option value="informes">Informes</option>
                  <option value="tramites">Trámites</option>
                  <option value="formatos">Formatos</option>
                </select>
              </div>

              <ImageUploader
                value={formData.file_url}
                onChange={(url, file) => {
                  setFormData({ ...formData, file_url: url })
                  setUploadedFile(file)
                }}
                label="Archivo del documento *"
              />

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Activo</span>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={resetForm} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">{editingDoc ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
