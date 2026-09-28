import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, Image, X } from 'lucide-react'
import api from '../services/api'
import ImageUploader from '../components/ImageUploader'

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'general',
    is_active: true,
    order: 0,
  })
  const [uploadedFile, setUploadedFile] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await api.get('/gallery?limit=100')
      setImages(response.data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
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

      if (editingItem) {
        await api.put(`/gallery/${editingItem.id}`, dataToSave)
      } else {
        await api.post('/gallery', dataToSave)
      }
      resetForm()
      fetchGallery()
    } catch (error) {
      console.error('Error saving gallery item:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta imagen?')) {
      try {
        await api.delete(`/gallery/${id}`)
        fetchGallery()
      } catch (error) {
        console.error('Error deleting gallery item:', error)
      }
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      category: item.category,
      is_active: item.is_active,
      order: item.order,
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setShowModal(false)
    setEditingItem(null)
    setUploadedFile(null)
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: 'general',
      is_active: true,
      order: 0,
    })
  }

  const filteredImages = images.filter(img =>
    img.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestión de Galería</h2>
          <p className="text-sm text-gray-500">Administra las imágenes de eventos y obras</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nueva Imagen
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar imágenes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-16">
          <Image size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay imágenes</h3>
          <p className="text-gray-500">Agrega imágenes a la galería</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((item) => (
            <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => handleEdit(item)} className="p-2 bg-white rounded-lg text-gray-700 hover:text-primary-600">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-medium truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Editar Imagen' : 'Nueva Imagen'}
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
                  rows={2}
                />
              </div>

              <ImageUploader
                value={formData.image_url}
                onChange={(url, file) => {
                  setFormData({ ...formData, image_url: url })
                  setUploadedFile(file)
                }}
                label="Imagen *"
              />

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
                    <option value="comunidad">Comunidad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="input-field"
                  />
                </div>
              </div>

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
                <button type="submit" className="btn-primary">{editingItem ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
