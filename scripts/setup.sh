#!/bin/bash

# Setup inicial del proyecto Celleret
# Script para configurar todo el entorno de desarrollo

echo "🍷 Configurando proyecto Celleret..."

# Verificar que Node.js y npm estén instalados
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ antes de continuar."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm antes de continuar."
    exit 1
fi

echo "✅ Node.js y npm detectados"

# Obtener el directorio raíz del proyecto
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Instalar dependencias del proyecto raíz
echo "📦 Instalando dependencias del proyecto raíz..."
cd "$PROJECT_ROOT" && npm install

# Instalar dependencias de cada capa
echo "📦 Instalando dependencias del Domain..."
cd "$PROJECT_ROOT/src/Domain" && npm install

echo "📦 Instalando dependencias del Backend..."
cd "$PROJECT_ROOT/src/Backend" && npm install

echo "📦 Instalando dependencias del Frontend..."
cd "$PROJECT_ROOT/src/Frontend" && npm install

# Compilar Domain para que esté disponible para otras capas
echo "🔨 Compilando Domain..."
cd "$PROJECT_ROOT/src/Domain" && npm run build
echo "✅ Domain compilado"

# Crear archivo .env si no existe
cd "$PROJECT_ROOT"
if [ ! -f .env ]; then
    echo "📄 Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo "⚠️  Por favor, completa las variables de entorno en .env"
fi

echo "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Completa las variables de entorno en .env"
echo "2. Ejecuta 'npm run dev' para iniciar el desarrollo"
echo "3. Backend estará en http://localhost:3001"
echo "4. Frontend estará en http://localhost:3000"