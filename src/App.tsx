import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import ReachOut from './pages/ReachOut'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/reach-out', element: <ReachOut /> },
      { path: '/index.html', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
