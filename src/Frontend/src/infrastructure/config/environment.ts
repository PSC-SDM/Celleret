/**
 * Configuración de variables de entorno del Frontend
 */

interface EnvironmentConfig {
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const config: EnvironmentConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
