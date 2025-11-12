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
├── domain/                 # Capa de Dominio (Core)
│   ├── entities/          # Entidades del negocio
│   ├── value-objects/     # Value Objects
│   ├── repositories/      # Puertos (interfaces)
│   ├── services/          # Servicios de dominio
│   └── exceptions/        # Excepciones de dominio
│
├── application/            # Capa de Aplicación
│   ├── use-cases/         # Casos de uso
│   ├── dto/               # Data Transfer Objects
│   ├── http/              # Cliente HTTP (Supabase, APIs)
│   └── ports/             # Puertos de entrada/salida
│
├── presentation/           # Capa de Presentación
│   ├── components/        # Componentes React
│   ├── pages/             # Páginas
│   ├── hooks/             # Custom hooks
│   └── view-models/       # View Models
│
├── infrastructure/         # Capa de Infraestructura (Adaptadores)
    ├── repositories/      # Implementaciones de repositorios
    ├── persistence/       # Configuración de BD
    └── external/          # Servicios externos
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

Domain-Driven Design (DDD) es una filosofía de diseño que busca que la lógica de negocio esté en el centro de la aplicación, modelando el dominio de forma fiel y expresiva. En este proyecto, la aplicación de DDD debe guiarse por los siguientes principios y ubicaciones:

- **Entidades y Value Objects:** Toda la lógica de negocio y validaciones que definen el comportamiento y las reglas del dominio deben implementarse en la carpeta `src/domain/`. Aquí se definen las entidades principales, sus atributos, métodos y value objects asociados. No incluyas lógica de infraestructura ni detalles de frameworks en esta capa.

- **Repositorios (Puertos):** Las interfaces que definen cómo acceder a los datos (por ejemplo, guardar, buscar, eliminar entidades) deben estar en `src/domain/repositories/`. Estas interfaces no dependen de ninguna tecnología concreta.

- **Casos de Uso (Application Layer):** La orquestación de la lógica de negocio (por ejemplo, crear, modificar, consultar entidades) debe implementarse en la carpeta `src/application/use-cases/`. Aquí se usan las entidades, value objects y repositorios definidos en el dominio para resolver necesidades del negocio.

- **Adaptadores e Infraestructura:** Las implementaciones concretas de los repositorios y la integración con servicios externos (bases de datos, APIs, etc.) deben estar en `src/infrastructure/`. Aquí se conectan los puertos definidos en el dominio con la tecnología real.

- **Presentación:** La capa de presentación (React, hooks, componentes, etc.) debe estar en `src/presentation/` y nunca contener lógica de dominio, solo interactuar con los casos de uso y mostrar datos.

> **Importante:** No implementes lógica de negocio en la infraestructura ni en la presentación. Mantén el dominio limpio y expresivo. Si tienes dudas sobre dónde debe ir una lógica, prioriza siempre la cohesión y la claridad del modelo de dominio.


Además, **todo el dominio debe estar cubierto por tests unitarios**. Cada entidad, value object y servicio de dominio debe tener sus pruebas en la carpeta correspondiente (por ejemplo, `src/domain/entities/__tests__/`). Esto garantiza que la lógica de negocio sea robusta, mantenible y evolucione de forma segura.

Cuando se implementen los distintos elementos de DDD, sigue esta estructura y asegúrate de que cada capa tiene una única responsabilidad y depende solo de las capas internas, nunca de las externas.

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
