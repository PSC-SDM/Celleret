/**
 * Configuración de CORS
 */
import { CorsOptions } from 'cors';
import { config } from './environment';

export const corsOptions: CorsOptions = {
  origin: config.nodeEnv === 'production' 
    ? ['https://tu-dominio.com'] // Cambiar en producción
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
