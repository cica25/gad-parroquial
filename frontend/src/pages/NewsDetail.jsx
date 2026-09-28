import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, ArrowLeft, User, Tag } from 'lucide-react'
import api from '../services/api'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function NewsDetail() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [id])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/news/${id}`)
      setNews(response.data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-surface py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Novedad no encontrada</h1>
          <Link to="/novedades" className="btn-primary">Volver a novedades</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/novedades" className="inline-flex items-center gap-2 text-primary-600 font-medium mb-8 hover:text-primary-700">
          <ArrowLeft size={18} />
          Volver a novedades
        </Link>

        <article className="bg-white rounded-2xl shadow-card overflow-hidden">
          {news.image_url && (
            <div className="h-64 md:h-96">
              <img src={news.image_url} alt={news.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {format(new Date(news.created_at), "d 'de' MMMM, yyyy", { locale: es })}
              </span>
              <span className="flex items-center gap-1">
                <Tag size={14} />
                <span className="capitalize">{news.category}</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{news.title}</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{news.summary}</p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
