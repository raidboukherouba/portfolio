// src/services/authService.ts
import api from './appClient';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean; // Added rememberMe option
}

export interface RegisterCredentials {
  email: string;
  password: string;
  rememberMe?: boolean; // Added rememberMe option
}

// Token storage functions
const storeTokens = (tokens: AuthResponse, remember: boolean) => {
  if (remember) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  } else {
    sessionStorage.setItem('accessToken', tokens.accessToken);
    sessionStorage.setItem('refreshToken', tokens.refreshToken);
  }
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
};

const getTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken') || null
  };
};

// 🔽 Register a new user
export const register = async (credentials: RegisterCredentials) => {
  const res = await api.post<AuthResponse>('/auth/register', credentials);
  storeTokens(res.data, credentials.rememberMe || false);
  return res.data;
};

// 🔽 Login a user
export const login = async (credentials: LoginCredentials) => {
  const res = await api.post<AuthResponse>('/auth/login', credentials);
  storeTokens(res.data, credentials.rememberMe || false);
  return res.data;
};

// 🔄 Refresh access token
export const refreshAccessToken = async () => {
  const { refreshToken } = getTokens();
  if (!refreshToken) throw new Error('No refresh token available');
  
  try {
    const res = await api.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
    // Store the new access token in the same storage as the original tokens
    const storage = localStorage.getItem('refreshToken') ? localStorage : sessionStorage;
    storage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

// 🚪 Logout (invalidate refresh token)
export const logout = async () => {
  const { refreshToken } = getTokens();
  if (refreshToken) {
    try {
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  clearTokens();
};

// Get current access token
export const getAccessToken = () => {
  return getTokens().accessToken;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// 📧 Forgot password: Send reset link to email
export const forgotPassword = async (email: string) => {
  await api.post('/auth/forgot-password', { email });
};

// 🔁 Reset password: Submit new password with token
export const resetPassword = async (token: string, newPassword: string) => {
  await api.post('/auth/reset-password', { token, newPassword });
};