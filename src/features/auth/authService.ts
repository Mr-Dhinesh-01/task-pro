import { apiClient } from '@/shared/api/apiClient';
import { createMockToken } from '@/shared/api/token';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

// the API user shape (includes the demo password field)
interface ApiUser extends AuthUser {
  password: string;
  role?: string;
  city?: string;
}

export interface AuthResult {
  user: AuthUser;
  token: string;
}

// LOGIN — find a user matching BOTH email and password
export async function login(email: string, password: string): Promise<AuthResult> {
  const res = await apiClient.get<ApiUser[]>('/users', { params: { email, password } });
  const found = res.data[0];
  if (!found) {
    throw new Error('Invalid email or password.');
  }
  const user: AuthUser = { id: found.id, name: found.name, email: found.email };
  return { user, token: createMockToken(user.id, user.name, 60) };
}

// SIGNUP — create a new user with the chosen password
export async function signup(name: string, email: string, password: string): Promise<AuthResult> {
  // reject duplicate emails
  const existing = await apiClient.get<ApiUser[]>('/users', { params: { email } });
  if (existing.data.length > 0) {
    throw new Error('An account with that email already exists.');
  }

  // json-server assigns the new user a string id automatically — that is fine,
  // because all our ids are strings (the seeded ones are "u1", "u2").
  const res = await apiClient.post<ApiUser>('/users', { name, email, password });
  const user: AuthUser = { id: res.data.id, name: res.data.name, email: res.data.email };
  return { user, token: createMockToken(user.id, user.name, 60) };
}