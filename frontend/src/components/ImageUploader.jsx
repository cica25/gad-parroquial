import { useState, useRef } from 'react'
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react'

export default function ImageUploader({ value, onChange, label = 'Imagen' }) {
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [preview, setPreview] = useState(value || '')
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo no debe superar 5MB')
      return
    }

    // Validar tipo
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WebP')
      return
    }

    setError('')

    // Crear URL local para vista previa
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    onChange(localUrl, file)
  }

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return
    setPreview(urlInput)
    onChange(urlInput, null)
    setUrlInput('')
    setShowUrlInput(false)
  }

  const handleClear = () => {
    setPreview('')
    onChange('', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Vista previa */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Upload size={18} />
          Subir desde dispositivo
        </button>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Link size={18} />
          Pegar URL
        </button>
      </div>

      {/* Input de URL */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={handleUrlAdd}
            className="btn-primary px-4"
          >
            Agregar
          </button>
        </div>
      )}

      {/* Input de archivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Ayuda */}
      <p className="text-xs text-gray-500">
        Formatos permitidos: JPG, PNG, WebP. Tamaño máximo: 5MB
      </p>
    </div>
  )
}
