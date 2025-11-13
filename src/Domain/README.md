# Domain Layer - Celleret

## Overview
This is the core domain layer of the Celleret application, following **Domain-Driven Design (DDD)** and **Clean Architecture** principles.

## Structure

```
Domain/
├── entities/           # Business entities with encapsulated logic
│   ├── Wine.ts        # Wine aggregate root
│   └── User.ts        # User entity
├── repositories/      # Repository interfaces (ports)
│   ├── wine-repository.ts
│   └── user-repository.ts
├── services/          # Domain services
│   └── OptimalConsumptionCalculator.ts
├── exceptions/        # Domain-specific exceptions
│   ├── DomainException.ts
│   ├── WineNotFoundException.ts
│   └── InvalidWineDataException.ts
└── index.ts          # Public API exports
```

## Entities

### Wine
The Wine entity is the **aggregate root** for wine management. It contains all business logic related to wine cellar management.

**Properties:**
- `id`: Unique identifier
- `userId`: Owner of the wine
- `name`: Wine name
- `vintage`: Year of production
- `coupage`: Grape varieties blend
- `type`: Wine type (red, white, rose, sparkling)
- `cellarEntryDate`: Date when wine entered the cellar
- `quantity`: Number of bottles in cellar
- `alcoholContent`: Alcohol percentage
- `denomination`: Denomination of origin
- `winery`: Producer or brand
- `suggestedConsumptionDate`: Recommended consumption date
- `notes`: Additional notes or description

**Business Methods:**
- `updateQuantity(amount)`: Update bottle quantity
- `addBottles(amount)`: Add bottles to cellar
- `removeBottles(amount)`: Remove bottles from cellar
- `updateNotes(notes)`: Update wine notes
- `updateSuggestedConsumptionDate(date)`: Set consumption date
- `isReadyToConsume()`: Check if wine is ready
- `isEmpty()`: Check if no bottles remain
- `getAge()`: Calculate wine age

### User
Simple user entity for authentication and ownership.

## Services

### OptimalConsumptionCalculator
Domain service for calculating optimal consumption windows for wines.

**Methods:**
- `isOptimalToConsume(wine)`: Check if wine is in optimal consumption period
- `daysUntilOptimal(wine)`: Calculate days until optimal consumption
- `suggestConsumptionDate(wine)`: Suggest consumption date based on wine type and age
- `getConsumptionStatus(wine)`: Get consumption status (optimal, approaching, not-ready, unknown)

## Repositories

Repository interfaces define the contracts for data persistence. Implementations are in the infrastructure layer.

- `WineRepository`: CRUD operations for wines
- `UserRepository`: CRUD operations for users

## Exceptions

Domain-specific exceptions for clear error handling:

- `DomainException`: Base exception
- `WineNotFoundException`: Wine not found error
- `InvalidWineDataException`: Invalid wine data error

## Usage

Import from the domain layer:

```typescript
import { 
    Wine, 
    WineType, 
    OptimalConsumptionCalculator,
    WineNotFoundException 
} from '@/Domain';

// Create a wine
const wine = Wine.create({
    id: '123',
    userId: 'user-1',
    name: 'Château Margaux',
    vintage: 2015,
    coupage: 'Cabernet Sauvignon, Merlot',
    type: 'red',
    cellarEntryDate: new Date(),
    quantity: 6,
    alcoholContent: 13.5,
    denomination: 'Margaux AOC',
    winery: 'Château Margaux'
});

// Use domain service
const status = OptimalConsumptionCalculator.getConsumptionStatus(wine);
```

## Principles

- ✅ **No external dependencies** (only TypeScript)
- ✅ **Business logic encapsulated** in entities
- ✅ **Immutable by design** (use methods to modify state)
- ✅ **Clear separation** from infrastructure concerns
- ✅ **Framework agnostic**
