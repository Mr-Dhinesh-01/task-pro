import { create } from 'zustand';
import { setAccessToken } from '@/shared/api/apiClient';
import type { AuthUser, AuthResult } from './authService';

const SESSION_KEY = 'task-pro-auth';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  signIn: (result: AuthResult) => void;
  signOut: () => void;
}

// read any saved session so a refresh keeps the user signed in
function loadSaved(): AuthResult | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthResult;
  } catch {
    return null;
  }
}

const saved = loadSaved();
if (saved) setAccessToken(saved.token);   // re-arm the API client on startup

export const useAuthStore = create<AuthState>((set) => ({
  user: saved?.user ?? null,
  token: saved?.token ?? null,

  signIn: (result) => {
    setAccessToken(result.token);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(result));
    set({ user: result.user, token: result.token });
  },

  signOut: () => {
    setAccessToken(null);
    sessionStorage.removeItem(SESSION_KEY);
    set({ user: null, token: null });
  },
}));