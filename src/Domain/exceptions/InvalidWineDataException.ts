import { DomainException } from './DomainException';

export class InvalidWineDataException extends DomainException {
    constructor(message: string) {
        super(`Invalid wine data: ${message}`);
        this.name = 'InvalidWineDataException';
        Object.setPrototypeOf(this, InvalidWineDataException.prototype);
    }
}
