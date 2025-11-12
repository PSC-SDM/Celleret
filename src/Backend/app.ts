/**
 * Configuración de la aplicación Express
 */
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './infrastructure/config/cors.config';
import { errorHandler, notFoundHandler } from './presentation/middleware/error.middleware';
import healthRoutes from './presentation/routes/health.routes';

export const createApp = (): Application => {
  const app = express();

  // Middleware de seguridad
  app.use(helmet());
  
  // CORS
  app.use(cors(corsOptions));
  
  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Logger
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Rutas
  app.use('/api/health', healthRoutes);

  // Manejo de errores
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
