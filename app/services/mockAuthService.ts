"use client";

import { User, AuthResponse, LoginRequest } from "../types";

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@sicvangcreagr.com",
    password: "demo123"
  },
  {
    id: "2", 
    email: "admin@sicvangcreagr.com",
    password: "admin123"
  },
  {
    id: "3",
    email: "user@sicvangcreagr.com", 
    password: "user123"
  }
];

// Generate mock JWT tokens
const generateMockToken = (userId: string, type: 'access' | 'refresh') => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (type === 'access' ? 3600 : 86400 * 7), // 1 hour or 7 days
    type
  }));
  const signature = btoa(`mock-signature-${userId}-${type}`);
  return `${header}.${payload}.${signature}`;
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockAuthService {
  static async login(loginData: LoginRequest): Promise<AuthResponse> {
    // Simulate network delay
    await delay(800);

    const user = MOCK_USERS.find(u => 
      u.email === loginData.email && u.password === loginData.password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      user: {
        id: user.id,
        email: user.email
      },
      access_token: generateMockToken(user.id, 'access'),
      refresh_token: generateMockToken(user.id, 'refresh'),
      expires_in: 3600
    };
  }

  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    await delay(300);

    try {
      // Extract user ID from refresh token
      const payload = JSON.parse(atob(refreshToken.split('.')[1]));
      const userId = payload.sub;

      const user = MOCK_USERS.find(u => u.id === userId);
      if (!user) {
        throw new Error("Invalid refresh token");
      }

      return {
        user: {
          id: user.id,
          email: user.email
        },
        access_token: generateMockToken(user.id, 'access'),
        refresh_token: generateMockToken(user.id, 'refresh'),
        expires_in: 3600
      };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  static async getCurrentUser(accessToken: string): Promise<User> {
    await delay(200);

    try {
      // Extract user ID from access token
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const userId = payload.sub;

      const user = MOCK_USERS.find(u => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        email: user.email
      };
    } catch {
      throw new Error("Invalid access token");
    }
  }

  static async logout(): Promise<void> {
    await delay(200);
    // Mock logout - just simulate the delay
    return;
  }
}