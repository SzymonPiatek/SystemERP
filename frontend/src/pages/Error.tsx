import { Link, useRouteError } from "react-router-dom";

interface RouteError {
  status?: number;
  message?: string;
}

const Error = () => {
  const error = useRouteError() as RouteError; // Explicitly type the error
  console.log(error);

  if (error.status === 404) {
    return (
      <main>
        <div>
          <p>404</p>
          <h1>Page not found</h1>
          <p>Sorry, we couldn't find the page you're looking for.</p>
          <div>
            <Link to="/">Go home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h4>There was an error...</h4>
    </main>
  );
};

export default Error;
