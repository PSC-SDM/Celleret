# 🍷 Celleret

**Webapp de gestión de bodegas domésticas**

Una aplicación moderna para gestionar tu colección personal de vinos, desarrollada con **Clean Architecture**, **Domain-Driven Design** y un patrón **Backend for Frontend**.

## 🏛️ Arquitectura

```
src/
├── Domain/                 # ⚡ DOMINIO COMPARTIDO
│   ├── entities/          # Entidades de negocio (Wine, User)
│   ├── value-objects/     # Value Objects (WineId, WineType)
│   ├── repositories/      # Interfaces de repositorios
│   ├── services/          # Servicios de dominio
│   └── exceptions/        # Excepciones específicas
│
├── Backend/               # 🚀 BACKEND FOR FRONTEND (BFF)
│   ├── presentation/      # Controllers y API REST
│   ├── application/       # Casos de uso y DTOs
│   └── infrastructure/    # Repositorios y Supabase
│
└── Frontend/              # ⚛️ FRONTEND REACT
    ├── presentation/      # Componentes, páginas, hooks
    └── infrastructure/    # HTTP client hacia BFF
```

## 🚀 Tecnologías

### Dominio Compartido
- **TypeScript** puro (sin dependencias externas)
- **Jest** para testing

### Backend (BFF)
- **Node.js** + **Express** + **TypeScript**
- **Supabase** (base de datos y auth)
- **JWT** + **Zod** (auth y validación)

### Frontend
- **React 18** + **Vite** + **TypeScript**
- **TailwindCSS** + **shadcn/ui**
- **Zustand** (estado global)
- **React Router** + **Axios**

## 📦 Instalación Rápida

```bash
# Clonar el repositorio
git clone <repo-url>
cd celleret

# Ejecutar script de configuración automática
./scripts/setup.sh

# Completar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

## 🛠️ Desarrollo

```bash
# Iniciar todo el stack de desarrollo
npm run dev

# O individualmente:
npm run dev:backend   # Backend en http://localhost:5000
npm run dev:frontend  # Frontend en http://localhost:3000
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Por capas:
npm run test:domain    # Tests del dominio
npm run test:backend   # Tests del BFF
npm run test:frontend  # Tests de React

# Con coverage
npm run test:domain -- --coverage
```

## 🔍 Linting y Formato

```bash
# Linting
npm run lint

# Formato automático
npm run format
```

## 📁 Estructura del Proyecto

### Domain (Dominio Compartido)
- **Entities**: `Wine`, `User`
- **Value Objects**: `WineId`, `WineType`, `WineName`
- **Repositories**: Interfaces para acceso a datos
- **Services**: Lógica de negocio transversal

### Backend (BFF)
- **Controllers**: Endpoints REST
- **Use Cases**: Lógica de aplicación
- **Repositories**: Implementaciones con Supabase
- **DTOs**: Objetos de transferencia

### Frontend (React)
- **Components**: UI components con shadcn/ui
- **Pages**: Páginas de la aplicación
- **Hooks**: Custom hooks para lógica
- **Store**: Estado global con Zustand

## 🎯 Principios Arquitectónicos

### Clean Architecture
- Dependencias apuntan hacia el dominio
- Capas bien separadas y testeable
- Dominio independiente de frameworks

### Domain-Driven Design
- Dominio rico con lógica de negocio
- Entidades y Value Objects expresivos
- Servicios de dominio para lógica transversal

### Backend for Frontend
- BFF como capa de indirección
- Frontend nunca accede directamente a Supabase
- APIs optimizadas para necesidades del frontend

## 🚦 Estados de Desarrollo

### ✅ Completado
- [x] Estructura de carpetas completa
- [x] Configuración de TypeScript
- [x] Setup de ESLint + Prettier
- [x] Configuración de testing

### 🚧 En Desarrollo
- [ ] Implementación del dominio
- [ ] Casos de uso del BFF
- [ ] Componentes de React

### 📋 Roadmap
- [ ] Autenticación y usuarios
- [ ] CRUD de vinos
- [ ] Dashboard y estadísticas
- [ ] Filtros y búsqueda
- [ ] Deploy a producción

## 🤝 Contribución

1. Seguir las **Development Guidelines**
2. Usar la **Implementation Strategy** para prompts
3. Escribir tests para todo el dominio
4. Mantener la separación de capas

## 📚 Documentación

- [Development Guidelines](./DEVELOPMENT_GUIDELINES.md) - Principios y convenciones
- [Implementation Strategy](./IMPLEMENTATION_STRATEGY.md) - Plan de desarrollo
- [API Documentation](./docs/api/) - Documentación del BFF
- [Deployment Guide](./docs/deployment/) - Guía de despliegue

## 🔧 Scripts Útiles

```bash
# Configuración inicial
./scripts/setup.sh

# Desarrollo
npm run dev              # Iniciar todo
npm run dev:backend      # Solo BFF
npm run dev:frontend     # Solo React

# Build
npm run build           # Build completo
npm run build:domain    # Solo dominio
npm run build:backend   # Solo BFF
npm run build:frontend  # Solo React

# Testing
npm test               # Todos los tests
npm run test:watch     # Tests en watch mode
npm run test:coverage  # Con coverage

# Calidad de código
npm run lint           # Linting
npm run lint:fix       # Fix automático
npm run format         # Prettier
```

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

**Desarrollado por el Equipo Celleret** 🍷