import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from './components/toaster/ToastProvider.tsx';

import { HomePage } from './pages/HomePage';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { Notes } from './pages/Notes';
import { Employees } from './pages/Employees';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage.tsx';
import PostmanPage from './pages/postman/PostmanPage.tsx';


const router = createBrowserRouter(
  [
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
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <Error />,
    },
    {
      path: '/postman',
      element: <PostmanPage />,
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
  }
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastProvider />
    </QueryClientProvider>
  );
}

export default App;
