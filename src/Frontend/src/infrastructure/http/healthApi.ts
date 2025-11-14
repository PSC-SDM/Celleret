/**
 * Health Check API
 * 
 * @description API para verificar el estado del backend BFF
 * Siguiendo Clean Architecture: puerto de salida para health check
 */
import apiClient, { handleApiError, ApiError } from './apiClient';

/**
 * Respuesta del endpoint de health check
 */
export interface HealthCheckResponse {
  status: 'ok' | 'unhealthy';
  timestamp: string;
  uptime: number;
  service: string;
  version?: string;
}

/**
 * Resultado de la verificación de salud
 */
export interface HealthCheckResult {
  isHealthy: boolean;
  data?: HealthCheckResponse;
  error?: ApiError;
}

/**
 * Verifica el estado del backend
 * 
 * @returns Promise con el resultado de la verificación
 */
export async function checkBackendHealth(): Promise<HealthCheckResult> {
  try {
    const response = await apiClient.get<HealthCheckResponse>('/health');
    
    return {
      isHealthy: response.data.status === 'ok',
      data: response.data,
    };
  } catch (error) {
    const apiError = handleApiError(error);
    
    return {
      isHealthy: false,
      error: apiError,
    };
  }
}

export default {
  checkBackendHealth,
};
