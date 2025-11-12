/**
 * Configuración de variables de entorno del Backend
 */
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  JWT_SECRET: z.string().default('your-secret-key-change-in-production'),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

const envVars = envSchema.parse(process.env);

export const config = {
  nodeEnv: envVars.NODE_ENV,
  port: parseInt(envVars.PORT, 10),
  supabase: {
    url: envVars.SUPABASE_URL,
    anonKey: envVars.SUPABASE_ANON_KEY,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
} as const;
