import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import IngredientFall from './components/IngredientFall'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Menu from './pages/Menu'
import BurgerDetails from './pages/BurgerDetails'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import AdminBurgers from './pages/AdminBurgers'
import AdminBurgerForm from './pages/AdminBurgerForm'

function App() {
  const [appState, setAppState] = useState('loading')
  const location = useLocation()

  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  useEffect(() => {
    const timer = setTimeout(() => setAppState('ingredients'), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleIngredientsComplete = () => setAppState('content')

  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-dark-900">
      <AnimatePresence mode="wait">
        {appState === 'loading' && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {appState === 'ingredients' && <IngredientFall onComplete={handleIngredientsComplete} />}
      {appState === 'content' && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/burger/:id" element={<BurgerDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/burgers" element={<ProtectedRoute requireAdmin><AdminBurgers /></ProtectedRoute>} />
              <Route path="/admin/burgers/new" element={<ProtectedRoute requireAdmin><AdminBurgerForm /></ProtectedRoute>} />
              <Route path="/admin/burgers/edit/:id" element={<ProtectedRoute requireAdmin><AdminBurgerForm /></ProtectedRoute>} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App