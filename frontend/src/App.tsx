import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { testAxiosFetch } from './tests/axiosFetchTest';

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
]);

function App() {
  testAxiosFetch();
  return <RouterProvider router={router} />;
}

export default App;
