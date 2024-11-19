
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {HomePage} from './pages/HomePage'
import {Error} from './pages/Error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
