// lib/auth.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  
  // Authentication status
  isAuthenticated: () => boolean;
  
  // Auth methods
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  
  // State management
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Session management
  refreshToken: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      isAuthenticated: () => {
        const state = get();
        return !!(state.user && state.token);
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      login: async (credentials) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }

          set({
            user: data.user,
            token: data.token,
            error: null,
          });

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred during login',
            user: null,
            token: null,
          });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      register: async (credentials) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
          }

          set({
            user: data.user,
            token: data.token,
            error: null,
          });

        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred during registration',
            user: null,
            token: null,
          });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        set({ loading: true });
        
        try {
          // Optional: Call logout endpoint to invalidate token on server
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${get().token}`,
            },
          });
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear auth state regardless of server response
          get().clearAuth();
          set({ loading: false });
        }
      },

      refreshToken: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Token refresh failed');
          }

          set({
            token: data.token,
            user: data.user,
          });

        } catch (error) {
          console.error('Token refresh error:', error);
          // If refresh fails, clear auth state
          get().clearAuth();
        }
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          error: null,
          loading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// Optional: Add auto token refresh logic
if (typeof window !== 'undefined') {
  // Refresh token every 55 minutes
  setInterval(() => {
    const auth = useAuth.getState();
    if (auth.isAuthenticated()) {
      auth.refreshToken();
    }
  }, 55 * 60 * 1000);
}