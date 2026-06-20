import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const apiClient = axios.create({ baseURL: API_URL });

// the current access token, held in memory
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

// optional callback fired when the API returns 401 (unauthorized)
let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(handler: () => void) {
  onUnauthorized = handler;
}

// attach the token to every outgoing request
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// on a 401, clear the token and notify the app
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      accessToken = null;
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);