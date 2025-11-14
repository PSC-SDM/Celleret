# 📋 Estrategia de Implementación - Celleret MVP

**Proyecto:** Celleret - Webapp de gestión de bodegas domésticas  
**Versión:** 0.1 (MVP)  
**Fecha de actualización:** 12 de noviembre de 2025  
**Arquitectura:** Clean Architecture + DDD + Hexagonal + BFF

---

## 🎯 Objetivos de la Implementación

1. Desarrollar un MVP funcional con **arquitectura escalable** en **10-12 semanas**
2. Implementar **dominio compartido** con DDD bien estructurado
3. Crear un **Backend for Frontend (BFF)** robusto como capa de indirección
4. Garantizar separación clara de responsabilidades entre capas
5. Facilitar desarrollo mediante **prompts estructurados para Claude**
6. Asegurar código mantenible, testeable y evolutivo

---

## 🏗️ Arquitectura Técnica Actualizada

### Stack Seleccionado

**Dominio Compartido:**
- 🏛️ **TypeScript puro** (sin dependencias externas)
- 📋 **Domain-Driven Design** (Entities, Value Objects, Repositories)
- 🧪 **Jest** para testing del dominio

**Frontend (React):**
- ⚛️ **React 18** + **Vite**
- 🎨 **TailwindCSS** + **shadcn/ui**
- 🔄 **Zustand** (estado global)
- 🛣️ **React Router v6**
- 🌐 **Axios** (cliente HTTP hacia BFF)

**Backend (BFF - Node.js/Express):**
- � **Node.js** + **Express** + **TypeScript**
- 🛡️ **JWT** + **bcrypt** (autenticación)
- ✅ **Zod** (validación de schemas)
- 🔌 **Supabase Client** (acceso a datos)
- 📊 **Winston** (logging)

**Infraestructura:**
- 🚀 **Vercel** (Frontend)
- 🌊 **Railway/Render** (BFF Backend)
- ☁️ **Supabase Cloud** (Database + Storage)
- 🖼️ **Cloudinary** (imágenes - fase futura)

---

## 📅 Plan de Implementación por Fases (Optimizado para Claude)

### **FASE 0: Arquitectura Base** (Semanas 1-2)

#### **0.1 Setup del Workspace** ✅
*Prompt sugerido: "Crea la estructura de carpetas completa según las Development Guidelines"*
- [ ] Configuración del repositorio monorepo
- [ ] Estructura de carpetas: `src/Domain/`, `src/Frontend/`, `src/Backend/`
- [ ] Configuración de TypeScript para cada capa
- [ ] Setup de ESLint + Prettier compartido
- [ ] Configuración de path mapping (`@domain`, `@frontend`, `@backend`)

#### **0.2 Dominio Core (Domain Layer)** ✅
*Prompt sugerido: "Implementa las entidades básicas del dominio de vinos siguiendo DDD"*
- [ ] **Entidades principales:**
  - [ ] `Wine` (entidad raíz del agregado)
  - [ ] `User` (entidad de usuario)
- [ ] **Value Objects:**
  - [ ] `WineId`, `UserId`
  - [ ] `WineName`, `WineType`
  - [ ] `Quantity`, `Vintage`
  - [ ] `OptimalConsumptionPeriod`
- [ ] **Puertos (Interfaces):**
  - [ ] `WineRepository`
  - [ ] `UserRepository`
- [ ] **Excepciones de dominio:**
  - [ ] `WineNotFound`, `InvalidWineData`
- [ ] **Servicios de dominio:**
  - [ ] `OptimalConsumptionCalculator`

#### **0.3 Setup Backend (BFF)** ✅
*Prompt sugerido: "Configura el Backend for Frontend con Express y TypeScript"*
- [ ] Configuración de CORS
- [ ] Setup de Axios para HTTP client
- [ ] Conectar el frontend con el backend con una llamada 'health'

#### **0.4 Setup Frontend** ✅
*Prompt sugerido: "Configura el proyecto React con Vite y TailwindCSS"*
- [ ] Instalación de shadcn/ui
- [ ] Añadir componente card de shadcn/ui

### **FASE 1: Autenticación (Backend-First)** (Semana 3)

#### **1.1 Backend - Casos de Uso de Autenticación**
*Prompt sugerido: "Implementa los casos de uso de autenticación en el BFF"*
- [ ] Configuración de Supabase client
- [ ] **Use Cases:**
  - [ ] `RegisterUserUseCase`
  - [ ] `LoginUserUseCase`
  - [ ] `RefreshTokenUseCase`
  - [ ] `LogoutUserUseCase`
- [ ] **DTOs:**
  - [ ] `RegisterUserDto`, `LoginUserDto`
  - [ ] `AuthResponseDto`, `UserProfileDto`
- [ ] **Controllers:**
  - [ ] `AuthController` con endpoints REST
- [ ] **Middleware:**
  - [ ] JWT authentication middleware
  - [ ] Error handling middleware

#### **1.2 Backend - Infraestructura de Auth**
*Prompt sugerido: "Implementa los adaptadores de autenticación con Supabase"*
- [ ] `SupabaseUserRepository` implementando `UserRepository`
- [ ] Configuración de Supabase Auth
- [ ] Manejo de tokens JWT
- [ ] Validación con Zod schemas
- [ ] Testing de endpoints de auth

#### **1.3 Frontend - Integración de Autenticación**
*Prompt sugerido: "Crea los componentes y hooks de autenticación en React"*
- [ ] Configuración de Zustand
- [ ] **Hooks:**
  - [ ] `useAuth` (consume el BFF)
  - [ ] `useAuthGuard`
- [ ] **Componentes:**
  - [ ] `LoginForm`, `RegisterForm`
  - [ ] `ProtectedRoute`
- [ ] **Store:**
  - [ ] `authStore` (Zustand)
- [ ] **Páginas:**
  - [ ] `/login`, `/register`, `/profile`

### **FASE 2: Core del Negocio - Vinos** (Semanas 4-5)

#### **2.1 Dominio - Lógica de Negocio de Vinos**
*Prompt sugerido: "Completa la implementación del agregado Wine con todas sus reglas de negocio"*
- [ ] **Entidad Wine completa:**
  - [ ] Métodos de negocio: `updateQuantity()`, `markAsConsumed()`
  - [ ] Validaciones: fechas óptimas, cantidad mínima
  - [ ] Estados: `isOptimalToConsume()`, `isDrinking()`, `isPastOptimal()`
- [ ] **Value Objects avanzados:**
  - [ ] `ConsumptionStatus` (optimal, soon, late)
  - [ ] `WineMetadata` (bodega, denominación, notas)
- [ ] **Servicios de dominio:**
  - [ ] `OptimalConsumptionCalculator`
  - [ ] `WineSearchService`

#### **2.2 Backend - Casos de Uso de Vinos**
*Prompt sugerido: "Implementa todos los casos de uso CRUD para gestión de vinos"*
- [ ] **Use Cases:**
  - [ ] `CreateWineUseCase`
  - [ ] `FindWineByIdUseCase`
  - [ ] `UpdateWineUseCase`
  - [ ] `DeleteWineUseCase`
  - [ ] `ListUserWinesUseCase`
  - [ ] `SearchWinesUseCase`
- [ ] **DTOs específicos:**
  - [ ] `CreateWineDto`, `UpdateWineDto`
  - [ ] `WineResponseDto`, `WineListDto`
- [ ] **Controllers REST:**
  - [ ] `WineController` con endpoints completos

#### **2.3 Backend - Infraestructura de Vinos**
*Prompt sugerido: "Implementa el repositorio Supabase para vinos con todas las consultas"*
- [ ] `SupabaseWineRepository`
- [ ] Esquema de base de datos optimizado
- [ ] Políticas RLS (Row Level Security)
- [ ] Índices para performance
- [ ] Mappers: Supabase ↔ Domain

#### **2.4 Frontend - Gestión Completa de Vinos**
*Prompt sugerido: "Crea toda la UI para gestión de vinos con formularios y listados"*
- [ ] **Componentes principales:**
  - [ ] `WineForm` (crear/editar)
  - [ ] `WineCard` (tarjeta en listado)
  - [ ] `WineDetail` (vista detallada)
  - [ ] `WineList` (listado con filtros)
- [ ] **Hooks:**
  - [ ] `useWines` (CRUD completo)
  - [ ] `useWineForm` (formulario)
- [ ] **Store:**
  - [ ] `wineStore` (gestión de estado)
- [ ] **Páginas:**
  - [ ] `/wines` (listado)
  - [ ] `/wines/add` (crear)
  - [ ] `/wines/:id` (detalle)
  - [ ] `/wines/:id/edit` (editar)

### **FASE 3: Funcionalidades Avanzadas** (Semanas 6-7)

#### **3.1 Backend - Casos de Uso Avanzados**
*Prompt sugerido: "Implementa casos de uso para búsqueda, filtros y estadísticas"*
- [ ] **Use Cases de consulta:**
  - [ ] `GetWineStatisticsUseCase`
  - [ ] `FilterWinesByTypeUseCase`
  - [ ] `FilterWinesByConsumptionStatusUseCase`
  - [ ] `GetWinesNearOptimalUseCase`
- [ ] **Use Cases de dashboard:**
  - [ ] `GetUserDashboardUseCase`
  - [ ] `GetConsumptionRecommendationsUseCase`

#### **3.2 Frontend - Búsqueda y Filtros**
*Prompt sugerido: "Crea componentes avanzados de búsqueda y filtrado de vinos"*
- [ ] **Componentes de filtros:**
  - [ ] `WineFilters` (tipo, año, estado)
  - [ ] `WineSearch` (búsqueda por texto)
  - [ ] `WineSorting` (ordenamiento)
- [ ] **Indicadores visuales:**
  - [ ] Estados de consumo (verde/amarillo/rojo)
  - [ ] Badges de tipo de vino
  - [ ] Iconografía consistente
- [ ] **Paginación:**
  - [ ] `WinePagination` o scroll infinito
  - [ ] Loading states
  - [ ] Empty states

#### **3.3 Frontend - Dashboard Principal**
*Prompt sugerido: "Diseña e implementa el dashboard principal con widgets estadísticos"*
- [ ] **Widgets estadísticos:**
  - [ ] `TotalWinesWidget`
  - [ ] `WinesByTypeWidget`
  - [ ] `OptimalConsumptionWidget`
  - [ ] `RecentActivityWidget`
- [ ] **Componente principal:**
  - [ ] `Dashboard` con layout responsive
  - [ ] Accesos rápidos a acciones
  - [ ] Navegación intuitiva

### **FASE 4: Testing y Calidad** (Semana 8)

#### **4.1 Testing del Dominio**
*Prompt sugerido: "Implementa tests unitarios completos para todas las entidades y value objects del dominio"*
- [ ] **Tests de entidades:**
  - [ ] `Wine.test.ts` (todas las reglas de negocio)
  - [ ] `User.test.ts`
- [ ] **Tests de value objects:**
  - [ ] Todos los VOs con validaciones
- [ ] **Tests de servicios de dominio:**
  - [ ] `OptimalConsumptionCalculator.test.ts`

#### **4.2 Testing del Backend**
*Prompt sugerido: "Crea tests de integración para todos los endpoints del BFF"*
- [ ] **Tests de casos de uso:**
  - [ ] Tests unitarios de cada use case
  - [ ] Mocks de repositorios
- [ ] **Tests de integración:**
  - [ ] Tests de endpoints con base de datos de prueba
  - [ ] Tests de autenticación

#### **4.3 Testing del Frontend**
*Prompt sugerido: "Implementa tests de componentes React con Testing Library"*
- [ ] **Tests de componentes:**
  - [ ] Tests de renderizado
  - [ ] Tests de interacción
- [ ] **Tests de hooks:**
  - [ ] Tests de custom hooks

### **FASE 5: UI/UX y Optimización** (Semana 9)

#### **5.1 Refinamiento Visual**
*Prompt sugerido: "Aplica el sistema de diseño completo con paleta de colores vino/burdeos"*
- [ ] **Sistema de diseño:**
  - [ ] Paleta de colores definitiva
  - [ ] Tipografía y espaciado
  - [ ] Componentes de UI consistentes
- [ ] **Estados de interacción:**
  - [ ] Loading states elegantes
  - [ ] Error states informativos
  - [ ] Empty states motivacionales
- [ ] **Responsive design:**
  - [ ] Mobile-first optimization
  - [ ] Tablet y desktop refinement

#### **5.2 Performance y Accesibilidad**
*Prompt sugerido: "Optimiza la performance y accesibilidad de toda la aplicación"*
- [ ] **Optimización frontend:**
  - [ ] Code splitting
  - [ ] Lazy loading
  - [ ] Image optimization
- [ ] **Accesibilidad:**
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Color contrast

### **FASE 6: Deploy y Documentación** (Semanas 10-11)

#### **6.1 Configuración de Deploy**
*Prompt sugerido: "Configura el despliegue completo con CI/CD para frontend y backend"*
- [ ] **Deploy del Frontend:**
  - [ ] Configuración en Vercel
  - [ ] Variables de entorno
  - [ ] Domain y SSL
- [ ] **Deploy del Backend:**
  - [ ] Configuración en Railway/Render
  - [ ] Variables de entorno de producción
  - [ ] Health checks

#### **6.2 Documentación Final**
*Prompt sugerido: "Crea la documentación completa del proyecto"*
- [ ] **Documentación técnica:**
  - [ ] README del proyecto
  - [ ] Documentación de API
  - [ ] Guía de desarrollo
- [ ] **Documentación de usuario:**
  - [ ] Guía de usuario
  - [ ] FAQ básico

### **FASE 7: MVP Final y Testing** (Semana 12)
- [ ] Testing completo en producción
- [ ] Corrección de bugs críticos
- [ ] Performance tuning final
- [ ] Preparación para roadmap post-MVP

---

## 🗂️ Estructura de Carpetas (Clean Architecture + DDD + BFF)

```
celleret/
├── src/
│   ├── Domain/                      # ⚡ DOMINIO COMPARTIDO
│   │   ├── entities/
│   │   │   ├── Wine.ts
│   │   │   ├── User.ts
│   │   │   └── __tests__/
│   │   ├── value-objects/
│   │   │   ├── WineId.ts
│   │   │   ├── WineName.ts
│   │   │   ├── WineType.ts
│   │   │   ├── OptimalConsumptionPeriod.ts
│   │   │   └── __tests__/
│   │   ├── repositories/            # Puertos/Interfaces
│   │   │   ├── WineRepository.ts
│   │   │   └── UserRepository.ts
│   │   ├── services/
│   │   │   ├── OptimalConsumptionCalculator.ts
│   │   │   └── __tests__/
│   │   └── exceptions/
│   │       ├── DomainException.ts
│   │       ├── WineNotFoundException.ts
│   │       └── InvalidWineDataException.ts
│   │
│   ├── Backend/                     # 🚀 BACKEND FOR FRONTEND (BFF)
│   │   ├── presentation/            # Capa de Presentación (API)
│   │   │   ├── controllers/
│   │   │   │   ├── AuthController.ts
│   │   │   │   └── WineController.ts
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── wine.routes.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── validation.middleware.ts
│   │   │   │   └── error.middleware.ts
│   │   │   └── validators/
│   │   │       ├── auth.validators.ts
│   │   │       └── wine.validators.ts
│   │   ├── application/             # Capa de Aplicación
│   │   │   ├── use-cases/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── RegisterUserUseCase.ts
│   │   │   │   │   ├── LoginUserUseCase.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   └── wine/
│   │   │   │       ├── CreateWineUseCase.ts
│   │   │   │       ├── FindWineByIdUseCase.ts
│   │   │   │       ├── ListUserWinesUseCase.ts
│   │   │   │       └── __tests__/
│   │   │   ├── dto/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── RegisterUserDto.ts
│   │   │   │   │   └── AuthResponseDto.ts
│   │   │   │   └── wine/
│   │   │   │       ├── CreateWineDto.ts
│   │   │   │       └── WineResponseDto.ts
│   │   │   └── mappers/
│   │   │       ├── UserMapper.ts
│   │   │       └── WineMapper.ts
│   │   ├── infrastructure/          # Capa de Infraestructura
│   │   │   ├── repositories/
│   │   │   │   ├── SupabaseUserRepository.ts
│   │   │   │   └── SupabaseWineRepository.ts
│   │   │   ├── persistence/
│   │   │   │   ├── supabase.client.ts
│   │   │   │   └── database.config.ts
│   │   │   ├── external/
│   │   │   │   └── email.service.ts
│   │   │   └── config/
│   │   │       ├── environment.ts
│   │   │       └── cors.config.ts
│   │   ├── shared/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── utils/
│   │   ├── server.ts               # Punto de entrada del servidor
│   │   ├── app.ts                  # Configuración de Express
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── Frontend/                   # ⚛️ FRONTEND (REACT)
│       ├── public/
│       │   ├── icons/
│       │   └── images/
│       ├── src/
│       │   ├── presentation/       # Capa de Presentación
│       │   │   ├── components/
│       │   │   │   ├── ui/         # shadcn/ui components
│       │   │   │   ├── auth/
│       │   │   │   │   ├── LoginForm.tsx
│       │   │   │   │   └── RegisterForm.tsx
│       │   │   │   ├── wine/
│       │   │   │   │   ├── WineCard.tsx
│       │   │   │   │   ├── WineForm.tsx
│       │   │   │   │   ├── WineList.tsx
│       │   │   │   │   └── WineFilters.tsx
│       │   │   │   ├── dashboard/
│       │   │   │   │   ├── Dashboard.tsx
│       │   │   │   │   └── widgets/
│       │   │   │   └── layout/
│       │   │   │       ├── Header.tsx
│       │   │   │       ├── Navigation.tsx
│       │   │   │       └── Layout.tsx
│       │   │   ├── pages/
│       │   │   │   ├── auth/
│       │   │   │   │   ├── LoginPage.tsx
│       │   │   │   │   └── RegisterPage.tsx
│       │   │   │   ├── wine/
│       │   │   │   │   ├── WinesPage.tsx
│       │   │   │   │   ├── AddWinePage.tsx
│       │   │   │   │   └── WineDetailPage.tsx
│       │   │   │   ├── dashboard/
│       │   │   │   │   └── DashboardPage.tsx
│       │   │   │   └── NotFoundPage.tsx
│       │   │   ├── hooks/
│       │   │   │   ├── useAuth.ts
│       │   │   │   ├── useWines.ts
│       │   │   │   └── useWineForm.ts
│       │   │   └── store/          # Zustand stores
│       │   │       ├── authStore.ts
│       │   │       └── wineStore.ts
│       │   ├── infrastructure/     # Capa de Infraestructura
│       │   │   ├── http/
│       │   │   │   ├── apiClient.ts      # Axios client hacia BFF
│       │   │   │   ├── authApi.ts
│       │   │   │   └── wineApi.ts
│       │   │   ├── storage/
│       │   │   │   ├── localStorage.ts
│       │   │   │   └── sessionStorage.ts
│       │   │   └── config/
│       │   │       └── environment.ts
│       │   ├── shared/
│       │   │   ├── types/
│       │   │   ├── constants/
│       │   │   ├── utils/
│       │   │   └── validation/
│       │   ├── styles/
│       │   │   └── globals.css
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── package.json
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── tsconfig.json
│
├── docs/                           # 📚 DOCUMENTACIÓN
│   ├── api/                        # Documentación de API
│   ├── deployment/                 # Guías de despliegue
│   └── user-guide/                 # Guía de usuario
├── scripts/                        # 🔧 SCRIPTS DE AUTOMATIZACIÓN
│   ├── setup.sh
│   ├── deploy.sh
│   └── test.sh
├── .env.example
├── .gitignore
├── README.md
└── package.json                    # Root package.json para workspaces
```

### **Prompts Organizados por Carpeta**

#### **Para Dominio (`src/Domain/`)**
- "Implementa la entidad Wine con todas sus reglas de negocio"
- "Crea los value objects para validar datos de vino"
- "Define las interfaces de repositorio según DDD"

#### **Para Backend (`src/Backend/`)**
- "Implementa el caso de uso CreateWineUseCase"
- "Crea el controller REST para gestión de vinos"
- "Implementa el repositorio Supabase para vinos"

#### **Para Frontend (`src/Frontend/`)**
- "Crea el componente WineForm con validación"
- "Implementa el hook useWines para gestión de estado"
- "Diseña la página de listado de vinos responsive"

---

## 🤖 Metodología de Desarrollo con Claude

### **Principios para Prompts Efectivos**

#### **1. Prompts por Capa Arquitectónica**
Cada prompt debe enfocarse en **una sola capa** para mantener la separación de responsabilidades:

```markdown
✅ CORRECTO: "Implementa la entidad Wine en el dominio con todas sus reglas de negocio"
❌ INCORRECTO: "Crea la entidad Wine y el formulario React para crearla"
```

#### **2. Contexto Arquitectónico en Cada Prompt**
Siempre proporciona el contexto de arquitectura:

```markdown
**Contexto:** Estamos implementando Clean Architecture + DDD + Hexagonal.
**Capa:** Domain
**Tarea:** Implementar la entidad Wine...
**Dependencias:** Solo puede depender de otros elementos del dominio.
```

#### **3. Iteraciones Incrementales**
Cada prompt debe construir sobre el anterior:

```markdown
Iteración 1: "Crea la entidad Wine básica"
Iteración 2: "Añade métodos de negocio a la entidad Wine"
Iteración 3: "Implementa validaciones avanzadas en Wine"
```

### **Templates de Prompts por Fase**

#### **Fase 0: Dominio**
```markdown
**Prompt Template - Entidades:**
Implementa la entidad [EntityName] en TypeScript siguiendo DDD.

Contexto:
- Arquitectura: Clean Architecture + DDD
- Capa: Domain (src/Domain/entities/)
- Sin dependencias externas (solo otros elementos del dominio)

Requisitos:
- [Listar reglas de negocio específicas]
- Métodos para [operaciones específicas]
- Validaciones para [casos específicos]
- Tests unitarios completos

Estructura esperada:
- Constructor privado con factory method
- Getters inmutables
- Métodos de negocio
- Validaciones internas
```

#### **Fase 1-2: Backend (BFF)**
```markdown
**Prompt Template - Use Cases:**
Implementa el caso de uso [UseCaseName] para el Backend for Frontend.

Contexto:
- Arquitectura: Clean Architecture + Hexagonal
- Capa: Backend/application/use-cases/
- Importa del dominio compartido (src/Domain/)

Requisitos:
- Input: [DTO específico]
- Output: [DTO de respuesta]
- Dependencias: [Repositorios necesarios]
- Validaciones: [Reglas de negocio]
- Manejo de errores: [Excepciones específicas]

Incluye:
- Tests unitarios con mocks
- Validación de DTOs con Zod
```

#### **Fase 2-3: Frontend**
```markdown
**Prompt Template - Componentes React:**
Crea el componente [ComponentName] para la gestión de vinos.

Contexto:
- Arquitectura: Frontend React + Clean Architecture
- Capa: Frontend/presentation/components/
- Consume APIs del BFF (no acceso directo a BD)
- Puede importar tipos del dominio compartido

Requisitos:
- Props: [Interface específica]
- Estado local: [Zustand/useState]
- Interacciones: [Eventos específicos]
- Responsive: Mobile-first con TailwindCSS
- Accesibilidad: ARIA labels y keyboard nav

Incluye:
- TypeScript strict
- Tests con Testing Library
- Estados de loading/error
```

### **Secuencia de Prompts Recomendada**

#### **Sprint 1: Base del Dominio**
1. "Crea la estructura de carpetas completa del proyecto"
2. "Implementa la entidad Wine con reglas básicas"
3. "Crea los value objects WineId, WineName, WineType"
4. "Define las interfaces WineRepository y UserRepository"
5. "Implementa excepciones de dominio específicas"

#### **Sprint 2: Backend Core**
6. "Configura Express + TypeScript con middleware básico"
7. "Implementa CreateWineUseCase con validaciones"
8. "Crea AuthController con endpoints JWT"
9. "Implementa SupabaseWineRepository"
10. "Añade tests de integración para endpoints"

#### **Sprint 3: Frontend Core**
11. "Configura React + Vite con TailwindCSS"
12. "Crea el hook useAuth para gestión de autenticación"
13. "Implementa WineForm para crear/editar vinos"
14. "Diseña WineList con filtros y búsqueda"
15. "Crea el Dashboard principal con widgets"

### **Checklist por Prompt**
Antes de enviar cada prompt, verificar:

- [ ] ¿Está claramente definida la capa arquitectónica?
- [ ] ¿Se especifican las dependencias permitidas?
- [ ] ¿Incluye requisitos de testing?
- [ ] ¿Define el input y output esperado?
- [ ] ¿Menciona las convenciones de código a seguir?
- [ ] ¿Es incremental respecto al prompt anterior?

---

## 🗄️ Esquema de Base de Datos

### Tabla: `users` (gestionada por Supabase Auth)
```sql
-- Extendida con perfil personalizado si es necesario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla: `wines`
```sql
CREATE TABLE wines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  winery TEXT,
  denomination TEXT,
  type TEXT NOT NULL, -- 'tinto', 'blanco', 'rosado', 'espumoso', 'generoso'
  vintage INTEGER,
  purchase_date DATE,
  optimal_start_date DATE,
  optimal_end_date DATE,
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX wines_user_id_idx ON wines(user_id);
CREATE INDEX wines_type_idx ON wines(type);
CREATE INDEX wines_optimal_dates_idx ON wines(optimal_start_date, optimal_end_date);
```

### Políticas RLS (Row Level Security)
```sql
-- Los usuarios solo pueden ver sus propios vinos
ALTER TABLE wines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wines"
  ON wines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own wines"
  ON wines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wines"
  ON wines FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wines"
  ON wines FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 🎨 Guía de Diseño

### Paleta de Colores
```css
:root {
  /* Colores principales - Tonos vino/burdeos */
  --wine-900: #4a1520;
  --wine-800: #6b1f2f;
  --wine-700: #8b2940;
  --wine-600: #a83750;
  --wine-500: #c94560;
  --wine-400: #d96a81;
  --wine-300: #e999ab;
  --wine-200: #f4c2cd;
  --wine-100: #fae5e9;
  
  /* Neutrales */
  --neutral-900: #1a1a1a;
  --neutral-100: #f5f5f5;
  
  /* Estados */
  --status-optimal: #10b981;    /* Verde */
  --status-soon: #f59e0b;       /* Naranja */
  --status-late: #ef4444;       /* Rojo */
}
```

### Tipografía
- **Headings:** Inter, System UI
- **Body:** Inter, System UI
- **Monospace:** Fira Code (si se necesita)

---

## 🔐 Consideraciones de Seguridad

- [ ] Implementar HTTPS en producción
- [ ] Validación de datos en cliente y servidor
- [ ] Protección contra XSS
- [ ] Protección contra CSRF
- [ ] Rate limiting en operaciones críticas
- [ ] Sanitización de inputs de usuario
- [ ] Políticas RLS correctamente configuradas
- [ ] Variables de entorno seguras
- [ ] No exponer claves API en frontend

---

## 📊 Métricas de Éxito del MVP

1. **Funcionalidad:**
   - Usuario puede registrarse y autenticarse ✓
   - Usuario puede crear, editar y eliminar vinos ✓
   - Usuario puede visualizar su stock completo ✓
   - Filtros y búsqueda funcionan correctamente ✓

2. **Performance:**
   - Tiempo de carga inicial < 3s
   - First Contentful Paint < 1.5s
   - Time to Interactive < 3.5s

3. **UX:**
   - Interfaz intuitiva y sin fricción
   - Responsive en todos los dispositivos
   - Feedback visual claro en todas las acciones

4. **Técnico:**
   - 0 errores críticos en producción
   - Código bien documentado
   - Test coverage > 60% (opcional para MVP)

---

## 🚀 Roadmap Post-MVP

### Versión 0.2 (Fase 2)
- [ ] Sistema de recordatorios
- [ ] Subida de imágenes de etiquetas
- [ ] Exportación de datos (CSV/PDF)
- [ ] Compartir bodega con otros usuarios

### Versión 0.3 (Fase 3)
- [ ] Integración con APIs externas (Vivino, Wine-Searcher)
- [ ] Escaneo de etiquetas con OCR
- [ ] Recomendaciones de maridaje
- [ ] Modo offline (PWA completa)

### Versión 1.0 (Producto Completo)
- [ ] App móvil nativa (React Native)
- [ ] Sistema de notificaciones push
- [ ] Analytics avanzados
- [ ] Comunidad y valoraciones

---

## 📝 Notas de Desarrollo

### Comandos Útiles
```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Format
npm run format
```

### Variables de Entorno (.env.example)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🤝 Colaboración y Contribución

- Seguir la guía de estilo del proyecto
- Crear branches descriptivos: `feature/nombre`, `fix/nombre`
- Pull requests con descripción clara
- Code review antes de merge a main
- Commits siguiendo conventional commits

---

## 📞 Contacto y Soporte

**Desarrollador Principal:** [Tu nombre]  
**Email:** [Tu email]  
**Repositorio:** [URL del repo]

---

**Última actualización:** 7 de noviembre de 2025
