import { Wine } from '../entities/Wine';

export class OptimalConsumptionCalculator {
    /**
     * Determines if a wine is currently in its optimal consumption period
     */
    static isOptimalToConsume(wine: Wine): boolean {
        const suggestedDate = wine.getSuggestedConsumptionDate();
        if (!suggestedDate) {
            return false;
        }
        const now = new Date();
        return now >= suggestedDate;
    }

    /**
     * Calculates the number of days until the suggested consumption date
     * Returns negative if the date has passed
     */
    static daysUntilOptimal(wine: Wine): number | null {
        const suggestedDate = wine.getSuggestedConsumptionDate();
        if (!suggestedDate) {
            return null;
        }
        const now = new Date();
        const diffTime = suggestedDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    /**
     * Suggests a consumption window based on wine type and age
     * This is a simplified calculation - real implementations would be more complex
     */
    static suggestConsumptionDate(wine: Wine): Date {
        const entryDate = wine.getCellarEntryDate();
        const type = wine.getType();
        const age = wine.getAge();

        let yearsToWait = 0;

        // Simple heuristic based on wine type and age
        switch (type) {
            case 'red':
                if (age < 3) {
                    yearsToWait = 2; // Young reds need time
                } else if (age < 10) {
                    yearsToWait = 1; // Mid-age reds
                } else {
                    yearsToWait = 0; // Old reds, drink soon
                }
                break;
            case 'white':
                if (age < 2) {
                    yearsToWait = 1; // Young whites
                } else {
                    yearsToWait = 0; // Drink whites relatively young
                }
                break;
            case 'rose':
                yearsToWait = 0; // Rosé should be drunk young
                break;
            case 'sparkling':
                if (age < 3) {
                    yearsToWait = 1; // Young sparkling
                } else {
                    yearsToWait = 0; // Vintage sparkling can age, but drink within window
                }
                break;
        }

        const suggestedDate = new Date(entryDate);
        suggestedDate.setFullYear(suggestedDate.getFullYear() + yearsToWait);
        return suggestedDate;
    }

    /**
     * Gets the consumption status of a wine
     */
    static getConsumptionStatus(
        wine: Wine
    ): 'optimal' | 'approaching' | 'not-ready' | 'unknown' {
        const daysUntil = this.daysUntilOptimal(wine);

        if (daysUntil === null) {
            return 'unknown';
        }

        if (daysUntil <= 0) {
            return 'optimal';
        }

        if (daysUntil <= 90) {
            // Within 3 months
            return 'approaching';
        }

        return 'not-ready';
    }
}
