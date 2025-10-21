"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { User, AuthContextType, AuthResponse, LoginRequest, SignupRequest, RefreshTokenRequest } from "../types";
import { MockAuthService } from "../services/mockAuthService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
const DEBUG_AUTH = process.env.NEXT_PUBLIC_DEBUG_AUTH === "true";

// Add console logging for debugging
if (DEBUG_AUTH) {
  console.log("🔧 Auth Debug Info:", {
    API_BASE_URL,
    USE_MOCK_API,
    DEBUG_AUTH
  });
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // API request wrapper with automatic token refresh
  const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = Cookies.get("access_token");
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    // If token expired, try to refresh
    if (response.status === 401 && token) {
      const refreshSuccess = await refreshToken();
      if (refreshSuccess) {
        // Retry the request with new token
        const newToken = Cookies.get("access_token");
        if (newToken) {
          headers["Authorization"] = `Bearer ${newToken}`;
          response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
          });
        }
      }
    }

    return response;
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const loginData: LoginRequest = { email, password };
      
      let data: AuthResponse;

      if (USE_MOCK_API) {
        // Use mock service
        data = await MockAuthService.login(loginData);
      } else {
        // Use real API
        if (DEBUG_AUTH) {
          console.log("🔑 Attempting login with real API:", `${API_BASE_URL}/user-authentication/login`);
        }

        const response = await fetch(`${API_BASE_URL}/user-authentication/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (DEBUG_AUTH) {
          console.log("🔑 Login response:", {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
          });
        }

        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: "Login failed" }));
          console.error("Login failed:", error);
          return false;
        }

        data = await response.json();
        
        if (DEBUG_AUTH) {
          console.log("🔑 Login successful:", { user: data.user });
        }
      }
      
      // Store tokens in cookies with secure options
      Cookies.set("access_token", data.access_token, {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      Cookies.set("refresh_token", data.refresh_token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      // Set user data
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = Cookies.get("access_token");
      
      if (token) {
        if (USE_MOCK_API) {
          // Use mock service
          await MockAuthService.logout();
        } else {
          // Call real logout endpoint
          await fetch(`${API_BASE_URL}/user-authentication/logout`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear cookies and user state regardless of API response
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setUser(null);
      setLoading(false);
    }
  };

  // Refresh token function
  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = Cookies.get("refresh_token");
      
      if (!refreshTokenValue) {
        return false;
      }

      let data: AuthResponse;

      if (USE_MOCK_API) {
        // Use mock service
        data = await MockAuthService.refreshToken(refreshTokenValue);
      } else {
        // Use real API
        const refreshData: RefreshTokenRequest = {
          refreshToken: refreshTokenValue,
        };

        const response = await fetch(`${API_BASE_URL}/user-authentication/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refreshData),
        });

        if (!response.ok) {
          // Refresh failed, clear tokens
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          setUser(null);
          return false;
        }

        data = await response.json();
      }
      
      // Update tokens
      Cookies.set("access_token", data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      Cookies.set("refresh_token", data.refresh_token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      // Update user data if present
      if (data.user) {
        setUser(data.user);
      }
      
      return true;
    } catch (error) {
      console.error("Token refresh error:", error);
      // Clear tokens on error
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setUser(null);
      return false;
    }
  };

  // Get current user
  const getUser = async (): Promise<User | null> => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        setUser(null);
        return null;
      }

      let userData: User;

      if (USE_MOCK_API) {
        // Use mock service
        userData = await MockAuthService.getCurrentUser(token);
      } else {
        // Use real API
        const response = await apiRequest("/user-authentication/me");
        
        if (!response.ok) {
          setUser(null);
          return null;
        }

        userData = await response.json();
      }
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Get user error:", error);
      setUser(null);
      return null;
    }
  };

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("access_token");
      
      if (token) {
        // Try to get current user
        const userData = await getUser();
        if (!userData) {
          // If getting user fails, try to refresh token
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            await getUser();
          }
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Auto-refresh token before expiration
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = Cookies.get("access_token");
      if (token && user) {
        await refreshToken();
      }
    }, 50 * 60 * 1000); // Refresh every 50 minutes (tokens expire in 1 hour)

    return () => clearInterval(interval);
  }, [user]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshToken,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};