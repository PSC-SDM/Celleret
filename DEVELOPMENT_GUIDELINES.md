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

### 2. SOLID Principles

#### **S - Single Responsibility Principle (SRP)**
Cada clase/módulo debe tener una única razón para cambiar.

```typescript
// ❌ MAL - Múltiples responsabilidades
class WineManager {
  createWine(data: WineData) { /* ... */ }
  saveToDatabase(wine: Wine) { /* ... */ }
  sendEmail(wine: Wine) { /* ... */ }
  validateWine(wine: Wine) { /* ... */ }
}

// ✅ BIEN - Responsabilidad única
class WineService {
  constructor(
    private repository: WineRepository,
    private validator: WineValidator,
    private notifier: WineNotifier
  ) {}
  
  async createWine(data: WineData): Promise<Wine> {
    const wine = Wine.create(data);
    this.validator.validate(wine);
    await this.repository.save(wine);
    await this.notifier.notifyCreation(wine);
    return wine;
  }
}
```

#### **O - Open/Closed Principle (OCP)**
Abierto para extensión, cerrado para modificación.

```typescript
// ✅ BIEN - Extensible sin modificar código existente
interface WineFilter {
  matches(wine: Wine): boolean;
}

class TypeFilter implements WineFilter {
  constructor(private type: WineType) {}
  matches(wine: Wine): boolean {
    return wine.type === this.type;
  }
}

class VintageFilter implements WineFilter {
  constructor(private vintage: number) {}
  matches(wine: Wine): boolean {
    return wine.vintage === this.vintage;
  }
}

class WineFilterService {
  filter(wines: Wine[], filters: WineFilter[]): Wine[] {
    return wines.filter(wine => 
      filters.every(filter => filter.matches(wine))
    );
  }
}
```

#### **L - Liskov Substitution Principle (LSP)**
Los objetos de una clase derivada deben poder sustituir a los de la clase base.

```typescript
// ✅ BIEN - Correcta jerarquía
interface Repository<T> {
  save(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
}

class BaseRepository<T> implements Repository<T> {
  // Implementación base
}

class WineRepository extends BaseRepository<Wine> {
  // Puede añadir métodos específicos, pero respeta el contrato base
  async findByType(type: WineType): Promise<Wine[]> {
    // Específico de Wine
  }
}
```

#### **I - Interface Segregation Principle (ISP)**
Los clientes no deben depender de interfaces que no usan.

```typescript
// ❌ MAL - Interface demasiado grande
interface WineOperations {
  create(data: WineData): Promise<Wine>;
  update(id: string, data: WineData): Promise<Wine>;
  delete(id: string): Promise<void>;
  export(): Promise<string>;
  import(file: File): Promise<void>;
  sendReminder(): Promise<void>;
}

// ✅ BIEN - Interfaces segregadas
interface WineWriter {
  create(data: WineData): Promise<Wine>;
  update(id: string, data: WineData): Promise<Wine>;
  delete(id: string): Promise<void>;
}

interface WineExporter {
  export(): Promise<string>;
}

interface WineImporter {
  import(file: File): Promise<void>;
}

interface WineNotifier {
  sendReminder(): Promise<void>;
}
```

#### **D - Dependency Inversion Principle (DIP)**
Depender de abstracciones, no de implementaciones concretas.

```typescript
// ✅ BIEN - Inyección de dependencias con abstracciones
interface WineRepository {
  save(wine: Wine): Promise<void>;
  findById(id: string): Promise<Wine | null>;
}

class CreateWineUseCase {
  constructor(private repository: WineRepository) {} // Depende de abstracción
  
  async execute(data: WineData): Promise<Wine> {
    const wine = Wine.create(data);
    await this.repository.save(wine);
    return wine;
  }
}

// Implementaciones concretas
class SupabaseWineRepository implements WineRepository {
  // Implementación específica de Supabase
}

class InMemoryWineRepository implements WineRepository {
  // Implementación para tests
}
```

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
│   └── ports/             # Puertos de entrada/salida
│
├── infrastructure/         # Capa de Infraestructura (Adaptadores)
│   ├── repositories/      # Implementaciones de repositorios
│   ├── http/              # Cliente HTTP (Supabase, APIs)
│   ├── persistence/       # Configuración de BD
│   └── external/          # Servicios externos
│
└── presentation/           # Capa de Presentación
    ├── components/        # Componentes React
    ├── pages/             # Páginas
    ├── hooks/             # Custom hooks
    └── view-models/       # View Models
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

### 1. Entidades (Entities)

```typescript
// domain/entities/Wine.ts
export class Wine {
  private constructor(
    private readonly _id: WineId,
    private _name: WineName,
    private _quantity: Quantity,
    private _winery: Winery,
    private _type: WineType,
    private _vintage: Vintage,
    private _optimalConsumption: OptimalConsumption,
    private _notes: Notes
  ) {}

  // Factory method
  static create(data: CreateWineData): Wine {
    return new Wine(
      WineId.generate(),
      new WineName(data.name),
      new Quantity(data.quantity),
      new Winery(data.winery),
      new WineType(data.type),
      new Vintage(data.vintage),
      OptimalConsumption.create(data.optimalStart, data.optimalEnd),
      new Notes(data.notes)
    );
  }

  // Método de negocio
  consumeBottle(): void {
    if (this._quantity.isEmpty()) {
      throw new InsufficientQuantityException();
    }
    this._quantity = this._quantity.decrease();
  }

  // Método de negocio
  isOptimalForConsumption(date: Date = new Date()): boolean {
    return this._optimalConsumption.isOptimal(date);
  }

  // Getters
  get id(): WineId { return this._id; }
  get name(): WineName { return this._name; }
  get quantity(): Quantity { return this._quantity; }
  
  // Método para persistencia
  toPrimitives(): WinePrimitives {
    return {
      id: this._id.value,
      name: this._name.value,
      quantity: this._quantity.value,
      winery: this._winery.value,
      type: this._type.value,
      vintage: this._vintage.value,
      optimalStart: this._optimalConsumption.start,
      optimalEnd: this._optimalConsumption.end,
      notes: this._notes.value
    };
  }

  // Factory desde persistencia
  static fromPrimitives(data: WinePrimitives): Wine {
    return new Wine(
      new WineId(data.id),
      new WineName(data.name),
      new Quantity(data.quantity),
      new Winery(data.winery),
      new WineType(data.type),
      new Vintage(data.vintage),
      OptimalConsumption.fromDates(data.optimalStart, data.optimalEnd),
      new Notes(data.notes)
    );
  }
}
```

### 2. Value Objects

```typescript
// domain/value-objects/WineName.ts
export class WineName {
  constructor(private readonly _value: string) {
    this.validate(_value);
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new InvalidWineNameException('Wine name cannot be empty');
    }
    if (value.length > 100) {
      throw new InvalidWineNameException('Wine name is too long');
    }
  }

  get value(): string {
    return this._value;
  }

  equals(other: WineName): boolean {
    return this._value === other._value;
  }
}

// domain/value-objects/Quantity.ts
export class Quantity {
  constructor(private readonly _value: number) {
    this.validate(_value);
  }

  private validate(value: number): void {
    if (value < 0) {
      throw new InvalidQuantityException('Quantity cannot be negative');
    }
    if (!Number.isInteger(value)) {
      throw new InvalidQuantityException('Quantity must be an integer');
    }
  }

  get value(): number {
    return this._value;
  }

  decrease(): Quantity {
    return new Quantity(this._value - 1);
  }

  increase(amount: number = 1): Quantity {
    return new Quantity(this._value + amount);
  }

  isEmpty(): boolean {
    return this._value === 0;
  }
}

// domain/value-objects/OptimalConsumption.ts
export class OptimalConsumption {
  private constructor(
    private readonly _start: Date,
    private readonly _end: Date
  ) {
    this.validate(_start, _end);
  }

  private validate(start: Date, end: Date): void {
    if (start > end) {
      throw new InvalidDateRangeException('Start date must be before end date');
    }
  }

  static create(start: Date, end: Date): OptimalConsumption {
    return new OptimalConsumption(start, end);
  }

  static fromDates(start: string, end: string): OptimalConsumption {
    return new OptimalConsumption(new Date(start), new Date(end));
  }

  get start(): Date { return this._start; }
  get end(): Date { return this._end; }

  isOptimal(date: Date): boolean {
    return date >= this._start && date <= this._end;
  }

  isSoon(date: Date, daysThreshold: number = 30): boolean {
    const diff = this._start.getTime() - date.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= daysThreshold;
  }

  isPast(date: Date): boolean {
    return date > this._end;
  }

  getStatus(date: Date = new Date()): 'optimal' | 'soon' | 'late' {
    if (this.isOptimal(date)) return 'optimal';
    if (this.isSoon(date)) return 'soon';
    return 'late';
  }
}
```

### 3. Repositorios (Puertos)

```typescript
// domain/repositories/WineRepository.ts
export interface WineRepository {
  save(wine: Wine): Promise<void>;
  findById(id: WineId): Promise<Wine | null>;
  findByUserId(userId: UserId): Promise<Wine[]>;
  findByType(userId: UserId, type: WineType): Promise<Wine[]>;
  update(wine: Wine): Promise<void>;
  delete(id: WineId): Promise<void>;
}
```

### 4. Casos de Uso (Application Layer)

```typescript
// application/use-cases/CreateWineUseCase.ts
export class CreateWineUseCase {
  constructor(
    private readonly wineRepository: WineRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(request: CreateWineRequest): Promise<CreateWineResponse> {
    // 1. Validar que el usuario existe
    const user = await this.userRepository.findById(new UserId(request.userId));
    if (!user) {
      throw new UserNotFoundException();
    }

    // 2. Crear la entidad Wine
    const wine = Wine.create({
      name: request.name,
      quantity: request.quantity,
      winery: request.winery,
      type: request.type,
      vintage: request.vintage,
      optimalStart: new Date(request.optimalStart),
      optimalEnd: new Date(request.optimalEnd),
      notes: request.notes
    });

    // 3. Persistir
    await this.wineRepository.save(wine);

    // 4. Retornar DTO
    return CreateWineResponse.fromWine(wine);
  }
}

// application/dto/CreateWineRequest.ts
export class CreateWineRequest {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly winery: string,
    public readonly type: string,
    public readonly vintage: number,
    public readonly optimalStart: string,
    public readonly optimalEnd: string,
    public readonly notes: string
  ) {}
}

// application/dto/CreateWineResponse.ts
export class CreateWineResponse {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly type: string
  ) {}

  static fromWine(wine: Wine): CreateWineResponse {
    const primitives = wine.toPrimitives();
    return new CreateWineResponse(
      primitives.id,
      primitives.name,
      primitives.quantity,
      primitives.type
    );
  }
}
```

### 5. Adaptadores (Infrastructure Layer)

```typescript
// infrastructure/repositories/SupabaseWineRepository.ts
export class SupabaseWineRepository implements WineRepository {
  constructor(private readonly client: SupabaseClient) {}

  async save(wine: Wine): Promise<void> {
    const primitives = wine.toPrimitives();
    const { error } = await this.client
      .from('wines')
      .insert([this.toDatabase(primitives)]);
    
    if (error) {
      throw new RepositoryException(`Failed to save wine: ${error.message}`);
    }
  }

  async findById(id: WineId): Promise<Wine | null> {
    const { data, error } = await this.client
      .from('wines')
      .select('*')
      .eq('id', id.value)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new RepositoryException(`Failed to find wine: ${error.message}`);
    }

    return data ? Wine.fromPrimitives(this.fromDatabase(data)) : null;
  }

  async findByUserId(userId: UserId): Promise<Wine[]> {
    const { data, error } = await this.client
      .from('wines')
      .select('*')
      .eq('user_id', userId.value)
      .order('created_at', { ascending: false });

    if (error) {
      throw new RepositoryException(`Failed to find wines: ${error.message}`);
    }

    return data.map(item => Wine.fromPrimitives(this.fromDatabase(item)));
  }

  async update(wine: Wine): Promise<void> {
    const primitives = wine.toPrimitives();
    const { error } = await this.client
      .from('wines')
      .update(this.toDatabase(primitives))
      .eq('id', primitives.id);

    if (error) {
      throw new RepositoryException(`Failed to update wine: ${error.message}`);
    }
  }

  async delete(id: WineId): Promise<void> {
    const { error } = await this.client
      .from('wines')
      .delete()
      .eq('id', id.value);

    if (error) {
      throw new RepositoryException(`Failed to delete wine: ${error.message}`);
    }
  }

  // Mappers
  private toDatabase(primitives: WinePrimitives): any {
    return {
      id: primitives.id,
      name: primitives.name,
      quantity: primitives.quantity,
      winery: primitives.winery,
      type: primitives.type,
      vintage: primitives.vintage,
      optimal_start_date: primitives.optimalStart,
      optimal_end_date: primitives.optimalEnd,
      notes: primitives.notes,
      updated_at: new Date().toISOString()
    };
  }

  private fromDatabase(data: any): WinePrimitives {
    return {
      id: data.id,
      name: data.name,
      quantity: data.quantity,
      winery: data.winery,
      type: data.type,
      vintage: data.vintage,
      optimalStart: data.optimal_start_date,
      optimalEnd: data.optimal_end_date,
      notes: data.notes
    };
  }
}
```

### 6. Presentación (React)

```typescript
// presentation/hooks/useCreateWine.ts
export const useCreateWine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWine = async (data: CreateWineFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Inyección de dependencias
      const repository = new SupabaseWineRepository(supabaseClient);
      const userRepository = new SupabaseUserRepository(supabaseClient);
      const useCase = new CreateWineUseCase(repository, userRepository);

      const request = new CreateWineRequest(
        data.userId,
        data.name,
        data.quantity,
        data.winery,
        data.type,
        data.vintage,
        data.optimalStart,
        data.optimalEnd,
        data.notes
      );

      const response = await useCase.execute(request);
      return response;
    } catch (err) {
      if (err instanceof DomainException) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createWine, loading, error };
};

// presentation/components/CreateWineForm.tsx
export const CreateWineForm: React.FC = () => {
  const { createWine, loading, error } = useCreateWine();
  const navigate = useNavigate();

  const handleSubmit = async (formData: CreateWineFormData) => {
    try {
      await createWine(formData);
      toast.success('Wine created successfully');
      navigate('/wines');
    } catch (err) {
      toast.error(error || 'Failed to create wine');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

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

### 2. Componentes Adaptativos

```typescript
// presentation/components/WineCard.tsx
export const WineCard: React.FC<WineCardProps> = ({ wine }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={cn(
      "wine-card",
      isMobile ? "card-mobile" : "card-desktop"
    )}>
      {isMobile ? (
        <MobileWineCardContent wine={wine} />
      ) : (
        <DesktopWineCardContent wine={wine} />
      )}
    </div>
  );
};
```

### 3. Touch-Friendly

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
- [ ] El código es testeable
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
- [ ] El bundle size es aceptable

---

## 🧪 Testing

### Pirámide de Testing

```
        /\
       /  \    E2E (10%)
      /____\
     /      \  Integration (20%)
    /________\
   /          \ Unit (70%)
  /__Unit______\
```

### Tests Unitarios (Domain)

```typescript
// domain/entities/Wine.spec.ts
describe('Wine Entity', () => {
  describe('create', () => {
    it('should create a wine with valid data', () => {
      const wine = Wine.create({
        name: 'Ribera del Duero 2018',
        quantity: 6,
        winery: 'Vega Sicilia',
        type: 'tinto',
        vintage: 2018,
        optimalStart: new Date('2023-01-01'),
        optimalEnd: new Date('2030-12-31'),
        notes: 'Excelente vino'
      });

      expect(wine).toBeInstanceOf(Wine);
      expect(wine.name.value).toBe('Ribera del Duero 2018');
      expect(wine.quantity.value).toBe(6);
    });

    it('should throw error with invalid name', () => {
      expect(() => {
        Wine.create({
          name: '', // Nombre vacío
          quantity: 1,
          winery: 'Test',
          type: 'tinto',
          vintage: 2020,
          optimalStart: new Date(),
          optimalEnd: new Date(),
          notes: ''
        });
      }).toThrow(InvalidWineNameException);
    });
  });

  describe('consumeBottle', () => {
    it('should decrease quantity by one', () => {
      const wine = createTestWine({ quantity: 3 });
      wine.consumeBottle();
      expect(wine.quantity.value).toBe(2);
    });

    it('should throw error when quantity is zero', () => {
      const wine = createTestWine({ quantity: 0 });
      expect(() => wine.consumeBottle()).toThrow(InsufficientQuantityException);
    });
  });
});
```

### Tests de Integración (Use Cases)

```typescript
// application/use-cases/CreateWineUseCase.spec.ts
describe('CreateWineUseCase', () => {
  let useCase: CreateWineUseCase;
  let wineRepository: InMemoryWineRepository;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    wineRepository = new InMemoryWineRepository();
    userRepository = new InMemoryUserRepository();
    useCase = new CreateWineUseCase(wineRepository, userRepository);
  });

  it('should create a wine successfully', async () => {
    // Arrange
    const user = createTestUser();
    await userRepository.save(user);

    const request = new CreateWineRequest(
      user.id.value,
      'Test Wine',
      1,
      'Test Winery',
      'tinto',
      2020,
      '2023-01-01',
      '2025-12-31',
      'Test notes'
    );

    // Act
    const response = await useCase.execute(request);

    // Assert
    expect(response).toBeInstanceOf(CreateWineResponse);
    expect(response.name).toBe('Test Wine');
    
    const savedWine = await wineRepository.findById(new WineId(response.id));
    expect(savedWine).not.toBeNull();
  });

  it('should throw error when user does not exist', async () => {
    const request = new CreateWineRequest(
      'non-existent-user',
      'Test Wine',
      1,
      'Test Winery',
      'tinto',
      2020,
      '2023-01-01',
      '2025-12-31',
      ''
    );

    await expect(useCase.execute(request)).rejects.toThrow(UserNotFoundException);
  });
});
```

---

## 🔧 Herramientas y Configuración

### TypeScript Config

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    
    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/domain/*": ["./src/domain/*"],
      "@/application/*": ["./src/application/*"],
      "@/infrastructure/*": ["./src/infrastructure/*"],
      "@/presentation/*": ["./src/presentation/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

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
  "tabWidth": 2,
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
