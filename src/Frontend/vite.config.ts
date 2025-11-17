import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@domain': path.resolve(__dirname, '../Domain'),
            '@': path.resolve(__dirname, './src'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/components': path.resolve(__dirname, './src/presentation/components'),
            '@/pages': path.resolve(__dirname, './src/presentation/pages'),
            '@/hooks': path.resolve(__dirname, './src/presentation/hooks'),
            '@/store': path.resolve(__dirname, './src/presentation/store'),
            '@/infrastructure': path.resolve(__dirname, './src/infrastructure'),
            '@/shared': path.resolve(__dirname, './src/shared')
        }
    },
    server: {
        port: 3000,
        host: true,
        allowedHosts: [".joanmarc.dev"]
    },
    preview: {
        port: 3000,
        host: true,
        allowedHosts: [".joanmarc.dev"]
    }
})