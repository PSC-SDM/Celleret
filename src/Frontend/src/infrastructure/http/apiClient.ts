/**
 * API Client - Cliente HTTP centralizado
 * 
 * @description Cliente Axios configurado para comunicarse con el BFF
 * Siguiendo Architecture Hexagonal: esta es la infraestructura HTTP del frontend
 */
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/environment';

/**
 * Instancia de Axios configurada para el BFF
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para enviar cookies si es necesario
});

/**
 * Request Interceptor
 * Añade el token JWT si existe
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtener token del localStorage si existe
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Maneja errores globales y refresca tokens si es necesario
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Si es error 401 (no autorizado) y no hemos reintentado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Aquí iría la lógica de refresh token cuando se implemente auth
        // const newToken = await refreshToken();
        // localStorage.setItem('auth_token', newToken);
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // return apiClient(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, redirigir a login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Manejo de errores específicos
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config?.url);
    }

    if (error.response?.status === 500) {
      console.error('Server error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Tipos de respuesta genéricos
 */
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Helper para manejar errores de API de forma consistente
 */
export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors,
    };
  }

  return {
    status: 500,
    message: 'An unexpected error occurred',
  };
}

export default apiClient;
