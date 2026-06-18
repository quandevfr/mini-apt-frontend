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
import PublicGuard from '@/components/common/PublicGuard';

// Others

const router = createBrowserRouter([
  {
    element: <PublicGuard />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          // Public routes
          ...PUBLIC_ROUTES,
        ],
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />,
    children: [
      {
        element: <MainLayout />,
        children: [...PRIVATE_ROUTES],
      },
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
      <Toaster richColors position="bottom-right" expand={true} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
