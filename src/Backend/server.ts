/**
 * Punto de entrada del servidor
 */
import { createApp } from './app';
import { config } from './infrastructure/config/environment';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`🚀 Celleret Backend BFF running on port ${config.port}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${config.port}/api/health`);
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
