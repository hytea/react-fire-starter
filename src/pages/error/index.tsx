import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText: string;
  message: string;
};

export function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>{error.statusText} Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
