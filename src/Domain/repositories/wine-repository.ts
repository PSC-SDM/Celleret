import { Wine } from '../entities/Wine';

export interface WineRepository {
    findById(id: string): Promise<Wine | null>;
    findByUserId(userId: string): Promise<Wine[]>;
    save(wine: Wine): Promise<void>;
    update(wine: Wine): Promise<void>;
    delete(id: string): Promise<void>;
}
