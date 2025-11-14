/**
 * Hook useHealthCheck
 * 
 * Hook simple para verificar el estado del backend (OK/KO)
 */
import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../../infrastructure/http/healthApi';

const HEALTH_CHECK_INTERVAL = 5000; // 5 segundos

export function useHealthCheck() {
  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkHealth = async () => {
      const result = await checkBackendHealth();
      setIsHealthy(result.isHealthy);
      setIsLoading(false);
    };

    checkHealth();
    const intervalId = setInterval(checkHealth, HEALTH_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return { isHealthy, isLoading };
}

export default useHealthCheck;
