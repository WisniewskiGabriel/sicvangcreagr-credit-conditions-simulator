"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { useAuth } from "../context/AuthContext";
import withAuth from "../hoc/withAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isUsingMockAPI = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const callbackUrl = searchParams.get("callbackUrl");
      router.push(callbackUrl ? decodeURIComponent(callbackUrl) : "/dashboard");
    }
  }, [user, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      
      if (success) {
        // Get callback URL from query params
        const callbackUrl = searchParams.get("callbackUrl");
        router.push(callbackUrl ? decodeURIComponent(callbackUrl) : "/dashboard");
      } else {
        setError("Email ou senha incorretos. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@sicvangcreagr.com");
    setPassword("demo123");
    
    // Small delay to show the form filled, then perform login
    setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const success = await login("demo@sicvangcreagr.com", "demo123");
        
        if (success) {
          const callbackUrl = searchParams.get("callbackUrl");
          router.push(callbackUrl ? decodeURIComponent(callbackUrl) : "/dashboard");
        } else {
          setError("Email ou senha incorretos. Tente novamente.");
        }
      } catch {
        setError("Erro de conexão. Verifique sua internet e tente novamente.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="pi pi-user text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Bem-vindo ao SICVANGCREAGR
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Faça login para acessar o sistema de crédito agrícola
            </p>
            {isUsingMockAPI ? (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs">
                <i className="pi pi-check-circle text-xs"></i>
                Modo Demonstração
              </div>
            ) : (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                <i className="pi pi-server text-xs"></i>
                API Real Conectada
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4">
              <Message 
                severity="error" 
                text={error}
                className="w-full"
              />
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full"
                disabled={loading}
                autoComplete="email"
                keyfilter="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full"
                inputClassName="w-full"
                disabled={loading}
                feedback={false}
                toggleMask
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              label={loading ? "Entrando..." : "Entrar"}
              icon={loading ? "pi pi-spinner pi-spin" : "pi pi-sign-in"}
              className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              disabled={loading || !email || !password}
              loading={loading}
            />
          </form>

          <Divider align="center" className="my-6">
            <span className="text-gray-500 dark:text-gray-400 text-sm">ou</span>
          </Divider>

          {/* Demo Login - Only show when using mock API */}
          {isUsingMockAPI && (
            <Button
              label="Login Demo"
              icon="pi pi-play"
              className="w-full"
              severity="secondary"
              outlined
              onClick={handleDemoLogin}
              disabled={loading}
            />
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 SICVANGCREAGR - Sistema de Crédito Agrícola
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <i className="pi pi-info-circle text-blue-500 text-sm mt-0.5"></i>
              <div>
                {isUsingMockAPI ? (
                  <>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Credenciais de Demonstração
                    </h4>
                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                      <p><strong>Email:</strong> demo@sicvangcreagr.com</p>
                      <p><strong>Senha:</strong> demo123</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        Use o botão &ldquo;Login Demo&rdquo; para preencher automaticamente.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Conectado à API Real
                    </h4>
                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                      <p>Use suas credenciais reais para fazer login.</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        Se você não tem uma conta, contacte o administrador.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Export the page wrapped with authentication check
export default withAuth(LoginPage, { requireAuth: false });