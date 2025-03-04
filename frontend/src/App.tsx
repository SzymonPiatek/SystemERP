import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from './components/ui/provider';
import { Toaster } from './components/ui/toaster';

import { HomePage } from './pages/HomePage';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { Notes } from './pages/Notes';
import { Users } from './pages/Users';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import Orders from './pages/Orders';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute.tsx';
import AcceptInvitePage from './pages/AcceptInvitePage.tsx';
import ChangeForgottenPassword from './pages/ChangeForgottenPassword.tsx';

const router = createBrowserRouter(
  [
    {
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Dashboard />,
              errorElement: <Error />,
            },
            {
              path: '/schedule',
              element: <Schedule />,
              errorElement: <Error />,
            },
            {
              path: '/users',
              element: <Users />,
              errorElement: <Error />,
            },
            {
              path: '/notes',
              element: <Notes />,
              errorElement: <Error />,
            },
            {
              path: '/profile',
              element: <ProfilePage />,
              errorElement: <Error />,
            },
            {
              path: '/orders',
              element: <Orders />,
              errorElement: <Error />,
            },
          ],
        },
      ],
    },
    {
      element: <PublicRoute />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
          errorElement: <Error />,
        },
        {
          path: '/accept-invite',
          element: <AcceptInvitePage />,
          errorElement: <Error />,
        },
        {
          path: '/reset-password',
          element: <ChangeForgottenPassword />,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: '*',
      element: <Error />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
