import { create } from 'zustand'

interface AuthState {
  user: any | null
  token: string | null
  setAuth: (user: any, token: string) => void
  clearAuth: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
}))