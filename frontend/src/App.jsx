import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Services from './pages/Services'
import Documents from './pages/Documents'
import Gallery from './pages/Gallery'
import Transparency from './pages/Transparency'
import Contact from './pages/Contact'
import About from './pages/About'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminNews from './admin/AdminNews'
import AdminDocuments from './admin/AdminDocuments'
import AdminServices from './admin/AdminServices'
import AdminGallery from './admin/AdminGallery'
import AdminTransparency from './admin/AdminTransparency'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="novedades" element={<News />} />
          <Route path="novedades/:id" element={<NewsDetail />} />
          <Route path="servicios" element={<Services />} />
          <Route path="documentos" element={<Documents />} />
          <Route path="galeria" element={<Gallery />} />
          <Route path="transparencia" element={<Transparency />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="institucion" element={<About />} />
        </Route>

        {/* Panel de administración */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }>
          <Route index element={<AdminNews />} />
          <Route path="novedades" element={<AdminNews />} />
          <Route path="documentos" element={<AdminDocuments />} />
          <Route path="servicios" element={<AdminServices />} />
          <Route path="galeria" element={<AdminGallery />} />
          <Route path="transparencia" element={<AdminTransparency />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-6">Página no encontrada</p>
              <a href="/" className="btn-primary">Volver al inicio</a>
            </div>
          </div>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
