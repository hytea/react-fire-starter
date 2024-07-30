import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { RecoilEnv } from "recoil";

import { AuthLoading } from "#/authentication/AuthLoading";
import { AuthInitializer } from "#/authentication/Authenticate";
import { RequireAuthentication } from "#/authentication/RequireAuthentication";

import { LoadingAnimation } from "#/components/loading-animation";

import { ErrorPage } from "#/pages/error";
import { LoginPage } from "#/pages/login";
import { NotFoundPage } from "#/pages/not-found";
import { LandingPage } from "#/pages/private/landing";

import { Logout } from "#/routes/Logout";
import { Primary } from "#/routes/Private";
import { Public } from "#/routes/Public";

if (import.meta.env.DEV) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}

const privateRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Public />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <RequireAuthentication>
        <AuthLoading>
          <Primary />
        </AuthLoading>
      </RequireAuthentication>
    ),
    errorElement: <ErrorPage />,
    children: privateRoutes,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadingAnimation />}>
        <AuthInitializer />
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};
