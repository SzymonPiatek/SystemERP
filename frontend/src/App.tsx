import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { LoginPage } from './pages/auth/LoginPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from './components/toaster/ToastProvider.tsx';

const router = createBrowserRouter([
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
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <Error />,
  },
]);

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
