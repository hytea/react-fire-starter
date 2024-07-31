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
import { NotificationProvider } from "#/components/notification/NotificationContext";

import { ErrorPage } from "#/pages/error";
import { LoginPage } from "#/pages/login";
import { NotFoundPage } from "#/pages/not-found";
import { LandingPage } from "#/pages/private/landing";

import { Logout } from "#/routes/Logout";
import { Primary } from "#/routes/Private";
import { Public } from "#/routes/Public";

import { SignUpPage } from "./pages/sign-up";

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

const publicRoutes = [
  {
    path: "/auth",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Public />,
    errorElement: <ErrorPage />,
    children: publicRoutes,
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

export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadingAnimation />}>
        <NotificationProvider>
          <AuthInitializer />
          <RouterProvider router={router} />
        </NotificationProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
