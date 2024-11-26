import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { Notes } from './pages/Notes';
import { Employees } from './pages/Employees';
import { ProfilePage } from './pages/ProfilePage';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
