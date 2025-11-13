import { OptimalConsumptionCalculator } from '../OptimalConsumptionCalculator';
import { Wine, WineType } from '../../entities/Wine';

describe('OptimalConsumptionCalculator', () => {
    const createWine = (
        type: WineType,
        vintage: number,
        cellarEntryDate: Date,
        suggestedConsumptionDate?: Date
    ): Wine => {
        const baseProps = {
            id: 'wine-test',
            userId: 'user-test',
            name: 'Test Wine',
            vintage,
            coupage: 'Test Coupage',
            type,
            cellarEntryDate,
            quantity: 6,
            alcoholContent: 13.5,
            denomination: 'Test DOC',
            winery: 'Test Winery',
        };

        return Wine.create(
            suggestedConsumptionDate
                ? { ...baseProps, suggestedConsumptionDate }
                : baseProps
        );
    };

    describe('isOptimalToConsume', () => {
        it('should return true when current date is past suggested consumption date', () => {
            const pastDate = new Date();
            pastDate.setFullYear(pastDate.getFullYear() - 1);

            const wine = createWine('red', 2015, new Date(), pastDate);

            expect(OptimalConsumptionCalculator.isOptimalToConsume(wine)).toBe(true);
        });

        it('should return false when current date is before suggested consumption date', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 2);

            const wine = createWine('red', 2020, new Date(), futureDate);

            expect(OptimalConsumptionCalculator.isOptimalToConsume(wine)).toBe(false);
        });

        it('should return false when no suggested consumption date is set', () => {
            const wine = createWine('red', 2018, new Date());

            expect(OptimalConsumptionCalculator.isOptimalToConsume(wine)).toBe(false);
        });

        it('should return true when suggested date is today', () => {
            const today = new Date();
            const wine = createWine('white', 2022, new Date(), today);

            expect(OptimalConsumptionCalculator.isOptimalToConsume(wine)).toBe(true);
        });
    });

    describe('daysUntilOptimal', () => {
        it('should return positive number when date is in the future', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 10);

            const wine = createWine('red', 2020, new Date(), futureDate);
            const days = OptimalConsumptionCalculator.daysUntilOptimal(wine);

            expect(days).toBeGreaterThan(0);
            expect(days).toBeLessThanOrEqual(11); // Accounting for ceiling
        });

        it('should return negative number when date is in the past', () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 10);

            const wine = createWine('red', 2015, new Date(), pastDate);
            const days = OptimalConsumptionCalculator.daysUntilOptimal(wine);

            expect(days).toBeLessThan(0);
        });

        it('should return null when no suggested consumption date is set', () => {
            const wine = createWine('red', 2018, new Date());

            expect(OptimalConsumptionCalculator.daysUntilOptimal(wine)).toBeNull();
        });

        it('should return 0 or 1 when date is today', () => {
            const today = new Date();
            const wine = createWine('white', 2022, new Date(), today);
            const days = OptimalConsumptionCalculator.daysUntilOptimal(wine);

            expect(days).toBeGreaterThanOrEqual(0);
            expect(days).toBeLessThanOrEqual(1);
        });
    });

    describe('suggestConsumptionDate', () => {
        const cellarDate = new Date('2020-01-01');

        describe('Red wines', () => {
            it('should suggest 2 years wait for young red wines (< 3 years)', () => {
                const currentYear = new Date().getFullYear();
                const youngVintage = currentYear - 1;
                const wine = createWine('red', youngVintage, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);
                const expectedYear = cellarDate.getFullYear() + 2;

                expect(suggested.getFullYear()).toBe(expectedYear);
            });

            it('should suggest 1 year wait for mid-age red wines (3-10 years)', () => {
                const wine = createWine('red', 2015, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);
                const expectedYear = cellarDate.getFullYear() + 1;

                expect(suggested.getFullYear()).toBe(expectedYear);
            });

            it('should suggest immediate consumption for old red wines (> 10 years)', () => {
                const wine = createWine('red', 2005, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);

                expect(suggested.getFullYear()).toBe(cellarDate.getFullYear());
            });
        });

        describe('White wines', () => {
            it('should suggest 1 year wait for young white wines (< 2 years)', () => {
                const currentYear = new Date().getFullYear();
                const wine = createWine('white', currentYear, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);
                const expectedYear = cellarDate.getFullYear() + 1;

                expect(suggested.getFullYear()).toBe(expectedYear);
            });

            it('should suggest immediate consumption for older white wines (>= 2 years)', () => {
                const wine = createWine('white', 2020, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);

                expect(suggested.getFullYear()).toBe(cellarDate.getFullYear());
            });
        });

        describe('Rosé wines', () => {
            it('should suggest immediate consumption for rosé wines', () => {
                const wine = createWine('rose', 2023, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);

                expect(suggested.getFullYear()).toBe(cellarDate.getFullYear());
            });
        });

        describe('Sparkling wines', () => {
            it('should suggest 1 year wait for young sparkling wines (< 3 years)', () => {
                const currentYear = new Date().getFullYear();
                const wine = createWine('sparkling', currentYear, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);
                const expectedYear = cellarDate.getFullYear() + 1;

                expect(suggested.getFullYear()).toBe(expectedYear);
            });

            it('should suggest immediate consumption for vintage sparkling wines (>= 3 years)', () => {
                const wine = createWine('sparkling', 2018, cellarDate);

                const suggested = OptimalConsumptionCalculator.suggestConsumptionDate(wine);

                expect(suggested.getFullYear()).toBe(cellarDate.getFullYear());
            });
        });
    });

    describe('getConsumptionStatus', () => {
        it('should return "optimal" when wine is ready to consume', () => {
            const pastDate = new Date();
            pastDate.setFullYear(pastDate.getFullYear() - 1);

            const wine = createWine('red', 2015, new Date(), pastDate);

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('optimal');
        });

        it('should return "approaching" when wine is within 90 days of optimal date', () => {
            const approachingDate = new Date();
            approachingDate.setDate(approachingDate.getDate() + 60);

            const wine = createWine('red', 2018, new Date(), approachingDate);

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('approaching');
        });

        it('should return "approaching" when wine is exactly 90 days away', () => {
            const approachingDate = new Date();
            approachingDate.setDate(approachingDate.getDate() + 90);

            const wine = createWine('red', 2018, new Date(), approachingDate);

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('approaching');
        });

        it('should return "not-ready" when wine is more than 90 days away', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 120);

            const wine = createWine('red', 2020, new Date(), futureDate);

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('not-ready');
        });

        it('should return "unknown" when no suggested consumption date is set', () => {
            const wine = createWine('red', 2018, new Date());

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('unknown');
        });

        it('should return "optimal" when date is today', () => {
            const today = new Date();
            const wine = createWine('white', 2022, new Date(), today);

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('optimal');
        });

        it('should return "approaching" when wine is 1 day away', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const wine = createWine('white', 2022, new Date(), tomorrow);

            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('approaching');
        });
    });

    describe('Integration scenarios', () => {
        it('should handle complete workflow for a new red wine', () => {
            const currentYear = new Date().getFullYear();
            const wine = createWine('red', currentYear - 2, new Date('2023-01-01'));

            // Should not be optimal yet without suggested date
            expect(OptimalConsumptionCalculator.isOptimalToConsume(wine)).toBe(false);
            expect(OptimalConsumptionCalculator.getConsumptionStatus(wine)).toBe('unknown');

            // Generate suggestion
            const suggestedDate = OptimalConsumptionCalculator.suggestConsumptionDate(wine);
            wine.updateSuggestedConsumptionDate(suggestedDate);

            // Now should have a status
            const status = OptimalConsumptionCalculator.getConsumptionStatus(wine);
            expect(['optimal', 'approaching', 'not-ready']).toContain(status);
        });

        it('should handle rosé wine that should be drunk immediately', () => {
            const currentYear = new Date().getFullYear();
            const wine = createWine('rose', currentYear, new Date());

            const suggestedDate = OptimalConsumptionCalculator.suggestConsumptionDate(wine);

            // Rosé should be ready now
            expect(suggestedDate.getFullYear()).toBe(new Date().getFullYear());
        });
    });
});
