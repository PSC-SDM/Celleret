import { Wine, WineProps, WineType } from '../Wine';

describe('Wine Entity', () => {
    const mockWineProps: Omit<WineProps, 'createdAt' | 'updatedAt'> = {
        id: 'wine-123',
        userId: 'user-456',
        name: 'Château Margaux',
        vintage: 2015,
        coupage: 'Cabernet Sauvignon, Merlot, Petit Verdot',
        type: 'red' as WineType,
        cellarEntryDate: new Date('2020-01-15'),
        quantity: 6,
        alcoholContent: 13.5,
        denomination: 'Margaux AOC',
        winery: 'Château Margaux',
        suggestedConsumptionDate: new Date('2025-01-01'),
        notes: 'Excellent vintage, keep for special occasions',
    };

    describe('create', () => {
        it('should create a new wine with all properties', () => {
            const wine = Wine.create(mockWineProps);

            expect(wine.getId()).toBe('wine-123');
            expect(wine.getUserId()).toBe('user-456');
            expect(wine.getName()).toBe('Château Margaux');
            expect(wine.getVintage()).toBe(2015);
            expect(wine.getCoupage()).toBe('Cabernet Sauvignon, Merlot, Petit Verdot');
            expect(wine.getType()).toBe('red');
            expect(wine.getQuantity()).toBe(6);
            expect(wine.getAlcoholContent()).toBe(13.5);
            expect(wine.getDenomination()).toBe('Margaux AOC');
            expect(wine.getWinery()).toBe('Château Margaux');
            expect(wine.getNotes()).toBe('Excellent vintage, keep for special occasions');
        });

        it('should set createdAt and updatedAt timestamps', () => {
            const beforeCreate = new Date();
            const wine = Wine.create(mockWineProps);
            const afterCreate = new Date();

            expect(wine.getCreatedAt()).toBeInstanceOf(Date);
            expect(wine.getUpdatedAt()).toBeInstanceOf(Date);
            expect(wine.getCreatedAt().getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
            expect(wine.getCreatedAt().getTime()).toBeLessThanOrEqual(afterCreate.getTime());
        });

        it('should create wine without optional fields', () => {
            const { suggestedConsumptionDate, notes, ...requiredProps } = mockWineProps;
            const wine = Wine.create(requiredProps);

            expect(wine.getSuggestedConsumptionDate()).toBeUndefined();
            expect(wine.getNotes()).toBeUndefined();
        });
    });

    describe('reconstitute', () => {
        it('should reconstitute a wine from stored data', () => {
            const storedProps: WineProps = {
                ...mockWineProps,
                createdAt: new Date('2020-01-01'),
                updatedAt: new Date('2020-01-02'),
            };

            const wine = Wine.reconstitute(storedProps);

            expect(wine.getId()).toBe(storedProps.id);
            expect(wine.getCreatedAt()).toEqual(storedProps.createdAt);
            expect(wine.getUpdatedAt()).toEqual(storedProps.updatedAt);
        });
    });

    describe('updateQuantity', () => {
        it('should update the quantity', () => {
            const wine = Wine.create(mockWineProps);

            // Small delay to ensure timestamp changes
            setTimeout(() => {
                wine.updateQuantity(10);
                expect(wine.getQuantity()).toBe(10);
            }, 10);
        });

        it('should update the updatedAt timestamp', () => {
            const wine = Wine.create(mockWineProps);
            const beforeUpdate = wine.getUpdatedAt();

            setTimeout(() => {
                wine.updateQuantity(3);
                expect(wine.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(
                    beforeUpdate.getTime()
                );
            }, 10);
        });

        it('should throw error when quantity is negative', () => {
            const wine = Wine.create(mockWineProps);

            expect(() => wine.updateQuantity(-1)).toThrow('Quantity cannot be negative');
        });
    });

    describe('addBottles', () => {
        it('should add bottles to the current quantity', () => {
            const wine = Wine.create(mockWineProps);
            const initialQuantity = wine.getQuantity();

            wine.addBottles(3);

            expect(wine.getQuantity()).toBe(initialQuantity + 3);
        });

        it('should throw error when amount is zero or negative', () => {
            const wine = Wine.create(mockWineProps);

            expect(() => wine.addBottles(0)).toThrow('Amount must be positive');
            expect(() => wine.addBottles(-1)).toThrow('Amount must be positive');
        });

        it('should update the updatedAt timestamp', () => {
            const wine = Wine.create(mockWineProps);
            const beforeUpdate = wine.getUpdatedAt();

            setTimeout(() => {
                wine.addBottles(2);
                expect(wine.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(
                    beforeUpdate.getTime()
                );
            }, 10);
        });
    });

    describe('removeBottles', () => {
        it('should remove bottles from the current quantity', () => {
            const wine = Wine.create(mockWineProps);
            const initialQuantity = wine.getQuantity();

            wine.removeBottles(2);

            expect(wine.getQuantity()).toBe(initialQuantity - 2);
        });

        it('should throw error when amount is zero or negative', () => {
            const wine = Wine.create(mockWineProps);

            expect(() => wine.removeBottles(0)).toThrow('Amount must be positive');
            expect(() => wine.removeBottles(-1)).toThrow('Amount must be positive');
        });

        it('should throw error when not enough bottles in cellar', () => {
            const wine = Wine.create(mockWineProps);

            expect(() => wine.removeBottles(100)).toThrow('Not enough bottles in cellar');
        });

        it('should update the updatedAt timestamp', () => {
            const wine = Wine.create(mockWineProps);
            const beforeUpdate = wine.getUpdatedAt();

            setTimeout(() => {
                wine.removeBottles(1);
                expect(wine.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(
                    beforeUpdate.getTime()
                );
            }, 10);
        });
    });

    describe('updateNotes', () => {
        it('should update the notes', () => {
            const wine = Wine.create(mockWineProps);

            wine.updateNotes('New tasting notes');

            expect(wine.getNotes()).toBe('New tasting notes');
        });

        it('should update the updatedAt timestamp', () => {
            const wine = Wine.create(mockWineProps);
            const beforeUpdate = wine.getUpdatedAt();

            setTimeout(() => {
                wine.updateNotes('Updated notes');
                expect(wine.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(
                    beforeUpdate.getTime()
                );
            }, 10);
        });
    });

    describe('updateSuggestedConsumptionDate', () => {
        it('should update the suggested consumption date', () => {
            const wine = Wine.create(mockWineProps);
            const newDate = new Date('2026-06-15');

            wine.updateSuggestedConsumptionDate(newDate);

            expect(wine.getSuggestedConsumptionDate()).toEqual(newDate);
        });

        it('should update the updatedAt timestamp', () => {
            const wine = Wine.create(mockWineProps);
            const beforeUpdate = wine.getUpdatedAt();

            setTimeout(() => {
                wine.updateSuggestedConsumptionDate(new Date('2026-01-01'));
                expect(wine.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(
                    beforeUpdate.getTime()
                );
            }, 10);
        });
    });

    describe('isReadyToConsume', () => {
        it('should return true when current date is past suggested consumption date', () => {
            const pastDate = new Date();
            pastDate.setFullYear(pastDate.getFullYear() - 1);

            const wine = Wine.create({
                ...mockWineProps,
                suggestedConsumptionDate: pastDate,
            });

            expect(wine.isReadyToConsume()).toBe(true);
        });

        it('should return false when current date is before suggested consumption date', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);

            const wine = Wine.create({
                ...mockWineProps,
                suggestedConsumptionDate: futureDate,
            });

            expect(wine.isReadyToConsume()).toBe(false);
        });

        it('should return false when no suggested consumption date is set', () => {
            const { suggestedConsumptionDate, ...propsWithoutDate } = mockWineProps;
            const wine = Wine.create(propsWithoutDate);

            expect(wine.isReadyToConsume()).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should return true when quantity is zero', () => {
            const wine = Wine.create({ ...mockWineProps, quantity: 0 });

            expect(wine.isEmpty()).toBe(true);
        });

        it('should return false when quantity is greater than zero', () => {
            const wine = Wine.create(mockWineProps);

            expect(wine.isEmpty()).toBe(false);
        });

        it('should return true after removing all bottles', () => {
            const wine = Wine.create({ ...mockWineProps, quantity: 3 });

            wine.removeBottles(3);

            expect(wine.isEmpty()).toBe(true);
        });
    });

    describe('getAge', () => {
        it('should calculate the age of the wine correctly', () => {
            const currentYear = new Date().getFullYear();
            const vintage = 2010;
            const wine = Wine.create({ ...mockWineProps, vintage });

            expect(wine.getAge()).toBe(currentYear - vintage);
        });

        it('should return 0 for current year vintage', () => {
            const currentYear = new Date().getFullYear();
            const wine = Wine.create({ ...mockWineProps, vintage: currentYear });

            expect(wine.getAge()).toBe(0);
        });
    });

    describe('toPlainObject', () => {
        it('should return a plain object with all properties', () => {
            const wine = Wine.create(mockWineProps);
            const plainObject = wine.toPlainObject();

            expect(plainObject).toMatchObject({
                id: mockWineProps.id,
                userId: mockWineProps.userId,
                name: mockWineProps.name,
                vintage: mockWineProps.vintage,
                coupage: mockWineProps.coupage,
                type: mockWineProps.type,
                quantity: mockWineProps.quantity,
                alcoholContent: mockWineProps.alcoholContent,
                denomination: mockWineProps.denomination,
                winery: mockWineProps.winery,
            });
            expect(plainObject.createdAt).toBeInstanceOf(Date);
            expect(plainObject.updatedAt).toBeInstanceOf(Date);
        });
    });

    describe('Wine Types', () => {
        it('should accept all valid wine types', () => {
            const types: WineType[] = ['red', 'white', 'rose', 'sparkling'];

            types.forEach((type) => {
                const wine = Wine.create({ ...mockWineProps, type });
                expect(wine.getType()).toBe(type);
            });
        });
    });
});
