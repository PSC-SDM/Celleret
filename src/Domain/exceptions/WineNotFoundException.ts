import { DomainException } from './DomainException';

export class WineNotFoundException extends DomainException {
    constructor(wineId: string) {
        super(`Wine with id ${wineId} not found`);
        this.name = 'WineNotFoundException';
        Object.setPrototypeOf(this, WineNotFoundException.prototype);
    }
}
