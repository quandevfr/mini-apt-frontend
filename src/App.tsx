// Libs
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Routes
import { PUBLIC_ROUTES } from './routes/PublicRoute';
import { PRIVATE_ROUTES } from './routes/PrivateRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/common/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      // Public routes
      ...PUBLIC_ROUTES,
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Private routes
      ...PRIVATE_ROUTES.map((r) => ({
        element: <ProtectedRoute allowedRoles={r.allowedRoles} />,
        children: r.children,
      })),
    ],
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
