# 📘 Guías de Desarrollo - Celleret

**Versión:** 1.0  
**Fecha:** 7 de noviembre de 2025  
**Lenguaje:** TypeScript  
**Paradigma:** Clean Architecture + DDD + Hexagonal Architecture

---

## 🎯 Principios Fundamentales

### 1. Clean Code
- ✅ Código legible y autodocumentado
- ✅ Nombres descriptivos y significativos
- ✅ Funciones pequeñas con una única responsabilidad
- ✅ Evitar comentarios (el código debe explicarse por sí mismo)
- ✅ DRY (Don't Repeat Yourself)
- ✅ Manejo explícito de errores

### 2. Principios SOLID

Los principios SOLID son una guía fundamental para el diseño de software mantenible y escalable. Sin embargo, es importante entender que aplicarlos de forma estricta y dogmática puede llevar a problemas de cohesión y acoplamiento innecesario. La clave está en encontrar un equilibrio: aplicar SOLID de manera pragmática, priorizando siempre la cohesión del código y evitando la sobreingeniería. No pierdas de vista el objetivo de que el código sea comprensible, cohesivo y fácil de mantener.

- **S**: Single Responsibility Principle (SRP)
- **O**: Open/Closed Principle (OCP)
- **L**: Liskov Substitution Principle (LSP)
- **I**: Interface Segregation Principle (ISP)
- **D**: Dependency Inversion Principle (DIP)

> **Nota:** Si aplicas los principios SOLID al 100% y de forma rígida, puedes acabar con un sistema excesivamente fragmentado, difícil de navegar y con bajo nivel de cohesión. Utiliza SOLID como una brújula, no como una ley absoluta. Prioriza la cohesión y el sentido común en el diseño.

### 3. KISS (Keep It Simple, Stupid)
- Preferir soluciones simples sobre complejas
- No sobre-ingenierizar
- Evitar abstracciones prematuras

```typescript
// ❌ MAL - Sobre-ingeniería
class AbstractFactoryBuilderStrategy<T> {
  // Complejidad innecesaria para un caso simple
}

// ✅ BIEN - Simple y directo
class WineFactory {
  static create(data: WineData): Wine {
    return new Wine(data);
  }
}
```

### 4. Build for Change, Not for Future
- No implementar features "por si acaso"
- Diseñar código fácil de modificar
- YAGNI (You Aren't Gonna Need It)
- Refactorizar cuando sea necesario, no anticipadamente

---

## 🏛️ Arquitectura Hexagonal (Puertos y Adaptadores)

### Estructura de Capas

```
src/
├── Domain/                 # Capa de Dominio (Core)
│   ├── entities/          # Entidades del negocio
│   ├── value-objects/     # Value Objects
│   ├── repositories/      # Puertos (interfaces)
│   ├── services/          # Servicios de dominio
│   └── exceptions/        # Excepciones de dominio
│
├── FrontEnd - Web
│   ├── presentation/           # Capa de Presentación
│   │   ├── components/        # Componentes React
│   │   ├── pages/             # Páginas
│   │   ├── hooks/             # Custom hooks
│   │   ├── routes/            # Routes, http
│   │   └── view-models/       # View Models
├── Backend
│   ├── application/            # Capa de Aplicación
│   │   ├── use-cases/         # Casos de uso
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── routes/            # Routes, Cliente HTTP (APIs)
│   │   └── ports/             # Puertos de entrada/salida
│   │
│   └── infrastructure/         # Capa de Infraestructura (Adaptadores)
│       ├── repositories/      # Implementaciones de repositorios
│       ├── persistence/       # Configuración de BD
│       └── external/          # Servicios externos
```

### Flujo de Dependencias

```
Presentation → Application → Domain
                    ↓
            Infrastructure
```

**Regla de Oro:** Las dependencias siempre apuntan hacia adentro (hacia el dominio).

---

## 🎨 Domain-Driven Design (DDD)

### ¿Cómo aplicar DDD en este proyecto?

Domain-Driven Design (DDD) es una filosofía de diseño que busca que la lógica de negocio esté en el centro de la aplicación, modelando el dominio de forma fiel y expresiva. En este proyecto, la aplicación de DDD se implementa con un **dominio compartido** entre frontend y backend, siguiendo estos principios:

#### **Dominio Compartido (`src/Domain/`)**
El dominio es **único y compartido** entre todas las capas de la aplicación, ubicado al mismo nivel jerárquico que Frontend y Backend:

- **Entidades y Value Objects:** Toda la lógica de negocio y validaciones que definen el comportamiento y las reglas del dominio se implementan en `src/Domain/entities/` y `src/Domain/value-objects/`. Aquí se definen las entidades principales, sus atributos, métodos y value objects asociados. **No incluyas lógica de infraestructura ni detalles de frameworks en esta capa.**

- **Repositorios (Puertos):** Las interfaces que definen cómo acceder a los datos se ubican en `src/Domain/repositories/`. Estas interfaces no dependen de ninguna tecnología concreta y actúan como contratos que deben ser implementados por la infraestructura.

- **Servicios de Dominio:** Lógica de negocio que no pertenece a una entidad específica se implementa en `src/Domain/services/`.

#### **Casos de Uso - Solo en Backend (`src/Backend/application/use-cases/`)**
- La orquestación de la lógica de negocio se implementa **únicamente en el backend**, en `src/Backend/application/use-cases/`
- Los casos de uso utilizan las entidades, value objects y repositorios definidos en el dominio compartido
- **El frontend NO tiene casos de uso propios**, toda la lógica de aplicación pasa por el BFF

#### **Backend (BFF - Backend for Frontend)**
- **Aplicación (`src/Backend/application/`):** Contiene todos los casos de uso, DTOs y puertos de entrada/salida
- **Infraestructura (`src/Backend/infrastructure/`):** 
  - `repositories/`: Implementaciones concretas de las interfaces del dominio
  - `persistence/`: Configuración y cliente de MongoDB con Mongoose
  - `external/`: Integración con servicios externos
- **Presentación (`src/Backend/presentation/`):** Controllers, routes y APIs REST/GraphQL

#### **Frontend**
- **Presentación (`src/FrontEnd/presentation/`):** Componentes React, páginas, hooks y view models
- **Infraestructura (`src/FrontEnd/infrastructure/`):** Cliente HTTP para comunicarse con el BFF
- **Importación del Dominio:** El frontend **SÍ puede importar directamente del dominio compartido** cuando necesite:
  - Crear instancias de entidades o value objects
  - Validar datos antes de enviarlos al backend
  - Utilizar tipos y excepciones del dominio

#### **Flujo de Comunicación**
```
Frontend Presentation → HTTP Client → BFF API → Use Cases → Domain ← MongoDB Repositories
     ↑                                                        ↓
     └────────── Puede importar Domain directamente ────────┐
```

#### **Reglas Importantes**
1. **Dominio Limpio:** No implementes lógica de negocio en infraestructura ni presentación
2. **Casos de Uso Centralizados:** Solo en el backend, el frontend consume APIs
3. **Dominio Accesible:** El frontend puede importar del dominio para operaciones locales
4. **BFF como Orquestador:** Toda la lógica de aplicación compleja pasa por el BFF
5. **MongoDB Oculto:** Solo el backend conoce MongoDB, el frontend solo conoce el BFF

#### **Testing**
**Todo el dominio debe estar cubierto por tests unitarios**. Cada entidad, value object y servicio de dominio debe tener sus pruebas en `src/Domain/[carpeta]/__tests__/`. Esto garantiza que la lógica de negocio sea robusta, mantenible y evolucione de forma segura independientemente de frontend y backend.

---

## 📱 Mobile First

### 1. Diseño Responsive

```typescript
// Breakpoints estándar
const breakpoints = {
  mobile: '320px',      // Mobile pequeño
  mobileLarge: '480px', // Mobile grande
  tablet: '768px',      // Tablet
  desktop: '1024px',    // Desktop
  wide: '1440px'        // Pantallas grandes
};

// Uso en TailwindCSS (ya es mobile-first por defecto)
<div className="
  w-full           // Mobile: ancho completo
  px-4             // Mobile: padding horizontal
  md:w-3/4         // Tablet: 75% ancho
  md:px-6          // Tablet: más padding
  lg:w-1/2         // Desktop: 50% ancho
  lg:px-8          // Desktop: más padding
">
```

### 2. Touch-Friendly

```typescript
// Áreas táctiles mínimas: 44x44px (recomendación Apple/Google)
<button className="
  min-h-[44px]
  min-w-[44px]
  p-3
  touch-manipulation  // Mejora la respuesta táctil
">
```

---

## 📝 Convenciones de Código

### Nomenclatura

```typescript
// Clases: PascalCase
class WineRepository {}

// Interfaces: PascalCase con prefijo 'I' opcional (preferimos sin prefijo)
interface WineRepository {}

// Tipos: PascalCase
type WineType = 'tinto' | 'blanco' | 'rosado' | 'espumoso' | 'generoso';

// Variables y funciones: camelCase
const wineRepository = new WineRepository();
function calculateOptimalDate() {}

// Constantes: SCREAMING_SNAKE_CASE
const MAX_WINE_NAME_LENGTH = 100;

// Archivos: kebab-case para componentes, PascalCase para clases
// wine-card.component.tsx
// WineRepository.ts
// CreateWineUseCase.ts

// Carpetas: kebab-case
// use-cases/
// value-objects/
```

### Organización de Imports

```typescript
// 1. Imports de librerías externas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Imports de alias (@/)
import { Wine } from '@/domain/entities/Wine';
import { WineRepository } from '@/domain/repositories/WineRepository';

// 3. Imports relativos
import { WineCard } from './WineCard';
import { useWines } from '../hooks/useWines';

// 4. Imports de tipos
import type { WineType, WinePrimitives } from '@/domain/types';

// 5. Imports de estilos
import './wine-list.css';
```

### Tipos vs Interfaces

```typescript
// Usar 'type' para:
// - Uniones
type WineType = 'tinto' | 'blanco' | 'rosado' | 'espumoso' | 'generoso';

// - Alias complejos
type WineFilter = (wine: Wine) => boolean;

// - Intersecciones
type WineWithUser = Wine & { userId: string };

// Usar 'interface' para:
// - Contratos de objetos
interface WineRepository {
  save(wine: Wine): Promise<void>;
  findById(id: string): Promise<Wine | null>;
}

// - Cuando necesites extensión
interface ExtendedWineRepository extends WineRepository {
  findByRegion(region: string): Promise<Wine[]>;
}
```

### Manejo de Errores

```typescript
// Excepciones de dominio
export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class WineNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Wine with id ${id} not found`);
  }
}

export class InvalidWineNameException extends DomainException {
  constructor(reason: string) {
    super(`Invalid wine name: ${reason}`);
  }
}

// Uso en casos de uso
try {
  const wine = await this.repository.findById(id);
  if (!wine) {
    throw new WineNotFoundException(id.value);
  }
} catch (error) {
  if (error instanceof DomainException) {
    // Manejo específico de errores de dominio
    throw error;
  }
  // Error inesperado
  throw new ApplicationException('Unexpected error occurred');
}
```

---

## ✅ Checklist de Revisión de Código

### Antes de Commit

- [ ] El código sigue los principios SOLID
- [ ] No hay código duplicado (DRY)
- [ ] Las funciones tienen una única responsabilidad
- [ ] Los nombres son descriptivos y claros
- [ ] No hay "magic numbers" (usar constantes)
- [ ] Los errores se manejan apropiadamente
- [ ] Todo el código añadido en Dominio ha sido testeado
- [ ] Se respeta la arquitectura hexagonal
- [ ] Las dependencias apuntan hacia el dominio
- [ ] Los Value Objects validan sus datos
- [ ] Las entidades encapsulan lógica de negocio
- [ ] Los casos de uso orquestan el flujo
- [ ] El código es mobile-first
- [ ] No hay console.log() olvidados
- [ ] Los tipos TypeScript son correctos
- [ ] No hay 'any' sin justificación

### Antes de Pull Request

- [ ] Los tests pasan
- [ ] No hay errores de linting
- [ ] El código está formateado (Prettier)
- [ ] La documentación está actualizada
- [ ] Los commits son descriptivos
- [ ] No hay código comentado sin razón
- [ ] Las dependencias están actualizadas

---

## 🔧 Herramientas y Configuración

### ESLint Config

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "react/react-in-jsx-scope": "off",
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Config

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 4,
  "useTabs": false,
  "arrowParens": "avoid"
}
```

---

## 📚 Recursos y Referencias

### Libros Recomendados
- **Clean Code** - Robert C. Martin
- **Clean Architecture** - Robert C. Martin
- **Domain-Driven Design** - Eric Evans
- **Implementing Domain-Driven Design** - Vaughn Vernon

### Artículos
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [DDD in TypeScript](https://khalilstemmler.com/articles/domain-driven-design-intro/)

---

## 🎓 Glosario

**Entity (Entidad):** Objeto con identidad única que persiste en el tiempo.

**Value Object:** Objeto inmutable definido solo por sus atributos, sin identidad propia.

**Aggregate:** Conjunto de entidades y value objects tratados como una unidad.

**Repository:** Abstracción para acceso a datos, simula una colección en memoria.

**Use Case:** Orquesta el flujo de datos hacia y desde las entidades.

**Port:** Interfaz que define un contrato (entrada o salida).

**Adapter:** Implementación concreta de un puerto.

**DTO (Data Transfer Object):** Objeto simple para transferir datos entre capas.

**Domain Service:** Lógica de negocio que no pertenece a una entidad específica.

---

**Última actualización:** 7 de noviembre de 2025  
**Mantenido por:** Equipo Celleret
