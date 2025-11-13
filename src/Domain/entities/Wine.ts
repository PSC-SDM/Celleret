export type WineType = 'red' | 'white' | 'rose' | 'sparkling';

export interface WineProps {
    id: string;
    userId: string;
    name: string;
    vintage: number;
    coupage: string;
    type: WineType;
    cellarEntryDate: Date;
    quantity: number;
    alcoholContent: number;
    denomination: string;
    winery: string;
    suggestedConsumptionDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Wine {
    private constructor(private props: WineProps) { }

    static create(props: Omit<WineProps, 'createdAt' | 'updatedAt'>): Wine {
        const now = new Date();
        return new Wine({
            ...props,
            createdAt: now,
            updatedAt: now,
        });
    }

    static reconstitute(props: WineProps): Wine {
        return new Wine(props);
    }

    // Getters
    getId(): string {
        return this.props.id;
    }

    getUserId(): string {
        return this.props.userId;
    }

    getName(): string {
        return this.props.name;
    }

    getVintage(): number {
        return this.props.vintage;
    }

    getCoupage(): string {
        return this.props.coupage;
    }

    getType(): WineType {
        return this.props.type;
    }

    getCellarEntryDate(): Date {
        return this.props.cellarEntryDate;
    }

    getQuantity(): number {
        return this.props.quantity;
    }

    getAlcoholContent(): number {
        return this.props.alcoholContent;
    }

    getDenomination(): string {
        return this.props.denomination;
    }

    getWinery(): string {
        return this.props.winery;
    }

    getSuggestedConsumptionDate(): Date | undefined {
        return this.props.suggestedConsumptionDate;
    }

    getNotes(): string | undefined {
        return this.props.notes;
    }

    getCreatedAt(): Date {
        return this.props.createdAt;
    }

    getUpdatedAt(): Date {
        return this.props.updatedAt;
    }

    // Business methods
    updateQuantity(newQuantity: number): void {
        if (newQuantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        this.props.quantity = newQuantity;
        this.props.updatedAt = new Date();
    }

    addBottles(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        this.props.quantity += amount;
        this.props.updatedAt = new Date();
    }

    removeBottles(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        if (this.props.quantity - amount < 0) {
            throw new Error('Not enough bottles in cellar');
        }
        this.props.quantity -= amount;
        this.props.updatedAt = new Date();
    }

    updateNotes(notes: string): void {
        this.props.notes = notes;
        this.props.updatedAt = new Date();
    }

    updateSuggestedConsumptionDate(date: Date): void {
        this.props.suggestedConsumptionDate = date;
        this.props.updatedAt = new Date();
    }

    isReadyToConsume(): boolean {
        if (!this.props.suggestedConsumptionDate) {
            return false;
        }
        const now = new Date();
        return now >= this.props.suggestedConsumptionDate;
    }

    isEmpty(): boolean {
        return this.props.quantity === 0;
    }

    getAge(): number {
        const currentYear = new Date().getFullYear();
        return currentYear - this.props.vintage;
    }

    toPlainObject(): WineProps {
        return { ...this.props };
    }
}
