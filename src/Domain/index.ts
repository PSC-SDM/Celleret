/**
 * @fileoverview Punto de entrada principal del dominio compartido de Celleret
 *
 * Este archivo exporta todos los elementos principales del dominio para que puedan
 * ser importados desde otras capas (Frontend y Backend) de manera consistente.
 *
 * Arquitectura: Clean Architecture + DDD
 * Capa: Domain (Core)
 */

// Entidades principales
export { Wine } from './entities/Wine';
export type { WineType, WineProps } from './entities/Wine';
export { User } from './entities/User';
export type { UserProps } from './entities/User';

// Repositorios (Puertos/Interfaces)
export type { WineRepository } from './repositories/wine-repository';
export type { UserRepository } from './repositories/user-repository';

// Servicios de dominio
export { OptimalConsumptionCalculator } from './services/OptimalConsumptionCalculator';

// Excepciones de dominio
export { DomainException } from './exceptions/DomainException';
export { WineNotFoundException } from './exceptions/WineNotFoundException';
export { InvalidWineDataException } from './exceptions/InvalidWineDataException';