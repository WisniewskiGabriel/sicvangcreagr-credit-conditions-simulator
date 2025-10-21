"use client";

import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { useAuth } from "../context/AuthContext";

interface WithAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) => {
  const { requireAuth = true, redirectTo = "/login" } = options;

  const AuthenticatedComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (requireAuth && !user) {
          // Get current pathname for callback URL
          const currentPath = window.location.pathname + window.location.search;
          const callbackUrl = encodeURIComponent(currentPath);
          router.push(`${redirectTo}?callbackUrl=${callbackUrl}`);
        } else if (!requireAuth && user && redirectTo === "/login") {
          // If user is authenticated and trying to access login, redirect to dashboard
          router.push("/dashboard");
        }
      }
    }, [user, loading, router]);

    // Show loading spinner while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center justify-center min-h-screen">
            <Card className="p-8 text-center shadow-xl">
              <div className="space-y-4">
                <ProgressSpinner 
                  style={{ width: "50px", height: "50px" }}
                  strokeWidth="4"
                  animationDuration="1s"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Verificando autenticação...
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Aguarde enquanto validamos suas credenciais
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    // If authentication is required but user is not authenticated, show nothing
    // (redirect will happen via useEffect)
    if (requireAuth && !user) {
      return null;
    }

    // If authentication is not required but user is authenticated and should be redirected
    if (!requireAuth && user && redirectTo === "/login") {
      return null;
    }

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};

export default withAuth;