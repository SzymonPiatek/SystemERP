import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from './components/toaster/ToastProvider';
import { Provider } from './components/ui/provider';

import { HomePage } from './pages/HomePage';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { Notes } from './pages/Notes';
import { Employees } from './pages/Employees';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import PostmanPage from './pages/postman/PostmanPage';
import Orders from './pages/Orders';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import { system } from './theme';

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
              path: '/employees',
              element: <Employees />,
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
        {
          path: '/postman',
          element: <PostmanPage />,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <Error />,
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
          <ToastProvider />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
